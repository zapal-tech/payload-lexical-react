# Lexical to React JSX made easy

Designed for Payload CMS RichText Lexical editor. Rendering Lexical to React JSX.

## Install

```
npm i @zapal-tech/payload-lexical-react
```

## Basic Usage

```jsx
import {
  PayloadLexicalReact,
  PayloadLexicalReactProps
} from "@zapal-tech/payload-lexical-react";

const BlogPost = () => {
  const content = await fetchLexicalEditorState();

  return (
    <article>
      <PayloadLexicalReact content={content} />
    </article>
  );
}
```

Get started by passing your Lexical rich text serialized state to the component. Default setup renders the most basic
styles only. P.S.: You can use it with the `@tailwindcss/typography` package to instantly style your rich text.

## Properties

### elements

In order to customize the result, use the `elements` prop to override the default elements rendering behavior:

```jsx
import { defaultElements, PayloadLexicalReact } from '@zapal-tech/payload-lexical-react';

<PayloadLexicalReact
  content={content}
  elements={{
    ...defaultElements,
    heading: (props) => {
      const Component = props.tag;
      const style = { color: '#f84c0b', backgroundColor: '#000' };

      return <Component style={style}>{props.children}</Component>;
    },
    paragraph: (props) => <p className="custom-paragraph">{props.children}</p>,
  }}
/>;
```

### mark

To customize rendering of text marks like bold, italic etc., add your own `mark` function:

```jsx
import { PayloadLexicalReact } from '@zapal-tech/payload-lexical-react';

<PayloadLexicalReact
  content={content}
  mark={(mark) => {
    if (mark.bold) return <strong style={{ fontWeight: 'bold' }}>{mark.text}</strong>;
    if (mark.italic) return <span style={{ fontStyle: 'italic' }}>{mark.text}</span>;
    // Other marks go here if needed

    return <>{mark.text}</>;
  }}
/>;
```

### blocks

Payload CMS Lexical RichText Editor comes with BlocksFeature included. You can render custom blocks like this:

```jsx
import {
  BlockNode,
  PayloadLexicalReact,
} from "@zapal-tech/payload-lexical-react";

type HorizontalGutter = {
  text: string;
  large?: boolean;
};

 <PayloadLexicalReact<{ horizontalGutter: HorizontalGutter }>
  content={content}
  blocks={{
    horizontalGutter: (props) => (
      <div style={{ padding: props.fields.data.large ? '0 4rem' : '0 1rem' }}>
        {props.fields.data.text}
      </div>
    ),
  }}
/>
```
