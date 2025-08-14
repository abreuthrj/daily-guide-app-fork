import React, { forwardRef, useRef } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import Icon, { IconProps } from '../Icon';
import { Box, Input, Label, LeftIcon, RightIcon, Wrapper } from './styles';

export type CustomInputProps = {
  value?: string;
  onChangeText?: (value: string) => void;
  label?: string;
  placeholder?: string;
  InputProps?: TextInputProps;
  LeftIconProps?: IconProps;
  RightIconProps?: IconProps;
  variant?: 'default' | 'outline';
  debounce?: number;
  error?: boolean;
  onDebounce?: (value: string) => void;
};

const CustomInput = forwardRef<TextInput, CustomInputProps>(
  (props, inputRef) => {
    const theme = useTheme();

    const debounceRef = useRef<any>();

    const handleTextChange = (value: string) => {
      if (props.onChangeText) {
        props.onChangeText(value);
      }

      if (props.debounce && props.onDebounce) {
        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
          debounceRef.current = undefined;
        }

        debounceRef.current = setTimeout(() => {
          props.onDebounce?.(value);
        }, props.debounce * 1000);
      }
    };

    return (
      <Wrapper>
        {!!props.label && <Label>{props.label}</Label>}

        <Box variant={props.variant} error={props.error}>
          {!!props.LeftIconProps && (
            <LeftIcon>
              <Icon {...props.LeftIconProps} />
            </LeftIcon>
          )}

          <Input
            ref={inputRef}
            placeholderTextColor={theme.colors.placeholder}
            value={props.value}
            onChangeText={handleTextChange}
            placeholder={
              props.placeholder == null ? props.label : props.placeholder
            }
            {...props.InputProps}
          />

          {!!props.RightIconProps && (
            <RightIcon>
              <Icon {...props.RightIconProps} />
            </RightIcon>
          )}
        </Box>
      </Wrapper>
    );
  },
);

export default CustomInput;
