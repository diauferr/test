import styled from 'styled-components';
import { device } from '../../styledComponent';

export const Container = styled.div`
  width: 100%;
  padding-left: 0 !important;
  padding-right: 0 !important;
  top: 0px;
  left: 0;
  right: 0;
  z-index: 8;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: saturate(180%) blur(10px);
  position: fixed;
`;

export const Inner = styled.div`
  position: relative;
  display: block;
  margin: 0 auto;
  width: 100%;
  max-width: 1536px;
`;

export const Navbar = styled.nav`
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  transition: all ease-in-out 1s;

  @media ${device.sm} {
    border-bottom: 1px solid #e8e8e8;
  }
`;

export const Menus = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 2em 15px 0 15px;
`;

export const Link = styled.a`
  color: black !important;
`;

export const ContainerMobile = styled.div`
  width: 100%;
  height: 150px !important;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const ContainerMobileWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;
