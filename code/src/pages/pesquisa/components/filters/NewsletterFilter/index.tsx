import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import moment, { Moment } from 'moment';
import { RadioSelect } from '../../../../../components/_inputs/RadioSelect';
import { Loading } from '../../../../../components/_shell/Loading';
import { ClippingModel } from '../../../../../models/clipping/ClippingModel';
import { DateInput } from '../../../../informativos/components/DateInput';
import { FilterFieldContainer } from '../../FilterFieldContainer';
import { useSearchFilter } from '../../../hooks/useSearchFilter';
import { useSearchContext } from '../../../hooks/useSearchContext';
import 'react-datepicker/dist/react-datepicker.css';

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10rem;
  background: #fff;
  border: 1px solid rgba(255, 0, 0, 0.5);
  border-radius: 3px;
  padding: 4px;
  color: red;
  cursor: pointer;

  img {
    margin-right: 3px;
    width: 1rem;
    height: 1rem;
  }
`;

export const NewsletterFilter = () => {
  const { clippingsInfo } = useSearchContext();
  const { result: clippings, loading, error } = clippingsInfo;
  const { filter, changeFilter } = useSearchFilter();
  const currentSelectedClipping = !!filter.clippingId
    ? (clippings || []).find((c) => c.id === filter.clippingId)
    : (clippings || [])[0];
  const monthly = currentSelectedClipping && currentSelectedClipping.monthly;
  const selectClipping = useCallback(
    (clipping: ClippingModel) => {
      if (!clipping) return;
      if (clipping.id === filter.clippingId) return;

      filter.clippingId = clipping.id;
      filter.clippingMonthly = clipping.monthly;
      filter.clippingDate = undefined;
      changeFilter(filter);
    },
    [filter]
  );
  const clippingOptions = (clippings || []).map((c) => ({
    text: c.name,
    value: c.id
  }));

  useEffect(() => {
    if (!filter.clippingId && clippings) {
      selectClipping(clippings[0]);
    }
  }, [filter.clippingId, clippings]);

  if (loading) {
    return <Loading size={22} />;
  }

  if (error) {
    return null;
  }

  return (
    <>
      <FilterFieldContainer title={'Informativo'} closable={false}>
        {() => (
          <RadioSelect
            value={filter.clippingId}
            options={clippingOptions}
            onChange={(id: string) =>
              selectClipping(clippings.find((c) => c.id === id))
            }
          />
        )}
      </FilterFieldContainer>

      {filter.words === '' ? (
        <>
          <DateInput
            selectingMonth={monthly}
            currentDate={moment(filter.clippingDate)}
            onChange={(newDate: Moment) => {
              filter.clippingMonthly = monthly;
              filter.clippingDate = newDate.format('YYYY-MM-DD');
              changeFilter(filter);
            }}
          />
        </>
      ) : (
        <StyledButton
          onClick={() => {
            filter.clippingMonthly = clippings[0].monthly;
            filter.words = '';
            changeFilter(filter);
          }}>
          <img src="/assets/images/close.svg" alt="Limpar filtro" />
          Limpar busca
        </StyledButton>
      )}
    </>
  );
};
