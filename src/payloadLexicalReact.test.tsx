import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { PayloadLexicalReact } from './payloadLexicalReact'
import { PayloadLexicalReactContent } from './types'

const content = {
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    children: [
      {
        detail: 0,
        format: 0,
        mode: 'normal',
        style: '',
        text: 'Lorem ipsum',
        type: 'text',
        version: 1,
      },
    ],
    direction: 'ltr',
  },
}

describe('Simple test', () => {
  it('Should render the page with the correct text content', async () => {
    render(<PayloadLexicalReact content={content as PayloadLexicalReactContent} />)

    const text = screen.queryByText('Lorem ipsum')

    // Post Expectations
    expect(text).toBeInTheDocument()
  })
})
