import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

export const ThemedScreen = styled.SafeAreaView`
  flex: 1;

  padding-top: ${Platform.OS === 'ios' ? getStatusBarHeight() : 0}px;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const ThemedUnsafeScreen = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const ThemedScroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
  },
})`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background};
`;
