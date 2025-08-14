import { Platform, StatusBar } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const statusBarHeight = (): number => {
  const height =
    Platform.OS === 'ios' ? getStatusBarHeight() : StatusBar.currentHeight;

  return height ?? 0;
};
