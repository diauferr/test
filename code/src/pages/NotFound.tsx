import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import { Button } from '../components/Button';

const Container = styled.div<any>`
  * {
    box-sizing: border-box;
  }

  body {
    padding: 0;
    margin: 0;
  }

  .notfound {
    max-width: 520px;
    width: 100%;
    line-height: 1.4;
    text-align: center;

    a {
      color: white !important;
    }
    i {
      margin-right: 0.5rem;
    }
  }

  .notfound .notfound-404 {
    position: relative;
    height: 200px;
    margin: 0px auto 20px;
    z-index: -1;
  }

  .notfound .notfound-404 h1 {
    font-family: 'Montserrat', sans-serif;
    font-size: 236px;
    font-weight: 200;
    margin: 0px;
    color: #211b19;
    text-transform: uppercase;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .notfound .notfound-404 h2 {
    font-family: 'Montserrat', sans-serif;
    font-size: 28px;
    font-weight: 400;
    text-transform: uppercase;
    color: #211b19;
    background: var(--background-color);
    padding: 10px 5px;
    margin: auto;
    display: inline-block;
    position: absolute;
    bottom: 0px;
    left: 0;
    right: 0;
  }

  #notfound {
    position: relative;
    height: 100vh;
  }

  #notfound .notfound {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  @media only screen and (max-width: 767px) {
    .notfound .notfound-404 h1 {
      font-size: 148px;
    }
  }

  @media only screen and (max-width: 480px) {
    .notfound .notfound-404 {
      height: 148px;
      margin: 0px auto 10px;
    }
    .notfound .notfound-404 h1 {
      font-size: 86px;
    }
    .notfound .notfound-404 h2 {
      font-size: 16px;
    }
    .notfound a {
      padding: 7px 15px;
      font-size: 14px;
    }
  }
`;

export const NotFound = () => (
  <Container>
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>Oops!</h1>
          <h2>404 - Página não encontrada</h2>
        </div>
        <Button type="primary">
          <Icon type="home" />
          <Link to="/pesquisa/todos">Ir para página inicial!</Link>
        </Button>
      </div>
    </div>
  </Container>
);