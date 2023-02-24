import { createGlobalStyle } from 'styled-components';

export const HideWindowOverflow = createGlobalStyle`
  body, html  {
    overflow: hidden !important;
  } 
`;
