import { ThemedText } from '#/theme/components/Text';
import styled from 'styled-components/native';

export const InputContainer = styled.View`
  width: 100%;
  height: 56px;
  background-color: ${({ theme }) => theme.colors.secondaryText};
  margin-bottom: 1px;
`;

export const FieldName = styled(ThemedText).attrs({
  numberOfLines: 1,
})`
  flex: 1;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.kanit.light};
  color: ${({ theme }) => theme.colors.background};
`;

export const TouchableContainer = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: center;
  padding-horizontal: ${({ theme }) => theme.spacement.horizontal}px;
`;
