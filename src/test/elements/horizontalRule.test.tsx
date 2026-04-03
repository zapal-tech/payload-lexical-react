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
        type: 'horizontalrule',
        version: 1,
      },
    ],
  },
} as unknown as PayloadLexicalReactContent

describe('Testing custom horizontal rule renderer', () => {
  it('Should render a custom horizontal rule element', () => {
    render(
      <PayloadLexicalReact
        content={content}
        elements={{
          ...defaultElements,
          horizontalRule: () => <div data-testid="custom-horizontal-rule" role="separator" />,
        }}
      />,
    )

    expect(screen.getByTestId('custom-horizontal-rule')).toBeInTheDocument()
  })
})
