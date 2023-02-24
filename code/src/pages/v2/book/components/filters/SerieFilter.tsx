import React, { useContext } from 'react';

import { BookFiltersContext } from '../../BookFiltersContext';
import { OneTimeFetch } from './use-cases/OneTimeFetch';

export const SerieFilter = ({}) => {
  const {
    serieVisible,
    serieSearchValue,
    serieLoading,
    serieLoaded,
    serieError,
    serieData,
    serieRI,
    setSerieVisible,
    setSerieSearchValue,
    setSerieLoading,
    setSerieLoaded,
    setSerieError,
    setSerieData,
    setSerieRI,
    updateData
  } = useContext(BookFiltersContext);

  return (
    <OneTimeFetch
      segment="book-serie"
      placeholder="Séries"
      visible={serieVisible}
      searchValue={serieSearchValue}
      loading={serieLoading}
      loaded={serieLoaded}
      error={serieError}
      data={serieData}
      ri={serieRI}
      setVisible={setSerieVisible}
      setSearchValue={setSerieSearchValue}
      setLoading={setSerieLoading}
      setLoaded={setSerieLoaded}
      setError={setSerieError}
      setData={setSerieData}
      setRI={setSerieRI}
      updateData={updateData}
    />
  );
};
