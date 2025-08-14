import { ThemedScreen, ThemedScroll } from '#/theme/components/Screen';
import styled from 'styled-components/native';

export const Screen = styled(ThemedScreen)<{ withPadding: boolean }>`
  padding-horizontal: ${({ withPadding, theme }) =>
    withPadding ? theme.spacement.horizontal : 0}px;
`;

export const ScrollScreen = styled(ThemedScroll).attrs<{
  withPadding: boolean;
}>(({ withPadding, theme }) => ({
  paddingHorizontal: withPadding ? theme.spacement.horizontal : 0,
  contentContainerStyle: {
    minHeight: '100%',
  },
}))<{ withPadding: boolean }>``;

export const Background = styled.View`
  flex: 1;
  padding-horizontal: ${({ theme }) => theme.spacement.horizontal}px;
`;

export const BackgroundImage = styled.ImageBackground`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  flex: 1;

  opacity: 0.5;
`;
