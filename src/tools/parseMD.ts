import marked from 'marked';

/**
 * Parse Markdown file from string
 * @param doc{string} Valid Markdown string
 * @return HTML string
 */
export const parseMD = (doc: string): string => marked(doc);
