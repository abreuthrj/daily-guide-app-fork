import { ThemedText } from '#/theme/components/Text';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 56px;
  padding-horizontal: ${({ theme }) => theme.spacement.horizontal}px;
`;

export const FieldName = styled(ThemedText).attrs({
  numberOfLines: 1,
})`
  flex: 1;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.kanit.light};
  color: ${({ theme }) => theme.colors.background};
`;

export const Input = styled.TextInput`
  flex: 1;
  height: 100%;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.kanit.light};
  color: ${({ theme }) => theme.colors.background};
`;

export const FieldSeparator = styled.View`
  width: 4px;
`;

export const DateContainer = styled(Animated.View)`
  width: 100%;
  align-items: center;
  align-self: center;
`;

export const ContentWrapper = styled.View`
  background-color: ${({ theme }) => theme.colors.secondaryText};
  margin-bottom: 1px;
`;
