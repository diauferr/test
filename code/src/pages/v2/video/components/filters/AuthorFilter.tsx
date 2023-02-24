import React, { useContext } from 'react';
import { VideoFiltersContext } from '../../VideoFiltersContext';
import { TimedFetch } from './use-cases/TimedFetch';

export const AuthorFilter = ({}) => {
  const {
    authorVisible,
    authorSearchValue,
    authorLoading,
    authorLoaded,
    authorError,
    authorData,
    authorRI,
    setAuthorVisible,
    setAuthorSearchValue,
    setAuthorLoading,
    setAuthorLoaded,
    setAuthorError,
    setAuthorData,
    setAuthorRI,
    updateData
  } = useContext(VideoFiltersContext);

  return (
    <TimedFetch
      segment="author"
      placeholder="Autores"
      visible={authorVisible}
      searchValue={authorSearchValue}
      loading={authorLoading}
      loaded={authorLoaded}
      error={authorError}
      data={authorData}
      ri={authorRI}
      setVisible={setAuthorVisible}
      setSearchValue={setAuthorSearchValue}
      setLoading={setAuthorLoading}
      setLoaded={setAuthorLoaded}
      setError={setAuthorError}
      setData={setAuthorData}
      setRI={setAuthorRI}
      updateData={updateData}
      fetchOnMount={false}
    />
  );
};
