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

import _ from 'lodash';
import React, { useEffect } from 'react';
import 'react-image-lightbox/style.css';
import { RouteComponentProps } from 'react-router';
import { ContentNotAvailable } from '../../components/ContentNotAvailable';
import { ButtonsBarButton } from '../../components/_shell/ButtonsBarButton';
import { ContentWithAllAvailableSpace } from '../../components/_templates/ContentWithAllAvailableSpace';
import { ProductType } from '../../enums/ProductType';
import { useContractedProducts } from '../../Hooks/useContractedProducts';
import { useDoRequest } from '../../Hooks/useDoRequest';
import { CodeRequests } from '../../requests/code/CodeRequests';
import { queryStringParser } from '../../util/QueryStringParser';

export const CodePage = ({ match, history }: RouteComponentProps) => {
  const { hasAccessToProduct } = useContractedProducts();
  const codeId = _.get(match, 'params.codeId');
  const queryString = _.get(match, 'params.queryString');
  const urlObject: any = queryStringParser.fromQueryString(queryString);
  const [, , , doRequest] = useDoRequest<any>();

  if (!hasAccessToProduct(ProductType.Codes)) {
    return <ContentNotAvailable />;
  }

  useEffect(() => {
    doRequest(() => CodeRequests.postLogCode(codeId));
  }, []);

  function getUrl(url: string) {
    if (!!url) {
      return `https://codigos.forumconhecimento.com.br/itenscodigo${urlObject.url}`;
    } else {
      return `https://forumconhecimento.com.br/codigosbid/codigosplataforma.html?code=${codeId}`;
    }
  }

  return (
    <ContentWithAllAvailableSpace style={{ marginLeft: 70 }}>
      <ButtonsBarButton
        buttonProps={{
          icon: 'arrow-left',
          children: <>Voltar</>,
          onClick: () => history.push('/pesquisa/codigos')
        }}
      />
      <iframe
        style={{
          width: '100vw',
          height: '80vh',
          marginTop: '1rem',
          padding: '0 14rem'
        }}
        src={getUrl(urlObject.url)}
      />
    </ContentWithAllAvailableSpace>
  );
};
