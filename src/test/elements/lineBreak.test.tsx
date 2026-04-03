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
            text: 'Before break',
            type: 'text',
            version: 1,
          },
          {
            type: 'linebreak',
            version: 1,
          },
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: 'After break',
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

describe('Testing custom linebreak renderer', () => {
  it('Should render a custom linebreak element', () => {
    render(
      <PayloadLexicalReact
        content={content}
        elements={{
          ...defaultElements,
          lineBreak: () => <span data-testid="custom-linebreak" aria-hidden="true" />,
        }}
      />,
    )

    expect(screen.getByText('Before break')).toBeInTheDocument()
    expect(screen.getByTestId('custom-linebreak')).toBeInTheDocument()
    expect(screen.getByText('After break')).toBeInTheDocument()
  })
})
