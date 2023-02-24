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

import React from 'react';
import { useSearchFilter } from '../../hooks/useSearchFilter';
import { DateIntervalSelect } from '../filters/GlobalFilter/DateIntervalSelect';

import { Button } from 'antd';

import {
  Container,
  WrapperWithWords,
  WrapperWithoutWords,
  Row,
  Text
} from './styles';

interface Props {
  totalCount: number;
}

export const ResultsBar = ({ totalCount }: Props) => {
  const { filter, contentType, changeFilter } = useSearchFilter();
  const sort = filter.words ? 'proximidade do termo' : 'data decrescente';

  const handleClearFilter = () => {
    filter.words = '';
    filter.page = 1;
    changeFilter(filter);
  };

  return filter.words ? (
    <Container>
      <WrapperWithWords>
        <Row>
          <Text>
            {`${totalCount} registros encontrados para: `}
            <b className="searchingFor" style={{ color: '#003A70' }}>
              "{filter.words}"
            </b>
            {` em `}
            <b style={{ textTransform: 'capitalize', color: '#D7282F' }}>
              {contentType}
            </b>
          </Text>
          <Button
            onClick={handleClearFilter}
            style={{ borderRadius: '10px', marginLeft: '20px' }}>
            Limpar pesquisa
          </Button>
        </Row>
        <Row>
          <Text>{sort && `Ordenação (${sort})`}</Text>
          <DateIntervalSelect />
        </Row>
      </WrapperWithWords>
    </Container>
  ) : (
    <Container>
      <WrapperWithoutWords>
        <Text>{totalCount} registros encontrados</Text>
        <div>
          <Text>{sort && `Ordenação (${sort})`}</Text>
          <DateIntervalSelect />
        </div>
      </WrapperWithoutWords>
    </Container>
  );
};
