import { Screen } from '#/@types/navigation';
import SvgApple from '#/assets/svgs/apple.svg';
import SvgStar from '#/assets/svgs/star.svg';
import ActionButton from '#/components/ActionButton';
import CustomStatusBar from '#/components/CustomStatusBar';
import CustomView from '#/components/CustomView';
import { useTranslation } from '#/contexts/translation';
import { useAuth } from '#/hooks/useAuth';
import appleAuth from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import crashlytics from '@react-native-firebase/crashlytics';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useMemo, useState } from 'react';
import { Linking, Platform } from 'react-native';

import { useTheme } from 'styled-components/native';
import { ButtonWrapper, Star, Stars, Terms, TermsBold, Title } from './styles';

const Signin: Screen = () => {
  const theme = useTheme();
  const { translate } = useTranslation();
  const { authenticating, authenticate } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleAuthIOS = async () => {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw new Error('Apple Sign-In failed - no identify token returned');
    }

    // Create a Firebase credential from the response
    const { identityToken, nonce } = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    );

    // Sign the user in with the credential
    const credentials = await auth().signInWithCredential(appleCredential);

    console.log('[CREDENTIALS]', credentials);
    console.log('[CREDENTIALS PROVIDER DATA]', credentials.user.providerData);
  };

  const handleAuthGoogle = async () => {
    const hasPlayService = await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    if (!hasPlayService) {
      throw new Error('Play service not available');
    }

    GoogleSignin.configure({
      webClientId:
        '202379525433-ti34qlovefbcmpt6qcrennbjifm3tvnj.apps.googleusercontent.com',
      offlineAccess: false,
    });

    const { idToken } = await GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    await auth().signInWithCredential(googleCredential);
  };

  const handleSubmit = async () => {
    const { currentUser } = auth();

    setLoading(true);

    try {
      if (currentUser) {
        await authenticate(currentUser);
      } else if (Platform.OS === 'ios') {
        await handleAuthIOS();
      } else {
        await handleAuthGoogle();
      }
    } catch (err) {
      crashlytics().recordError(
        new Error(typeof err === 'string' ? err : JSON.stringify(err)),
      );
      console.log('Auth error: ' + err);
    } finally {
      setLoading(false);
    }
  };

  const getActionText = () => {
    if (loading || authenticating) {
      return translate('screen-signin-signing');
    }
    return translate(
      Platform.OS === 'ios'
        ? 'screen-signin-apple_button'
        : 'screen-signin-google_button',
    );
  };

  const handleTermsLink = (url?: string) => {
    if (!url) {
      return;
    }

    Linking.openURL(url).catch(console.log);
  };

  const getTermsText = useMemo(() => {
    const termsUrl = [
      'https://kokedama.cc/privacy',
      'https://kokedama.cc/terms',
    ];

    const pieces = translate('screen-signin-terms_privacy').split(
      /(\*[^*]+\*)/gi,
    );

    return pieces.map(piece => {
      if (piece.includes('*')) {
        return (
          <TermsBold
            key={piece}
            onPress={() => {
              handleTermsLink(termsUrl.pop());
            }}>
            {piece.replace(/\*/g, '')}
          </TermsBold>
        );
      }

      return <Terms key={piece}>{piece}</Terms>;
    });
  }, [translate]);

  const handleAuthAnonymously = async () => {
    try {
      const user = await auth().signInAnonymously();
      await authenticate(user.user);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CustomView backgroundName="BgIntro">
      <CustomStatusBar safe />

      <Title>{translate('screen-signin-title')}</Title>

      <Stars>
        {[0, 1, 2, 3, 4].map(i => (
          <Star key={i}>
            <SvgStar width={32} height={32} color="#FFAD0D" />
          </Star>
        ))}
      </Stars>

      <ButtonWrapper>
        <ActionButton
          hideActionIcon
          text={getActionText()}
          onPress={handleSubmit}
          leftIcon={<SvgApple color={theme.colors.background} />}
          loading={loading || authenticating}
        />

        {/* {ENV_MODE !== 'production' && (
          <SecondaryButton
            onPress={() => {
              handleAuthAnonymously();
            }}>
            {translate('screen-signin-button_anonymously')}
          </SecondaryButton>
        )} */}

        <Terms>{getTermsText}</Terms>
      </ButtonWrapper>
    </CustomView>
  );
};

export default Signin;
