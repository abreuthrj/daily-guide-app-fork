import React from 'react';
import { ListRenderItemInfo } from 'react-native';
import { IconWrapper, Item, ItemText, List, Separator } from './styles';

export type DropdownItem = {
  id: string;
  value: string;
};

export type DropdownProps = {
  items: DropdownItem[];
  autoSize?: boolean;
  onSelectItem?: (item: DropdownItem) => void;
  renderIcon?: React.ReactNode;
};

type RenderItemInfo = ListRenderItemInfo<DropdownItem>;

const Dropdown: React.FC<DropdownProps> = props => {
  const handleItemPress = (item: DropdownItem) => {
    if (props.onSelectItem) {
      props.onSelectItem(item);
    }
  };

  const renderItem = ({ item, index }: RenderItemInfo) => {
    return (
      <Item onPress={() => handleItemPress(item)}>
        {!!props.renderIcon && <IconWrapper>{props.renderIcon}</IconWrapper>}
        <ItemText numberOfLines={2}>{item.value}</ItemText>
      </Item>
    );
  };

  if (!props.items.length) {
    return null;
  }

  return (
    <List
      full={props.autoSize}
      data={props.items}
      keyExtractor={item => (item as DropdownItem).id}
      renderItem={info => renderItem(info as RenderItemInfo)}
      ItemSeparatorComponent={Separator}
      numberOfItems={props.items.length}
      keyboardShouldPersistTaps="handled"
    />
  );
};

export default Dropdown;
