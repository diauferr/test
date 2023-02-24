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

import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { Icon } from 'antd';
import Autosuggest from 'react-autosuggest';
import { SearchBarContainer } from './styled-components';
import { getSuggestions } from '../../requests/getSuggestions';
import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  map,
  share
} from 'rxjs/operators';

interface IProps {
  searchText?: string;
  onEnter: (txt: string, clearingText?: boolean) => any;
  onChange?: (text: string) => any;
  big?: boolean;
  updateToFocus?: any;
  showSuggestions?: boolean;
  onReceivedNewSuggestions?: (suggestions: any[]) => any;
}

const subject$ = new Subject<any>().pipe(
  debounceTime(200),
  map((searchTerm: string) => `${searchTerm}`.trim()),
  filter((searchTerm: string) => `${searchTerm}`.length > 2),
  distinctUntilChanged(),
  switchMap((searchTerm) => getSuggestions(searchTerm)),
  share()
);

export const SearchBar = ({
  searchText: searchTextFromProps = '',
  onEnter,
  onChange = () => null,
  big = false,
  updateToFocus = false,
  showSuggestions = true,
  onReceivedNewSuggestions
}: IProps) => {
  const inputRef = useRef();
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const subscriptionRef = useRef<any>();

  useEffect(() => {
    subscriptionRef.current = subject$.subscribe((suggestions: any) => {
      if (onReceivedNewSuggestions) onReceivedNewSuggestions([...suggestions]);

      if (showSuggestions) setSuggestions(suggestions);
    });

    return () => {
      subscriptionRef.current.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (searchTextFromProps !== searchText) setSearchText(searchTextFromProps);
  }, [searchTextFromProps]);

  useEffect(() => {
    if (!!inputRef.current && updateToFocus !== false) {
      //@ts-ignore
      inputRef.current.input.focus();
    }
  }, [updateToFocus]);

  return (
    <SearchBarContainer big={big}>
      <div className="input-container">
        <Autosuggest
          ref={inputRef}
          suggestions={suggestions}
          onSuggestionsFetchRequested={({ value }) => {
            //@ts-ignore
            subject$.next(value);
          }}
          onSuggestionsClearRequested={() => setSuggestions([])}
          getSuggestionValue={(suggestion: any) => suggestion.title}
          renderSuggestion={(suggestion: any) => {
            if (!showSuggestions) return null;

            return <div>{suggestion.title}</div>;
          }}
          onSuggestionSelected={(evt: any, { suggestion, suggestionValue }) => {
            setSearchText(suggestionValue);
            onEnter(suggestionValue);
          }}
          inputProps={{
            placeholder: 'O que você desejar encontrar?',
            value: searchText,
            onChange: (evt: any) => {
              const text = evt.target.value;
              onChange(text);
              setSearchText(text);
            },
            onKeyPress: (e: any) => {
              if (e.key === 'Enter') {
                const input = _.get(inputRef, 'current.input', {
                  blur: () => null
                });
                input.blur();
                onEnter(searchText);
              }
            }
          }}
        />

        <Icon type="search" className={'search'} style={{ width: 40 }} />

        {searchText && (
          <a
            href={'javascript:function(){}'}
            onClick={() => {
              setSearchText('');
              onEnter('', true);
            }}
            title="Limpar"
            className={'clear'}>
            <Icon type="close-circle" />
          </a>
        )}
      </div>
    </SearchBarContainer>
  );
};
