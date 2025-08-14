import React from 'react';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import iconSaxBoldConfig from '#/assets/icomoons/iconsax-bold.json';
import iconSaxConfig from '#/assets/icomoons/iconsax.json';
import { useTheme } from 'styled-components/native';

const IconSax = createIconSetFromIcoMoon(
  iconSaxConfig,
  'iconsax',
  'iconsax.ttf',
);
const IconSaxBold = createIconSetFromIcoMoon(
  iconSaxBoldConfig,
  'iconsax-bold',
  'iconsax-bold.ttf',
);

const iconSets = {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  FontAwesome5Pro,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  IconSax,
  IconSaxBold,
};

export type IconProps = {
  name: string;
  iconSet?: keyof typeof iconSets;
  size?: number;
  color?: string;
  style?: any;
};

const Icon: React.FC<IconProps> = props => {
  const theme = useTheme();

  const IconProvider =
    (props.iconSet ? iconSets[props.iconSet] : null) ?? MaterialCommunityIcons;

  return (
    <IconProvider
      name={props.name}
      size={props.size}
      color={props.color || theme.colors.primary}
      style={props.style}
    />
  );
};

export default Icon;
