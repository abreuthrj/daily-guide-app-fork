import { deepMerge } from '#/utils/object';
import React from 'react';
import { TextProps, TouchableOpacityProps, ViewProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Button, Container, Text } from './styles';

export type CustomButtonProps = {
  variant?: keyof typeof VARIANTS;
  children?: React.ReactNode;
  color?: string;
  textColor?: string;
  fontSize?: number;
  padding?: number;
  fullWidth?: boolean;
  onPress?: TouchableOpacityProps['onPress'];
  TouchableOpacityProps?: TouchableOpacityProps;
  TextProps?: TextProps;
  ViewProps?: ViewProps;
  ButtonProps?: ViewProps;
};

export type VariantType = 'bottom';

const VARIANTS: Record<VariantType, CustomButtonProps> = {
  bottom: {
    color: '',
    fontSize: 18,
    padding: 12,
  },
};

export type CustomButtonPropsWithVariant = CustomButtonProps & {
  variant?: VariantType;
};

const CustomButton: React.FC<CustomButtonPropsWithVariant> = props => {
  const theme = useTheme();

  if (props.variant) {
    VARIANTS[props.variant].color = theme.colors.primary;
    props = deepMerge(props, VARIANTS[props.variant]);
  }

  return (
    <Button onPress={props.onPress} {...props.TouchableOpacityProps}>
      <Container
        fullWidth={props.fullWidth}
        fontSize={props.fontSize}
        padding={props.padding}
        color={props.color}
        {...props.ButtonProps}>
        <Text color={props.textColor} {...props.TextProps}>
          {props?.children}
        </Text>
      </Container>
    </Button>
  );
};

export default CustomButton;
