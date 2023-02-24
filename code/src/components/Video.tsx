declare var videojs;

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 0;
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 100%;
  max-width: 100%;
  overflow: hidden;

  .video-js {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    &.vjs-playing {
      .vjs-big-play-button {
        display: none;
      }
    }

    button.vjs-playback-rate-value {
      color: red;
    }

    span,
    div.vjs-playback-rate-value,
    span.vjs-icon-placeholder:before {
      color: #fff;
    }

    .vjs-play-progress.vjs-slider-bar:before {
      color: #fff;
    }

    .vjs-big-play-button {
      outline: none;
      border-color: var(#fff);
      color: var(#fff);
      border-radius: 100%;
      height: 80px;
      width: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      .vjs-icon-placeholder:before {
        padding-top: 5px;
      }
    }
  }
`;

interface IProps {
  videoSrc: string;
}

export const Video = ({ videoSrc }: IProps) => {
  const videoElRef = useRef<any>();
  const videoJsRef = useRef<any>();

  useEffect(() => {
    const videoConfig = {
      autoplay: true,
      controls: true,
      preload: 'auto',
      liveui: true,
      nativeControlsForTouch: true,
      playbackRates: [0.5, 1, 1.5, 2],
      sources: [
        {
          src: videoSrc,
          type: 'video/mp4'
        }
      ]
    };

    videoJsRef.current = videojs(
      videoElRef.current,
      videoConfig,
      function onPlayerReady() {}
    );

    return function onUnmount() {
      if (!!videoJsRef.current) {
        videoJsRef.current.dispose();
      }
    };
  }, []);

  return (
    <Container>
      <video ref={videoElRef} className="video-js vjs-default-skin " />
    </Container>
  );
};
