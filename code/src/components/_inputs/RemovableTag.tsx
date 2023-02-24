import React from 'react';
import styled from 'styled-components';

const Container = styled.div<any>`
  .tag {
    white-space: normal;
    height: auto;
    max-width: 90%;
    min-height: 22.5px;
  }
`;

interface IProps {
  text: string;
  tagClassName: string;
  onRemoveClick: () => any;
}

export const RemovableTag = ({ text, tagClassName, onRemoveClick }: IProps) => (
  <Container className="tags has-addons">
    <span className={`tag ${tagClassName}`}>{text}</span>
    <a className="tag is-delete" onClick={onRemoveClick} />
  </Container>
);
