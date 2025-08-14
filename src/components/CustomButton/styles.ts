import { ThemedText } from '#/theme/components/Text';
import styled from 'styled-components/native';

export const Container = styled.View<{
  color?: string;
  fullWidth?: boolean;
  padding?: number;
  fontSize?: number;
}>`
  align-items: center;
  justify-content: center;

  font-size: ${({ fontSize }) => fontSize || 16}px;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  padding: ${({ padding }) => padding || 0}px;
  border-radius: 50px;

  background-color: ${({ color, theme }) => color || theme.colors.secondary};
`;

export const Button = styled.TouchableOpacity``;

export const Text = styled(ThemedText)<{
  color?: string;
}>`
  font-size: 16px;
  font-weight: 600;

  font-family: ${({ theme }) => theme.fonts.kanit.regular};
  color: ${({ color, theme }) => color || theme.colors.background};
`;
