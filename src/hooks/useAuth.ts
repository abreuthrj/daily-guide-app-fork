import { User } from '#/@types/api/User';
import { SCREENS } from '#/constants/screens';
import { usePersistor } from '#/contexts/persist';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import crashlytics from '@react-native-firebase/crashlytics';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { useApi } from './useApi';
import { useEvents } from './useEvents';
import { usePermissions } from './usePermissions';
import { STORAGE, useStorage } from './useStorage';

let _flag = false;

export const useAuth = () => {
  const { persist, data } = usePersistor();
  const { setStorage } = useStorage();
  const navigation = useNavigation<any>();
  const apiService = useApi();
  const { verifyNotificationPermission } = usePermissions();
  const { register } = useEvents();

  const [authenticating, setAuthenticating] = useState(false);

  useEffect(() => {
    // if (!auth().currentUser && !data?.user) {
    //   SplashScreen.hide();
    // }

    const removeAuthSubscriber = auth().onAuthStateChanged(user => {
      handleAuthStateChange(user);
    });

    setTimeout(() => {
      SplashScreen.hide();
    }, 10000);

    return () => {
      removeAuthSubscriber();
    };
  }, []);

  const uploadUserData = async (
    idToken: string | null,
    firebaseUser: FirebaseAuthTypes.User,
  ): Promise<User> => {
    console.log('[FIREBASE USER]', firebaseUser);
    console.log('[FIREBASE PROVIDERS]', firebaseUser.providerData);

    const data = {
      photoURL: firebaseUser.photoURL,
    };

    firebaseUser.providerData.forEach(providerData => {
      data.photoURL = providerData.photoURL || data.photoURL;
    });

    const user = await apiService.post<User>('/auth', {
      firebaseToken: idToken,
      isAnonymous: firebaseUser.isAnonymous,
      ...data,
    });

    return user;
  };

  const decideAndNavigate = (user: User) => {
    // console.log('[AUTH STATE CHANGE] Deciding');

    if (!user) {
      return;
    }

    // console.log('[AUTH STATE CHANGE] Navigating');

    if (user.notificationTime) {
      if (user.subscribed) {
        navigation.reset({
          index: 0,
          routes: [{ name: SCREENS.story }],
        });
      } else {
        navigation.reset({ index: 0, routes: [{ name: SCREENS.paywall }] });
      }
    } else {
      navigation.reset({ index: 0, routes: [{ name: SCREENS.form }] });
    }
  };

  const logoutUser = async () => {
    await persist({ user: undefined });

    if (
      navigation.getState().routes[navigation.getState().index].name !==
      SCREENS.signin
    ) {
      navigation.reset({
        index: 0,
        routes: [{ name: SCREENS.signin }],
      });
    }

    register('user_logged_out');
    setAuthenticating(false);
    SplashScreen.hide();
  };

  const handleAuthStateChange = async (
    firebaseUser: FirebaseAuthTypes.User | null,
  ) => {
    // console.log('[AUTH STATE CHANGE] Enter');

    if (!firebaseUser) {
      // console.log('[AUTH STATE CHANGE] Not user');
      await logoutUser();
      return;
    }

    if (_flag) {
      // console.log('[AUTH STATE CHANGE] Flag');
      return;
    }

    _flag = true;

    setAuthenticating(true);

    try {
      // console.log('[AUTH STATE CHANGE] Logging');

      const idToken = await firebaseUser.getIdToken();
      // console.log('[AUTH STATE CHANGE] Id token');
      const user = await uploadUserData(idToken, firebaseUser);
      // console.log('[AUTH STATE CHANGE] Uploaded user data');

      await persist({ user });
      // console.log('[AUTH STATE CHANGE] Persisted user');

      await setStorage(STORAGE.USER_TOKEN, {
        token: user.token,
        refreshToken: user.refreshToken,
      });
      // console.log('[AUTH STATE CHANGE] Setted storage');

      register('user_logged_in');
      decideAndNavigate(user);
    } catch (err) {
      // console.log('[AUTH STATE CHANGE] Error', err);

      crashlytics().recordError(
        new Error(typeof err === 'string' ? err : JSON.stringify(err)),
      );
    }

    _flag = false;
    setAuthenticating(false);
    SplashScreen.hide();

    setTimeout(() => {
      verifyNotificationPermission();
    }, 500);
  };

  return {
    authenticating,
    authenticate: handleAuthStateChange,
  };
};
