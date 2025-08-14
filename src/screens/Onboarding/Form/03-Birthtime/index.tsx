import ActionButton from '#/components/ActionButton';
import CustomStatusBar from '#/components/CustomStatusBar';
import CustomView from '#/components/CustomView';
import { SCREENS } from '#/constants/screens';
import { useForm } from '#/contexts/form';
import { useTranslation } from '#/contexts/translation';
import { useEvents } from '#/hooks/useEvents';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useMemo } from 'react';
import DatePicker from 'react-native-date-picker';
import { useTheme } from 'styled-components/native';
import {
  ButtonWrapper,
  DatePickerContainer,
  Description,
  Header,
  Title,
} from '../styles';

const Birthtime: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const form = useForm();
  const theme = useTheme();
  const { translate } = useTranslation();
  const { register } = useEvents();

  const date = useMemo(() => new Date(form.get('birthtime') || null), [form]);

  const handleSubmit = () => {
    if (!form.get('birthtime')) {
      form.set('birthtime', new Date().toString());
    }

    register('user_form_navigated', {
      routeName: SCREENS.form_city,
    });
    navigation.navigate(SCREENS.form_city);
  };

  const handleDateChange = (newDate: Date) => {
    date.setHours(newDate.getHours());
    date.setMinutes(newDate.getMinutes());

    form.set('birthtime', date);
  };

  return (
    <CustomView scrollable backgroundName="BgBirthtime">
      <CustomStatusBar />

      <Header>
        <Title>{translate('screen-onboarding-birthtime-title')}</Title>
        <Description>
          {translate('screen-onboarding-birthtime-text')}
        </Description>
      </Header>

      <DatePickerContainer>
        <DatePicker
          mode="time"
          date={date}
          onDateChange={handleDateChange}
          textColor={theme.colors.primary}
          fadeToColor={theme.colors.background}
        />
      </DatePickerContainer>

      <ButtonWrapper>
        <ActionButton
          text={translate('screen-onboarding-birthtime-button')}
          onPress={handleSubmit}
        />
      </ButtonWrapper>
    </CustomView>
  );
};

export default Birthtime;
