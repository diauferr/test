import React, { useEffect } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import _ from 'lodash';
import { Skeleton } from 'antd';
import { ButtonsBar } from '../../components/_shell/ButtonsBar';
import { DateInput } from './components/DateInput';
import { RouteComponentProps } from 'react-router';
import { useDoRequest } from '../../Hooks/useDoRequest';
import { ContentPoco } from '../../models/ContentPocoModel';
import { EditionMetadata } from '../../models/clipping/EditionMetadata';
import { EditionRenderer } from './components/EditionRenderer';
import { NoResultsFoundMessage } from '../../components/NoResultsFoundMessage';
import { ClippingRequests } from '../../requests/clipping/ClippingRequests';

const DateInputContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const HtmlContainer = styled.div`
  padding-bottom: 2rem;
`;

const Loader = () => (
  <div>
    <Skeleton />
    <Skeleton />
    <Skeleton />
  </div>
);

export const EditionPage = ({ match, history }: RouteComponentProps) => {
  const clippingId = _.get(match.params, 'clippingId');
  const day = _.get(match.params, 'day');
  const month = _.get(match.params, 'month');
  const year = _.get(match.params, 'year');
  const [edition, loading, , doRequest] =
    useDoRequest<ContentPoco<EditionMetadata>>();

  const selectingJustMonth = !day;

  useEffect(() => {
    doRequest(() => ClippingRequests.getEdition(clippingId, year, month, day));
  }, [year, month, day]);

  return (
    <div>
      <ButtonsBar style={{ marginBottom: '2rem' }}>
        <DateInputContainer>
          <DateInput
            currentDate={moment(`${year}-${month}-${day || '01'}`)}
            selectingMonth={selectingJustMonth}
            onChange={(newDate) => {
              const iDay = newDate.format('DD');
              const iMonth = newDate.format('MM');
              const iYear = newDate.format('YYYY');

              if (selectingJustMonth) {
                history.push(`/informativos/${clippingId}/${iYear}/${iMonth}`);
              } else {
                history.push(
                  `/informativos/${clippingId}/${iYear}/${iMonth}/${iDay}`
                );
              }
            }}
          />
        </DateInputContainer>
      </ButtonsBar>
      {loading ? (
        <Loader />
      ) : (
        <HtmlContainer>
          {edition ? (
            <EditionRenderer html={edition.text2} />
          ) : (
            <div style={{ marginTop: '5rem' }}>
              <NoResultsFoundMessage message={'Nenhuma edição encontrada.'} />
            </div>
          )}
        </HtmlContainer>
      )}
    </div>
  );
};
