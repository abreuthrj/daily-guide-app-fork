import { SCREENS } from '#/constants/screens';
import { useEvents } from '#/hooks/useEvents';
import Paywall from '#/screens/Paywall';
import Profile from '#/screens/Profile';
import Place from '#/screens/Profile/Place';
import Settings from '#/screens/Profile/Settings';
import Signin from '#/screens/Signin';
import Story from '#/screens/Story';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import FormRoutes from './form';

const Stack = createStackNavigator();

const Routes: React.FC = () => {
  const { register } = useEvents();

  const noHeaderOptions: StackNavigationOptions = {
    headerShown: false,
  };

  return (
    <Stack.Navigator initialRouteName={SCREENS.signin}>
      <Stack.Screen
        name={SCREENS.signin}
        component={Signin as any}
        options={noHeaderOptions}
      />
      <Stack.Screen
        name={SCREENS.form}
        component={FormRoutes as any}
        options={noHeaderOptions}
      />

      <Stack.Screen
        name={SCREENS.paywall}
        component={Paywall as any}
        options={noHeaderOptions}
      />
      <Stack.Screen
        name={SCREENS.story}
        component={Story as any}
        options={noHeaderOptions}
      />
      <Stack.Screen
        name={SCREENS.profile}
        component={Profile as any}
        options={noHeaderOptions}
      />
      <Stack.Screen
        name={SCREENS.profile_settings}
        component={Settings as any}
        options={noHeaderOptions}
      />
      <Stack.Screen
        name={SCREENS.profile_place}
        component={Place as any}
        options={noHeaderOptions}
      />
    </Stack.Navigator>
  );
};

export default Routes;
