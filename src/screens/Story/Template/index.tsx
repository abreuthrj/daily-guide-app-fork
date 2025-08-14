import { NODE_TYPE, ParsedTree, parseTags } from '#/utils/tags';
import React, { useMemo } from 'react';

import * as Styled from './styles';

export type TemplateProps = {
  template: string;
};

const Template: React.FC<TemplateProps> = props => {
  const tree = useMemo(() => {
    if (!props.template) {
      return [];
    }
    const response = parseTags(props.template);
    return response;
  }, [props.template]);

  const RecursiveRender: React.FC<ParsedTree[number]> = props => {
    const Component: React.FC =
      Styled[props.component as keyof typeof Styled] || Styled.NotFound;

    const params: any = {};

    if (
      props.type === NODE_TYPE.LEAF &&
      (props.children as string).match(/https?:\/\//)
    ) {
      params.source = { uri: props.children };
      props.children = '';
    }

    return (
      <Component {...params}>
        {props.type === NODE_TYPE.LEAF
          ? props.children
          : (props.children as ParsedTree).map((node, i) => (
              <RecursiveRender
                key={`child-${i}`}
                component={node.component}
                children={node.children}
                type={node.type}
              />
            ))}
      </Component>
    );
  };

  return (
    <>
      {tree.map((node, i) => (
        <RecursiveRender
          key={`root-${i}`}
          component={node.component}
          children={node.children}
          type={node.type}
        />
      ))}
    </>
  );
};

export default Template;
