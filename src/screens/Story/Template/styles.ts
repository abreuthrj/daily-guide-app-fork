import ActionButton from '#/components/ActionButton';
import { ThemedText } from '#/theme/components/Text';
import { ThemedTitle } from '#/theme/components/Title';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import ListItemBase from './components/ListItem';

export const Column = styled.View`
  flex: 1;
  align-items: stretch;
`;

export const Title = styled(ThemedTitle)`
  text-align: center;
  font-size: 48px;
  line-height: 54px;
  margin-vertical: 15px;
`;

export const Subtitle = styled(ThemedTitle)`
  text-align: center;
  line-height: 32px;
  font-size: 24px;
  margin-bottom: 15px;
`;

export const Description = styled(ThemedText)`
  text-align: center;
  font-size: 16px;
  line-height: 26px;
  font-family: ${({ theme }) => theme.fonts.kanit.regular};
  color: ${({ theme }) => theme.colors.secondaryText};
  margin-top: 5px;
  margin-bottom: 40px;
`;

export const NotFound = styled(ThemedText).attrs({
  children: 'Not Found',
})``;

export const Button = styled(ActionButton).attrs({
  activeOpacity: 1,
})``;

export const ButtonWrapper = styled.View`
  width: 130px;
  align-self: center;
`;

export const FullImage = styled.View`
  width: 100%;
  height: 200px;

  align-items: center;
  justify-content: center;
`;

export const Image = styled(FastImage).attrs({
  resizeMode: 'contain',
})`
  width: 100%;
  height: 100%;
`;

export const List = styled.View``;

export const ListItem = styled(ListItemBase)``;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding-vertical: 12px;
`;

export const SmallImage = styled.View`
  width: 130px;
  height: 160px;

  align-items: center;
  justify-content: center;
`;

export const Container = styled.View`
  flex: 1;
  width: 100%;
`;

export const PaddingLeft = styled.View`
  padding-left: 20px;
`;

export const PaddingRight = styled.View`
  padding-right: 20px;
`;

export const Header1 = styled(ThemedText)`
  text-align: left;
  font-size: 48px;
`;

export const Header2 = styled(ThemedText)`
  text-align: left;
  font-size: 36px;
`;

export const Header3 = styled(ThemedText)`
  text-align: left;
  font-size: 24px;
`;

export const Body1 = styled(ThemedText)`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.kanit.light};
  color: ${({ theme }) => theme.colors.text};
`;

export const Body2 = styled(ThemedText)`
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.kanit.light};
  color: ${({ theme }) => theme.colors.text};
`;

export const Body3 = styled(ThemedText)`
  font-size: 12px;
  font-family: ${({ theme }) => theme.fonts.kanit.light};
  color: ${({ theme }) => theme.colors.text};
`;
