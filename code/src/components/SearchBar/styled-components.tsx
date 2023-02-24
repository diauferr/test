/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable indent */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/default-param-last */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */

import styled from 'styled-components';

export const SearchBarContainer = styled.div<any>`
  display: flex;
  justify-content: center;
  width: 80%;
  margin-top: 1rem;

  .input-container {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;

    input {
      width: 100%;
      font-size: ${({ big }) => (big ? '1.2rem;' : '1rem')};
      height: ${({ big }) => (big ? '3.5rem' : '2.7rem')};
      border: ${({ big }) =>
    big ? '2px solid transparent;' : '1px solid #cecece;'};
      border-radius: 2rem;
      background: ${({ big }) => (big ? '#f4f4f4;' : '#fff')};
      margin: 0 auto;
      outline: none;
      padding: 0 3rem;
      transition: all 0.5s;

      &:hover,
      &:focus {
        border: 2px solid var(--primary-color);
        background: #fff;
      }

      ::placeholder {
        opacity: 0.5;
      }
    }

    i {
      transition: all 0.4s;
      position: absolute;
      font-size: ${({ big }) => (big ? '1.5rem' : '1.2rem')};

      &.search {
        left: 0.5rem;
        opacity: 1;
        color: var(--primary-color);
      }
    }

    a.clear {
      display: flex;
      align-items: center;
      justify-content: center;

      i {
        right: 1rem;
        color: #888888;
      }
    }

    .react-autosuggest__container {
      width: 100%;
    }

    .react-autosuggest__suggestions-list {
      background: #fff;
      list-style: none;
      border-left: 1px solid #e6e6e6;
      border-right: 1px solid #e6e6e6;
      border-bottom: 1px solid #e6e6e6;
      border-top: none;
      position: absolute;
      z-index: 99;

      width: 100%;

      box-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.2);
      top: ${({ big }) => (big ? ' 4rem' : '3rem')};
      padding: 0;
      max-height: 70vh;
      overflow-y: auto;

      li {
        transition: all 0.4s;
        padding: 1rem;

        &:last-child {
          border: none;
        }

        &[aria-selected='true'] {
          background: rgba(0, 0, 0, 0.05);
        }
      }
    }
  }
`;
