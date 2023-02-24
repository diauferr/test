import React, { useContext, useEffect } from 'react';
import { Select } from 'antd';

import { VideoOrder } from '../../styles';
import { OrderType } from '../../hooks/search/useFiltersRequest';
import { VideoFiltersContext } from '../../VideoFiltersContext';

type OptionsInterface = {
  show: boolean;
  title: string;
  value: OrderType;
};

export const OrderFilter = () => {
  const { Option } = Select;

  const { order, setOrder, updateData, advancedData } =
    useContext(VideoFiltersContext);

  const options: OptionsInterface[] = [
    { show: false, value: 'relevance', title: 'Relevância' },
    { show: true, value: 'date:desc', title: 'Mais novo primeiro' },
    { show: true, value: 'date:asc', title: 'Mais antigo primeiro' }
  ];

  const validAdvanced = advancedData.filter((e) => e.text.length > 0);
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
    // else {
    //   if (order !== 'date:desc') setOrder('date:desc');
    // }
  }, [advancedData]);

  return (
    <VideoOrder>
      <Select
        optionLabelProp="title"
        filterOption={false}
        onSelect={onSelect}
        value={order || undefined}>
        {options
          .filter((e) => e.show)
          .map((d, i) => (
            <Option key={i} value={d.value} title={d.title}>
              {d.title}
            </Option>
          ))}
      </Select>
    </VideoOrder>
  );
};
