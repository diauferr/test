import { Input } from 'antd';
import React, { useState } from 'react';

interface IProps {
  onSearch: (words: string) => any;
  buttonText: string;
}

export const SearchInContentButton = ({ onSearch, buttonText }: IProps) => {
  const [search, setSearch] = useState('');

  return (
    <div style={{ width: 250 }}>
      <Input.Search
        placeholder={buttonText}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onSearch={() => onSearch(search)}
        enterButton
      />
    </div>
  );
};
