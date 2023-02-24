import React from 'react';
import styled from 'styled-components';
import { Tag } from 'antd';

interface IProps {
  emails: string[];
  onRemoveEmailClick: (email: string) => any;
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const ReceipientsEmailList = ({
  emails,
  onRemoveEmailClick
}: IProps) => (
  <Container>
    {emails.map((email) => (
      <Tag
        color="#108ee9"
        key={email}
        style={{ marginTop: '.5rem' }}
        closable={true}
        onClose={() => {
          onRemoveEmailClick(email);
        }}>
        {email}
      </Tag>
    ))}
  </Container>
);
