import React, { useEffect, useMemo } from 'react';
import {
  Easing,
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Bar, BarContainer, Progress } from './styles';

export type StoryBarProps = {
  stories: string[];
  current?: string;
  duration: number;
  loading?: boolean;
  stopped?: boolean;
  onTimeOver: () => void;
};

const StoryBar: React.FC<StoryBarProps> = props => {
  const transition = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${transition.value}%`,
  }));

  useEffect(() => {
    if (props.loading) {
      transition.value = 0;
      return;
    }

    if (props.stopped) {
      cancelAnimation(transition);
      return;
    }

    if (!props.current) {
      return;
    }

    if (transition.value > 0 && transition.value < 100) {
      transition.value = withTiming(
        100,
        {
          duration: props.duration - (transition.value / 100) * props.duration,
          easing: Easing.linear,
        },
        finished => {
          if (finished) {
            runOnJS(props.onTimeOver)();
          }
        },
      );
      return;
    }

    transition.value = 0;
    transition.value = withTiming(
      100,
      {
        duration: props.duration,
        easing: Easing.linear,
      },
      finished => {
        if (finished) {
          runOnJS(props.onTimeOver)();
        }
      },
    );
  }, [props.current, props.loading, props.stopped]);

  const currentIndex = useMemo(() => {
    return props.stories.findIndex(story => story === props.current);
  }, [props.current]);

  return (
    <BarContainer>
      {props.stories.map((story, index) => (
        <Bar
          key={story}
          size={100 / props.stories.length}
          loaded={index < currentIndex}>
          {props.current === story && !props.loading && (
            <Progress style={animatedStyle} />
          )}
        </Bar>
      ))}
    </BarContainer>
  );
};

export default StoryBar;
