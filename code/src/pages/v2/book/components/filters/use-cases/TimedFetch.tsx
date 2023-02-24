import axios from 'axios';
import React, { useEffect } from 'react';
import { Badge, Button, Checkbox, Icon, Input, Popover, Tag } from 'antd';

import { RequestUtil } from '../../../../../../util/RequestUtil';
import { BookNavBarContainer, BookNavBarResults } from '../../../styles';

let searchTimer: any;

export const TimedFetch = ({
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
  updateData,
  fetchOnMount
}) => {
  const { Search } = Input;

  const currentData = data || [];
  const selecteds = currentData.filter((e) => e.checked);

  const mergeSelectedWithData = (newData, oldSelected) => {
    if (!oldSelected.length) return newData;

    const selectedKeys = [...oldSelected].map((e) => e.key);
    const newDataFiltered = newData.filter(
      (e) => !selectedKeys.includes(e.key)
    );
    return [...oldSelected, ...newDataFiltered];
  };

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

    setRI(ri + 1);

    if (fetchId !== ri) return setLoading(false);

    axios
      .get(url, options)
      .then((res) => {
        setData(mergeSelectedWithData(res.data, selecteds));
        setError(false);
        setLoading(false);
        setLoaded(true);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  const onChangeSearch = (ev) => {
    const val = ev.target.value || '';
    setData(selecteds);
    setSearchValue(val);
    setLoading(true);
    setError(false);
    if (searchTimer) clearTimeout(searchTimer);
    searchTimer = setTimeout(() => fetchData(val.trim()), 750);
  };

  const onChangeCheckbox = (checked, item) => {
    const index = data.findIndex((e) => e.key === item.key);
    const upData = [...data];
    upData[index] = { ...item, checked };
    setData(upData);
    updateData();
  };

  const results = (data || []).map((d, i) => (
    <Checkbox
      key={i}
      checked={d.checked}
      onChange={(ev) => onChangeCheckbox(ev.target.checked, d)}>
      {d.value}
    </Checkbox>
  ));

  const tags = (data || []).map((d, i) => (
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
          {(searchValue || []).length && !(data || []).length ? (
            <div className="empty">
              <Icon type="info-circle" /> Sem resultados para "{searchValue}"
            </div>
          ) : null}

          {(data || []).length ? (
            <div className="results">{results}</div>
          ) : null}
        </>
      ) : null}
    </BookNavBarResults>
  );

  useEffect(() => {
    if ((fetchOnMount && !loaded) || (!loaded && error)) fetchData('');
  }, [visible]);

  return (
    <BookNavBarContainer>
      <Popover
        trigger="click"
        placement="bottom"
        visible={visible}
        content={content}
        onVisibleChange={() => (setVisible ? setVisible(!visible) : null)}
        getPopupContainer={(trigger) => trigger}>
        <Button className="filter-btn">
          {placeholder}
          <Badge count={selecteds.length} />
        </Button>
      </Popover>
    </BookNavBarContainer>
  );
};
