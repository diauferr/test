import styled from 'styled-components';

interface IProps {
  height: number;
}

export const ScrollableContent = styled.div<IProps>`
  overflow-y: auto;
  overflow-x: hidden;
  height: ${(props) => props.height}px;
  max-height: ${(props) => props.height}px;
`;
