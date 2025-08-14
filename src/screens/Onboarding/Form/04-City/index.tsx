import ActionButton from '#/components/ActionButton';
import CustomInput from '#/components/CustomInput';
import CustomKeyboardAvoid from '#/components/CustomKeyboardAvoid';
import CustomStatusBar from '#/components/CustomStatusBar';
import CustomView from '#/components/CustomView';
import Dropdown, { DropdownItem } from '#/components/Dropdown';
import Icon from '#/components/Icon';
import { SCREENS } from '#/constants/screens';
import { useForm } from '#/contexts/form';
import { useTranslation } from '#/contexts/translation';
import { useApi } from '#/hooks/useApi';
import { useEvents } from '#/hooks/useEvents';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, TextInput } from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from 'styled-components/native';
import { ButtonWrapper, Description, Header, Title } from '../styles';
import { DropdownWrapper } from './styles';

export type Location = {
  place_id: string;
  description: string;
};

const City: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const form = useForm();
  const theme = useTheme();
  const apiService = useApi();
  const { translate } = useTranslation();
  const { register } = useEvents();

  const inputRef = useRef<TextInput>();

  const [items, setItems] = useState<DropdownItem[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const animatedValue = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: 1 - animatedValue.value,
    marginBottom: -250 * animatedValue.value,
  }));

  const handleSubmit = () => {
    if (!form.get('placeId')) {
      setError(true);
      return;
    }

    register('user_form_navigated', {
      routeName: SCREENS.form_gender,
    });
    navigation.navigate(SCREENS.form_gender);
  };

  const handleSelectItem = (item: DropdownItem) => {
    form.set('city', item.value);
    form.set('placeId', item.id);
    handleInputBlur();
    setItems([]);
  };

  const handleFetchLocation = async (value: string) => {
    setLoading(true);

    const locations = await apiService.get<Location[]>('/place/autocomplete', {
      params: {
        input: value,
      },
    });

    setItems(
      locations.map(item => ({
        id: item.place_id,
        value: item.description,
      })),
    );

    setLoading(false);
  };

  const handleInputFocus = () => {
    animatedValue.value = withTiming(1);
  };

  const handleInputBlur = () => {
    animatedValue.value = withTiming(0);
  };

  return (
    <CustomView scrollable backgroundName="BgCity">
      <CustomStatusBar />

      <Header style={animatedStyle}>
        <Title>{translate('screen-onboarding-city-title')}</Title>
        <Description>{translate('screen-onboarding-city-text')}</Description>
      </Header>

      <CustomInput
        error={error}
        ref={inputRef}
        debounce={1.5}
        onDebounce={handleFetchLocation}
        variant="outline"
        placeholder={translate('screen-onboarding-city-placeholder')}
        value={form.get('city')}
        onChangeText={value => {
          form.set('city', value);
          setError(false);
        }}
        RightIconProps={{
          name: 'magnify',
          size: 32,
          color: theme.colors.placeholder,
        }}
        InputProps={{
          onFocus: handleInputFocus,
        }}
      />

      {loading && (
        <ActivityIndicator
          size={32}
          color={theme.colors.primary}
          style={{ marginTop: 6 }}
        />
      )}

      <DropdownWrapper>
        <Dropdown
          items={items}
          onSelectItem={handleSelectItem}
          renderIcon={
            <Icon
              iconSet="IconSax"
              name="location"
              color={theme.colors.placeholder}
              size={24}
            />
          }
        />
      </DropdownWrapper>

      <CustomKeyboardAvoid>
        <ButtonWrapper>
          <ActionButton
            text={translate('screen-onboarding-city-button')}
            onPress={handleSubmit}
          />
        </ButtonWrapper>
      </CustomKeyboardAvoid>
    </CustomView>
  );
};

export default City;
