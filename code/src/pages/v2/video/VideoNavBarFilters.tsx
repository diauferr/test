import { Badge as badge } from 'antd';
import React, { useContext } from 'react';
import { AdvancedFilter } from './components/filters/AdvancedFilter';
import { AreaFilter } from './components/filters/AreaFilter';
import { AuthorFilter } from './components/filters/AuthorFilter';
import { EventFilter } from './components/filters/EventFilter';
import { SerieFilter } from './components/filters/SerieFilter';
import { DateFilter } from './components/filters/DateFilter';
import { VideoNavBarClear } from './styles';
import { VideoFiltersContext } from './VideoFiltersContext';
import styled from 'styled-components';

const Button = styled.button`
  margin-right: 16px;
  height: 40px !important;
  color: #003a70;
  border: 2px solid #003a70;
  background-color: transparent;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  padding: 0 20px 0 20px;
`;

const Badge = styled(badge)`
  .ant-badge-count {
    background-color: #d7282f;
    color: #fff !important;
  }

  .ant-scroll-number-only-unit {
    color: #fff !important;
  }
`;

export const VideoNavBarFilters: React.FC = () => {
  const {
    advancedData,
    areaData,
    authorData,
    eventData,
    serieData,
    dateData,
    setAdvancedData,
    setAreaData,
    setAuthorData,
    setEventData,
    setSerieData,
    updateData,
    setAreaSearchValue,
    setAuthorSearchValue,
    setEventSearchValue,
    setSerieSearchValue,
    setDateData
  } = useContext(VideoFiltersContext);

  const activeFilters = [
    ...areaData,
    ...authorData,
    ...eventData,
    ...serieData
  ].filter((e) => e.checked).length;
  const dateFilter = dateData.filter((e) => e.start || e.end).length ? 1 : 0;
  const advancedFilters = advancedData.filter((e) => e.text.length > 0).length;
  const activeCount = advancedFilters + activeFilters + dateFilter;

  const checkFalse = (e) => ({ ...e, checked: false });
  const checkRangeFalse = (e) => ({ ...e, start: false, end: false });
  const clearFilters = () => {
    setAreaSearchValue('');
    setAuthorSearchValue('');
    setEventSearchValue('');
    setSerieSearchValue('');
    setAdvancedData([{ type: 'AND', text: '', exact: false }]);
    setAreaData(areaData.map(checkFalse));
    setAuthorData(authorData.map(checkFalse));
    setEventData(eventData.map(checkFalse));
    setSerieData(serieData.map(checkFalse));
    setDateData(dateData.map(checkRangeFalse));
    updateData();
  };

  return (
    <>
      <AreaFilter />
      <AuthorFilter />
      <EventFilter />
      <SerieFilter />
      <DateFilter />
      <AdvancedFilter />
      <VideoNavBarClear>
        <Badge count={activeCount} offset={[-17, 1]} showZero>
          <Button
            onClick={clearFilters}
            style={{
              border: '2px solid #D7282F',
              backgroundColor: 'transparent',
              color: '#D7282F',
              cursor: 'pointer'
            }}>
            Limpar filtros
          </Button>
        </Badge>
      </VideoNavBarClear>
    </>
  );
};
