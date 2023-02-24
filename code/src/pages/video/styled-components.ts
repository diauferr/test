import styled from 'styled-components';
import { contentSelectionHeight } from '../../components/_shell/TabContentSelection';
import { topbarHeight } from '../../components/_shell/Navbar';

export const PageContent = styled.main<any>`
  padding-top: 2rem;

  width: 100%;
  background: #fff;
  display: grid;
  grid-template-columns: 2fr 420px;
  grid-template-rows: 65vh 1fr;
  margin-top: 150px;
  margin: ${`${topbarHeight + contentSelectionHeight}px auto 0 auto`};

  @media (max-width: 1241px) {
    grid-template-columns: 1fr;
  }

  .video-container {
    grid-column: 1/ 2;
    grid-row: 1;
    background: #323232;
    max-width: 1100px;
    margin-left: 34px;

    @media (max-width: 1241px) {
      grid-column: 1;
    }
  }

  .playlist-container {
    padding: 0 0.8rem;
    grid-column: 2/3;
    grid-row: 1 / 3;
    background: #fff;

    @media (max-width: 1241px) {
      grid-column: 1;
      grid-row: 3 / 3;
    }
  }

  .video-details-container {
    display: flex;
    align-items: center;
    flex-direction: column;
    grid-column: 1/ 2;
    grid-row: 2 / 3;
    background: #fff;
    padding: 1.5rem 2rem 6rem 2rem;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    height: 100%;

    .container {
      max-width: 940px;

      .details {
        margin-bottom: 1.5rem;
        display: grid;
        grid-template-columns: 1fr;
        grid-row-gap: 0.5rem;
        grid-column-gap: 0.5rem;
        .palavras-chave,
        .evento {
        }
      }
    }
    @media (max-width: 1241px) {
      grid-column: 1;
      padding: 1.5rem 2rem;
    }

    @media (max-width: 600px) {
      padding: 1rem;
    }

    h3 {
      font-size: 1.5rem;
    }

    ul {
      list-style: none;
      margin-bottom: 1.5rem;
    }
  }
`;
