import { ThemedText } from '#/theme/components/Text';
import styled from 'styled-components/native';
import { CustomInputProps } from '.';

export const Wrapper = styled.View``;

export const Label = styled(ThemedText)`
  font-weight: 600;
  margin-bottom: 8px;
  font-family: ${({ theme }) => theme.fonts.kanit.light};
`;

export const Box = styled.View<CustomInputProps>`
  flex-direction: row;
  align-items: center;

  ${({ variant, theme, error }) =>
    variant === 'outline'
      ? `
    border: 1px solid ${error ? theme.colors.error : theme.colors.border};
    border-radius: 50px;
    padding-horizontal: 20px;
  `
      : `
    border-bottom-width: 1px;
    border-bottom-color: ${error ? theme.colors.error : theme.colors.border};
    border-bottom-style: solid;
  `}
`;

export const Input = styled.TextInput`
  flex: 1;
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.kanit.regular};
  color: ${({ theme }) => theme.colors.placeholder};
`;

export const LeftIcon = styled.View``;

export const RightIcon = styled.View`
  margin-left: auto;
`;
