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

describe('Testing custom list', async () => {
  render(
    <PayloadLexicalReact
      elements={{
        ...defaultElements,
        list: (element) => {
          if (element.listType === 'bullet')
            return (
              <ul role="list" aria-label="bullets" className={element.listType}>
                {element.children}
              </ul>
            )

          if (element.listType === 'number')
            return (
              <ol role="list" aria-label="numbered" className={element.listType}>
                {element.children}
              </ol>
            )
        },
      }}
      content={content}
    />,
  )

  const unorderedLists = screen.getAllByRole('list', { name: 'bullets' })
  const orderedLists = screen.getAllByRole('list', { name: 'numbered' })

  it('Should render the ul', () => {
    unorderedLists.map((ul) => expect(ul).toBeTruthy())
  })

  it('Should assign a className to the ul', () => {
    unorderedLists.map((ul) => expect(ul).toHaveClass('bullet'))
  })

  it('Should render the ol', () => {
    orderedLists.map((ol) => expect(ol).toBeTruthy())
  })

  it('Should assign a className to the ol', () => {
    orderedLists.map((ul) => expect(ul).toHaveClass('number'))
  })

  // screen.debug();
  screen.logTestingPlaygroundURL()
})
