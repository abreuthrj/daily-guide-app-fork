import { ThemedUnsafeScreen } from '#/theme/components/Screen';
import { ThemedText } from '#/theme/components/Text';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';

export const Title = styled(ThemedText)``;

export const Container = styled(ThemedUnsafeScreen)`
  flex: 1;
`;

export const ScrollArea = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: 'center',
    marginTop: 12,
  },
})`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ProfilePicture = styled(FastImage)`
  width: 124px;
  height: 124px;
  border-radius: 62px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
`;

export const SectionTitle = styled(ThemedText)`
  margin-top: 40px;
  margin-bottom: 10px;
  align-self: flex-start;
  margin-left: ${({ theme }) => theme.spacement.horizontal}px;
  font-family: ${({ theme }) => theme.fonts.kanit.regular};
`;
