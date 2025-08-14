import { useEffect, useRef } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollViewProps,
} from 'react-native';

export type ScrollSteps = Array<number>;
export type ScrollStepsCallback = ((step: number) => void) | null;

export const useScrollSteps = (steps: ScrollSteps) => {
  const ref = useRef<Record<number, boolean>>({});

  useEffect(() => {
    ref.current = {};
    steps.forEach(step => {
      ref.current[step] = false;
    });
  }, [steps]);

  const handleScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
    onEnter?: ScrollStepsCallback,
    onUpdate?: ScrollStepsCallback,
    onExit?: ScrollStepsCallback,
  ) => {
    for (const step of steps) {
      if (step <= event.nativeEvent.contentOffset.y && ref.current[step]) {
        onUpdate?.(step);
        continue;
      }

      if (
        step <= event.nativeEvent.contentOffset.y &&
        ref.current[step] === false
      ) {
        ref.current[step] = true;
        onEnter?.(step);
        continue;
      }

      if (
        step > event.nativeEvent.contentOffset.y &&
        ref.current[step] === true
      ) {
        ref.current[step] = false;
        onExit?.(step);
      }
    }
  };

  return (
    onEnter?: ScrollStepsCallback,
    onUpdate?: ScrollStepsCallback,
    onExit?: ScrollStepsCallback,
  ) =>
    ({
      onScrollBeginDrag: (event: NativeSyntheticEvent<NativeScrollEvent>) =>
        handleScroll(event, onEnter, onUpdate, onExit),
      onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) =>
        handleScroll(event, onEnter, onUpdate, onExit),
      onScrollEndDrag: (event: NativeSyntheticEvent<NativeScrollEvent>) =>
        handleScroll(event, onEnter, onUpdate, onExit),
      scrollEventThrottle: 500,
    } as ScrollViewProps);
};
