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
                children: [
                  {
                    children: [
                      {
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Foo',
                        type: 'text',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 1,
                    type: 'listitem',
                    version: 1,
                    value: 1,
                  },
                  {
                    children: [
                      {
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Bar',
                        type: 'text',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 1,
                    type: 'listitem',
                    version: 1,
                    value: 2,
                  },
                  {
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
                                text: 'Baz',
                                type: 'text',
                                version: 1,
                              },
                            ],
                            direction: 'ltr',
                            format: '',
                            indent: 2,
                            type: 'listitem',
                            version: 1,
                            value: 1,
                          },
                          {
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
                                        text: 'Foo',
                                        type: 'text',
                                        version: 1,
                                      },
                                    ],
                                    direction: 'ltr',
                                    format: '',
                                    indent: 3,
                                    type: 'listitem',
                                    version: 1,
                                    value: 1,
                                  },
                                  {
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
                                                text: 'Bar',
                                                type: 'text',
                                                version: 1,
                                              },
                                            ],
                                            direction: 'ltr',
                                            format: '',
                                            indent: 4,
                                            type: 'listitem',
                                            version: 1,
                                            value: 1,
                                          },
                                        ],
                                        direction: 'ltr',
                                        format: '',
                                        indent: 0,
                                        type: 'list',
                                        version: 1,
                                        listType: 'number',
                                        start: 1,
                                        tag: 'ol',
                                      },
                                    ],
                                    direction: 'ltr',
                                    format: '',
                                    indent: 3,
                                    type: 'listitem',
                                    version: 1,
                                    value: 2,
                                  },
                                ],
                                direction: 'ltr',
                                format: '',
                                indent: 0,
                                type: 'list',
                                version: 1,
                                listType: 'bullet',
                                start: 1,
                                tag: 'ul',
                              },
                            ],
                            direction: 'ltr',
                            format: '',
                            indent: 2,
                            type: 'listitem',
                            version: 1,
                            value: 2,
                          },
                        ],
                        direction: 'ltr',
                        format: '',
                        indent: 0,
                        type: 'list',
                        version: 1,
                        listType: 'bullet',
                        start: 1,
                        tag: 'ul',
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 1,
                    type: 'listitem',
                    version: 1,
                    value: 3,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'list',
                version: 1,
                listType: 'bullet',
                start: 1,
                tag: 'ul',
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'listitem',
            version: 1,
            value: 1,
          },
        ],
        direction: null,
        format: '',
        indent: 0,
        type: 'list',
        version: 1,
        listType: 'bullet',
        start: 1,
        tag: 'ul',
      },
    ],
  },
} as unknown as PayloadLexicalReactContent

describe('Testing custom listItem', async () => {
  render(
    <PayloadLexicalReact
      elements={{
        ...defaultElements,
        listItem: (element) => <li className={element.type}>{element.children}</li>,
      }}
      content={content}
    />,
  )

  const listItems = screen.getAllByRole('listitem')

  it('Should render a list item', () => {
    listItems.map((li) => expect(li).toBeTruthy())
  })

  it('Should assign a className to the list item', () => {
    listItems.map((li) => expect(li).toHaveClass('listitem'))
  })

  it('Should nest list items correctly', () => {
    listItems.map((li) => {
      const parent = li.parentElement

      if (parent) expect(parent.tagName).toMatch(/(ol|ul)/i)
      if (!parent) expect(li).toThrow('Cannot use <li> tag outside <ol> or <ul>')
    })
  })

  screen.debug()
})
