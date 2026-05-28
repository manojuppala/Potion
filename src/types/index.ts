export interface Page {
  id: string
  parent_id: string | null
  title: string
  icon: string | null
  cover: string | null
  created_at: number
  updated_at: number
  deleted: number
}

export interface Block {
  id: string
  page_id: string
  parent_block_id: string | null
  type: BlockType
  content: string
  position: number
  props: string
  created_at: number
  updated_at: number
}

export type BlockType =
  | 'paragraph'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'heading4'
  | 'bulletList'
  | 'numberedList'
  | 'todoList'
  | 'quote'
  | 'divider'
  | 'code'
  | 'toggle'

export interface Database {
  id: string
  page_id: string
  schema_json: string
  created_at: number
  updated_at: number
}

export interface DatabaseRow {
  id: string
  database_id: string
  values_json: string
  created_at: number
  updated_at: number
}
