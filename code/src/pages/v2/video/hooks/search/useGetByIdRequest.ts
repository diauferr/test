import axios from 'axios';
import { useState, useRef } from 'react';
import { RequestUtil } from '../../../../../util/RequestUtil';
import { Video, VideoIdParam } from '../../interfaces/Video';

export const useGetByIdRequest = () => {
  const areasLoaded = useRef(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState<Partial<Video>>({});

  const request = async (id: VideoIdParam) => {
    try {
      const url = `${process.env.REACT_APP_ENTITY_SEARCH}/video/entity/${id}`;
      const options = {
        headers: {
          Authorization: `Bearer ${RequestUtil._token}`,
          'Content-Type': 'application/json'
        }
      };

      const res = await axios.get<Video>(url, options);

      setData(res.data);
    } catch {
      setError(true);
    }

    setLoading(false);
    areasLoaded.current = true;

    return data;
  };

  const getVideo = async (id: VideoIdParam) => {
    setError(false);
    setLoading(true);
    setData({});

    return request(id);
  };

  return { loading, error, data, getVideo };
};

export default useGetByIdRequest;
