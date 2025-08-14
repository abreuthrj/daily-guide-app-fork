import React from 'react';
import { FieldName, InputContainer, TouchableContainer } from './styles';

export type ProfileButtonProps = {
  name: string;
  onPress?: () => void;
};

const ProfileButton: React.FC<ProfileButtonProps> = props => {
  return (
    <InputContainer>
      <TouchableContainer onPress={props.onPress}>
        <FieldName>{props.name}</FieldName>
      </TouchableContainer>
    </InputContainer>
  );
};

export default ProfileButton;
