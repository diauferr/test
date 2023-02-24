import axios from 'axios';
import React, { useEffect } from 'react';
import { Badge, Button, Checkbox, Icon, Input, Popover, Tag } from 'antd';

import { RequestUtil } from '../../../../../../util/RequestUtil';
import { BookNavBarContainer, BookNavBarResults } from '../../../styles';

export const OneTimeFetch = ({
  segment,
  placeholder,
  visible,
  searchValue,
  loading,
  loaded,
  error,
  data,
  ri,
  setVisible,
  setSearchValue,
  setLoading,
  setLoaded,
  setError,
  setData,
  setRI,
  updateData
}) => {
  const { Search } = Input;

  const fetchData = (query: string) => {
    const fetchId = ri;
    const url = `${process.env.REACT_APP_ENTITY_SEARCH}/book/filter/${segment}`;
    const options = {
      params: { query },
      headers: {
        Authorization: `Bearer ${RequestUtil._token}`,
        'Content-Type': 'application/json'
      }
    };

    if (setRI) setRI(ri + 1);

    if (fetchId !== ri) return setLoading(false);

    axios
      .get(url, options)
      .then((res) => {
        setData(res.data.map((e) => ({ ...e, checked: false })));
        setError(false);
        setLoading(false);
        setLoaded(true);
      })
      .catch(() => {
        if (setError) setError(true);
        if (setLoading) setLoading(false);
      });
  };

  const onChangeSearch = (ev) => {
    const val = ev.target.value || '';
    setSearchValue(val);
  };

  const onChangeCheckbox = (checked, item) => {
    const index = data.findIndex((e) => e.key === item.key);
    const upData = [...data];
    upData[index] = { ...item, checked };
    setData(upData);
    updateData();
  };

  const currentData = data || [];
  const selecteds = currentData.filter((e) => e.checked) || [];
  const searchResults = currentData.filter((e) =>
    e.value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .includes(
        searchValue
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
      )
  );

  const results = searchResults.map((d, i) => (
    <Checkbox
      key={i}
      checked={d.checked}
      onChange={(ev) => onChangeCheckbox(ev.target.checked, d)}>
      {d.value}
    </Checkbox>
  ));

  const tags = currentData.map((d, i) => (
    <Tag
      key={i}
      closable
      visible={d.checked}
      onClose={() => onChangeCheckbox(false, d)}>
      {d.value}
    </Tag>
  ));

  const content = (
    <BookNavBarResults>
      {selecteds.length ? <div className="selecteds">{tags}</div> : null}
      <Search
        autoFocus
        className="filter-search"
        placeholder={`Buscar ${placeholder.toLowerCase()}`}
        value={searchValue}
        onChange={onChangeSearch}
      />
      {loading ? <Icon type="loading" /> : null}
      {error ? (
        <div className="error">
          <Icon type="stop" /> Falha ao carregar os resultados
        </div>
      ) : null}
      {!loading && !error ? (
        <>
          {(searchValue || []).length && !(searchResults || []).length ? (
            <div className="empty">
              <Icon type="info-circle" /> Sem resultados para "{searchValue}"
            </div>
          ) : (
            <div className="results">{results}</div>
          )}
        </>
      ) : null}
    </BookNavBarResults>
  );

  useEffect(() => {
    if (!loaded || (!loaded && error)) fetchData('');
  }, [visible]);

  return (
    <BookNavBarContainer>
      <Popover
        trigger="click"
        placement="bottom"
        visible={visible}
        content={content}
        onVisibleChange={() => setVisible(!visible)}
        getPopupContainer={(trigger) => trigger}>
        <Button className="filter-btn">
          {placeholder}
          <Badge count={selecteds.length} />
        </Button>
      </Popover>
    </BookNavBarContainer>
  );
};
