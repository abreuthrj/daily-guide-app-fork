/* eslint-disable react-hooks/exhaustive-deps */
import { ERR_TYPE } from '#/@types/api/errors';
import IconBiorhythm from '#/assets/icons/biorhythm.svg';
import IconHoroscope from '#/assets/icons/horoscope.svg';
import IconIA from '#/assets/icons/ia.svg';
import IconShare from '#/assets/icons/next.svg';
import IconNumerology from '#/assets/icons/numerology.svg';
import IconRecommendations from '#/assets/icons/recommendations.svg';
import CustomStatusBar from '#/components/CustomStatusBar';
import CustomView from '#/components/CustomView';
import Icon from '#/components/Icon';
import Modal from '#/components/Modal';
import TagHandler from '#/components/TagHandler';
import { SCREENS } from '#/constants/screens';
import { useTranslation } from '#/contexts/translation';
import { useApi } from '#/hooks/useApi';
import { useEvents } from '#/hooks/useEvents';
import { usePurchase } from '#/hooks/usePurchase';
import { tselector } from '#/utils/translation';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Screen } from '@types/navigation';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  GestureResponderEvent,
  Platform,
  View,
} from 'react-native';
import { SubscriptionAndroid, SubscriptionIOS, useIAP } from 'react-native-iap';
import Share, { ShareOptions } from 'react-native-share';
import ViewShot from 'react-native-view-shot';
import { useTheme } from 'styled-components/native';
import StoryBar from './StoryBar';
import Template from './Template';
import {
  Button,
  ButtonPanel,
  Capture,
  Content,
  FeedbackButton,
  FeedbackContainer,
  FeedbackText,
  LoadingContainer,
  ModalBilling,
  ModalItem,
  ModalList,
  ModalPricing,
  ModalPricingPrice,
  ModalText,
} from './styles';

export type StoryResponse = {
  id: string;
  image: string;
  canReload?: boolean;
  story: {
    id: string;
    title: string;
    content: string;
    feedback: {
      id?: string;
      type: 'positive' | 'negative';
      description: string | null;
    };
  };
};

const { width, height } = Dimensions.get('window');

let abortController: AbortController;

const Story: Screen = () => {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const apiService = useApi();
  const {
    subscriptions,
    getAvailablePurchases,
    availablePurchases,
    currentPurchase,
    connected,
  } = useIAP();
  const { translate } = useTranslation();
  const { register } = useEvents();
  const { connect, fetchSubscriptions, purchase } = usePurchase();

  const viewShotRef = useRef<ViewShot>();
  const scrollTimingRef = useRef<number>();

  const [current, setCurrent] = useState<number>(0);
  const [stories, setStories] = useState<StoryResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [shareModal, setShareModal] = useState(false);
  const [payloadModal, setPayloadModal] = useState(false);
  const [holdingPress, setHoldingPress] = useState(false);

  const isFocused = useIsFocused();

  const MODAL = {
    share: {
      logo: translate('modal-share-header'),
      title: translate('modal-share-title'),
      body: translate('modal-share-body'),
      actionText: translate('modal-share-button'),
    },
    payload: {
      title: translate('modal-payload-title'),
      renderBody: () => {
        return (
          <ModalList>
            <ModalItem>
              <IconHoroscope
                width={22}
                height={22}
                color={theme.colors.placeholder}
              />
              <ModalText>{translate('subscription-benefits-01')}</ModalText>
            </ModalItem>
            <ModalItem>
              <IconNumerology
                width={22}
                height={22}
                color={theme.colors.placeholder}
              />
              <ModalText>{translate('subscription-benefits-02')}</ModalText>
            </ModalItem>
            <ModalItem>
              <IconBiorhythm
                width={22}
                height={22}
                color={theme.colors.placeholder}
              />
              <ModalText>{translate('subscription-benefits-03')}</ModalText>
            </ModalItem>
            <ModalItem>
              <IconRecommendations
                width={22}
                height={22}
                color={theme.colors.placeholder}
              />
              <ModalText>{translate('subscription-benefits-04')}</ModalText>
            </ModalItem>
            <ModalItem>
              <IconIA width={22} height={22} color={theme.colors.placeholder} />
              <ModalText>{translate('subscription-benefits-05')}</ModalText>
            </ModalItem>

            <TagHandler
              parentComponent={ModalPricing}
              value={tselector(
                translate('screen-paywall-subscription_plan').replace(
                  '$price',
                  subscriptionPrice,
                ),
                subscriptionPrice ? 'success' : 'fail',
              )}
              extract={[{ tag: 'number', component: ModalPricingPrice }]}
            />
            <ModalBilling>
              {translate('screen-paywall-billing_frequency')}
            </ModalBilling>
          </ModalList>
        );
      },
      actionText: translate('modal-payload-button'),
    },
  };

  const fetchContent = async (storyId: string) => {
    abortController?.abort();
    abortController = new AbortController();

    try {
      setLoading(true);

      const story = await apiService.get<StoryResponse['story']>(
        `/story/${storyId}`,
        {
          signal: abortController.signal,
        },
      );
      register('user_fetched_story', {
        storyId,
      });
      setStories(prev =>
        prev.map(storyWithId => ({
          ...storyWithId,
          story: storyWithId.id === storyId ? story : storyWithId.story,
        })),
      );
    } catch (err) {
      if ((err as any)?.type === ERR_TYPE.ERR_STORY_LIMIT) {
        setPayloadModal(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePreviousPress = () => {
    setCurrent(prev => Math.max(0, prev - 1));
  };

  const handleNextPress = () => {
    setCurrent(prev => Math.min(stories.length - 1, prev + 1));
  };

  const fetchStories = async () => {
    const stories = await apiService.get<any[]>('/story');

    setStories(prev =>
      stories.map(story => ({
        ...story,
        story: null,
      })),
    );
  };

  useEffect(() => {
    if (isFocused) {
      if (!stories.length) {
        fetchStories();
      }

      getAvailablePurchases();
    }
  }, [isFocused]);

  useEffect(() => {
    if (stories.length > current && !stories[current].story) {
      fetchContent(stories[current].id);
    }
  }, [stories, current]);

  useEffect(() => {
    if (currentPurchase?.transactionReceipt && story) {
      setPayloadModal(false);
      fetchContent(story.id);
    }
  }, [currentPurchase]);

  const story = useMemo(() => {
    if (stories.length > current) {
      return stories[current];
    }
  }, [stories, current]);

  const handleSubscribe = () => {
    if (!connected) {
      connect();
      return;
    }

    if (subscriptions.length === 0) {
      fetchSubscriptions();
      return;
    }

    purchase(subscriptions);
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

      setPayloadModal(false);
      await fetchContent(stories[current].id);
    }
  };

  const handleShare = async () => {
    const uri = await viewShotRef.current?.capture?.();

    register('user_shared_story', {
      categoryId: stories[current]?.id,
      storyId: stories[current]?.story?.id,
    });

    if (uri) {
      const shareOptions: ShareOptions = {
        url: uri,
        title: translate('story-share-title'),
      };

      Share.open(shareOptions);
    }
  };

  const subscriptionPrice =
    Platform.OS === 'ios'
      ? (subscriptions[0] as SubscriptionIOS)?.localizedPrice
      : (subscriptions[0] as SubscriptionAndroid)?.subscriptionOfferDetails[0]
          ?.pricingPhases.pricingPhaseList[0].formattedPrice;

  const handleTouchBegin = (event: GestureResponderEvent) => {
    console.log('PRESS');
    scrollTimingRef.current = setTimeout(() => {
      scrollTimingRef.current = undefined;
      setHoldingPress(true);
    }, 300);
  };

  const handleTouchEnd = (event: GestureResponderEvent) => {
    console.log('RELEASE');
    setHoldingPress(false);

    if (!scrollTimingRef.current) {
      return;
    }

    clearTimeout(scrollTimingRef.current);
    scrollTimingRef.current = undefined;

    if (event.nativeEvent.pageX >= width / 2) {
      handleNextPress();
      return;
    }

    handlePreviousPress();
  };

  const handleReload = async () => {
    if (!story) {
      return;
    }

    setLoading(true);

    try {
      const response = await apiService.post<StoryResponse>(
        `/story/${story.id}/reload`,
      );

      setStories(prev =>
        prev.map(storyWithId => ({
          ...storyWithId,
          story:
            storyWithId.id === story.id ? response.story : storyWithId.story,
        })),
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFeedback = async (type: 'positive' | 'negative') => {
    if (!story?.story || story?.story?.feedback?.type === type) {
      return;
    }

    await apiService.post(`/story/${story.story.id}/feedback`, {
      type,
    });

    const feedback = {
      type,
      description: null,
    };

    setStories(stories =>
      stories.map(category => ({
        ...category,
        story:
          category.id === story.id
            ? {
                ...category.story,
                feedback,
              }
            : category.story,
      })),
    );
  };

  const getFeedbackButtonColor = (type: 'positive' | 'negative') => {
    if (!story?.story?.feedback || story.story.feedback.type === type) {
      return theme.colors.primary;
    }

    return theme.colors.gray;
  };

  return (
    <React.Fragment>
      <CustomStatusBar translucent={false} solid />
      <Capture ref={viewShotRef}>
        <CustomView
          source={story?.image}
          ViewProps={{
            onTouchStart: handleTouchBegin,
            onTouchEnd: handleTouchEnd,
            onTouchCancel: handleTouchEnd,
          }}>
          {!shareModal && (
            <StoryBar
              stories={stories.map(storyWithId => storyWithId.id)}
              current={story?.id}
              loading={loading}
              duration={30000}
              onTimeOver={handleNextPress}
              stopped={holdingPress || payloadModal || !isFocused}
            />
          )}

          <Content bounces={false}>
            {loading ? (
              <LoadingContainer>
                <ActivityIndicator size={48} color={theme.colors.primary} />
              </LoadingContainer>
            ) : (
              !!story?.story && (
                <React.Fragment>
                  <View
                    pointerEvents="none"
                    onTouchStart={evt => {
                      evt.stopPropagation();
                    }}
                    onTouchEnd={evt => {
                      evt.stopPropagation();
                    }}>
                    <Template template={story?.story?.content} />
                  </View>
                  <FeedbackContainer
                    onTouchStart={evt => {
                      evt.stopPropagation();
                    }}
                    onTouchEnd={evt => {
                      evt.stopPropagation();
                    }}
                    // onTouchCancel={evt => {
                    //   evt.stopPropagation();
                    // }}
                  >
                    <FeedbackText>
                      {translate('screen-story-feedback_text')}
                    </FeedbackText>
                    <FeedbackButton
                      onPress={event => handleFeedback('positive')}
                      selected={story?.story?.feedback?.type === 'positive'}>
                      <Icon
                        name="thumb-up-outline"
                        size={26}
                        color={getFeedbackButtonColor('positive')}
                      />
                    </FeedbackButton>
                    <FeedbackButton
                      onPress={() => handleFeedback('negative')}
                      selected={story?.story?.feedback?.type === 'negative'}>
                      <Icon
                        name="thumb-down-outline"
                        size={26}
                        color={getFeedbackButtonColor('negative')}
                      />
                    </FeedbackButton>
                  </FeedbackContainer>
                </React.Fragment>
              )
            )}
          </Content>

          {!shareModal && (
            <ButtonPanel>
              {story?.story?.canReload && (
                <Button onPress={handleReload} disabled={loading}>
                  <Icon
                    iconSet="MaterialCommunityIcons"
                    name="reload"
                    size={24}
                    color={theme.colors.primary}
                  />
                </Button>
              )}

              <Button onPress={() => navigation.navigate(SCREENS.profile)}>
                <Icon
                  iconSet="IconSaxBold"
                  name="frame"
                  size={24}
                  color={theme.colors.primary}
                />
              </Button>

              <Button onPress={() => setShareModal(true)}>
                <IconShare
                  width={20}
                  height={20}
                  color={theme.colors.primary}
                />
              </Button>
            </ButtonPanel>
          )}
        </CustomView>
      </Capture>

      <Modal
        logo={MODAL.share.logo}
        title={MODAL.share.title}
        body={MODAL.share.body}
        actionText={MODAL.share.actionText}
        onActionPress={handleShare}
        // secondayActionIcon="rotate-right"
        // secondayActionText={translate('modal-share-repeat_daily')}
        visible={shareModal}
        onClose={() => setShareModal(false)}
      />
      <Modal
        title={MODAL.payload.title}
        renderBody={MODAL.payload.renderBody}
        actionText={MODAL.payload.actionText}
        secondayActionText={translate('modal-payload-retrieve')}
        onSecondaryActionPress={handleRetrievePurchase}
        visible={payloadModal}
        onClose={() => {
          setCurrent(prev => Math.max(0, prev - 1));
          setPayloadModal(false);
        }}
        onActionPress={handleSubscribe}
      />
    </React.Fragment>
  );
};

export default Story;
