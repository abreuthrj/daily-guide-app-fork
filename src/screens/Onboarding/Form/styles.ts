import { ThemedText } from '#/theme/components/Text';
import { ThemedTitle } from '#/theme/components/Title';
import { statusBarHeight } from '#/utils/style';
import Reanimated from 'react-native-reanimated';
import styled from 'styled-components/native';

export const Title = styled(ThemedTitle)`
  margin-top: 35px;
  margin-bottom: 12px;

  line-height: 58px;
  font-size: 44px;
  text-align: center;
`;

export const Description = styled(ThemedText)`
  margin-bottom: 60px;

  text-align: center;
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.kanit.light};
  color: ${({ theme }) => theme.colors.secondaryText};
`;

export const Header = styled(Reanimated.View)`
  margin-top: ${statusBarHeight() + 10}px;
`;

export const Body = styled.View``;

export const ButtonWrapper = styled.View`
  width: 100%;

  margin-top: auto;
  margin-bottom: 40px;
`;

export const DatePickerContainer = styled.View`
  width: 100%;
  align-items: center;
`;
