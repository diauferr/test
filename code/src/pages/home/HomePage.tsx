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
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { QuickAccess } from '../../components/QuickAccess';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { Logo } from '../../components/_shell/Logo';
import { ContentBelowHeader } from '../../components/_templates/ContentBelowHeader';
import { SearchFilter } from '../../models/search/SearchFilter';
import { ContentTypeName } from '../pesquisa/enums/ContentTypeName';

export const HomePage = () => {
  const history = useHistory();
  return (
    <ContentBelowHeader>
      <Container>
        <Logo />
        <SearchBar
          updateToFocus={1}
          big
          onEnter={(words: string) => {
            const filter = new SearchFilter();
            filter.setWords(words);
            history.push(
              `/pesquisa/${
                ContentTypeName.ALL
              }?${filter.convertToQueryString()}`
            );
          }}
        />
        <QuickAccess />
      </Container>
    </ContentBelowHeader>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 750px;
  width: 100%;
  margin: 9rem auto 0 auto;
  background: white;
  padding-bottom: 3rem;

  svg {
    width: 40%;
  }

  @media (max-width: 500px) {
    margin: 5rem auto 0 auto;
  }
`;
