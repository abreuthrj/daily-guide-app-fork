import React, { PropsWithChildren } from 'react';
import { Bullet, Text, Wrapper } from './styles';

const ListItem: React.FC<PropsWithChildren> = props => {
  return (
    <Wrapper>
      <Bullet />
      <Text>{props.children}</Text>
    </Wrapper>
  );
};

export default ListItem;
