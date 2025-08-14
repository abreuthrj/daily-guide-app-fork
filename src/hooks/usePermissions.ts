import { useTranslation } from '#/contexts/translation';
import messaging from '@react-native-firebase/messaging';
import { Alert, Linking } from 'react-native';
import {
  checkNotifications,
  requestNotifications,
} from 'react-native-permissions';
import { useApi } from './useApi';

export const usePermissions = () => {
  const { translate } = useTranslation();
  const apiService = useApi();

  const handleNotificationPermissionAlert = () => {
    Alert.alert(
      translate('alert-notifications-required-title'),
      translate('alert-notifications-required-body'),
      [
        {
          text: translate('alert-notifications-open_settings'),
          onPress: () => {
            Linking.openSettings();
          },
        },
      ],
      { cancelable: true },
    );
  };

  const uploadNotificationToken = async (token: string) => {
    await apiService.put('/user', {
      utcOffset: new Date().getTimezoneOffset(),
      fcmToken: token,
    });
  };

  const verifyNotificationPermission = async (): Promise<boolean> => {
    if (!messaging().isDeviceRegisteredForRemoteMessages) {
      await messaging().registerDeviceForRemoteMessages();
    }

    let checkPermission = await checkNotifications();

    if (['granted', 'limited'].includes(checkPermission.status)) {
      return true;
    }

    await requestNotifications(['alert', 'badge', 'sound']);

    try {
      const token = await messaging().getToken();
      uploadNotificationToken(token);
    } catch (err) {}

    return true;
  };

  return { verifyNotificationPermission, uploadNotificationToken };
};
