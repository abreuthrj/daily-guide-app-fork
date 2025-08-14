import { ERR_TYPE } from '#/@types/api/errors';
import { useModal } from '#/contexts/modal';
import { useTranslation } from '#/contexts/translation';
import { API_URL, ENV_MODE } from '@env';
import auth from '@react-native-firebase/auth';
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  isAxiosError,
} from 'axios';
import { Linking, Platform } from 'react-native';
import {
  getDeviceName,
  getSystemVersion,
  getUniqueId,
  getVersion,
} from 'react-native-device-info';
import { STORAGE, StorageTokenType, useStorage } from './useStorage';

const service = axios.create({
  baseURL:
    ENV_MODE === 'development' && Platform.OS === 'ios'
      ? API_URL.replace('10.0.2.2', 'localhost')
      : API_URL,
});

service.interceptors.request.use(config => {
  console.log(
    '[API REQUEST]',
    JSON.stringify(
      {
        route: `${config.baseURL}${config.url}`,
        method: config.method,
        params: config.params,
        body: config.data,
        headers: config.headers,
      },
      null,
      2,
    ),
  );

  return config;
});

service.interceptors.response.use(config => {
  console.log(
    '[API RESPONSE]',
    JSON.stringify(
      {
        route: config.request.url,
        body: config.data,
      },
      null,
      2,
    ),
  );

  return config;
});

export const useApi = () => {
  const { getStorage } = useStorage();
  const modal = useModal();
  const { translate } = useTranslation();

  const handleVersionError = (url: string) => {
    modal.show({
      title: translate('modal-update_version-title'),
      body: translate('modal-update_version-body'),
      actionText: translate('modal-update_version-button'),
      onActionPress: () => {
        Linking.openURL(url).catch(console.log);
      },
    });
  };

  const handleResponseError = (response: AxiosResponse) => {
    console.log(response.data);

    if (response.status === 401) {
      auth().signOut();
    }

    if (response.data.type === ERR_TYPE.ERR_UPDATE_REQUIRED) {
      handleVersionError(response.data.details);
    }

    return response.data;
  };

  const handleRequestError = (error: AxiosError) => {
    console.log(error.request);
  };

  const handleException = (exception: any) => {
    if (isAxiosError(exception)) {
      if (exception.response) {
        return handleResponseError(exception.response);
      }

      if (exception.request) {
        return handleRequestError(exception);
      }

      console.log(exception);
      return;
    }

    console.log(exception);
  };

  const handleConfig = async <T = any>(
    config?: AxiosRequestConfig<T>,
  ): Promise<AxiosRequestConfig<T>> => {
    const deviceInfos = [
      Platform.OS,
      getSystemVersion(),
      getVersion(),
      await getDeviceName(),
      await getUniqueId(),
      Platform.Version,
    ];
    const userAgent = deviceInfos.join('|');

    const storageToken = await getStorage<StorageTokenType>(STORAGE.USER_TOKEN);

    return {
      ...(config ?? {}),
      headers: {
        ...(config?.headers ?? {}),
        Authorization: `Bearer ${storageToken?.token}`,
        'User-Agent': userAgent,
      },
    };
  };

  const get = async <T = any, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<T> => {
    try {
      const response = await service.get(url, await handleConfig(config));
      return response.data?.data;
    } catch (exception) {
      console.log('[API GET EXCEPTION]');
      throw handleException(exception);
    }
  };

  const post = async <T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<T> => {
    try {
      const response = await service.post(
        url,
        data,
        await handleConfig(config),
      );
      return response.data?.data;
    } catch (exception) {
      console.log('[API POST EXCEPTION]');
      throw handleException(exception);
    }
  };

  const put = async <T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<T> => {
    try {
      const response = await service.put(url, data, await handleConfig(config));
      return response.data?.data;
    } catch (exception) {
      console.log('[API PUT EXCEPTION]');
      throw handleException(exception);
    }
  };

  return { ...service, get, post, put };
};
