import { ThemedText } from '#/theme/components/Text';
import styled from 'styled-components/native';

export const Content = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const RadioBox = styled.View<{ selected: boolean }>`
  width: 20px;
  height: 20px;
  margin-right: 8px;
  align-items: center;
  justify-content: center;
  border-width: ${({ selected }) => (selected ? 0 : 1)}px;
  border-radius: 10px;
  border-color: ${({ theme }) => theme.colors.primary};
`;

export const RadioChecked = styled.View`
  width: 100%;
  height: 100%;

  align-items: center;
  justify-content: center;

  border-radius: 50px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const Label = styled(ThemedText)`
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.kanit.light};
  color: ${({ theme }) => theme.colors.primary};
`;

export const IconWrapper = styled.View`
  width: 100%;
  height: 100%;

  margin-left: -6px;
  margin-top: -6px;
`;
