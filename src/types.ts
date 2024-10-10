import type { SerializedListItemNode, SerializedListNode } from '@lexical/list'
import type { SerializedHeadingNode, SerializedQuoteNode } from '@lexical/rich-text'
import type {
  BlockFields,
  SerializedAutoLinkNode,
  SerializedBlockNode,
  SerializedLinkNode,
  SerializedUploadNode,
} from '@payloadcms/richtext-lexical'
import type {
  SerializedEditorState,
  SerializedLineBreakNode,
  SerializedParagraphNode,
  SerializedTabNode,
  SerializedTextNode,
} from 'lexical'
import type { PropsWithChildren } from 'react'

export type BlockNode<BlockData extends Record<string, unknown>, BlockType extends string> = Omit<
  SerializedBlockNode,
  'fields'
> & {
  fields: Omit<BlockFields, 'blockType'> & { blockType: BlockType } & BlockData
}

type UnknownBlockNode = SerializedBlockNode

export type MarkProps = {
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
  subscript?: boolean
  superscript?: boolean
  highlight?: boolean
}

type Media = {
  id: number | string
  alt: string
  prefix?: string | null
  updatedAt: string
  createdAt: string
  url?: string | null
  thumbnailURL?: string | null
  filename?: string | null
  mimeType?: string | null
  filesize?: number | null
  width?: number | null
  height?: number | null
}

type MediaWithSizes = Media & {
  sizes?: Record<
    string,
    | {
        url?: string | null
        width?: number | null
        height?: number | null
        mimeType?: string | null
        filesize?: number | null
        filename?: string | null
      }
    | undefined
  >
}

export type UploadNode = Omit<SerializedUploadNode, 'value'> & {
  value?: string | number | Media | MediaWithSizes
}

export type Node =
  | SerializedHeadingNode
  | SerializedParagraphNode
  | UploadNode
  | SerializedTextNode
  | SerializedListNode
  | SerializedListItemNode
  | SerializedQuoteNode
  | SerializedLineBreakNode
  | SerializedTabNode
  | SerializedLinkNode
  | UnknownBlockNode
  | BlockNode<Record<string, unknown>, string>
  | SerializedAutoLinkNode

export type Elements = {
  paragraph: (props: PropsWithChildren<Omit<SerializedParagraphNode, 'children'>>) => React.ReactNode
  heading: (props: PropsWithChildren<Omit<SerializedHeadingNode, 'children'>>) => React.ReactNode
  link: (props: PropsWithChildren<Omit<SerializedLinkNode, 'children'>>) => React.ReactNode
  autolink: (props: PropsWithChildren<Omit<SerializedAutoLinkNode, 'children'>>) => React.ReactNode
  list: (props: PropsWithChildren<Omit<SerializedListNode, 'children'>>) => React.ReactNode
  listItem: (props: PropsWithChildren<Omit<SerializedListItemNode, 'children'>>) => React.ReactNode
  lineBreak: () => React.ReactNode
  quote: (props: PropsWithChildren<Omit<SerializedQuoteNode, 'children'>>) => React.ReactNode
  tab: (props: PropsWithChildren<Omit<SerializedTabNode, 'children'>>) => React.ReactNode
  upload: (props: UploadNode) => React.ReactNode
}

export type Mark = (mark: MarkProps) => React.ReactNode

export type PayloadLexicalReactContent = SerializedEditorState

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PayloadLexicalReactProps<Blocks extends { [key: string]: any }> = {
  content: PayloadLexicalReactContent
  elements?: Elements
  mark?: Mark
  blocks?: {
    [BlockName in Extract<keyof Blocks, string>]?: (props: BlockNode<Blocks[BlockName], BlockName>) => React.ReactNode
  }
}
