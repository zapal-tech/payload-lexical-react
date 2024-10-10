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
            text: 'This is a headline',
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 1,
        type: 'heading',
        version: 1,
        tag: 'h1',
      },
    ],
  },
} as unknown as PayloadLexicalReactContent

describe('Testing custom heading', async () => {
  render(
    <PayloadLexicalReact
      elements={{
        ...defaultElements,
        heading: (element) => (
          <div data-testid="parent" className="parentClassName">
            <h1 className="childClassName">{element.children}</h1>
          </div>
        ),
      }}
      content={content}
    />,
  )

  const parent = screen.queryByTestId('parent')
  const text = parent?.firstChild

  // Post Expectations
  it('Should render the string input', () => {
    expect(text).toBeInTheDocument()
  })

  it('Should render the parent div', () => {
    expect(parent).toBeTruthy()
  })

  it('Should assign a className to the element', () => {
    expect(text).toHaveClass('childClassName')
  })

  it('Should assign a className to the parent', () => {
    expect(parent).toHaveClass('parentClassName')
  })
})
