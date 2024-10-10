import type { SerializedListItemNode, SerializedListNode } from '@lexical/list'
import type { SerializedHeadingNode, SerializedQuoteNode } from '@lexical/rich-text'
import type { SerializedAutoLinkNode, SerializedBlockNode, SerializedLinkNode } from '@payloadcms/richtext-lexical'
import type { SerializedElementNode, SerializedParagraphNode, SerializedTextNode } from 'lexical'
import { Fragment, type CSSProperties } from 'react'

import type { Elements, Mark, Node, PayloadLexicalReactProps, UploadNode } from './types'

// This copy-and-pasted from somewhere in lexical here: https://github.com/facebook/lexical/blob/main/packages/lexical/src/LexicalConstants.ts
// Text node formatting
const IS_BOLD = 1
const IS_ITALIC = 1 << 1
const IS_STRIKETHROUGH = 1 << 2
const IS_UNDERLINE = 1 << 3
const IS_CODE = 1 << 4
const IS_SUBSCRIPT = 1 << 5
const IS_SUPERSCRIPT = 1 << 6
const IS_HIGHLIGHT = 1 << 7

const getElementStyle = ({ indent, format }: Pick<SerializedElementNode, 'format' | 'indent'>): React.CSSProperties => {
  const style: React.CSSProperties = {}

  if (indent && indent > 0) style.marginInlineStart = `${indent * 1.5}rem`
  if (format === 'right' || format === 'center' || format === 'justify') style.textAlign = format

  return style
}

export const defaultElements: Elements = {
  heading: (element) => {
    const Tag = element.tag

    return <Tag style={getElementStyle(element)}>{element.children}</Tag>
  },
  list: (element) => {
    const Tag = element.tag

    return <Tag style={getElementStyle(element)}>{element.children}</Tag>
  },
  listItem: (element) => <li style={getElementStyle(element)}>{element.children}</li>,
  paragraph: (element) => <p style={getElementStyle(element)}>{element.children}</p>,
  link: (element) => (
    <a href={element.fields.url} target={element.fields.newTab ? '_blank' : '_self'} style={getElementStyle(element)}>
      {element.children}
    </a>
  ),
  autolink: (element) => (
    <a href={element.fields.url} target={element.fields.newTab ? '_blank' : '_self'} style={getElementStyle(element)}>
      {element.children}
    </a>
  ),
  quote: (element) => <blockquote style={getElementStyle(element)}>{element.children}</blockquote>,
  lineBreak: () => <br />,
  tab: () => <br />,
  upload: (element) => {
    if (typeof element.value === 'object' && element.value.url && element.value.mimeType?.includes('image'))
      return <img src={element.value.url} alt={element.value.alt} />

    return null
  },
}

export const defaultMark: Mark = ({ text, ...mark }) => {
  const style: CSSProperties = {}

  if (mark.bold) style.fontWeight = 'bold'
  if (mark.italic) style.fontStyle = 'italic'
  if (mark.underline) style.textDecoration = 'underline'
  if (mark.strikethrough) style.textDecoration = 'line-through'
  if (mark.code) return <code>{text}</code>
  if (mark.highlight) return <mark style={style}>{text}</mark>
  if (mark.subscript) return <sub style={style}>{text}</sub>
  if (mark.superscript) return <sup style={style}>{text}</sup>
  if (!Object.keys(style)) return <>{text}</>

  return <span style={style}>{text}</span>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PayloadLexicalReact<Blocks extends { [key: string]: any }>({
  content,
  elements = defaultElements,
  mark = defaultMark,
  blocks = {},
}: PayloadLexicalReactProps<Blocks>) {
  const renderElement = (node: Node, children?: React.ReactNode) => {
    if (!elements) throw new Error("'elements' prop not provided.")

    if (node.type === 'link' && (node as SerializedLinkNode).fields)
      return elements.link({ ...(node as SerializedLinkNode), children })
    if (node.type === 'autolink' && (node as SerializedAutoLinkNode).fields)
      return elements.autolink({ ...(node as SerializedAutoLinkNode), children })
    if (node.type === 'heading') return elements.heading({ ...(node as SerializedHeadingNode), children })
    if (node.type === 'paragraph') return elements.paragraph({ ...(node as SerializedParagraphNode), children })
    if (node.type === 'list') return elements.list({ ...(node as SerializedListNode), children })
    if (node.type === 'listitem') return elements.listItem({ ...(node as SerializedListItemNode), children })
    if (node.type === 'quote') return elements.quote({ ...(node as SerializedQuoteNode), children })
    if (node.type === 'linebreak') return elements.lineBreak()
    if (node.type === 'tab') return elements.tab(node as SerializedTextNode)
    if (node.type === 'upload') return elements.upload(node as UploadNode)

    throw new Error(`Missing element renderer for node type '${node.type}'`)
  }

  const renderText = (node: SerializedTextNode): React.ReactNode | null => {
    if (!mark) throw new Error("'mark' prop not provided.")

    if (!node.format) return mark({ text: node.text })

    return mark({
      text: node.text,
      bold: (node.format & IS_BOLD) > 0,
      italic: (node.format & IS_ITALIC) > 0,
      underline: (node.format & IS_UNDERLINE) > 0,
      strikethrough: (node.format & IS_STRIKETHROUGH) > 0,
      code: (node.format & IS_CODE) > 0,
      subscript: (node.format & IS_SUBSCRIPT) > 0,
      superscript: (node.format & IS_SUPERSCRIPT) > 0,
      highlight: (node.format & IS_HIGHLIGHT) > 0,
    })
  }

  const serialize = (children: Node[]): React.ReactNode[] | null => {
    if (!children || !Array.isArray(children)) return null

    return children.map((node, index) => {
      if (node.type === 'text') return <Fragment key={index}>{renderText(node as SerializedTextNode)}</Fragment>

      if (node.type === 'block') {
        const blockNode = node as SerializedBlockNode
        const renderer = blocks[blockNode.fields.blockType] as (props: unknown) => React.ReactNode

        if (typeof renderer !== 'function')
          throw new Error(`Missing block renderer for block type '${blockNode.fields.blockType}'`)

        return <Fragment key={index}>{renderer(node)}</Fragment>
      }

      if (node.type === 'linebreak' || node.type === 'tab' || node.type === 'upload')
        return <Fragment key={index}>{renderElement(node)}</Fragment>

      return (
        <Fragment key={index}>{renderElement(node, serialize((node as Record<'children', Node[]>)?.children || []))}</Fragment>
      )
    })
  }

  return <>{serialize(content.root.children)}</>
}
