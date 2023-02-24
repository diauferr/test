import React, { useContext, useEffect } from 'react';
import { Select } from 'antd';

import { BookOrder } from '../../styles';
import { OrderType } from '../../hooks/search/useFiltersRequest';
import { BookFiltersContext } from '../../BookFiltersContext';

type OptionsInterface = {
  show: boolean;
  title: string;
  value: OrderType;
};

export const OrderFilter = () => {
  const { Option } = Select;

  const { order, setOrder, updateData, advancedData } =
    useContext(BookFiltersContext);

  const options: OptionsInterface[] = [
    { show: false, value: 'relevance', title: 'Relevância' },
    { show: true, value: 'date:desc', title: 'Mais novo primeiro' },
    { show: true, value: 'date:asc', title: 'Mais antigo primeiro' }
  ];

  const validAdvanced =
    advancedData && advancedData.length
      ? advancedData.filter((e) => e.text.length > 0)
      : [];
  const validAdvanceds = validAdvanced.length > 0;
  options[0].show = validAdvanceds;

  const onSelect = (val: OrderType) => {
    if (val === order) return;

    setOrder(val);
    updateData();
  };

  useEffect(() => {
    if (validAdvanceds) {
      if (order !== 'relevance') setOrder('relevance');
    }
  }, [advancedData]);

  return (
    <BookOrder>
      <Select
        optionLabelProp="title"
        filterOption={false}
        onSelect={onSelect}
        value={order || undefined}>
        {options
          .filter((e) => e.show || e.value === order)
          .map((d, i) => (
            <Option key={i} value={d.value} title={d.title}>
              {d.title}
            </Option>
          ))}
      </Select>
    </BookOrder>
  );
};
