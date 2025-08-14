import React from 'react';
import { useTheme } from 'styled-components/native';
import ActionButton from '../ActionButton';
import Icon from '../Icon';
import {
  Background,
  Body,
  ButtonWrapper,
  Container,
  Logo,
  SecondaryButton,
  SecondaryButtonText,
  SecondaryButtonWrapper,
  Title,
  Wrapper,
} from './styles';

export type ModalProps = {
  logo?: string;
  title?: string;
  body?: string;
  visible?: boolean;
  actionText?: string;
  secondayActionText?: string;
  secondayActionIcon?: string;
  renderTitle?: () => React.ReactNode;
  renderBody?: () => React.ReactNode;
  onClose?: () => void;
  renderSecondaryAction?: () => React.ReactNode;
  onActionPress?: () => Promise<void> | void;
  onSecondaryActionPress?: () => void;
};

const Modal: React.FC<ModalProps> = props => {
  const theme = useTheme();

  if (!props.visible) {
    return null;
  }

  const handleClose = () => {
    props.onClose?.();
  };

  const getTitle = () => {
    if (props.title != null) {
      return <Title>{props.title}</Title>;
    }
    if (props.renderTitle) {
      return <React.Fragment> {props.renderTitle()}</React.Fragment>;
    }
    return null;
  };

  const getBody = () => {
    if (props.body != null) {
      return <Body>{props.body}</Body>;
    }
    if (props.renderBody) {
      return <React.Fragment>{props.renderBody()}</React.Fragment>;
    }
    return null;
  };

  const getSecondaryAction = () => {
    if (props.renderSecondaryAction) {
      return <React.Fragment>{props.renderSecondaryAction()}</React.Fragment>;
    }
    return null;
  };

  return (
    <Wrapper>
      <Background onPress={handleClose} />

      <Container>
        {props.logo != null && <Logo>{props.logo}</Logo>}

        {getTitle()}

        {getBody()}

        <ButtonWrapper>
          <ActionButton
            hideActionIcon
            text={props.actionText}
            onPress={props.onActionPress}
          />
        </ButtonWrapper>

        {props.secondayActionText != null ? (
          <SecondaryButtonWrapper>
            <SecondaryButton onPress={props.onSecondaryActionPress}>
              {props.secondayActionIcon && (
                <Icon
                  iconSet="IconSaxBold"
                  name={props.secondayActionIcon}
                  color={theme.colors.secondaryText}
                  size={22}
                />
              )}
              <SecondaryButtonText>
                {props.secondayActionText}
              </SecondaryButtonText>
            </SecondaryButton>
          </SecondaryButtonWrapper>
        ) : (
          getSecondaryAction()
        )}
      </Container>
    </Wrapper>
  );
};

export default Modal;
