import styled from 'styled-components/native';

export const DropdownWrapper = styled.View`
  flex: 1;
  margin-top: 10px;
`;

export const Container = styled.View`
  flex: 1;
  padding-horizontal: ${({ theme }) => theme.spacement.horizontal}px;
`;
