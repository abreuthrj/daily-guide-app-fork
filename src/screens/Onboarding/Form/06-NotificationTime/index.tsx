import ActionButton from '#/components/ActionButton';
import CustomStatusBar from '#/components/CustomStatusBar';
import CustomView from '#/components/CustomView';
import { SCREENS } from '#/constants/screens';
import { useForm } from '#/contexts/form';

import { useTranslation } from '#/contexts/translation';
import { useEvents } from '#/hooks/useEvents';
import { usePermissions } from '#/hooks/usePermissions';
import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useMemo } from 'react';
import { AppState } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useTheme } from 'styled-components/native';
import {
  ButtonWrapper,
  DatePickerContainer,
  Description,
  Header,
  Title,
} from '../styles';

const NotificationTime: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const form = useForm();
  const theme = useTheme();
  const { translate } = useTranslation();
  const { verifyNotificationPermission } = usePermissions();
  const { register } = useEvents();

  const isFocused = useIsFocused();

  const date = useMemo(
    () => new Date(form.get('notificationTime') || null),
    [form],
  );

  useEffect(() => {
    if (isFocused) {
      verifyNotificationPermission();

      const appStateChangeListener = AppState.addEventListener(
        'change',
        appState => {
          if (appState === 'active') {
            verifyNotificationPermission();
          }
        },
      );

      return () => {
        appStateChangeListener.remove();
      };
    }
  }, [isFocused]);

  const handleSubmit = async () => {
    if (await verifyNotificationPermission()) {
      register('user_form_navigated', {
        routeName: SCREENS.analyzing,
      });
      navigation.navigate(SCREENS.analyzing);
    }
  };

  return (
    <CustomView scrollable backgroundName="BgListenNotification">
      <CustomStatusBar />

      <Header>
        <Title>{translate('screen-onboarding-notification_time-title')}</Title>
        <Description>
          {translate('screen-onboarding-notification_time-text')}
        </Description>
      </Header>

      <DatePickerContainer>
        <DatePicker
          mode="time"
          minuteInterval={30}
          date={date}
          onDateChange={newDate =>
            form.set('notificationTime', newDate.toISOString())
          }
          textColor={theme.colors.primary}
          fadeToColor={theme.colors.background}
        />
      </DatePickerContainer>

      <ButtonWrapper>
        <ActionButton
          text={translate('screen-onboarding-notification_time-button')}
          onPress={handleSubmit}
        />
      </ButtonWrapper>
    </CustomView>
  );
};

export default NotificationTime;
