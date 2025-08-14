import { statusBarHeight } from '#/utils/style';
import { Platform, StatusBar } from 'react-native';
import styled from 'styled-components/native';

export const Safe = styled.View`
  margin-top: ${Platform.OS === 'ios'
    ? statusBarHeight()
    : StatusBar.currentHeight || 0}px;
`;
