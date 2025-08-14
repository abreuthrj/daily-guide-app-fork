import { ThemedText } from '#/theme/components/Text';
import { ThemedTitle } from '#/theme/components/Title';
import styled from 'styled-components/native';

export const Container = styled.View``;

export const Title = styled(ThemedTitle)`
  text-align: center;
  font-size: 42px;
  margin-top: 45px;
  line-height: 54px;
`;

export const ProgressCircle = styled.View`
  align-items: center;
  justify-content: center;
  margin-vertical: 40px;
`;

export const ProgressText = styled(ThemedText)`
  position: absolute;
  font-size: 32px;
  font-weight: 700;
  font-family: ${({ theme }) => theme.fonts.kanit.regular};
  color: ${({ theme }) => theme.colors.primary};
`;

export const StepText = styled(ThemedText)`
  font-size: 16px;
  margin-bottom: 20px;
  font-family: ${({ theme }) => theme.fonts.kanit.regular};
  color: ${({ theme }) => theme.colors.secondaryText};
`;

export const ButtonWrapper = styled.View`
  margin-top: auto;
  margin-bottom: 40px;
`;
