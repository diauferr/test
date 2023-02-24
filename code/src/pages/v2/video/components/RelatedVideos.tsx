import React, { useEffect } from 'react';
import { Skeleton } from 'antd';
import { Video } from '../interfaces/Video';
import { Link } from 'react-router-dom';
import { Image } from './common/Image';
import { Author } from './common/Author';
import useGetRelatedVideos from '../hooks/search/useGetRelatedVideos';
import { Subtitle } from '../../../../components/Subtitle';

export const RelatedVideos = ({ id }) => {
  const { loading, data, getRelated } = useGetRelatedVideos();
  const link = (item: Video) => `/conteudo/videos/${item.num_id}`;

  useEffect(() => {
    getRelated(id);
  }, []);

  return (
    <Skeleton loading={loading}>
      <aside className="playlist-container">
        <Subtitle>Vídeos relacionados</Subtitle>
        <div className="related-videos">
          {data.map((item: Video, index: number) => (
            <article key={index} className="related-videos-list">
              <Link to={link(item)} className="thumb">
                <div className="thumb-cover">
                  <Image item={item} />
                  <Author item={item} />
                </div>
              </Link>
              <Author item={item} />
              <h4>
                <Link to={link(item)}>{item.title}</Link>
              </h4>
            </article>
          ))}
        </div>
      </aside>
    </Skeleton>
  );
};
