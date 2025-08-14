import { dark, theme } from '#/theme';
import React from 'react';
import {
  StatusBar,
  StatusBarProps,
  StatusBarStyle,
  useColorScheme,
} from 'react-native';
import { Safe } from './styles';

export type CustomStatusBarProps = {
  safe?: boolean;
  solid?: boolean;
};

const CustomStatusBar: React.FC<
  StatusBarProps & CustomStatusBarProps
> = props => {
  const colorScheme = useColorScheme();

  const getBackgroundColor = () => {
    if (!props.solid) {
      return '#00000000';
    }
    if (colorScheme === 'dark') {
      return dark.colors.background;
    }
    return theme.colors.background;
  };

  const getBarStyle = (): StatusBarStyle => {
    if (colorScheme === 'light') {
      return 'dark-content';
    }
    if (colorScheme === 'dark') {
      return 'light-content';
    }
    return 'default';
  };

  return (
    <>
      <StatusBar
        translucent
        barStyle={getBarStyle()}
        backgroundColor={getBackgroundColor()}
        {...props}
      />

      {props.safe && <Safe style={{}} />}
    </>
  );
};

export default CustomStatusBar;
