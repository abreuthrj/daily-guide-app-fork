import { ThemedText } from '#/theme/components/Text';
import { Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';

const { width } = Dimensions.get('window');

export const Cover = styled(FastImage)`
  position: absolute;
  width: ${width}px;
  height: 200px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`;

export const PictureWrapper = styled.TouchableOpacity`
  width: 108px;
  height: 108px;
  border-radius: 108px;
  background-color: white;
  margin-top: 130px;
  margin-bottom: 10px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;

export const ProfilePicture = styled(FastImage)`
  width: 100%;
  height: 100%;
  border-radius: 108px;
  border: 4px solid ${({ theme }) => theme.colors.background};
`;

export const Edit = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  position: absolute;
  right: 0px;
  bottom: 0px;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  border-width: 1px;
  border-color: white;
  padding: 4px;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const Name = styled(ThemedText)`
  font-size: 28px;
  margin-bottom: 10px;
  font-family: ${({ theme }) => theme.fonts.erotique.bold};
`;

export const About = styled(ThemedText)`
  margin-bottom: 20px;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.kanit.extraLight};
  color: ${({ theme }) => theme.colors.secondaryText};
`;

export const Card = styled.View`
  width: 100%;
  padding: 12px;
  margin-bottom: 14px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 16px;
`;

export const CardHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 14px;
`;

export const CardIcon = styled.View`
  width: 32px;
  height: 32px;
  padding: 4px;
  margin-right: 5px;
`;

export const CardTitle = styled(ThemedText)`
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.erotique.bold};
`;

export const CardDescription = styled(ThemedText)`
  color: ${({ theme }) => theme.colors.secondaryText};
  font-family: ${({ theme }) => theme.fonts.kanit.light};
`;

export const Scrollable = styled.ScrollView.attrs(({ theme }) => ({
  contentContainerStyle: {
    paddingHorizontal: theme.spacement.horizontal,
    paddingBottom: 60,
  },
}))`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const SolidStatusBar = styled.View`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.background};
`;
