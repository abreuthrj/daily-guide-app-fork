import { Platform } from 'react-native';
import {
  RequestSubscriptionAndroid,
  RequestSubscriptionIOS,
  Subscription,
  SubscriptionAndroid,
  SubscriptionIOS,
  flushFailedPurchasesCachedAsPendingAndroid,
  initConnection,
  useIAP,
} from 'react-native-iap';
import { useApi } from './useApi';

export const usePurchase = () => {
  const { getSubscriptions, requestSubscription } = useIAP();
  const apiService = useApi();

  const connect = async (): Promise<boolean> => {
    return await initConnection();
  };

  const fetchSubscriptions = async () => {
    try {
      if (Platform.OS === 'android') {
        await flushFailedPurchasesCachedAsPendingAndroid();
      }
      const skus = await apiService.get('/purchase/skus');
      await getSubscriptions({ skus });
    } catch (err) {
      console.log('[IAP SUBSCRIPTIONS]', err);
    }
  };

  const purchase = async (subscriptions: Subscription[]) => {
    if (Platform.OS === 'ios') {
      const subscription = subscriptions[0] as SubscriptionIOS;

      requestSubscription({
        sku: subscription.productId,
        andDangerouslyFinishTransactionAutomaticallyIOS: false,
      } as RequestSubscriptionIOS);
    } else {
      const subscription = subscriptions[0] as SubscriptionAndroid;

      requestSubscription({
        sku: subscription.productId,
        subscriptionOffers: subscription.subscriptionOfferDetails?.map(
          offer => ({
            sku: subscription.productId,
            offerToken: offer.offerToken,
          }),
        ),
      } as RequestSubscriptionAndroid);
    }
  };

  return {
    fetchSubscriptions,
    connect,
    purchase,
  };
};
