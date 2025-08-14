import { ThemedText } from '#/theme/components/Text';
import styled from 'styled-components/native';

export const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 14px;
`;

export const Text = styled(ThemedText)`
  font-family: ${({ theme }) => theme.fonts.kanit.regular};
  color: ${({ theme }) => theme.colors.secondaryText};
  font-size: 16px;
`;

export const Bullet = styled.View`
  width: 6px;
  height: 6px;
  margin-right: 8px;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.colors.secondaryText};
`;
