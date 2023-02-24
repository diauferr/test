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

import pt from 'date-fns/locale/pt';
import moment, { Moment } from 'moment';
import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { Loading } from '../../../components/_shell/Loading';

registerLocale('pt', pt);

interface IProps {
  currentDate: Moment;
  selectingMonth: boolean;
  onChange: (newDate: Moment) => any;
}

const DateContainer = styled.div`
  background: #fff;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 130px;

  .date-container {
    display: flex;
    align-items: center;

    .left,
    .right {
      width: 16px;
      outline: none;
      opacity: 0.6;
    }

    .left {
      margin-right: 3px;
    }

    .right {
      margin-left: 3px;
    }
  }

  .loading-container {
    text-align: center;
    width: 100%;
    align-items: center;
    height: 100%;
    display: flex;
    justify-content: center;
  }

  .react-datepicker__input-container {
    input {
      border: 1px solid rgb(179, 179, 179);
      border-radius: 3px;
      padding: 4px;
      text-align: center;
      cursor: pointer;
    }
  }

  span {
    font-size: 12px;
    font-family: var(--title-font-family);
    font-weight: 500;
    height: 3rem;
    align-items: center;
    text-align: center;
    text-transform: uppercase;
    width: 100%;
    padding: 10px;
  }
`;

export const DateInput = ({
  currentDate,
  selectingMonth,
  onChange
}: IProps) => (
  <DateContainer>
    {currentDate.isValid() ? (
      <>
        <span>Data</span>
        <div className="date-container">
          <input
            className="left"
            type="image"
            src="/assets/images/left-arrow.svg"
            onClick={() =>
              onChange(
                currentDate.clone().subtract(1, selectingMonth ? 'M' : 'd')
              )
            }
          />
          <DatePicker
            locale="pt"
            dateFormat={selectingMonth ? 'MMMM/yyyy' : 'dd/MMMM/yyyy'}
            selected={currentDate.toDate()}
            onChange={(value: Date) => {
              onChange(moment(value));
            }}
            showMonthYearPicker={selectingMonth}
          />
          <input
            className="right"
            type="image"
            src="/assets/images/right-arrow.svg"
            onClick={() =>
              onChange(currentDate.clone().add(1, selectingMonth ? 'M' : 'd'))
            }
          />
        </div>
        {currentDate &&
          currentDate.format('YYYY-MM-DD') !== moment().format('YYYY-MM-DD') &&
          !selectingMonth && (
            <button
              onClick={() => onChange(moment())}
              style={{
                width: 80,
                background: 'transparent',
                border: 0,
                cursor: 'pointer',
                fontSize: 14,
                marginTop: '1rem',
                outline: 'none'
              }}>
              Hoje
            </button>
          )}
      </>
    ) : (
      <div className="loading-container">
        <Loading size={22} />
      </div>
    )}
  </DateContainer>
);
