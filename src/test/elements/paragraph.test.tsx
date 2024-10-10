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
            text: 'This is a paragraph',
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 1,
        type: 'paragraph',
        version: 1,
      },
    ],
  },
} as unknown as PayloadLexicalReactContent

describe('Testing custom heading', async () => {
  render(
    <PayloadLexicalReact
      elements={{
        ...defaultElements,
        paragraph: (element) => (
          <div data-testid="parent" className="parentClassName">
            <p className="childClassName">{element.children}</p>
          </div>
        ),
      }}
      content={content}
    />,
  )

  const parent = screen.queryByTestId('parent')
  const text = parent?.firstChild

  screen.debug()

  // Post Expectations
  it('Should display the string input', () => {
    expect(text).toBeInTheDocument()
  })

  it('Should render the parent div', () => {
    expect(parent).toBeTruthy()
  })

  it('Should assign a className to the p element', () => {
    expect(text).toHaveClass('childClassName')
  })

  it('Should assign a className to the parent div', () => {
    expect(parent).toHaveClass('parentClassName')
  })

  it('Should nest correctly', () => {
    expect(parent?.tagName).not.toBe(/span/i)
  })
})
