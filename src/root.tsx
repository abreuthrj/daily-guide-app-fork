import messaging from '@react-native-firebase/messaging';
import React, { useEffect } from 'react';
import { useIAP } from 'react-native-iap';
import { usePersistor } from './contexts/persist';
import { useApi } from './hooks/useApi';
import { useAuth } from './hooks/useAuth';
import { useEvents } from './hooks/useEvents';
import { usePermissions } from './hooks/usePermissions';
import { usePurchase } from './hooks/usePurchase';
import Routes from './routes';

const Root: React.FC = () => {
  const { uploadNotificationToken } = usePermissions();
  const { data } = usePersistor();
  const {
    connected,
    getSubscriptions,
    subscriptions,
    currentPurchase,
    finishTransaction,
    getAvailablePurchases,
  } = useIAP();
  const { register } = useEvents();
  const { fetchSubscriptions } = usePurchase();
  useAuth();
  const apiService = useApi();

  useEffect(() => {
    const unsubscribeMessaging = messaging().onTokenRefresh(token => {
      console.log('[FCM TOKEN REFRESHED]');
      if (data?.user) {
        uploadNotificationToken(token);
      }
    });

    return () => {
      unsubscribeMessaging();
    };
  }, [data?.user]);

  useEffect(() => {
    if (connected) {
      getAvailablePurchases().catch(err =>
        console.log('[IAPP] Get Available Purchases', err),
      );

      if (!subscriptions?.length) {
        fetchSubscriptions();
      }
    }
  }, [connected]);

  useEffect(() => {
    if (currentPurchase) {
      const receipt = currentPurchase.transactionReceipt;

      console.log(currentPurchase);

      if (receipt) {
        (async () => {
          try {
            const response = await apiService.post('/purchase', {
              transactionReceipt: receipt,
              transactionId: currentPurchase.transactionId,
              productId: currentPurchase.productId,
            });

            if (response.success) {
              await finishTransaction({
                purchase: currentPurchase,
                isConsumable: false,
              });

              register('user_purchased_subscription', {
                productId: currentPurchase.productId,
              });
            }
          } catch (err) {
            console.log('[PURCHASE ERROR]', err);
          }
        })();
      }
    }
  }, [currentPurchase]);

  return <Routes />;
};

export default Root;
