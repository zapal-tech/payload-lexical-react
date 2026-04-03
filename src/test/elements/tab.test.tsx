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
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: 'Before tab',
            type: 'text',
            version: 1,
          },
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: '\t',
            type: 'tab',
            version: 1,
          },
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: 'After tab',
            type: 'text',
            version: 1,
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

describe('Testing custom tab renderer', () => {
  it('Should render a custom tab element', () => {
    render(
      <PayloadLexicalReact
        content={content}
        elements={{
          ...defaultElements,
          tab: () => (
            <span data-testid="custom-tab" aria-hidden="true">
              \u00A0\u00A0
            </span>
          ),
        }}
      />,
    )

    expect(screen.getByText('Before tab')).toBeInTheDocument()
    expect(screen.getByTestId('custom-tab')).toBeInTheDocument()
    expect(screen.getByText('After tab')).toBeInTheDocument()
  })
})
