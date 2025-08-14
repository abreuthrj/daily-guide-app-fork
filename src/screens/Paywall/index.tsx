import IconBiorhythm from '#/assets/icons/biorhythm.svg';
import IconHoroscope from '#/assets/icons/horoscope.svg';
import IconIA from '#/assets/icons/ia.svg';
import IconNumerology from '#/assets/icons/numerology.svg';
import IconRecommendations from '#/assets/icons/recommendations.svg';
import SvgSafe from '#/assets/svgs/safe.svg';
import ActionButton from '#/components/ActionButton';
import CustomStatusBar from '#/components/CustomStatusBar';
import CustomView from '#/components/CustomView';
import TagHandler from '#/components/TagHandler';
import { SCREENS } from '#/constants/screens';
import { useTranslation } from '#/contexts/translation';
import { useApi } from '#/hooks/useApi';
import { usePurchase } from '#/hooks/usePurchase';
import { tselector } from '#/utils/translation';
import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Linking, Platform } from 'react-native';
import { SubscriptionAndroid, SubscriptionIOS, useIAP } from 'react-native-iap';
import { useTheme } from 'styled-components/native';
import {
  Benefit,
  BenefitIconWrapper,
  BenefitText,
  Benefits,
  ButtonWrapper,
  Price,
  Protection,
  ProtectionIconWrapper,
  ProtectionText,
  Right,
  RightSeparator,
  RightText,
  SubscriptionFrequencyText,
  SubscriptionText,
  Title,
  UserRights,
} from './styles';

const Paywall: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const theme = useTheme();
  const {
    subscriptions,
    requestSubscription,
    currentPurchase,
    currentPurchaseError,
    availablePurchases,
  } = useIAP();
  const { purchase } = usePurchase();
  const apiService = useApi();
  const isFocused = useIsFocused();
  const { translate } = useTranslation();

  const [loading, setLoading] = useState(false);

  const benefits = [
    {
      title: translate('subscription-benefits-01'),
      icon: IconHoroscope,
    },
    {
      title: translate('subscription-benefits-02'),
      icon: IconNumerology,
    },
    {
      title: translate('subscription-benefits-03'),
      icon: IconBiorhythm,
    },
    {
      title: translate('subscription-benefits-04'),
      icon: IconRecommendations,
    },
    {
      title: translate('subscription-benefits-05'),
      icon: IconIA,
    },
  ];

  useEffect(() => {
    if (subscriptions.length > 0 && isFocused) {
      setLoading(true);

      setTimeout(() => {
        purchase(subscriptions);
      }, 200);
    }
  }, [subscriptions, isFocused]);

  useEffect(() => {
    if (currentPurchaseError || currentPurchase?.transactionReceipt) {
      setLoading(false);
    }
  }, [currentPurchaseError, currentPurchase]);

  const handleSubmit = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: SCREENS.story }],
    });
  };

  const handleRetrievePurchase = async () => {
    const subscribed = availablePurchases.find(
      p => p.productId === subscriptions[0].productId,
    );

    if (subscribed) {
      await apiService.post(`/purchase/recover`, {
        productId: subscribed.productId,
        transactionReceipt: subscribed.transactionReceipt,
      });

      handleSubmit();
    }
  };

  const subscriptionPrice =
    Platform.OS === 'ios'
      ? (subscriptions[0] as SubscriptionIOS)?.localizedPrice
      : (subscriptions[0] as SubscriptionAndroid)?.subscriptionOfferDetails[0]
          ?.pricingPhases.pricingPhaseList[0].formattedPrice;

  return (
    <CustomView scrollable backgroundName="BgPaywall">
      <CustomStatusBar safe />

      <Title>{translate('screen-paywall-title')}</Title>

      <Benefits>
        {benefits.map((benefit, i) => (
          <Benefit key={i}>
            <BenefitIconWrapper>
              <benefit.icon
                width={20}
                height={20}
                color={theme.colors.placeholder}
              />
            </BenefitIconWrapper>
            <BenefitText>{benefit.title}</BenefitText>
          </Benefit>
        ))}
      </Benefits>

      <TagHandler
        parentComponent={SubscriptionText}
        value={tselector(
          translate('screen-paywall-subscription_plan').replace(
            '$price',
            subscriptionPrice,
          ),
          subscriptionPrice ? 'success' : 'fail',
        )}
        extract={[{ tag: 'number', component: Price }]}
      />

      <SubscriptionFrequencyText>
        {translate('screen-paywall-billing_frequency')}
      </SubscriptionFrequencyText>

      <ButtonWrapper>
        <ActionButton
          text={loading ? 'Loading...' : 'Continue'}
          onPress={handleSubmit}
          loading={loading}
        />
      </ButtonWrapper>

      <Protection>
        <ProtectionIconWrapper>
          <SvgSafe
            width="100%"
            height="100%"
            color={theme.colors.placeholder}
          />
        </ProtectionIconWrapper>
        <ProtectionText>
          {tselector(translate('screen-paywall-protection'), Platform.OS)}
        </ProtectionText>
      </Protection>

      <UserRights>
        <Right onPress={handleRetrievePurchase}>
          <RightText>{translate('screen-paywall-restore')}</RightText>
        </Right>
        <RightSeparator>/</RightSeparator>
        <Right
          onPress={() => {
            Linking.openURL('https://kokedama.cc/terms').catch(console.log);
          }}>
          <RightText>{translate('screen-paywall-terms')}</RightText>
        </Right>
        <RightSeparator>/</RightSeparator>
        <Right
          onPress={() => {
            Linking.openURL('https://kokedama.cc/privacy').catch(console.log);
          }}>
          <RightText>{translate('screen-paywall-privacy')}</RightText>
        </Right>
      </UserRights>
    </CustomView>
  );
};

export default Paywall;
