import ActionButton from '#/components/ActionButton';
import CustomInput from '#/components/CustomInput';
import CustomKeyboardAvoid from '#/components/CustomKeyboardAvoid';
import CustomStatusBar from '#/components/CustomStatusBar';
import CustomView from '#/components/CustomView';
import { SCREENS } from '#/constants/screens';
import { useForm } from '#/contexts/form';
import { useTranslation } from '#/contexts/translation';
import { useEvents } from '#/hooks/useEvents';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { ButtonWrapper, Description, Header, Title } from '../styles';

const Name: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const form = useForm();
  const { translate } = useTranslation();
  const { register } = useEvents();

  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (!form.get('name')) {
      setError(true);
      return;
    }

    register('user_form_navigated', {
      routeName: SCREENS.form_birthdate,
    });
    navigation.navigate(SCREENS.form_birthdate);
  };

  return (
    <CustomView scrollable backgroundName="BgListenNameConfirm">
      <CustomStatusBar />

      <Header>
        <Title style={{ textAlign: 'left' }}>
          {translate('screen-onboarding-name-title')}
        </Title>
        <Description style={{ textAlign: 'left' }}>
          {translate('screen-onboarding-name-text')}
        </Description>
      </Header>

      <CustomInput
        value={form.get('name')}
        error={error}
        onChangeText={value => {
          form.set('name', value);
          setError(false);
        }}
        placeholder={translate('screen-onboarding-name-placeholder')}
      />

      <CustomKeyboardAvoid>
        <ButtonWrapper>
          <ActionButton
            text={translate('screen-onboarding-name-button')}
            onPress={handleSubmit}
          />
        </ButtonWrapper>
      </CustomKeyboardAvoid>
    </CustomView>
  );
};

export default Name;
