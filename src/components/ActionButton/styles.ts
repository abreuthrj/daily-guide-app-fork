import { ThemedText } from '#/theme/components/Text';
import styled from 'styled-components/native';

export const Button = styled.TouchableOpacity<{ disabled?: boolean }>`
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding-vertical: 14px;

  border-radius: 50px;

  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.gray : theme.colors.primary};
`;

export const ButtonFx = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;

  padding-vertical: 29px;

  transform: rotate(-1.5deg);

  border-radius: 50px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.primary};
`;

export const ButtonText = styled(ThemedText).attrs({
  numberOfLines: 1,
})`
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.kanit.medium};

  color: ${({ theme }) => theme.colors.background};
`;

export const ActionIconWrapper = styled.View`
  align-items: center;
  justify-content: center;

  margin-vertical: -5px;
`;

export const LeftIconWrapper = styled.View`
  align-items: center;
  justify-content: center;

  margin-right: 10px;
`;
