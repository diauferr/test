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

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div<any>`
  background: #fff;
  button {
    position: relative;
    border: none;
    background: #fff;
    border-radius: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: rgba(0, 0, 0, 0.9);
    height: 3rem;
    font-weight: 500;
    font-size: 0.8rem;
    text-transform: uppercase;

    span {
      margin-left: 0;
    }

    .ant-scroll-number-only > p {
      color: #fff;
      font-size: 0.8rem;
    }
  }

  &.closed .filter-field {
    max-height: 0;
    overflow: hidden;
  }
`;

interface Props {
  children: (open: boolean) => ReactNode;
  title: string;
  badgeCount?: number;
  showBadge?: boolean;
  open?: boolean;
  otherProps?: any;
  closable?: boolean;
}

export const FilterFieldContainer = ({
  title,
  children,
  badgeCount = 0,
  showBadge = false,
  open: openFromProps = true,
  otherProps,
  closable = true
}: Props) => {
  const [open, setOpen] = useState(openFromProps || !closable);
  const openCls = open ? 'open' : 'closed';

  return (
    <Container className={openCls} open={open} {...otherProps}>
      <div className="filter-field">{children(open)}</div>
    </Container>
  );
};
