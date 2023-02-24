import * as _highlightWords from 'highlight-words-core';

export function highlightWords(words: string, textToHighlight: string) {
  if (!words) {
    return textToHighlight;
  }

  try {
    return _highlightWords
      .findAll({
        searchWords: words.replace('\\', '').split(' '),
        textToHighlight
      })
      .map((chunk) => {
        const { end, highlight, start } = chunk;
        const text = textToHighlight.substr(start, end - start);

        return highlight ? `<mark>${text}</mark>` : text;
      })
      .join('');
  } catch (error) {
    return textToHighlight;
  }
}
