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

const Birthdate: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const form = useForm();
  const theme = useTheme();
  const { translate } = useTranslation();
  const { register } = useEvents();

  const date = useMemo(
    () => new Date(form.get('birthdate') || new Date()),
    [form],
  );

  const handleSubmit = () => {
    register('user_form_navigated', {
      routeName: SCREENS.form_birthtime,
    });
    navigation.navigate(SCREENS.form_birthtime);
  };

  return (
    <CustomView scrollable backgroundName="BgBirthdate">
      <CustomStatusBar />

      <Header>
        <Title>{translate('screen-onboarding-birthdate-title')}</Title>
        <Description>
          {translate('screen-onboarding-birthdate-text')}
        </Description>
      </Header>

      <DatePickerContainer>
        <DatePicker
          mode="date"
          date={date}
          maximumDate={new Date()}
          onDateChange={newDate => form.set('birthdate', newDate.toISOString())}
          textColor={theme.colors.primary}
          fadeToColor={theme.colors.background}
        />
      </DatePickerContainer>

      <ButtonWrapper>
        <ActionButton
          text={translate('screen-onboarding-birthdate-button')}
          onPress={handleSubmit}
        />
      </ButtonWrapper>
    </CustomView>
  );
};

export default Birthdate;
