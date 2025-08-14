import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

export const BarContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin-vertical: 20px;
  padding-horizontal: ${({ theme }) => theme.spacement.horizontal}px;
`;

export const Bar = styled.View<{ size: number; loaded?: boolean }>`
  width: ${({ size }) => size}%;
  height: 8px;

  border-radius: 1000px;
  margin-horizontal: 2px;
  overflow: hidden;

  background-color: ${({ theme, loaded }) =>
    loaded ? theme.colors.primary : `${theme.colors.gray}40`};
`;

export const Progress = styled(Animated.View)`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
`;
