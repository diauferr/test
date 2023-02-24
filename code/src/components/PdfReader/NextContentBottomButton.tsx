import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Icon } from 'antd';

const Container = styled.div<any>`
  width: 97%;
  user-select: none;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  opacity: 0.7;
  transition: all 0.5s;
  transform: translate3d(0, ${(props) => (props.visible ? '0' : '120%')}, 0);

  &:hover {
    opacity: 1;
  }

  a {
    color: white !important;
    padding: 0.5rem 1rem;
    width: fit-content;
    height: 3rem;
    background: #3d464d;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

interface IProps {
  visible: boolean;
  linkTo: string;
}

export const NextContentBottomButton = ({ visible, linkTo }: IProps) => (
  <Container visible={visible}>
    <NavLink to={linkTo}>
      <span>Ir para próximo</span>
      <Icon
        type="right"
        style={{
          color: '#fff',
          marginTop: 2,
          marginLeft: 4
        }}
      />
    </NavLink>
  </Container>
);
