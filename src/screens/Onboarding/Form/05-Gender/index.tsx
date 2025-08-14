import ActionButton from '#/components/ActionButton';
import CustomStatusBar from '#/components/CustomStatusBar';
import CustomView from '#/components/CustomView';
import RadioGroup from '#/components/RadioGroup';
import { SCREENS } from '#/constants/screens';
import { useForm } from '#/contexts/form';
import { useTranslation } from '#/contexts/translation';
import { useEvents } from '#/hooks/useEvents';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { ButtonWrapper, Description, Header, Title } from '../styles';

const Gender: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const form = useForm();
  const { translate } = useTranslation();
  const { register } = useEvents();

  const handleSubmit = () => {
    if (!form.get('gender')) {
      return;
    }

    register('user_form_navigated', {
      routeName: SCREENS.form_notification_time,
    });
    navigation.navigate(SCREENS.form_notification_time);
  };

  return (
    <CustomView scrollable backgroundName="BgGender">
      <CustomStatusBar />

      <Header>
        <Title>{translate('screen-onboarding-gender-title')}</Title>
        <Description>{translate('screen-onboarding-gender-text')}</Description>
      </Header>

      <RadioGroup
        value={form.get('gender')}
        onChange={item => form.set('gender', item.value)}
        items={[
          {
            label: translate('gender-female'),
            value: 'female',
          },
          {
            label: translate('gender-male'),
            value: 'male',
          },
          {
            label: translate('gender-non_binary'),
            value: 'non-binary',
          },
          {
            label: translate('gender-other'),
            value: 'other',
          },
        ]}
      />

      <ButtonWrapper>
        <ActionButton
          disabled={!form.get('gender')}
          text={translate('screen-onboarding-gender-button')}
          onPress={handleSubmit}
        />
      </ButtonWrapper>
    </CustomView>
  );
};

export default Gender;
