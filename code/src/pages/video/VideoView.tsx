import { Icon } from 'antd';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { ContentMenuHorizontal } from '../../components/ContentMenu/ContentMenuHorizontal';
import { ContentSection } from '../../components/ContentSection';
import { Subtitle } from '../../components/Subtitle';
import { Video } from '../../components/Video';
import { BackToTopButton } from '../../components/_shell/BackToTopButton';
import { ContentType } from '../../enums/ContentType';
import { useDoRequest } from '../../Hooks/useDoRequest';
import { useEffectIfNotNull } from '../../Hooks/useEffectIfNotNull';
import { ContentSearchResult } from '../../models/ContentSearchResult';
import { VideoModel } from '../../models/video/VideoModel';
import { VideoRequests } from '../../requests/video/VideoRequests';
import { Playlist } from './components/Playlist';
import { PageContent } from './styled-components';
import { ContentNotAvailable } from '../../components/ContentNotAvailable';

const VideoContainer = styled.div`
  .vjs-big-play-button {
    width: 70px !important;
    height: 60px !important;
  }

  .vjs-selected {
    background: #8a8a8a !important;
  }
`;

export const VideoViewPage = (props: RouteComponentProps) => {
  const [showVideo, setShowVideo] = useState(false);
  const videoId: number = _.get(props, 'match.params.videoId') || 0;
  const [videoContent, loading, , doVideoRequest] = useDoRequest<any>();
  const [relatedVideos, , , doRelatedVideoRequest] =
    useDoRequest<VideoModel[]>();
  const [videoUrlFromS3, , , doGetVideoUrlFromS3] = useDoRequest<string>();

  function getVideoS3Key(videoUri: string) {
    const videoSplited = videoUri.split('/');
    const key = `${videoSplited[videoSplited.length - 2]}/${
      videoSplited[videoSplited.length - 1]
    }.mp4`;

    return key;
  }

  /** Para forcar o componente de video desmontar e montar denovo. */
  useEffect(() => {
    setShowVideo(false);

    window.scrollTo(0, 0);

    doVideoRequest(() => VideoRequests.getVideos(videoId));
    doRelatedVideoRequest(() => VideoRequests.getRelatedVideos(videoId));
  }, [videoId]);

  useEffectIfNotNull(() => {
    if (videoContent !== 204) {
      doGetVideoUrlFromS3(() =>
        VideoRequests.getVideoAuthenticatedFromS3(
          getVideoS3Key(videoContent.uri)
        )
      );
    }

    return () => {
      setShowVideo(false);
    };
  }, [videoContent]);

  useEffectIfNotNull(() => {
    setShowVideo(true);
  }, [videoUrlFromS3]);

  function getVideoContentResult(video: VideoModel) {
    return new ContentSearchResult(
      ContentType.VIDEO,
      videoId,
      `${video.initials} ${video.year} - ${video.title}`,
      null,
      video.description,
      null,
      null,
      null,
      video.img,
      video.speakers,
      null,
      `${video.year}`,
      '',
      null,
      null,
      `video/${videoId}`
    );
  }

  if (videoContent === 204) {
    return <ContentNotAvailable />;
  }

  return (
    !!videoContent &&
    !!videoUrlFromS3 && (
      <PageContent>
        <VideoContainer>
          {loading ? (
            <Icon
              type="loading"
              style={{
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                fontSize: '5rem',
                alignItems: 'center',
                height: '100%'
              }}
            />
          ) : (
            showVideo && <Video videoSrc={videoUrlFromS3} />
          )}
        </VideoContainer>

        <ContentSection className={'video-details-container'}>
          <div className="container">
            <div>
              <Subtitle>{`${videoContent.initials} ${videoContent.year} - ${videoContent.title}`}</Subtitle>
              <ContentMenuHorizontal
                result={getVideoContentResult(videoContent)}
              />
            </div>

            <div className={'details'}>
              {videoContent.eventName && (
                <div className={'evento'}>
                  <b>Evento:</b> {videoContent.eventName}
                </div>
              )}
              {videoContent.speakers && (
                <div>
                  <b>Palestrante(s):</b> {videoContent.speakers}
                </div>
              )}
              {videoContent.eventLocation && (
                <div>
                  <b>Local:</b> {videoContent.eventLocation}
                </div>
              )}
              {videoContent.eventDate && (
                <div>
                  <b>Data:</b> {videoContent.eventDate.split(' ')[0]}
                </div>
              )}
              {videoContent.serie && (
                <div>
                  <b>{videoContent.serie}</b>
                </div>
              )}
            </div>

            <p>{videoContent.description}</p>
          </div>
        </ContentSection>

        <div className={'playlist-container'}>
          <Playlist videos={relatedVideos} />
        </div>
        <BackToTopButton />
      </PageContent>
    )
  );
};
