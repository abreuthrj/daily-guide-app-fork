import React from 'react';

export type TagHandlerExtractor = {
  tag: string;
  replace?: Record<string, string>;
  component: React.FC<React.PropsWithChildren>;
};

export type TagHandlerProps = {
  parentComponent: React.FC<React.PropsWithChildren>;
  value: string;
  extract: TagHandlerExtractor[];
};

const TagHandler: React.FC<TagHandlerProps> = props => {
  const ParentComponent = props.parentComponent;

  const children: {
    value: string;
    Component: React.FC<React.PropsWithChildren>;
  }[] = [];

  props.extract.forEach(extract => {
    const regexp = new RegExp(`<${extract.tag}>([^<]*)<\/${extract.tag}>`);
    let match = props.value.match(regexp);

    while (match) {
      let [all, content] = match;

      const [left, right] = props.value.split(all);
      children.push({ value: left, Component: React.Fragment });
      props.value = right;

      children.push({ value: content, Component: extract.component });

      match = props.value.match(regexp);
    }
  });

  if (props.value) {
    children.push({ value: props.value, Component: React.Fragment });
  }

  return (
    <ParentComponent>
      {children.map(({ value, Component }, i) => (
        <Component key={i}>{value}</Component>
      ))}
    </ParentComponent>
  );
};

export default TagHandler;
