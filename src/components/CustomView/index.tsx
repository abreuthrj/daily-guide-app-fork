import React from 'react';
import { ViewProps, useColorScheme } from 'react-native';
import { Background, BackgroundImage, Screen, ScrollScreen } from './styles';

import DarkBgAnalyzing from '#/assets/background/dark/analyzing.png';
import DarkBgBiorythm from '#/assets/background/dark/biorythm.png';
import DarkBgBirthdate from '#/assets/background/dark/birthdate.png';
import DarkBgBirthtime from '#/assets/background/dark/birthtime.png';
import DarkBgCity from '#/assets/background/dark/city.png';
import DarkBgDonts from '#/assets/background/dark/donts.png';
import DarkBgDos from '#/assets/background/dark/dos.png';
import DarkBgGender from '#/assets/background/dark/gender.png';
import DarkBgHoroscope from '#/assets/background/dark/horoscope.png';
import DarkBgIntro from '#/assets/background/dark/intro.png';
import DarkBgListenReadWatch from '#/assets/background/dark/listen-read-watch.png';
import DarkBgListenNameConfirm from '#/assets/background/dark/name-confirm.png';
import DarkBgListenNotification from '#/assets/background/dark/notification.png';
import {
  default as DarkBgListenPaywall,
  default as DarkBgPaywall,
} from '#/assets/background/dark/paywall.png';
import DarkBgListenToday from '#/assets/background/dark/today.png';
import DarkBgListenTune from '#/assets/background/dark/tune.png';

import LightBgAnalyzing from '#/assets/background/light/analyzing.png';
import LightBgBiorythm from '#/assets/background/light/biorythm.png';
import LightBgBirthdate from '#/assets/background/light/birthdate.png';
import LightBgBirthtime from '#/assets/background/light/birthtime.png';
import LightBgCity from '#/assets/background/light/city.png';
import LightBgDonts from '#/assets/background/light/donts.png';
import LightBgDos from '#/assets/background/light/dos.png';
import LightBgGender from '#/assets/background/light/gender.png';
import LightBgHoroscope from '#/assets/background/light/horoscope.png';
import LightBgIntro from '#/assets/background/light/intro.png';
import LightBgListenReadWatch from '#/assets/background/light/listen-read-watch.png';
import LightBgListenNameConfirm from '#/assets/background/light/name-confirm.png';
import LightBgListenNotification from '#/assets/background/light/notification.png';
import {
  default as LightBgListenPaywall,
  default as LightBgPaywall,
} from '#/assets/background/light/paywall.png';
import LightBgListenToday from '#/assets/background/light/today.png';
import LightBgListenTune from '#/assets/background/light/tune.png';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const background = {
  dark: {
    BgAnalyzing: DarkBgAnalyzing,
    BgBiorythm: DarkBgBiorythm,
    BgBirthdate: DarkBgBirthdate,
    BgBirthtime: DarkBgBirthtime,
    BgDonts: DarkBgDonts,
    BgDos: DarkBgDos,
    BgHoroscope: DarkBgHoroscope,
    BgIntro: DarkBgIntro,
    BgListenReadWatch: DarkBgListenReadWatch,
    BgListenNameConfirm: DarkBgListenNameConfirm,
    BgListenNotification: DarkBgListenNotification,
    BgListenPaywall: DarkBgListenPaywall,
    BgListenToday: DarkBgListenToday,
    BgListenTune: DarkBgListenTune,
    BgCity: DarkBgCity,
    BgGender: DarkBgGender,
    BgPaywall: DarkBgPaywall,
  },
  light: {
    BgAnalyzing: LightBgAnalyzing,
    BgBiorythm: LightBgBiorythm,
    BgBirthdate: LightBgBirthdate,
    BgBirthtime: LightBgBirthtime,
    BgDonts: LightBgDonts,
    BgDos: LightBgDos,
    BgHoroscope: LightBgHoroscope,
    BgIntro: LightBgIntro,
    BgListenReadWatch: LightBgListenReadWatch,
    BgListenNameConfirm: LightBgListenNameConfirm,
    BgListenNotification: LightBgListenNotification,
    BgListenPaywall: LightBgListenPaywall,
    BgListenToday: LightBgListenToday,
    BgListenTune: LightBgListenTune,
    BgCity: LightBgCity,
    BgGender: LightBgGender,
    BgPaywall: LightBgPaywall,
  },
};

export type CustomViewProps = {
  backgroundName?: keyof (typeof background)[keyof typeof background];
  source?: string;
  children?: React.ReactNode;
  scrollable?: boolean;
  ViewProps?: ViewProps;
  noPadding?: boolean;
};

const CustomView: React.FC<CustomViewProps> = props => {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  const backgroundScheme = background[colorScheme as keyof typeof background];

  const hasBackground = () => {
    return (
      (props.backgroundName && backgroundScheme[props.backgroundName]) ||
      props.source
    );
  };

  const getBackground = () => {
    return props.source
      ? { uri: props.source }
      : backgroundScheme[props.backgroundName as keyof typeof backgroundScheme];
  };

  if (props.scrollable) {
    if (hasBackground()) {
      return (
        <React.Fragment>
          <ScrollScreen
            withPadding={false}
            bounces={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentInset={{ bottom: insets.bottom }}
            {...props.ViewProps}>
            <BackgroundImage source={getBackground()}></BackgroundImage>
            <Background>{props.children}</Background>
          </ScrollScreen>
        </React.Fragment>
      );
    }

    return (
      <ScrollScreen
        withPadding={!props.noPadding}
        contentInset={{ bottom: insets.bottom }}>
        {props.children}
      </ScrollScreen>
    );
  }

  return (
    <Screen withPadding={!props.backgroundName} {...props.ViewProps}>
      {hasBackground() ? (
        <React.Fragment>
          <BackgroundImage source={getBackground()} />
          <Background>{props.children}</Background>
        </React.Fragment>
      ) : (
        props.children
      )}
    </Screen>
  );
};

export default CustomView;
