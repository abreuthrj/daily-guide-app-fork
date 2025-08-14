import { ThemedText } from '#/theme/components/Text';
import { ThemedTitle } from '#/theme/components/Title';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const { width } = Dimensions.get('window');

export const Wrapper = styled.View`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const Background = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background-color: #00000040;
`;

export const Container = styled.View`
  padding: 24px 16px;
  border-radius: 16px;
  width: ${({ theme }) => width - theme.spacement.horizontal * 2}px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Logo = styled(ThemedText)`
  font-family: ${({ theme }) => theme.fonts.kanit.light};
  color: ${({ theme }) => theme.colors.secondaryText};
  margin-top: 20px;
  margin-bottom: 24px;
  text-align: center;
`;

export const Title = styled(ThemedTitle)`
  font-size: 40px;
  line-height: 52px;
  text-align: center;
`;

export const Body = styled(ThemedText)`
  font-family: ${({ theme }) => theme.fonts.kanit.light};
  color: ${({ theme }) => theme.colors.secondaryText};
  text-align: center;
  font-size: 16px;
  margin-top: 16px;
  margin-bottom: 52px;
`;

export const ButtonWrapper = styled.View``;

export const SecondaryButtonWrapper = styled.View``;

export const SecondaryButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 22px;
  margin-bottom: 6px;
`;

export const SecondaryButtonText = styled(ThemedText)`
  margin-left: 6px;
  font-family: ${({ theme }) => theme.fonts.kanit.light};
  color: ${({ theme }) => theme.colors.secondaryText};
`;
