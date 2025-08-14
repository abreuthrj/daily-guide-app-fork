import { ThemedText } from '#/theme/components/Text';
import styled from 'styled-components/native';

export const Container = styled.View<{ displayBorder?: boolean }>`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.background}
  padding-horizontal: ${({ theme }) => theme.spacement.horizontal}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme, displayBorder }) =>
    displayBorder ? theme.colors.backgroundLight : 'transparent'};
`;

export const Title = styled(ThemedText).attrs({
  numberOfLines: 1,
})`
  flex: 1;
  font-size: 24px;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.kanit.regular};
`;

export const ButtonContainer = styled.TouchableOpacity`
  width: 52px;
  height: 52px;
  align-items: center;
  justify-content: center;
`;
