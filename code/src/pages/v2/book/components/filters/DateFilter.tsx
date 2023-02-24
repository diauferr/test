import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { Badge, Button, Icon, Popover, Select, Spin } from 'antd';

import {
  BookNavBarContainer,
  BookNavBarDates,
  BookNavBarResults
} from '../../styles';
import { BookFiltersContext } from '../../BookFiltersContext';
import { RequestUtil } from '../../../../../util/RequestUtil';

export const DateFilter = () => {
  const { Option } = Select;

  const {
    dateData,
    dateError,
    dateLoaded,
    dateLoading,
    dateRI,
    dateVisible,
    setDateData,
    setDateError,
    setDateLoaded,
    setDateLoading,
    setDateRI,
    setDateVisible,
    updateData
  } = useContext(BookFiltersContext);

  const [start] = (dateData || []).filter(
    (e: { start: string | null }) => e.start
  );
  const [end] = (dateData || []).filter((e: { end: string | null }) => e.end);

  const fetchData = (query: string) => {
    const fetchId = dateRI;
    const url = `${process.env.REACT_APP_ENTITY_SEARCH}/book/filter/dates`;
    const options = {
      params: { query },
      headers: {
        Authorization: `Bearer ${RequestUtil._token}`,
        'Content-Type': 'application/json'
      }
    };

    if (setDateRI) setDateRI(dateRI + 1);

    if (fetchId !== dateRI) return setDateLoading(false);

    axios
      .get(url, options)
      .then((res) => {
        setDateData(res.data.map((e) => ({ ...e, start: false, end: false })));
        setDateLoading(false);
        setDateLoaded(true);
      })
      .catch(() => {
        if (setDateError) setDateError(true);
        if (setDateLoading) setDateLoading(false);
      });
  };

  const set = (sStart: string, sEnd: string) => {
    const a = parseInt(sStart);
    const b = parseInt(sEnd);

    if (a === 0 || b === 0) return;

    if (a > b) {
      (dateData || []).map((e) => {
        e.start = e.value === String(b);
        e.end = e.value === String(a);
        return e;
      });
    }

    updateData();
  };

  const reset = () => {
    setDateData(
      (dateData || []).map((e) => {
        e.start = false;
        e.end = false;
        return e;
      })
    );

    set('0', '0');
  };

  const onChangeStart = (val: string) => {
    if (!val.length) return reset();

    setDateData(
      (dateData || []).map((e) => {
        e.start = e.value === val;
        return e;
      })
    );

    set(val, end ? end.value : '0');
  };

  const onChangeEnd = (val: string) => {
    if (!val.length) return reset();

    setDateData(
      (dateData || []).map((e) => {
        e.end = e.value === val;
        return e;
      })
    );

    set(start ? start.value : '0', val);
  };

  const notFoundContent = dateLoading ? (
    <Spin size="small" />
  ) : (
    'Não encontrado'
  );

  const results = (
    <BookNavBarDates>
      <span>Entre </span>
      <Select
        filterOption={false}
        value={start ? start.value : undefined}
        notFoundContent={notFoundContent}
        onSelect={onChangeStart}
        placeholder="- Todos -"
        size="large">
        <Option key="0" value="" title="- Todos -">
          - Todos -
        </Option>
        {(dateData || []).map((d, i) => (
          <Option key={i} value={d.value} title={d.value}>
            {d.value}
          </Option>
        ))}
      </Select>
      <span> e </span>
      <Select
        filterOption={false}
        value={end ? end.value : undefined}
        notFoundContent={notFoundContent}
        onSelect={onChangeEnd}
        placeholder="- Todos -"
        size="large">
        <Option key="0" value="" title="- Todos -">
          - Todos -
        </Option>
        {(dateData || []).map((d, i) => (
          <Option key={i} value={d.value} title={d.value}>
            {d.value}
          </Option>
        ))}
      </Select>
    </BookNavBarDates>
  );

  const content = (
    <BookNavBarResults>
      {dateLoading ? <Icon type="loading" /> : null}
      {dateError ? (
        <div className="error">
          <Icon type="stop" /> Falha ao carregar os resultados
        </div>
      ) : null}
      {!dateLoading && !dateError ? (
        <div className="results">{results}</div>
      ) : null}
    </BookNavBarResults>
  );

  useEffect(() => {
    if (!dateLoaded) fetchData('');
  }, [dateVisible]);

  return (
    <BookNavBarContainer>
      <Popover
        trigger="click"
        placement="bottom"
        visible={dateVisible}
        content={content}
        onVisibleChange={() => setDateVisible(!dateVisible)}
        getPopupContainer={(trigger) => trigger}>
        <Button className="filter-btn">
          Data
          <Badge
            count={start || end ? 1 : 0}
            style={{
              backgroundColor: '#D7282F'
            }}
          />
        </Button>
      </Popover>
    </BookNavBarContainer>
  );
};
