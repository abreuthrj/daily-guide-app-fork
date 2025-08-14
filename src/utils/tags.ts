export const NODE_TYPE = {
  ROOT: 'root',
  NODE: 'node',
  LEAF: 'leaf',
};

export type ParsedTree = {
  component: string;
  children: ParsedTree | string;
  type: (typeof NODE_TYPE)[keyof typeof NODE_TYPE];
}[];

export type Pile = Array<string | null>;

export const stripTags = (str: string | null) => {
  if (!str) {
    return '';
  }

  return str.replace(/<\/?|>/g, '');
};

export const parseTags = (template: string): ParsedTree => {
  const input = template.replace(/\n/g, '').replace(/> +</g, '><');

  const openPile: Pile = [];
  const closePile: Pile = [];

  const matcher = input.match(/<([^>]+)>/g);

  if (!matcher) {
    return [];
  }

  matcher.forEach(match => {
    if (match.match(/<\/[^>]+>/g)) {
      closePile.push(match);
    } else {
      openPile.push(match);
    }
  });

  let reducer = input;

  const mountTree = (
    openPile: Pile,
    closePile: Pile,
    startKey = 0,
  ): ParsedTree => {
    let children: ParsedTree = [];

    for (
      let key = startKey;
      key < openPile.length && closePile.length > 0;
      key++
    ) {
      const open = openPile[key];

      if (!open) {
        continue;
      }

      // console.log('INIT OF INTERACTION', openPile, closePile, startKey);

      let stripped = stripTags(open);

      if (
        startKey > 0 &&
        stripTags(openPile[startKey - 1]) === stripTags(closePile[0])
      ) {
        return children;
      } else if (stripped !== stripTags(closePile[0])) {
        const subTree = mountTree(openPile, closePile, key + 1);

        if (subTree.length) {
          children.push({
            component: stripped,
            children: subTree,
            type: startKey === 0 ? NODE_TYPE.ROOT : NODE_TYPE.NODE,
          });
        }

        if (stripped === stripTags(closePile[0])) {
          openPile[key] = null;
          closePile.shift();
        }
      } else {
        const isolated = reducer.split(closePile[0] || '')[0].split(open);
        const content = isolated[isolated.length - 1];

        reducer = reducer.replace([open, content, closePile[0]].join(''), '');

        openPile[key] = null;
        closePile.shift();

        children.push({
          component: stripped,
          children: content,
          type: NODE_TYPE.LEAF,
        });
      }
    }

    return children;
  };

  const mountedTree = mountTree(openPile, closePile);
  return mountedTree;
};
