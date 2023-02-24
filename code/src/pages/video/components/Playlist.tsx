import React from 'react';
import { VideoModel } from '../../../models/video/VideoModel';
import { PlaylistItem } from './PlaylistItem';
import styled from 'styled-components';
import { Subtitle } from '../../../components/Subtitle';

const Container = styled.aside<any>`
  h3 {
    margin-bottom: 0;
  }
`;

interface IProps {
  videos: VideoModel[];
}

export const Playlist = ({ videos = [] }: IProps) => (
  <Container>
    <Subtitle>Lista de reprodução</Subtitle>
    <ul>
      {videos.map((video, index) => (
        <PlaylistItem key={index} video={video} />
      ))}
    </ul>
  </Container>
);
