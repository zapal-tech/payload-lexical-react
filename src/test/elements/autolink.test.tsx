import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { defaultElements, PayloadLexicalReact } from '../../payloadLexicalReact'
import { PayloadLexicalReactContent } from '../../types'

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
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Auto link text',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'autolink',
            version: 1,
            fields: {
              url: 'https://payloadcms.com/docs',
              newTab: true,
              linkType: 'custom',
            },
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      },
    ],
  },
} as unknown as PayloadLexicalReactContent

describe('Testing custom autolink renderer', () => {
  it('Should render custom autolink attributes', () => {
    render(
      <PayloadLexicalReact
        content={content}
        elements={{
          ...defaultElements,
          autolink: (element) => (
            <a
              href={element.fields.url}
              target={element.fields.newTab ? '_blank' : '_self'}
              rel="noreferrer"
              data-testid="custom-autolink"
            >
              {element.children}
            </a>
          ),
        }}
      />,
    )

    const link = screen.getByTestId('custom-autolink')

    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://payloadcms.com/docs')
    expect(link).toHaveAttribute('target', '_blank')
  })
})
