import { STORAGE } from '#/constants/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

const initialValue = {
  name: '',
  birthdate: '',
  birthtime: '',
  city: '',
  gender: '',
  notificationTime: '',
  placeId: '',
};

export type FormType = Partial<typeof initialValue>;

type ContextType = {
  data: FormType;
  get: (key: keyof FormType) => any;
  set: (key: FormType | keyof FormType, value?: any) => void;
};

const Context = createContext<ContextType>({} as ContextType);

export type FormContextProps = {
  value?: FormType;
  children?: React.ReactNode;
};

export const FormContext: React.FC<FormContextProps> = props => {
  const [getState, setState] = useState({
    ...initialValue,
    ...(props.value ?? {}),
  });

  const get: ContextType['get'] = key => {
    return getState[key];
  };

  const set: ContextType['set'] = (key, value) => {
    if (typeof key === 'string') {
      setState(prev => ({
        ...prev,
        [key]: value,
      }));

      return;
    }

    setState(prev => ({
      ...prev,
      ...key,
    }));
  };

  useEffect(() => {
    if (getState) {
      AsyncStorage.setItem(STORAGE.onboarding, JSON.stringify(getState));
    }
  }, [getState]);

  return (
    <Context.Provider value={{ get, set, data: getState }}>
      {props.children}
    </Context.Provider>
  );
};

export const useForm = () => {
  return useContext(Context);
};
