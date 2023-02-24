export type BookIdParam = string | number;

export interface BookTag {
  title: string;
  id: string;
}

export interface BookContentTxts {
  chapter_id: number;
  page: number;
  content: string;
}

export interface BookContent {
  chapter_id: number;
  chapter_title: string;
  txts: BookContentTxts[];
}

export interface ContentHighlight {
  chapter_id: number;
  page: number;
  highlight: string[];
}

export interface Book {
  id: string;
  text_1: string;
  text_2: string;
  text_3: string;
  text_4: string;
  parent: string;
  tags: BookTag[];
  book_serie: BookTag;
  publish_date: string;
  contents: BookContent[];
  highlight_text_1: string[];
  highlight_text_2: string[];
  highlight_text_3: string[];
  highlight_text_4: string[];
  highlight_contents: ContentHighlight[];
}
