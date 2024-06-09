import { defaultElements, PayloadLexicalReact, PayloadLexicalReactContent } from '@zapal/payload-lexical-react';
// import { CMSLink } from './CMSLink';
// import { Media } from './Media';
import { createElement } from 'react';

type LexicalRendererProps<Blocks> = {
  children: PayloadLexicalReactContent;
  blocks?: Blocks;
};

const getFormatting = (format?: string | number | null, dir?: string | null) => {
  let formatting: string = typeof format === 'string' ? format : '';

  if (['left', 'right'].includes(formatting)) {
    if (dir === 'ltr' || !dir) {
      if (formatting === 'left') formatting = 'start';
      if (formatting === 'right') formatting = 'end';
    }

    if (dir === 'rtl') {
      if (formatting === 'left') formatting = 'end';
      if (formatting === 'right') formatting = 'start';
    }
  }

  return formatting;
};

export const LexicalRenderer = <
  Blocks extends {
    [key: string]: any;
  },
>({
  children,
  blocks,
}: LexicalRendererProps<Blocks>) => (
  <PayloadLexicalReact<Blocks>
    content={children}
    elements={{
      ...defaultElements,
      listItem: ({ children, format, direction }) => {
        const formatting = getFormatting(format, direction);

        return <li className={`text-${formatting}`}>{children}</li>;
      },
      heading: ({ children, tag, direction, format }) => {
        const formatting = getFormatting(format, direction);

        return createElement(tag, { ...{ [formatting]: true } }, children);
      },
      paragraph: ({ children, direction, format }) => {
        const formatting = getFormatting(format, direction);

        return <p {...{ [formatting]: true }}>{children}</p>;
      },
      // link: ({ fields, children }) => (
      //   <CMSLink
      //     {...fields}
      //     type={fields.linkType}
      //     doc={fields.linkType === LinkType.Internal ? (fields.doc as LinkData['doc']) : undefined}
      //     url={fields.linkType === LinkType.Internal ? '' : fields.url}
      //   >
      //     {children}
      //   </CMSLink>
      // ),
      // autolink: ({ fields, children }) => <CMSLink {...(fields as any)}>{children}</CMSLink>,
      // upload: ({ value }) => <Media imgClassName="rounded-lg" resource={value as unknown as MediaType} unoptimized />,
    }}
    blocks={blocks}
  />
);
