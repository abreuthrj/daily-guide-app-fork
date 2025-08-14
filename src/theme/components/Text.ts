import styled from 'styled-components/native';

export const ThemedText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.erotique.bold};
  color: ${({ theme }) => theme.colors.text};
`;
