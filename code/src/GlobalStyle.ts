import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --top-bar-background-color: #003a70;
    --primary-color-dark: #063a93;
    --primary-color: #063a93;
    --primary-color-light: #3742fa;
    --primary-color-ascent: #0075ff;
    --secondary-color: #d82530;
    --secondary-color-light: #f62a36;
    --secondary-color-dark: #af202b;
    --text-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    --title-font-family: "Segoe UI", sans-serif;
    --title-font-weigth: 700;
    --background-color: #fff;
    --content-background-color: #fff;
  }

  ::-webkit-scrollbar {
    width: 6px !important;
    height: 6px !important;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, .2) !important;
  }

  ::-webkit-scrollbar-track {
    background: hsla(0, 0%, 100%, .08) !important;
  }

  html {
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }

  body {
    background-color: #fff !important;
    -webkit-overflow-scrolling: touch;
    height: initial !important;
    background: var(--background-color) !important;
  }

  html,
  body,
  div,
  p {
    color: #323232;
    font-size: 15px;
    font-family: var(--text-font-family);

    @media (max-width: 800px) {
      font-size: 14px;
    }
  }

  #root {
    position: relative;
    display: block;
    max-width: 1536px;

    @media (min-width: 1536px) {
      margin: 0 auto;
    }
  }

  div {
    -webkit-overflow-scrolling: touch;
  }

  ul {
    b {
      font-weight: 500;
    }
  }

  h2 {
    font-family: var(--title-font-family);
    font-weight: 700;
    font-size: 1.7rem;

    @media (max-width: 600px) {
      font-size: 1.5rem;
    }
  }

  h3 {
    font-weight: 700;
    font-family: var(--title-font-family);
    font-size: 1.3rem;
  }

  button {
    font-family: var(--title-font-family);
    font-weight: 700;
  }

  [ant-click-animating-without-extra-node="true"]:after {
    border-color: transparent !important;
  }

  a {
    color: var(--primary-color);

    &:hover {
      color: var(--primary-color-light);
    }

    &.active:before {
      display: none;
    }

    &:visited {
      color: #7a008e;
    }
  }

  ul {
    padding: 0;
    margin: 0;
  }

  .list-item-hover .pdf-icon-container {
    background-color: var(--secondary-color);
  }

  .ant-btn-danger {
    color: #D7282F !important;
    border-color: #D7282F !important;
  }
`;
