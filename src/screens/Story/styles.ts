import { ThemedText } from '#/theme/components/Text';
import { Dimensions } from 'react-native';
import ViewShot from 'react-native-view-shot';
import styled from 'styled-components/native';

const { width } = Dimensions.get('window');

export const ButtonPanel = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 0px 20px 20px;
  background-color: ${({ theme }) => theme.colors.background}F0;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  width: 50px;
  height: 50px;

  align-items: center;
  justify-content: center;

  margin-top: 14px;
  margin-horizontal: 22px;

  border-radius: 25px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.primary};
`;

export const TouchableRegionPrevious = styled.TouchableOpacity`
  position: absolute;
  top: 0px;
  left: 0px;
  width: ${width / 2}px;
  height: 100%;
  /* background-color: blue; */
`;

export const TouchableRegionNext = styled.TouchableOpacity`
  position: absolute;
  top: 0px;
  right: 0px;
  width: ${width / 2}px;
  height: 100%;
  /* background-color: red; */
`;

export const Title = styled(ThemedText)`
  font-size: 28px;
`;

export const Text = styled(ThemedText)`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.kanit.extraLight};
`;

export const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.ScrollView.attrs(({ theme }) => ({
  contentContainerStyle: {
    paddingBottom: 20,
    paddingHorizontal: theme.spacement.horizontal,
  },
}))`
  flex: 1;
`;

export const ModalList = styled.View`
  padding-vertical: 25px;
`;

export const ModalItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding-vertical: 8px;
`;

export const ModalText = styled(ThemedText)`
  padding-left: 10px;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.secondaryText};
  font-family: ${({ theme }) => theme.fonts.kanit.light};
`;

export const ModalPricing = styled(ThemedText)`
  text-align: center;
  font-size: 22px;
  margin-top: 32px;
`;

export const ModalPricingPrice = styled(ThemedText)`
  text-align: center;
  font-size: 22px;
  margin-top: 32px;
  font-family: ${({ theme }) => theme.fonts.kanit.extraLight};
`;

export const ModalBilling = styled(ThemedText)`
  text-align: center;
  color: ${({ theme }) => theme.colors.secondaryText};
  font-family: ${({ theme }) => theme.fonts.kanit.light};
`;

export const Capture = styled(ViewShot)`
  flex: 1;
`;

export const StoryBarPadding = styled.View`
  padding-vertical: 24px;
`;

export const FeedbackContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-vertical: 40px;
`;

export const FeedbackText = styled(ThemedText)`
  margin-right: 40px;
`;

export const FeedbackButton = styled.TouchableOpacity<{ selected?: boolean }>`
  padding: 10px;
  opacity: ${({ selected }) => (selected ? 1 : 0.4)};
`;
