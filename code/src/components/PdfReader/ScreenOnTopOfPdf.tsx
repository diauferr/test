import styled from 'styled-components';

export const ScreenOnTopOfPdf = styled.div`
  position: fixed;
  height: calc(100vh - 48px);
  top: 48px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  background: var(--background-color);
`;
