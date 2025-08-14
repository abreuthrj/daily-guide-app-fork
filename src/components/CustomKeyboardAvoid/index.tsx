import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  ViewStyle,
} from 'react-native';

export type CustomKeyboardAvoidProps = {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const CustomKeyboardAvoid: React.FC<CustomKeyboardAvoidProps> = props => {
  return (
    <KeyboardAvoidingView
      style={[{ flex: 1 }, props.style]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {props.children}
    </KeyboardAvoidingView>
  );
};

export default CustomKeyboardAvoid;
