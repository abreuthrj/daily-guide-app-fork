import { User } from '#/@types/api/User';
import { Screen } from '#/@types/navigation';
import ProfileCoverImage from '#/assets/mock/profile-cover.png';
import NumerologySvg from '#/assets/svgs/numerology.svg';
import PersonalitySvg from '#/assets/svgs/personality.svg';
import MoonSignSvg from '#/assets/svgs/sign-moon.svg';
import SunSignSvg from '#/assets/svgs/sign-sun.svg';
import CustomStatusBar from '#/components/CustomStatusBar';
import Icon from '#/components/Icon';
import { SCREENS } from '#/constants/screens';
import { usePersistor } from '#/contexts/persist';
import { useTranslation } from '#/contexts/translation';
import { useApi } from '#/hooks/useApi';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { useTheme } from 'styled-components/native';
import { ProfileSettingsParams } from './Settings';
import {
  About,
  Card,
  CardDescription,
  CardHeader,
  CardIcon,
  CardTitle,
  Cover,
  Name,
  PictureWrapper,
  ProfilePicture,
  Scrollable,
  SolidStatusBar,
} from './styles';

const Profile: Screen = ({ navigation }) => {
  const theme = useTheme();
  const { data } = usePersistor();
  const apiService = useApi();
  const { translate } = useTranslation();

  const [userInfo, setUserInfo] = useState<User>();
  const [solidStatusBar, setSolidStatusBar] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      (async () => {
        const me = await apiService.get('/user/me');

        setUserInfo(me);
      })();
    }
  }, [isFocused]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (event.nativeEvent.contentOffset.y >= 180 && !solidStatusBar) {
      setSolidStatusBar(true);
    } else if (event.nativeEvent.contentOffset.y < 180 && solidStatusBar) {
      setSolidStatusBar(false);
    }
  };

  const handlePicturePress = () => {
    if (!userInfo) {
      return;
    }

    navigation.navigate(SCREENS.profile_settings, {
      user: userInfo,
    } as ProfileSettingsParams);
  };

  return (
    <>
      <CustomStatusBar />
      <Scrollable
        onScroll={handleScroll}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={300}>
        <Cover source={ProfileCoverImage} />

        <PictureWrapper onPress={handlePicturePress}>
          {data.user?.photoURL ? (
            <ProfilePicture source={{ uri: data.user.photoURL }} />
          ) : (
            <Icon
              name="account"
              color="gray"
              iconSet="MaterialCommunityIcons"
              size={64}
            />
          )}
        </PictureWrapper>

        <Name>{data.user?.displayName}</Name>

        {!!data.user?.bio && <About>{data.user.bio}</About>}

        {userInfo?.attributes?.map(attr => (
          <Card key={attr.id}>
            <CardHeader>
              <CardIcon>
                {attr.slug === 'personality' ? (
                  <PersonalitySvg
                    width="100%"
                    height="100%"
                    color={theme.colors.primary}
                  />
                ) : attr.slug === 'sun' ? (
                  <SunSignSvg
                    width="100%"
                    height="100%"
                    color={theme.colors.primary}
                  />
                ) : attr.slug === 'moon' ? (
                  <MoonSignSvg
                    width="100%"
                    height="100%"
                    color={theme.colors.primary}
                  />
                ) : (
                  <NumerologySvg
                    width="100%"
                    height="100%"
                    color={theme.colors.primary}
                  />
                )}
              </CardIcon>
              <CardTitle>{translate(attr.title)}</CardTitle>
            </CardHeader>
            <CardDescription>{attr.value}</CardDescription>
          </Card>
        ))}
      </Scrollable>

      {solidStatusBar && <SolidStatusBar />}
    </>
  );
};

export default Profile;
