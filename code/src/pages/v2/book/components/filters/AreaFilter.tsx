import React, { useContext } from 'react';

import { BookFiltersContext } from '../../BookFiltersContext';
import { OneTimeFetch } from './use-cases/OneTimeFetch';

export const AreaFilter = ({}) => {
  const {
    areaVisible,
    areaSearchValue,
    areaLoading,
    areaLoaded,
    areaError,
    areaData,
    areaRI,
    setAreaVisible,
    setAreaSearchValue,
    setAreaLoading,
    setAreaLoaded,
    setAreaError,
    setAreaData,
    setAreaRI,
    updateData
  } = useContext(BookFiltersContext);

  return (
    <OneTimeFetch
      segment="area-interest"
      placeholder="Áreas de interesse"
      visible={areaVisible}
      searchValue={areaSearchValue}
      loading={areaLoading}
      loaded={areaLoaded}
      error={areaError}
      data={areaData}
      ri={areaRI}
      setVisible={setAreaVisible}
      setSearchValue={setAreaSearchValue}
      setLoading={setAreaLoading}
      setLoaded={setAreaLoaded}
      setError={setAreaError}
      setData={setAreaData}
      setRI={setAreaRI}
      updateData={updateData}
    />
  );
};
