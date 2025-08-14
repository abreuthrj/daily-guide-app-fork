import { Screen } from '#/@types/navigation';
import CustomInput from '#/components/CustomInput';
import Dropdown, { DropdownItem } from '#/components/Dropdown';
import Header from '#/components/Header';
import Icon from '#/components/Icon';
import { useTranslation } from '#/contexts/translation';
import { useApi } from '#/hooks/useApi';
import { Location } from '#/screens/Onboarding/Form/04-City';
import { ThemedScreen } from '#/theme/components/Screen';
import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';
import { ProfileSettingsParams } from '../Settings';
import { Container, DropdownWrapper } from './styles';

export type PlaceScreenParams = {
  origin: string;
  keep?: Record<string, any>;
};

const Place: Screen<PlaceScreenParams> = ({ navigation, route }) => {
  const { origin, keep } = route.params;

  const theme = useTheme();
  const apiService = useApi();
  const { translate } = useTranslation();

  const [items, setItems] = useState<DropdownItem[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [address, setAddress] = useState<string>('');

  const handleSelectItem = (item: DropdownItem) => {
    setAddress(item.value);
    setItems([]);
    navigation.navigate(origin, {
      ...(keep ?? {}),
      address: item.value,
      placeId: item.id,
    } as ProfileSettingsParams);
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

  return (
    <ThemedScreen>
      <Header goBackBehaviour />

      <Container>
        <CustomInput
          error={error}
          debounce={1.5}
          onDebounce={handleFetchLocation}
          variant="outline"
          placeholder={translate('screen-onboarding-city-placeholder')}
          value={address}
          onChangeText={value => {
            setAddress(value);
            setError(false);
          }}
          RightIconProps={{
            name: 'magnify',
            size: 32,
            color: theme.colors.placeholder,
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
            autoSize
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
      </Container>
    </ThemedScreen>
  );
};

export default Place;
