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
        type: 'relationship',
        version: 1,
        format: '',
        fields: null,
        relationTo: 'pages',
        value: '42',
      },
    ],
  },
} as unknown as PayloadLexicalReactContent

describe('Testing custom relationship renderer', () => {
  it('Should render a custom relationship element', () => {
    render(
      <PayloadLexicalReact
        content={content}
        elements={{
          ...defaultElements,
          relationship: (element) => <span data-testid="custom-relationship">{`${element.relationTo}:${element.value}`}</span>,
        }}
      />,
    )

    expect(screen.getByTestId('custom-relationship')).toHaveTextContent('pages:42')
  })
})
