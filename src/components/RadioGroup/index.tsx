import React from 'react';
import { useTheme } from 'styled-components/native';
import Icon from '../Icon';
import { Content, IconWrapper, Label, RadioBox, RadioChecked } from './styles';

export type RadioGroupItem = {
  value: string;
  label: string;
};

export type RadioGroupProps = {
  value: string;
  items: RadioGroupItem[];
  onChange?: (item: RadioGroupItem) => void;
};

const RadioGroup: React.FC<RadioGroupProps> = props => {
  const theme = useTheme();

  return (
    <React.Fragment>
      {props.items.map(item => (
        <Content key={item.value} onPress={() => props.onChange?.(item)}>
          <RadioBox selected={item.value === props.value}>
            {item.value === props.value && (
              <RadioChecked>
                <IconWrapper>
                  <Icon
                    iconSet="IconSax"
                    name="tick-circle"
                    color={theme.colors.background}
                    size={26}
                  />
                </IconWrapper>
              </RadioChecked>
            )}
          </RadioBox>

          <Label>{item.label}</Label>
        </Content>
      ))}
    </React.Fragment>
  );
};

export default RadioGroup;
