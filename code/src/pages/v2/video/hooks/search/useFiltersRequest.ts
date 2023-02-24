import { useState, useRef, useContext } from 'react';
import axios from 'axios';
import { RequestUtil } from '../../../../../util/RequestUtil';
import { Video } from '../../interfaces/Video';
import { VideoFiltersContext } from '../../VideoFiltersContext';

export interface Pager {
  currentPage: number;
  pages: number;
  perPage: number;
  total: number;
}

export type OrderType =
  | 'relevance'
  | 'id:asc'
  | 'id:desc'
  | 'date:asc'
  | 'date:desc';

export const useFiltersRequest = () => {
  const areasLoaded = useRef<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [pager, setPager] = useState<Pager>({
    currentPage: 0,
    pages: 0,
    perPage: 0,
    total: 0
  });
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<Video[]>([]);
  const {
    areaData,
    authorData,
    eventData,
    serieData,
    dateData,
    advancedData,
    order
  } = useContext(VideoFiltersContext);

  const request = async () => {
    setLoading(true);

    const dateStart = dateData.filter((e) => e.start);
    const dateEnd = dateData.filter((e) => e.end);

    const options = {
      headers: {
        Authorization: `Bearer ${RequestUtil._token}`,
        'Content-Type': 'application/json'
      }
    };

    const body = {
      page,
      order,
      filters: {
        area: areaData.filter((e) => e.checked).map((e) => e.key),
        author: authorData.filter((e) => e.checked).map((e) => e.key),
        event: eventData.filter((e) => e.checked).map((e) => e.key),
        serie: serieData.filter((e) => e.checked).map((e) => e.key),
        date: [
          dateStart[0] ? dateStart[0].value : null,
          dateEnd[0] ? dateEnd[0].value : null
        ],
        advanced: advancedData.filter((e) => e.text.length > 0)
      }
    };

    axios
      .post(`${process.env.REACT_APP_ENTITY_SEARCH}/video`, body, options)
      .then((res) => {
        setData(res.data.hits);
        setPager({
          currentPage: res.data.currentPage || 0,
          pages: res.data.pages || 0,
          perPage: res.data.perPage || 0,
          total: res.data.total || 0
        });
        setLoading(false);
        window.scrollTo(0, 0);
      })
      .catch(() => {
        setData([]);
        setPager({ currentPage: 0, pages: 0, perPage: 0, total: 0 });
        setLoading(false);
      });

    areasLoaded.current = true;

    return data;
  };

  const loadFilters = async () => request();

  return {
    data,
    pager,
    page,
    error,
    loading,
    setData,
    setPager,
    setPage,
    setError,
    loadFilters,
    setLoading
  };
};

export default useFiltersRequest;
