/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable indent */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/default-param-last */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */

import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';

interface IProps {
  Leading?: ReactNode;
  Trailling?: ReactNode;
  Content: ReactNode;
  active?: boolean;
  border?: boolean;
  onClick?: () => any;
  className?: string;
}

export const DefaultListItem = ({
  Leading,
  Trailling,
  border = false,
  Content,
  active = false,
  onClick = () => null,
  className = ''
}: IProps) => {
  const [hover, setHover] = useState(false);
  const pressable = onClick ? ' pressable' : '';
  const hoverCls = hover ? ' list-item-hover' : '';
  const borderCls = border ? ' border' : '';

  return (
    <Li
      border={border}
      className={className + pressable + hoverCls + borderCls}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      {Leading && <LeadingContainer>{Leading}</LeadingContainer>}
      <ContentContainer onClick={onClick}>{Content}</ContentContainer>
      {Trailling && <TraillingContainer>{Trailling}</TraillingContainer>}
    </Li>
  );
};

const Li = styled.li<any>`
  display: flex;
  padding: 1rem 0;
  transition: background-color 0.4s;

  &.pressable {
    cursor: pointer;
    &:hover {
      background-color: #f4f4f4;
    }
  }

  &.border {
    border-bottom: 1px solid #f0f0f0;
  }
`;

const LeadingContainer = styled.div`
  width: fit-content;
  margin-right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 0.5rem;
`;

const TraillingContainer = styled.div`
  width: fit-content;
  margin-left: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 0.5rem;
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  em {
    background: rgba(0, 128, 0, 0.4);
    padding: 0 6px;
  }
`;
