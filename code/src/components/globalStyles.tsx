import styled from 'styled-components';
import { device } from './styledComponent';

export const FooterContainer = styled.footer`
  padding: 30px 15px;
  font-size: 16px;
  background: #003a70;
  color: #fff;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  transition: all ease-in-out 1s;

  nav {
    margin-top: 30px;
    transition: all ease-in-out 1s;
  }

  a,
  a:hover,
  a:focus,
  a:active,
  a:visited {
    color: #fff;
    padding: 10px;
  }

  @media ${device.md} {
    flex-direction: row;

    nav {
      margin-top: 0;
    }
  }
`;

export const FooterLogoImg = styled.img`
  cursor: pointer;
  display: flex;
  height: 42px;
`;
