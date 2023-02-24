import React, { useContext } from 'react';
import {
  Badge as badge,
  Button,
  Checkbox,
  Icon,
  Input,
  Popover,
  Select
} from 'antd';
import debounce from 'lodash.debounce';
import styled from 'styled-components';
import { BookNavBarAdvanced, BookNavBarContainer } from '../../styles';
import { BookFiltersContext } from '../../BookFiltersContext';
import iconFilter from '../../../../../assets/images/icon-settings.svg';

type AdvancedOptions = ['AND', 'NOT'];

const debouncedUpdate = debounce((updateData) => updateData(), 750);

const Badge = styled(badge)`
  .ant-badge-count {
    background-color: #d7282f;
    color: #fff !important;
  }

  .ant-scroll-number-only-unit {
    color: #fff !important;
  }
`;

export const AdvancedFilter = () => {
  const { Option } = Select;
  const {
    updateData,
    advancedVisible,
    advancedData,
    setAdvancedVisible,
    setAdvancedData
  } = useContext(BookFiltersContext);

  const options: AdvancedOptions = ['AND', 'NOT'];
  const AdvancedOptionsLabel = {
    AND: 'QUE CONTENHA',
    NOT: 'QUE NÃO CONTENHA'
  };

  const changeTextFrom = (val: any, index: number) => {
    const up = [...advancedData];
    up[index].text = val;
    setAdvancedData(up);
    debouncedUpdate(updateData);
  };

  const changeTypeFrom = (val: any, index: number) => {
    const up = [...advancedData];
    up[index].type = val;
    setAdvancedData(up);
    if (up[index].text.length > 0) updateData();
  };

  const changeCheckboxFrom = (val: any, index: number) => {
    const up = [...advancedData];
    up[index].exact = val;
    setAdvancedData(up);
    if (up[index].text.length > 0) updateData();
  };

  const del = (index: number) => {
    const up = [...advancedData];
    up.splice(index, 1);
    if (up.length === 1) up[0].type = 'AND';
    setAdvancedData(up);
    updateData();
  };

  const add = () =>
    setAdvancedData([...advancedData, { type: 'AND', text: '', exact: false }]);

  const content = (
    <BookNavBarAdvanced>
      {(advancedData || []).map((d, i) => (
        <div key={i} className="mt-5">
          <div className="justify-center">
            <Select
              onSelect={(e) => changeTypeFrom(e, i)}
              filterOption={false}
              defaultValue={d.type}
              style={{
                width: 215,
                marginRight: 10
              }}>
              {options.map((o) => (
                <Option key={i} value={o} title={o}>
                  {AdvancedOptionsLabel[o]}
                </Option>
              ))}
            </Select>
            <Input
              value={d.text}
              onChange={(e) => changeTextFrom(e.target.value, i)}
              style={{ width: 225 }}
            />
            <Checkbox
              checked={d.exact}
              onChange={(e) => changeCheckboxFrom(e.target.checked, i)}>
              Termo exato
            </Checkbox>
            {i > 0 && (
              <Icon
                type="close"
                style={{ marginLeft: 10 }}
                onClick={() => del(i)}
                className="pointer"
              />
            )}
            <Icon
              type="plus"
              style={{ marginLeft: 10 }}
              onClick={add}
              className="pointer"
            />
          </div>
        </div>
      ))}
    </BookNavBarAdvanced>
  );

  return (
    <BookNavBarContainer>
      <Popover
        trigger="click"
        placement="bottomRight"
        visible={advancedVisible}
        content={content}
        onVisibleChange={() => setAdvancedVisible(!advancedVisible)}
        getPopupContainer={(trigger) => trigger}>
        <Badge
          count={(advancedData || []).filter((e) => e.text.length > 0).length}
          offset={[-17, 1]}>
          <Button
            className="filter-btn-alter"
            style={{
              backgroundColor: '#003a70',
              border: 'none',
              color: 'white',
              height: '40px',
              display: 'flex',
              alignItems: 'center'
            }}>
            <img src={iconFilter} style={{ marginRight: '4px' }} />
            Filtros avançados
          </Button>
        </Badge>
      </Popover>
    </BookNavBarContainer>
  );
};
