import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ContentSection } from '../../../components/ContentSection';
import { Subtitle } from '../../../components/Subtitle';
import { BackToTopButton } from '../../../components/_shell/BackToTopButton';
import { PageContent, VideoContainer } from './styles';
import { NotFound } from '../../NotFound';
import { Skeleton } from 'antd';
import { Video } from '../../../components/Video';
import { VideoTag } from './interfaces/Video';
import { RelatedVideos } from './components/RelatedVideos';
import useGetByIdRequest from './hooks/search/useGetByIdRequest';

interface RouteParams {
  videoId: string;
}

export const VideoView = (props: RouteComponentProps<RouteParams>) => {
  const { videoId } = props.match.params;
  const { loading, error, data, getVideo } = useGetByIdRequest();
  const getVideoById = async (id: string) => getVideo(id);

  useEffect(() => {
    window.scrollTo(0, 0);
    getVideoById(videoId);
  }, [videoId]);

  if (error) return <NotFound />;

  const getOnlyTag = (type: string, tags: any) =>
    tags
      .filter((e: VideoTag) => e.prefix === type)
      .map((e: VideoTag) => e.title)
      .join(', ');

  const validTags = (tags: any) => typeof tags === 'object' && tags.length;
  const author = (tags: any) => validTags(tags) && getOnlyTag('author', tags);
  const event = (tags: any) => validTags(tags) && getOnlyTag('event', tags);
  const serie = (el: any) => el && el.video_serie && el.video_serie.title;

  return (
    <PageContent>
      <Skeleton loading={loading}>
        <VideoContainer>
          <Video videoSrc={data.url} />
        </VideoContainer>

        <ContentSection className="video-details-container">
          <div className="container">
            <Subtitle>{data.title}</Subtitle>
            <div>
              <b>Palestrante(s):</b> {author(data.tags)}
            </div>
            <div>
              <b>Data:</b> {data.event_date}
            </div>
            <div>
              <b>Série:</b> {serie(data)}
            </div>
            <div>
              <b>Evento:</b> {event(data)}
            </div>
            <br />
            <p>{data.description}</p>
          </div>
        </ContentSection>
        <RelatedVideos id={videoId} />
      </Skeleton>
      <BackToTopButton />
    </PageContent>
  );
};
