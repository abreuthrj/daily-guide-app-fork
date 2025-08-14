import { Screen } from '#/@types/navigation';
import { SCREENS } from '#/constants/screens';
import { STORAGE } from '#/constants/storage';
import { FormContext, FormType } from '#/contexts/form';
import Analyzing from '#/screens/Onboarding/Analyzing';
import Name from '#/screens/Onboarding/Form/01-Name';
import Birthdate from '#/screens/Onboarding/Form/02-Birthdate';
import Birthtime from '#/screens/Onboarding/Form/03-Birthtime';
import City from '#/screens/Onboarding/Form/04-City';
import Gender from '#/screens/Onboarding/Form/05-Gender';
import NotificationTime from '#/screens/Onboarding/Form/06-NotificationTime';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';

export type FormParams = {
  name?: string;
};

const Stack = createStackNavigator();

const FormRoutes: Screen = () => {
  const [ready, setReady] = useState<{
    formData: FormType;
    initialScreenName: string;
  }>();

  const noHeaderOptions: StackNavigationOptions = {
    headerShown: false,
  };

  const getInitialScreenName = (data: FormType) => {
    console.log('[INITIAL DATA]', data);
    let initialScreenName = SCREENS.analyzing;

    if (!data.notificationTime) {
      initialScreenName = SCREENS.form_notification_time;
    }
    if (!data.gender) {
      initialScreenName = SCREENS.form_gender;
    }
    if (!data.placeId) {
      initialScreenName = SCREENS.form_city;
    }
    if (!data.birthtime) {
      initialScreenName = SCREENS.form_birthtime;
    }
    if (!data.birthdate) {
      initialScreenName = SCREENS.form_birthdate;
    }
    // if (!data.name) {
    initialScreenName = SCREENS.form_name;
    // }

    return initialScreenName;
  };

  useEffect(() => {
    (async () => {
      try {
        const rawData = await AsyncStorage.getItem(STORAGE.onboarding);

        if (!rawData) {
          throw new Error('No data kept');
        }

        const data = JSON.parse(rawData) as FormType;
        const initialScreenName = getInitialScreenName(data);

        setReady({
          formData: data,
          initialScreenName,
        });
      } catch (err) {
        setReady({
          formData: {},
          initialScreenName: SCREENS.form_name,
        });
      }
    })();
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <FormContext value={ready.formData}>
      <Stack.Navigator initialRouteName={ready.initialScreenName}>
        <Stack.Screen
          name={SCREENS.form_name}
          component={Name}
          options={noHeaderOptions}
        />
        <Stack.Screen
          name={SCREENS.form_birthdate}
          component={Birthdate}
          options={noHeaderOptions}
        />
        <Stack.Screen
          name={SCREENS.form_birthtime}
          component={Birthtime}
          options={noHeaderOptions}
        />
        <Stack.Screen
          name={SCREENS.form_city}
          component={City}
          options={noHeaderOptions}
        />
        <Stack.Screen
          name={SCREENS.form_gender}
          component={Gender}
          options={noHeaderOptions}
        />
        <Stack.Screen
          name={SCREENS.form_notification_time}
          component={NotificationTime}
          options={noHeaderOptions}
        />
        <Stack.Screen
          name={SCREENS.analyzing}
          component={Analyzing}
          options={noHeaderOptions}
        />
      </Stack.Navigator>
    </FormContext>
  );
};

export default FormRoutes;
