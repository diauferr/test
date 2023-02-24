import React from 'react';
import { Video } from '../../interfaces/Video';

export const Description = ({ item }) => {
  if ('highlight_description' in item) {
    return item.highlight_description.map((e, i) => (
      <div
        key={i}
        className="description highlight_description"
        dangerouslySetInnerHTML={{ __html: `${e}...` }}
      />
    ));
  }

  const description = (el: Video) => el.description.substring(0, 300);
  return <p className="description">{description(item)}...</p>;
};
