import React, { useEffect, useMemo, useState } from 'react';
import DatePicker from 'react-native-date-picker';
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from 'styled-components/native';
import {
  ContentWrapper,
  DateContainer,
  FieldName,
  FieldSeparator,
  Input,
  InputContainer,
} from './styles';

export type ProfileInputProps = {
  type?: 'date' | 'time' | 'text';
  name: string;
  placeholder?: string;
  value: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  viewOnly?: boolean;
};

const ProfileInput: React.FC<ProfileInputProps> = ({
  type = 'text',
  ...props
}) => {
  const theme = useTheme();

  const [displayPicker, setDisplayPicker] = useState(false);

  const animatedValue = useSharedValue(0);

  const value = useMemo(() => {
    return new Date(props.value);
  }, [props.value]);

  const formattedValue = useMemo(() => {
    if (type === 'date') {
      return new Date(props.value).toLocaleDateString();
    }

    if (type === 'time') {
      return new Date(props.value).toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
      });
    }
    return props.value;
  }, [props.value, type]);

  const shouldDisplayPicker = useMemo(() => {
    return type !== 'text' && displayPicker;
  }, [type, displayPicker]);

  const handleFocus = () => {
    setDisplayPicker(true);

    props.onFocus?.();
  };

  const handleBlur = () => {
    animatedValue.value = withSpring(
      0,
      {
        damping: 1000,
      },
      finished => {
        if (!finished) {
          return;
        }

        runOnJS(setDisplayPicker)(false);
      },
    );
  };

  const handleChange = (value: string) => {
    if (type !== 'text') {
      return;
    }

    props.onChange?.(value);
  };

  useEffect(() => {
    if (!displayPicker) {
      return;
    }

    animatedValue.value = withSpring(1, {
      damping: 1000,
    });
  }, [displayPicker]);

  const animatedStyle = useAnimatedStyle(() => ({
    maxHeight: animatedValue.value * 200,
    opacity: animatedValue.value,
  }));

  return (
    <ContentWrapper>
      <InputContainer>
        <FieldName>{props.name}</FieldName>
        <FieldSeparator />
        <Input
          value={formattedValue}
          onChangeText={handleChange}
          placeholder={props.placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          showSoftInputOnFocus={type === 'text'}
        />
      </InputContainer>
      {shouldDisplayPicker && (
        <DateContainer style={animatedStyle}>
          <DatePicker
            date={value}
            mode={type}
            onDateChange={value => {
              props.onChange?.(value.toISOString());
            }}
            minuteInterval={30}
            textColor={theme.colors.secondary}
          />
        </DateContainer>
      )}
    </ContentWrapper>
  );
};

export default ProfileInput;
