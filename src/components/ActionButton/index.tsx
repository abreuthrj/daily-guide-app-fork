import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import Icon from '../Icon';
import {
  ActionIconWrapper,
  Button,
  ButtonFx,
  ButtonText,
  LeftIconWrapper,
} from './styles';

export type ActionButtonProps = {
  text?: string;
  noFx?: boolean;
  onPress?: TouchableOpacityProps['onPress'];
  hideActionIcon?: boolean;
  leftIcon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
};

const ActionButton: React.FC<ActionButtonProps> = props => {
  const theme = useTheme();

  const getContent = () => {
    return (
      <React.Fragment>
        {!!props.leftIcon && (
          <LeftIconWrapper>{props.leftIcon}</LeftIconWrapper>
        )}

        {!!props.text && <ButtonText>{props.text}</ButtonText>}

        {!props.hideActionIcon && (
          <ActionIconWrapper style={{ marginLeft: props.text ? 20 : 0 }}>
            <Icon
              iconSet="IconSax"
              name="arrow-right-1"
              size={34}
              color={theme.colors.background}
            />
          </ActionIconWrapper>
        )}

        {!props.noFx && <ButtonFx pointerEvents="none" />}
      </React.Fragment>
    );
  };

  return (
    <Button onPress={props.onPress} disabled={props.disabled || props.loading}>
      {getContent()}
    </Button>
  );
};

export default ActionButton;
