import styled from 'styled-components';

export const ContentMenuListItem = styled.li`
  align-items: center;
  padding: 0.5rem 0;
  grid-column-gap: 0.5rem;
  cursor: pointer;
  display: grid;
  grid-template-columns: 20px 1fr;
  &:hover {
    background: #f4f4f4;
  }
`;
