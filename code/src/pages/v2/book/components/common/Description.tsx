import React from 'react';

export const Description = ({ item }) => {
  const description = (el: { text_3: string }) =>
    el && el.text_3 ? el.text_3.substring(0, 300) : '';

  if ('highlight_text_3' in item) {
    return item.highlight_text_3.map((e, i) => {
      const withoutMarks = e.replaceAll('<mark>', '').replaceAll('</mark>', '');
      const newDescription = item.text_3.replace(withoutMarks, e);
      return (
        <div
          key={i}
          className="description highlight_description"
          dangerouslySetInnerHTML={{
            __html: `${description({ text_3: newDescription })}...`
          }}
        />
      );
    });
  }

  return <p className="description">{description(item)}...</p>;
};
