import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';
import { Button } from '../Button';

const Container = styled.div<any>`
  &.AnyClassForContainer {
    position: fixed;
    right: -100px;
    bottom: 1rem;
    transition: all 0.5s;
    cursor: pointer;
    background-color: white;
    font-size: 20px;
    padding: 10px;
    outline: none;
    opacity: 0.4;

    &:hover {
      opacity: 1;
    }

    button {
      outline: none;
    }
  }

  &.AnyClassForContainer.show {
    right: 1rem !important ;
    outline: none;
  }
`;

export const BackToTopButton = () => {
  const distanceFromTopThreshhold = 300;
  const [showButton, setShowButton] = useState(false);
  const onScroll = useRef(function () {
    setShowButton(window.pageYOffset >= distanceFromTopThreshhold);
  });

  useEffect(() => {
    setShowButton(window.pageYOffset >= distanceFromTopThreshhold);
    window.addEventListener('scroll', onScroll.current);

    return () => {
      window.removeEventListener('scroll', onScroll.current);
    };
  }, []);

  const showCls = showButton ? 'show' : '';

  return (
    <Container className={`AnyClassForContainer ${showCls}`}>
      <Button onClick={() => window.scroll(0, 0)}>
        <Icon type="up-circle" style={{ fontSize: '2rem' }} />
      </Button>
    </Container>
  );
};
