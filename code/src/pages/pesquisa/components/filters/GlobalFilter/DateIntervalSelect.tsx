import React, { useState, useEffect, useContext } from 'react';
import { SearchDateInterval } from '../../../enums/SearchDateInterval';
import { useSearchFilter } from '../../../hooks/useSearchFilter';
import { NavbarContext } from '../../../../../components/_shell/NavbarFilters/NavbarContext';
import { Dropdown, Menu, Button } from 'antd';

import styled from 'styled-components';
import IconArrow from '../../../../../assets/images/icon-arrow-down.svg';

const Icon = styled.img`
  width: 16px;
  height: 16px;
  margin-left: 4px;
`;

export const DateIntervalSelect = () => {
  const { filter, changeFilter } = useSearchFilter();

  const { dateIntervalScope, getDateIntervalScope } = useContext(NavbarContext);

  const [selected, setSelected] = useState('Em todas as datas');

  useEffect(() => {
    setSelected(dateIntervalScope);
  }, []);

  useEffect(() => {
    getDateIntervalScope(selected);
  }, [selected]);

  const handleSelectedOption = ({ key }) => {
    if (key === '0') {
      filter.dateInterval = key;
      filter.monthYearInitial = '';
      filter.MonthYearEnd = '';
      changeFilter(filter);
      setSelected('Em todas as datas');
    }

    if (key === '3') {
      filter.dateInterval = key;
      filter.monthYearInitial = '';
      filter.MonthYearEnd = '';
      changeFilter(filter);
      setSelected('Nos últimos 2 anos');
    }

    if (key === '4') {
      filter.dateInterval = key;
      filter.monthYearInitial = '';
      filter.MonthYearEnd = '';
      changeFilter(filter);
      setSelected('Nos últimos 5 anos');
    }

    if (key === '5') {
      filter.dateInterval = key;
      filter.monthYearInitial = '';
      filter.MonthYearEnd = '';
      changeFilter(filter);
      setSelected('Nos últimos 10 anos');
    }
  };

  const menu = (
    <Menu onClick={handleSelectedOption}>
      <Menu.Item key={SearchDateInterval.ALL}>Em todas as datas</Menu.Item>
      <Menu.Item key={SearchDateInterval.IN_THE_LAST_TWO_YEARS}>
        Nos últimos 2 anos
      </Menu.Item>
      <Menu.Item key={SearchDateInterval.IN_THE_LAST_FIVE_YEARS}>
        Nos últimos 5 anos
      </Menu.Item>
      <Menu.Item key={SearchDateInterval.IN_THE_LAST_TEN_YEARS}>
        Nos últimos 10 anos
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
      <Button style={{ borderRadius: '10px', marginLeft: '8px' }}>
        {selected} <Icon src={IconArrow} />
      </Button>
    </Dropdown>
  );
};
