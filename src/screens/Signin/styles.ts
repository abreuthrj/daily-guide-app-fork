import { ThemedText } from '#/theme/components/Text';
import { ThemedTitle } from '#/theme/components/Title';
import styled from 'styled-components/native';

export const Title = styled(ThemedTitle)`
  margin-top: 35px;
  margin-bottom: 12px;

  text-align: center;
  font-size: 42px;
  line-height: 56px;
`;

export const Stars = styled.View`
  flex-direction: row;
  align-items: center;
  align-self: center;
`;

export const Star = styled.View`
  margin-horizontal: 4px;
`;

export const ButtonWrapper = styled.View`
  margin-top: auto;
  margin-bottom: 40px;
`;

export const Terms = styled(ThemedText)`
  margin-top: 24px;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.kanit.light};
  color: ${({ theme }) => theme.colors.secondaryText};
`;

export const TermsBold = styled(ThemedText)`
  font-family: ${({ theme }) => theme.fonts.kanit.semiBold};
  color: ${({ theme }) => theme.colors.secondaryText};
`;

export const SecondaryButton = styled(ThemedText)`
  font-family: ${({ theme }) => theme.fonts.kanit.medium};
  color: ${({ theme }) => theme.colors.secondaryText};
  align-self: center;
  margin-top: 12px;
`;
