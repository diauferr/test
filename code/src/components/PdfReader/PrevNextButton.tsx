import React from 'react';
import styled from 'styled-components';
import arrowIcon from './../../assets/images/arrow-icon.png';
import { NavLink } from 'react-router-dom';

const mobileBreakpoint = '500px';

const Container = styled.div<any>`
  user-select: none;
  position: fixed;
  display: flex;
  align-items: center;
  height: 100%;
  pointer-events: none;
  z-index: 10;

  &:not(.btn-next) {
    left: 0;
  }

  &.btn-next {
    right: 0rem;

    @supports (-ms-ime-align: auto) {
      margin-right: 1.8rem;
    }

    .btn {
      flex-direction: row-reverse;

      &:hover {
        .title {
          transform: translate3d(-120%, 0, 0);
          @media screen and (max-width: ${mobileBreakpoint}) {
            transform: translate3d(0, 0, 0);
          }
        }
      }

      .icon {
        img {
          transform: rotate(0);
        }
      }

      .title {
        transform: translate3d(120%, 0, 0);
        @media screen and (max-width: ${mobileBreakpoint}) {
          transform: translate3d(0, 10rem, 0);
        }
      }
    }
  }

  .btn {
    opacity: 0.4;
    pointer-events: visible;
    max-height: 4rem;
    background: #f4f4f4;
    display: flex;
    height: 5rem;
    align-items: center;
    position: relative;

    &:hover {
      opacity: 1;
      background: rgba(0, 0, 0, 0.2);

      .icon {
        border-right: 1px solid #cecece;
        width: 3rem;
        transition: all 0.4s ease;

        @media screen and (max-width: ${mobileBreakpoint}) {
          width: 1.2rem;
        }
      }

      .title {
        opacity: 1;
        padding-left: 1rem;
        pointer-events: all;
        transform: translate3d(0, 0, 0);

        @media screen and (max-width: ${mobileBreakpoint}) {
          width: 100%;
          max-width: 100%;
          padding: 0.5rem;
        }
      }

      @media screen and (max-width: ${mobileBreakpoint}) {
        &::before {
          content: '';
          z-index: 1;
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          width: 120vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.35);
          pointer-events: none;
        }
      }
    }

    .icon {
      width: 1.5rem;
      border: 1px solid #cecece;
      height: 100%;
      position: absolute;
      background: #f4f4f4;
      z-index: 5;
      display: flex;
      justify-content: center;
      align-items: center;

      @media screen and (max-width: ${mobileBreakpoint}) {
        width: 1.2rem;
      }

      img {
        max-width: 22px;
        transform: rotate(-180deg);
      }
    }

    .title {
      cursor: pointer;
      width: 22rem;
      font-size: 0.9rem;
      overflow: hidden;
      display: flex;
      align-items: center;
      height: 100%;
      position: absolute;
      left: 3rem;
      pointer-events: none;
      background: rgba(0, 0, 0, 0.05);
      transform: translate3d(-120%, 0, 0);
      transition: all 0.4s ease;
      background: #f4f4f4;
      border: 1px solid #cecece;

      @media screen and (max-width: ${mobileBreakpoint}) {
        transform: translate3d(0, 15rem, 0);
        background: #fff;
        position: fixed;
        bottom: 0;
        height: 8rem;
        left: 0;
        width: 100%;
        color: var(--frm-pdf-active-color);
        z-index: 4;

        &::before {
          content: 'Ir para:';
          position: absolute;
          top: 1rem;
          color: #323232;
          opacity: 0.7;
        }
      }

      span {
        margin: 0;
        padding: 0;

        position: absolute;
      }
    }
  }
`;

interface IProps {
  title: string;
  isNext: boolean;
  linkTo: string;
}

export const PrevNextButton = ({ title, isNext, linkTo }: IProps) => {
  const className = isNext ? 'btn-next' : '';

  return (
    <Container className={className}>
      <div className="btn">
        <span className="icon">
          <img src={arrowIcon} />
        </span>

        <NavLink className="title" to={linkTo}>
          <span>{title.substring(0, 80)}...</span>
        </NavLink>
      </div>
    </Container>
  );
};
