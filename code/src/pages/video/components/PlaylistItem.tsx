import React from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';
import { DefaultListItem } from '../../../components/DefaultListItem/DefaultListItem';
import { VideoModel } from '../../../models/video/VideoModel';
import { NavLink } from 'react-router-dom';

const StyledListItem = styled(DefaultListItem)<any>`
  height: 8rem;
  .playing {
    &:hover {
      cursor: default;
      h4 {
        text-decoration: none;
      }
    }
  }
`;

const ContentContainer = styled(NavLink)<any>`
  width: 100%;
  display: grid;
  grid-template-columns: 10rem 1fr;

  @media (max-width: 600px) {
    grid-template-columns: 8rem 1fr;
  }
  img {
    padding-right: 0.5rem;
    max-width: 100%;

    @media (max-width: 1241px) {
      padding-right: 1rem;
    }

    @media (max-width: 600px) {
      padding-right: 0.5rem;
    }
  }

  &.active {
    .text-container {
      h4 {
        color: #323232 !important;
      }

      .playing {
        display: flex;
      }
    }
  }

  .text-container {
    h4 {
      font-size: 0.95rem;
      line-height: 1rem;

      @media (max-width: 1241px) {
        font-size: 1.2rem;
      }

      @media (max-width: 600px) {
        font-size: 0.95rem;
      }
    }

    span {
      margin-top: 0.5rem !important;
      font-size: 0.9rem;
      display: block;

      @media (max-width: 1241px) {
        font-size: 1rem;
      }

      @media (max-width: 600px) {
        font-size: 0.9rem;
      }
    }

    .playing {
      width: 100%;
      background: #323232;
      color: #fff;
      padding: 0.1rem;
      display: none;
      align-items: center;
      span {
        margin-top: 0 !important;
        text-transform: uppercase;
        font-weight: bold;
        font-size: 0.75rem;
      }

      i {
        color: var(--secondary-color);
        font-size: 1.1rem;
      }
    }
  }
`;

interface IProps {
  video: VideoModel;
}

export const PlaylistItem = ({ video }: IProps) => (
  <StyledListItem
    border
    showChevron={false}
    Content={
      <ContentContainer to={`/video/${video.id}`}>
        <img
          src={`https://www.forumconhecimento.com.br/Uploads/Video/Capa/${video.img}`}
        />

        <div className="text-container">
          <h4>{video.title}</h4>
          <span>{video.speakers}</span>

          <div className={'playing'}>
            <Icon type="caret-right" />
            <span>Reproduzindo</span>
          </div>
        </div>
      </ContentContainer>
    }
  />
);
