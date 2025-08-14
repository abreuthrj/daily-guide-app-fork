import { User } from '#/@types/api/User';
import { Screen } from '#/@types/navigation';
import CustomKeyboardAvoid from '#/components/CustomKeyboardAvoid';
import CustomStatusBar from '#/components/CustomStatusBar';
import Header from '#/components/Header';
import { SCREENS } from '#/constants/screens';
import { useTranslation } from '#/contexts/translation';
import { useApi } from '#/hooks/useApi';
import { useScrollSteps } from '#/hooks/useScrollSteps';
import auth from '@react-native-firebase/auth';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Keyboard } from 'react-native';
import { PlaceScreenParams } from '../Place';
import ProfileButton from './Button';
import ProfileInput from './Input';
import { Container, ProfilePicture, ScrollArea, SectionTitle } from './styles';

export type ProfileSettingsParams = {
  user: User;
  placeId?: string;
  address?: string;
};

const Settings: Screen<ProfileSettingsParams> = ({ navigation, route }) => {
  const { user, ...update } = route.params;

  const { translate } = useTranslation();
  const setupScroll = useScrollSteps([12]);
  const apiService = useApi();
  const isFocused = useIsFocused();

  const [name, setName] = useState<string>(user.displayName || '');
  const [birthdate, setBirthdate] = useState<string>(user.birthdate || '');
  const [birthtime, setBirthtime] = useState<string>(user.birthdate || '');
  const [address, setAddress] = useState<string>(user.address || '');
  const [placeId, setPlaceId] = useState<string>(user.placeId);
  const [notificationTime, setNotificationTime] = useState<string>(
    user.notificationTime || '',
  );
  const [scrolled, setScrolled] = useState(false);

  const scrollProps = setupScroll(
    () => {
      setScrolled(true);
    },
    null,
    () => {
      setScrolled(false);
    },
  );

  const handleUpdateChanges = async () => {
    const dateOfBirth = new Date(birthdate);
    const timeOfBirth = new Date(birthtime);

    dateOfBirth.setHours(timeOfBirth.getHours());
    dateOfBirth.setMinutes(timeOfBirth.getMinutes());

    const diffs = [
      name !== user.displayName,
      dateOfBirth.toISOString() !== user.birthdate,
      placeId !== user.placeId,
      notificationTime !== user.notificationTime,
    ];

    if (diffs.some(diff => diff)) {
      const data = {
        displayName: name,
        dateOfBirth: dateOfBirth.toISOString(),
        notificationTime: notificationTime,
        placeId,
      };

      return new Promise<boolean>(resolve => {
        Alert.alert(
          translate('screen-profile_settings-confirm_title'),
          translate('screen-profile_settings-confirm_message'),
          [
            {
              text: translate('screen-profile_settings-confirm_button'),
              onPress: () => {
                apiService.put('/user', data);
                resolve(true);
              },
            },
            {
              text: translate('screen-profile_settings-cancel_button'),
              onPress: () => {
                resolve(true);
              },
            },
          ],
        );
      });
    }

    return true;
  };

  useEffect(() => {
    if (!isFocused) {
      return;
    }

    if (update?.placeId && update?.address) {
      setPlaceId(update.placeId);
      setAddress(update.address);
      navigation.setParams({
        user,
        address: null,
        placeId: null,
      });
    }
  }, [isFocused]);

  return (
    <React.Fragment>
      <CustomStatusBar />

      <CustomKeyboardAvoid>
        <Container>
          <Header
            safe
            goBackBehaviour
            leftAction={handleUpdateChanges}
            title={translate('screen-profile_settings-ttle')}
            displayBorder={scrolled}
          />

          <ScrollArea {...scrollProps}>
            <ProfilePicture source={{ uri: user.photoURL }} />

            <SectionTitle>
              {translate('screen-profile_settings-profile_section')}
            </SectionTitle>
            <ProfileInput
              name={translate('screen-profile_settings-field_name')}
              value={name}
              onChange={setName}
              placeholder={translate(
                'screen-profile_settings-placeholder_name',
              )}
            />
            <ProfileInput
              type="date"
              name={translate('screen-profile_settings-field_birthdate')}
              value={birthdate}
              onChange={setBirthdate}
              placeholder={translate(
                'screen-profile_settings-placeholder_birthdate',
              )}
            />
            <ProfileInput
              type="time"
              name={translate('screen-profile_settings-field_birthtime')}
              value={birthtime}
              onChange={setBirthtime}
              placeholder={translate(
                'screen-profile_settings-placeholder_birthtime',
              )}
            />
            <ProfileInput
              name={translate('screen-profile_settings-field_place')}
              value={address}
              onFocus={() => {
                Keyboard.dismiss();
                navigation.navigate(SCREENS.profile_place, {
                  origin: SCREENS.profile_settings,
                  keep: { user },
                } as PlaceScreenParams);
              }}
              placeholder={translate(
                'screen-profile_settings-placeholder_place',
              )}
            />

            <SectionTitle></SectionTitle>
            <ProfileInput
              type="time"
              name={translate('screen-profile_settings-field_notification')}
              value={notificationTime}
              onChange={setNotificationTime}
              placeholder={translate(
                'screen-profile_settings-placeholder_notification',
              )}
            />

            <SectionTitle>
              {translate('screen-profile_settings-about_section')}
            </SectionTitle>

            <ProfileButton
              name={translate('screen-profile_settings-button_feedback')}
            />
            <ProfileButton
              name={translate('screen-profile_settings-button_terms')}
            />
            <ProfileButton
              name={translate('screen-profile_settings-button_privacy')}
            />

            <SectionTitle></SectionTitle>
            <ProfileButton
              name={translate('screen-profile_settings-button_logout')}
              onPress={() => {
                auth().signOut();
              }}
            />

            <SectionTitle></SectionTitle>
          </ScrollArea>
        </Container>
      </CustomKeyboardAvoid>
    </React.Fragment>
  );
};

export default Settings;
