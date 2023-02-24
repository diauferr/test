import React from 'react';
import styled from 'styled-components';

const Ul = styled.ul`
  display: flex;
  list-style: none;
  justify-content: flex-start;
  height: 20px;
  li {
    font-size: 0.75rem;
    opacity: 0.8;
    margin-right: 10px;
    margin-bottom: 0;
    padding: 2px;
    text-transform: uppercase;
    color: var(--primary-color);
    border-radius: 5px;
  }
`;

interface IProps {
  areas: string;
}
export const AreaList = ({ areas }: IProps) => {
  if (!areas) return null;

  return (
    <Ul>
      {`${areas}`.split(',').map((area) => (
        <li key={area}>{area}</li>
      ))}
    </Ul>
  );
};
