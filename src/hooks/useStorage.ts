import AsyncStorage from '@react-native-async-storage/async-storage';

export type StorageTokenType = {
  token?: string;
  refreshToken?: string;
};

export const STORAGE = {
  USER_TOKEN: '@storage::user_token',
};

export const useStorage = () => {
  const getStorage = async <T = any>(key: string): Promise<T | null> => {
    const raw = await AsyncStorage.getItem(key);

    if (raw == null) {
      return null;
    }

    try {
      return JSON.parse(raw) as T;
    } catch (err) {
      return null;
    }
  };

  const setStorage = async <T = any>(key: string, value: T): Promise<void> => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  };

  return { getStorage, setStorage };
};
