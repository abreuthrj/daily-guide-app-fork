import { ThemedText } from '#/theme/components/Text';
import styled from 'styled-components/native';

export const List = styled.FlatList<{ numberOfItems: number; full?: boolean }>`
  border-width: 1px;
  border-radius: 20px;
  border-color: ${({ theme }) => theme.colors.border};

  ${({ full, numberOfItems }) =>
    !full
      ? `
    max-height: ${77.5 * numberOfItems}px;
  `
      : 'flex-grow: 0;'}
`;

export const Item = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;

  padding: 15px;
`;

export const ItemText = styled(ThemedText)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.placeholder};
  font-family: ${({ theme }) => theme.fonts.kanit.light};
  flex: 1;
`;

export const IconWrapper = styled.View`
  margin-right: 14px;
`;

export const Separator = styled.View`
  width: 100%;
  height: 1px;

  background-color: ${({ theme }) => theme.colors.border};
`;
