import React, { useContext } from 'react';

import { VideoFiltersContext } from '../../VideoFiltersContext';
import { OneTimeFetch } from './use-cases/OneTimeFetch';

export const EventFilter = ({}) => {
  const {
    eventVisible,
    eventSearchValue,
    eventLoading,
    eventLoaded,
    eventError,
    eventData,
    eventRI,
    setEventVisible,
    setEventSearchValue,
    setEventLoading,
    setEventLoaded,
    setEventError,
    setEventData,
    setEventRI,
    updateData
  } = useContext(VideoFiltersContext);

  return (
    <OneTimeFetch
      segment="event"
      placeholder="Eventos"
      visible={eventVisible}
      searchValue={eventSearchValue}
      loading={eventLoading}
      loaded={eventLoaded}
      error={eventError}
      data={eventData}
      ri={eventRI}
      setVisible={setEventVisible}
      setSearchValue={setEventSearchValue}
      setLoading={setEventLoading}
      setLoaded={setEventLoaded}
      setError={setEventError}
      setData={setEventData}
      setRI={setEventRI}
      updateData={updateData}
    />
  );
};
