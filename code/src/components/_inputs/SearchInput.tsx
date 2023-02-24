import React from 'react';
import styled from 'styled-components';

const TextInputSearch = styled.input`
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-right: 0;
  padding: 3px 21px 3px 8px;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  outline: none;
  width: 200px;
`;

const ButtonSearch = styled.input`
  border: 1px solid rgba(0, 0, 0, 0.4);
  width: 2rem;
  height: 2rem;
  border-left: 0;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  padding: 5px;
  outline: none;
`;

const ClearButton = styled.span`
  position: absolute;
  right: 5px;
  bottom: 9px;
  font-size: 8px;
  border-radius: 50%;
  cursor: pointer;
  background: #c3c3c3;
  color: #fff;
  text-align: center;
  width: 12px;
  height: 12px;
  transition: background 0.3s;

  &:hover {
    background: #595959;
  }
`;

interface IProps {
  doSearch: (words: string) => any;
  labelText: string;
  onChange: (value: string) => any;
  value: string;
}

export const SearchInput = ({
  doSearch,
  labelText,
  onChange,
  value
}: IProps) => (
  <div style={{ alignItems: 'center', display: 'flex' }}>
    <label style={{ marginRight: '1rem' }}>{labelText}</label>
    <div style={{ position: 'relative' }}>
      <TextInputSearch
        type="text"
        placeholder="Informe sua busca"
        onKeyPress={(evt) => {
          if (evt.key === 'Enter') {
            doSearch(value);
          }
        }}
        onChange={(evt) => onChange(evt.target.value)}
        value={value}
      />
      {!!value && (
        <ClearButton
          onClick={() => {
            onChange('');
            doSearch('');
          }}>
          X
        </ClearButton>
      )}
    </div>
    <ButtonSearch
      type="image"
      src="/assets/images/search-magnifying-glass.svg"
      onClick={() => doSearch(value)}
    />
  </div>
);
