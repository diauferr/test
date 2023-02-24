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

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { NoResultsFoundMessage } from '../../../../../components/NoResultsFoundMessage';
import { useDoRequest } from '../../../../../Hooks/useDoRequest';
import { EditionMetadata } from '../../../../../models/clipping/EditionMetadata';
import { ContentPoco } from '../../../../../models/ContentPocoModel';
import { ClippingRequests } from '../../../../../requests/clipping/ClippingRequests';
import { EditionRenderer } from '../../../../informativos/components/EditionRenderer';
import { Loader } from './NewsletterSearchResult';
import { useSearchFilter } from '../../../hooks/useSearchFilter';
import { useSearchContext } from '../../../hooks/useSearchContext';
import { ContentNotAvailable } from '../../../../../components/ContentNotAvailable';
import { ProductType } from '../../../../../enums/ProductType';
import { useContractedProducts } from '../../../../../Hooks/useContractedProducts';

export const NewsletterList = () => {
  const { hasAccessToProduct } = useContractedProducts();
  const { clippingsInfo } = useSearchContext();
  const { result: clippings } = clippingsInfo;
  const { filter, changeFilter } = useSearchFilter();
  const [edition, loading, , doRequest] = useDoRequest<
    ContentPoco<EditionMetadata>
  >(null, true);

  useEffect(() => {
    const selectedClipping =
      clippings && clippings.find((c) => c.id === filter.clippingId);
    const [year, month, day] = `${filter.clippingDate}`.split('-');
    const selectedClippingLastEditionDate = selectedClipping
      ? selectedClipping.metadata.lastEdition.publishDate.split(' ')[0]
      : undefined;

    if (selectedClippingLastEditionDate === filter.clippingDate) {
      doRequest(() => Promise.resolve(selectedClipping.metadata.lastEdition));
      return;
    }

    if (!filter.clippingDate) {
      if (selectedClipping) {
        filter.clippingDate =
          selectedClipping.metadata.lastEdition.publishDate.split(' ')[0];
        changeFilter(filter);
        return;
      }
    }

    if (!filter.clippingId) return;

    if (filter.clippingMonthly) {
      doRequest(() =>
        ClippingRequests.getEdition(filter.clippingId, year, month)
      );
    } else {
      doRequest(() =>
        ClippingRequests.getEdition(filter.clippingId, year, month, day)
      );
    }
  }, [filter.clippingId, filter.clippingDate, filter.clippingMonthly]);

  if (!hasAccessToProduct(ProductType.Clipping)) {
    return <ContentNotAvailable />;
  }

  return loading || (clippings && clippings.length === 0) ? (
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
  );
};

const HtmlContainer = styled.div`
  padding-bottom: 2rem;
`;
