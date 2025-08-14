import { User } from '#/@types/api/User';
import { STORAGE } from '#/constants/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

const initialValue = {};

export type PersistContextProps = {
  children?: React.ReactNode;
};

export type PersistType = {
  user?: User;
  [key: string]: any;
};

export type PersistContextType<T> = {
  data: T;
  fromStorage: () => Promise<PersistType | null>;
  persist: (obj: T) => Promise<void>;
  reset: () => void;
};

const Context = createContext<PersistContextType<PersistType>>(
  {} as PersistContextType<PersistType>,
);

export const PersistorContext: React.FC<PersistContextProps> = props => {
  const [data, setData] = useState(initialValue);

  const persist = async (obj: PersistType) => {
    setData(prev => ({
      ...prev,
      ...obj,
    }));
  };

  const reset = async () => {
    await AsyncStorage.removeItem(STORAGE.persistor);
  };

  const handleDataChange = async (obj: PersistType) => {
    if (!obj) {
      const stored = await AsyncStorage.getItem(STORAGE.persistor);

      if (!stored) {
        return;
      }

      setData(JSON.parse(stored));

      return;
    }
  };

  const fromStorage = async (): Promise<PersistType | null> => {
    const rawPersisted = await AsyncStorage.getItem(STORAGE.persistor);

    if (rawPersisted) {
      try {
        return JSON.parse(rawPersisted);
      } catch (err) {
        return null;
      }
    }

    return null;
  };

  useEffect(() => {
    handleDataChange(data);
  }, [data]);

  return (
    <Context.Provider value={{ data, fromStorage, persist, reset }}>
      {props.children}
    </Context.Provider>
  );
};

export const usePersistor = () => {
  return useContext(Context);
};
