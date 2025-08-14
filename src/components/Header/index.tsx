import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '../Icon';
import { ButtonContainer, Container, Title } from './styles';

export type HeaderProps = {
  title?: string;
  goBackBehaviour?: boolean;
  leftAction?: () => Promise<boolean> | void;
  leftIcon?: string;
  rightAction?: () => void;
  rightIcon?: string;
  displayBorder?: boolean;
  safe?: boolean;
};

const Header: React.FC<HeaderProps> = props => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const leftEnabled = useMemo(
    () => props.leftAction || props.goBackBehaviour,
    [props.leftAction, props.goBackBehaviour],
  );

  const handleLeftPress = async () => {
    if (props.goBackBehaviour && navigation.canGoBack()) {
      if (!props.leftAction) {
        navigation.goBack();
        return;
      }

      if (!(await props.leftAction())) {
        return;
      }

      navigation.goBack();
      return;
    }

    props.leftAction?.();
  };

  return (
    <Container
      displayBorder={props.displayBorder}
      style={{ paddingTop: props.safe ? insets.top : 0 }}>
      <ButtonContainer disabled={!leftEnabled} onPress={handleLeftPress}>
        {leftEnabled && (
          <Icon
            name={props.goBackBehaviour ? 'chevron-left' : props.leftIcon}
            size={42}
          />
        )}
      </ButtonContainer>
      <Title>{props.title}</Title>
      <ButtonContainer
        disabled={!props.rightAction}
        onPress={props.rightAction}>
        {props.rightAction && <Icon name={props.rightIcon} size={42} />}
      </ButtonContainer>
    </Container>
  );
};

export default Header;
