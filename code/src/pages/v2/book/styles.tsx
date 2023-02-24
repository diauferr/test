import styled from 'styled-components';
import { topbarHeight } from '../../../components/_shell/Navbar';
import { contentSelectionHeight } from '../../../components/_shell/TabContentSelection';

export const PageContent = styled.main`
  /* padding-top: 2rem; */

  width: 100%;
  display: grid;
  grid-template-columns: 2fr 420px;
  grid-template-rows: 65vh 1fr;
  margin-top: 150px;
  margin: ${`${topbarHeight + contentSelectionHeight + 100}px auto 0 auto`};

  @media (max-width: 1241px) {
    grid-template-columns: 1fr;
  }

  aside {
    .author i {
      margin-right: 5px;
    }

    .related-books-list {
      border-bottom: 1px solid #ccc;
      margin-bottom: 15px;
      padding-bottom: 15px;

      .thumb {
        position: relative;
        display: block;

        img {
          width: 100%;
        }

        a {
          display: block;
        }
      }

      .thumb-cover {
        > div.author {
          background: #00336c;
          background: rgb(0 51 108 / 75%);
          color: #fff;
          position: absolute;
          bottom: 5px;
          left: 5px;
          display: inline-block;
          border-radius: 4px;
          padding: 2px 5px;
        }
      }

      > div.author {
        display: none;
      }

      h4 {
        font-size: 16px;
        line-height: 1.4;
        font-weight: 500;
        margin-top: 5px;

        a {
          color: #00336c;

          &:hover,
          &:focus,
          &:active {
            color: #00336c;
          }
        }
      }
    }
  }

  @media (max-width: 1239px) {
    aside {
      .related-books {
        display: grid;
        overflow: hidden;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-rows: max-content;
        grid-column-gap: 5px;
        grid-row-gap: 5px;
      }

      .related-books-list {
        .thumb-cover {
          aspect-ratio: 16 / 9;
          width: 100%;
          height: 154px;
          overflow: hidden;
          position: relative;

          img {
            object-fit: cover;
            margin-top: -15px;
          }

          > div.author {
            display: none;
          }
        }

        > div.author {
          display: block;
        }
      }
    }
  }

  @media (max-width: 900px) {
    aside {
      .related-books {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }

  @media (max-width: 650px) {
    aside {
      .related-books {
        grid-template-columns: repeat(1, 1fr);
      }

      .related-books-list {
        .thumb-cover {
          height: 275px;
        }
      }
    }
  }

  .book-container {
    grid-column: 1/2;
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

  .book-details-container {
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
        .palavras-chave {
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

export const BookContainer = styled.div`
  .vjs-big-play-button {
    width: 70px !important;
    height: 60px !important;
  }

  .vjs-selected {
    background: #8a8a8a !important;
  }
`;

export const BookNavBarContainer = styled.div`
  .filter-btn,
  .filter-btn-alter {
    background: none transparent;
    border: 2px solid #003a70;
    color: #003a70;
    min-width: min-content;
    width: auto;
    outline: none;
    border-radius: 12px;
    font-weight: 500;
    padding: 11px 20px;
    margin: 0 10px 0 0;
    height: auto;
    line-height: 1;
    font-size: 14px;
    position: relative;

    &:hover,
    &:focus,
    &:active {
      border: 2px solid #003a70;
      color: #003a70;
    }

    .ant-badge {
      position: absolute;
      top: -11px;
      right: -11px;

      p {
        color: #fff;
        font-size: 12px;
        font-weight: 700;
      }
    }
  }

  .filter-btn-alter {
    background-color: #80c2ff;
    border-color: #80c2ff;

    &:hover,
    &:focus,
    &:active {
      background-color: #80c2ff;
      border-color: #80c2ff;
    }
  }
`;

export const BookNavBarResults = styled.div`
  .filter-search {
    width: 300px;
    display: block;
  }

  .results {
    margin-top: 15px;
    width: 300px;
    max-height: 300px;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .error,
  .empty {
    width: 300px;
    text-align: center;
    border-radius: 4px;
    margin-top: 10px;
    font-size: 12px;
    line-height: 2;
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
  }

  .error {
    background: #ffcaca;
  }

  .empty {
    background: #feffca;
  }

  .anticon-loading {
    margin: 10px auto 0 auto;
    display: block;
  }

  .ant-checkbox-wrapper {
    width: 100%;
    display: flex;
    justify-items: center;
    align-items: center;
    margin: 0;
    user-select: none;
    padding: 2px 5px;

    &:nth-child(odd) {
      background: #f6f6f6;
    }

    &:hover {
      background: #f1f1f1;
    }

    + .ant-checkbox-wrapper {
      margin: 0;
    }

    .ant-checkbox-checked .ant-checkbox-inner {
      background: #003a70;
      border-color: #003a70;
    }
  }

  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner,
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: #003a70;
  }

  .selecteds {
    width: 300px;
    display: block;
    margin-bottom: 10px;
    user-select: none;

    .ant-tag {
      overflow: hidden;
      position: relative;
      padding: 0 25px 0 5px;
      max-width: 300px;

      .anticon-close {
        background: #003a70;
        color: #fff;
        padding: 7px;
        margin: -2px -3px -3px 0;
        border-radius: 0 3px 3px 0;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;

        &:hover,
        &:focus,
        &:active {
          background: #01498d;
          color: #fff;
        }
      }
    }
  }
`;

export const BookNavBarAdvanced = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-between;
  align-items: center;
  width: 622px;

  span {
    white-space: pre;
    margin-right: 15px;
  }

  input[type='text'] {
    width: 300px;
  }

  .pointer {
    cursor: pointer;
    user-select: none;
  }

  .label {
    padding-top: 8px;
    font-weight: 500;
  }

  .mt-5 {
    margin-top: 10px;
  }

  .ant-checkbox-wrapper {
    width: 112px;
    margin-left: 10px;

    .ant-checkbox {
      margin: 0;

      input,
      + span,
      .ant-checkbox-inner {
        margin: 0;
      }
    }
  }
`;

export const BookNavBarClear = styled.div`
  .ant-btn-danger {
    background: none transparent;
    border: 2px solid #d7282f;
    color: #d7282f;
    min-width: min-content;
    width: auto;
    outline: none;
    border-radius: 12px;
    font-weight: 500;
    padding: 11px 20px;
    margin: 0 10px 0 0;
    height: auto;
    line-height: 1;
    font-size: 14px;
    position: relative;

    &:hover,
    &:focus,
    &:active {
      border: 2px solid #d7282f;
      color: #d7282f;
    }

    .ant-badge {
      position: absolute;
      top: -11px;
      right: -11px;

      p {
        color: #fff;
        font-size: 12px;
        font-weight: 700;
      }
    }
  }
`;

export const BookNavBarDates = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  align-items: center;
  width: 300px;

  .ant-select {
    width: 110px;
  }

  > span {
    margin: 0 10px;

    &:first-child {
      margin-left: 0;
    }
  }
`;

export const Image = styled.img`
  border-radius: 12px;
  max-width: 180px;
`;

export const BookOrder = styled.div`
  .ant-select {
    width: 200px;
  }
  .ant-select-selection {
    border-radius: 10px !important;
  }
`;

export const SubFilters = styled.div`
  margin: 15px 0 30px;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: stretch;
  justify-content: flex-end;
  align-items: baseline;

  > p {
    margin: 0 15px 0 0;
  }
`;

export const BookInnerFields = styled.p`
  margin: 0;

  &:not(:last-child) {
    margin: 0;
  }

  span {
    margin-left: 5px;
    color: #003a70;
    font-size: 14px;
  }

  img {
    width: 22px;
    height: 18px;
  }
`;

export const BookResultEmpty = styled.p`
  margin-top: 2em;
  font-size: 1.4em;
`;
