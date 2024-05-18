import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { defaultElements, PayloadLexicalReact } from '../../payloadLexicalReact';
import { PayloadLexicalReactContent } from '../../types';

const content = {
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: 'This is a quote',
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 1,
        type: 'quote',
        version: 1,
      },
    ],
  },
} as any as PayloadLexicalReactContent;

describe('Testing custom quote', async () => {
  render(
    <PayloadLexicalReact
      elements={{
        ...defaultElements,
        quote: (element) => (
          <div data-testid="parent" className="parentClassName">
            <blockquote className="childClassName">{element.children}</blockquote>
          </div>
        ),
      }}
      content={content}
    />,
  );

  const parent = screen.queryByTestId('parent');
  const text = parent?.firstChild;

  screen.debug();

  // Post Expectations
  it('Should render the string input inside a <blockquote>', () => {
    expect(text).toBeInTheDocument();
  });

  it('Should render the parent div', () => {
    expect(parent).toBeTruthy();
  });

  it('Should assign a className to the blockquote element', () => {
    expect(text).toHaveClass('childClassName');
  });

  it('Should assign a className to the parent div', () => {
    expect(parent).toHaveClass('parentClassName');
  });
});
