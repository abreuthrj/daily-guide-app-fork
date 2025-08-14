import { User, UserAttribute } from '#/@types/api/User';
import ActionButton from '#/components/ActionButton';
import CustomStatusBar from '#/components/CustomStatusBar';
import CustomView from '#/components/CustomView';
import { SCREENS } from '#/constants/screens';
import { STORAGE } from '#/constants/storage';
import { useForm } from '#/contexts/form';
import { usePersistor } from '#/contexts/persist';
import { useTranslation } from '#/contexts/translation';
import { useApi } from '#/hooks/useApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { Screen } from '@types/navigation';
import { useEffect, useState } from 'react';
import Reanimated, {
  useAnimatedProps,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Circle, Svg } from 'react-native-svg';
import { useTheme } from 'styled-components/native';
import {
  ButtonWrapper,
  ProgressCircle,
  ProgressText,
  StepText,
  Title,
} from './styles';

const AnimatedCircle = Reanimated.createAnimatedComponent(Circle);

const SIZE = 2 * Math.PI * 40;

const Analyzing: Screen = ({ navigation }) => {
  const theme = useTheme();
  const apiService = useApi();
  const form = useForm();
  const { persist } = usePersistor();
  const { translate, language } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);

  const isFocused = useIsFocused();

  const animatedProgress = useSharedValue(0);

  const animatedProgressProps = useAnimatedProps(() => ({
    strokeDashoffset: 251.32 - (animatedProgress.value / 100) * SIZE,
  }));

  const steps = [
    {
      fetch: async () => {
        const dateOfBirth = new Date(form.get('birthdate'));
        const timeOfBirth = new Date(form.get('birthtime'));
        dateOfBirth.setHours(timeOfBirth.getHours());
        dateOfBirth.setMinutes(timeOfBirth.getMinutes());

        const data = {
          displayName: form.get('name'),
          dateOfBirth: dateOfBirth.toISOString(),
          notificationTime: form.get('notificationTime'),
          placeId: form.get('placeId'),
          gender: form.get('gender'),
          language,
        };

        const user = await apiService.put<User>('/user', data);

        persist({ user });
        setProgress(prev => prev + (1 / steps.length) * 100);
      },
    },
    {
      title: translate('screen-onboarding-analyzing-item_01'),
      sequence: true,
      fetch: async () => {
        await apiService.post<UserAttribute[]>('/user/attributes');
        setProgress(prev => prev + (1 / steps.length) * 100);
      },
    },
    {
      title: translate('screen-onboarding-analyzing-item_02'),
    },
    {
      title: translate('screen-onboarding-analyzing-item_03'),
    },
    {
      title: translate('screen-onboarding-analyzing-item_04'),
    },
  ];

  const requestAnalyzeInfo = async () => {
    setLoading(true);
    setProgress(0);

    try {
      await steps[0].fetch?.();

      await Promise.all(
        steps.slice(1).map(step => {
          if (step.fetch) {
            return step.fetch();
          }

          setProgress(prev => prev + (1 / steps.length) * 100);
        }),
      );

      await AsyncStorage.removeItem(STORAGE.onboarding);

      setError(false);
    } catch (err) {
      setProgress(0);
      setError(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (isFocused) {
      requestAnalyzeInfo();
    }
  }, [isFocused]);

  useEffect(() => {
    animatedProgress.value = withSpring(progress, {
      damping: 100,
    });
  }, [progress]);

  const handleSubmit = () => {
    if (error) {
      requestAnalyzeInfo();
      return;
    }

    navigation.reset({
      index: 0,
      routes: [{ name: SCREENS.paywall }],
    });
  };

  return (
    <CustomView scrollable backgroundName="BgAnalyzing">
      <CustomStatusBar safe />

      <Title>{translate('screen-onboarding-analyzing-title')}</Title>

      <ProgressCircle>
        <Svg viewBox="0 0 100 100" width={180} height={180} rotation={-90}>
          <Circle
            cx={50}
            cy={50}
            r={40}
            strokeLinecap="round"
            stroke={theme.colors.backgroundLight}
            strokeWidth={8}
            fill="transparent"
            strokeDasharray={251.32}
          />
          <AnimatedCircle
            cx={50}
            cy={50}
            r={40}
            strokeLinecap="round"
            stroke={theme.colors.primary}
            strokeWidth={8}
            fill="transparent"
            strokeDasharray={251.32}
            animatedProps={animatedProgressProps}
          />
        </Svg>

        <ProgressText>{progress}%</ProgressText>
      </ProgressCircle>

      {steps.map((step, i) => (
        <StepText key={i}>{step.title}</StepText>
      ))}

      <ButtonWrapper>
        <ActionButton
          text={
            error
              ? translate('screen-onboarding-analyzing-try_again')
              : translate('screen-onboarding-analyzing-button')
          }
          onPress={handleSubmit}
          loading={loading}
        />
      </ButtonWrapper>
    </CustomView>
  );
};

export default Analyzing;
