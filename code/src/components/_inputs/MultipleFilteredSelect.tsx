import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ISelectOption } from './MultipleSelect';
import { RemovableTag } from './RemovableTag';
import styled from 'styled-components';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap
} from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Loading } from '../_shell/Loading';
import { Icon, List } from 'antd';
import { ClickableListItem } from './ClickableListItem';
import { ScrollableContent } from '../_templates/ScrollableContent';
import { usePrevious } from '../../Hooks/usePrevious';

const Container = styled.div`
  background: #fff;

  #clear-icon {
    pointer-events: all;
    color: #9b9b9b !important;

    &:hover {
      color: #6b6b6b !important;
    }
  }
`;

const TagsContainer = styled.div`
  display: grid;
  grid-auto-flow: row;

  padding: 0.5rem;

  .tags,
  .tags:not(:last-child) {
    margin: 0;
    margin-top: 0;
    margin-bottom: 0;
  }
`;

function replaceSpecialChars(text) {
  text = text.toLowerCase();
  text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a');
  text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e');
  text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i');
  text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o');
  text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u');
  text = text.replace(new RegExp('[Ç]', 'gi'), 'c');
  return text;
}

function getOptionsDefault(words: string, options?: ISelectOption[]) {
  const result = options
    .map((option) => {
      if (
        replaceSpecialChars(option.text).indexOf(replaceSpecialChars(words)) >
        -1
      ) {
        return option;
      } else {
        return null;
      }
    })
    .filter((item) => !!item);

  return Promise.resolve(result as ISelectOption[]);
}

export class MultipleFilteredSelectParser {
  static valueTextSeparator = '___';

  static decodeValue(valueAsString: string): ISelectOption {
    const [value, text] = `${valueAsString}`.split(
      MultipleFilteredSelectParser.valueTextSeparator
    );

    if (!value || !text) return null;

    return { value, text };
  }

  static encodeValue(valueAsOption: ISelectOption) {
    return `${valueAsOption.value}${MultipleFilteredSelectParser.valueTextSeparator}${valueAsOption.text}`;
  }
}

export function extractIdsFromMultiFilteredSelectValues(
  valueAsString?: string
) {
  if (!valueAsString) return '';

  return valueAsString
    .split('{')
    .map(MultipleFilteredSelectParser.decodeValue)
    .map((o) => (!!o ? o.value : ''))
    .join(',');
}

interface IProps {
  open: boolean;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => any;
  options?: ISelectOption[];
  getOptions?: (
    words: string,
    options?: ISelectOption[]
  ) => Promise<ISelectOption[]>;
}

export const MultipleFilteredSelect = ({
  open,
  label,
  placeholder = 'Buscar...',
  value,
  options: initialOptions = [],
  onChange,
  getOptions = getOptionsDefault
}: IProps) => {
  const [inputRef, setInputRef] = useState<any>();
  const prevOpen = usePrevious(open);
  const [words, setWords] = useState('');
  const [options, setOptions] = useState<ISelectOption[]>(initialOptions);
  const [loading, setLoading] = useState(false);
  const filteringInMemory = initialOptions.length > 0;

  const selectedOptions = value
    .split('{')
    .map(MultipleFilteredSelectParser.decodeValue)
    .filter((o) => !!o);

  const subject$ = useRef(
    new Subject<any>().pipe(
      debounceTime(200),
      filter((searchTerm: string) => {
        //initialOptions.length  =  0 quer dizer que esta filtrando local
        if (initialOptions.length === 0) return true;
        return `${searchTerm}`.length > 2;
      }),
      distinctUntilChanged(),
      switchMap((words) => getOptions(words, initialOptions))
    )
  );

  useLayoutEffect(() => {
    if (prevOpen === false && open && inputRef && inputRef.focus) {
      inputRef.focus();
    }
  }, [open, prevOpen]);

  useEffect(() => {
    if (filteringInMemory) return;

    const subscription = subject$.current.subscribe(
      (options) => {
        //@ts-ignore
        setOptions(options);
        setLoading(false);
      },
      () => {
        setLoading(false);
      }
    );

    return () => {
      if (!filteringInMemory) subscription.unsubscribe();
    };
  }, []);

  async function searchWordChanged(evt: any) {
    const words = evt.target.value;
    setWords(words);

    if (filteringInMemory) {
      setOptions(await getOptions(words, initialOptions));
    } else {
      setLoading(true);
      //@ts-ignore
      subject$.current.next(words);
    }
  }

  function optionSelected(option: ISelectOption) {
    const options = selectedOptions.concat(option);
    onChange(options.map(MultipleFilteredSelectParser.encodeValue).join('{'));
  }

  function optionUnselected(
    option: ISelectOption,
    selectedOptions: ISelectOption[]
  ) {
    const options = selectedOptions.filter(
      (o) => `${o.value}` !== `${option.value}`
    );
    onChange(options.map(MultipleFilteredSelectParser.encodeValue).join('{'));
  }

  return (
    <Container>
      {label && <label>{label}</label>}

      {selectedOptions.length > 0 && (
        <TagsContainer>
          {selectedOptions.map((o) => (
            <RemovableTag
              key={o.value}
              text={o.text}
              onRemoveClick={() => {
                optionUnselected(o, [...selectedOptions]);
              }}
              tagClassName={'is-primary'}
            />
          ))}
        </TagsContainer>
      )}

      <div className="field" style={{ padding: '.5rem' }}>
        <p
          className="control has-icons-left has-icons-right"
          style={{ margin: 0 }}>
          <input
            ref={setInputRef}
            className="input"
            type="text"
            placeholder={placeholder}
            onChange={searchWordChanged}
            value={words}
          />
          <span className="icon is-small is-left">
            <Icon type={'search'} />
          </span>

          {words.length > 0 && (
            <a
              className="icon is-small is-right"
              id={'clear-icon'}
              title="limpar"
              onClick={() => {
                setWords('');
                setOptions(filteringInMemory ? initialOptions : []);
              }}>
              <Icon type="close-circle" theme="filled" />
            </a>
          )}
        </p>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Loading size={22} />
        </div>
      ) : (
        <ScrollableContent height={options.length > 0 ? 200 : 0}>
          <List itemLayout="horizontal" renderItem={null}>
            {options.map(({ value, text }) => {
              const checked = selectedOptions.some(
                (o) => `${o.value}` === `${value}`
              );

              const onClick = () => {
                if (checked) {
                  optionUnselected({ value, text }, [...selectedOptions]);
                } else {
                  optionSelected({ value, text });
                }
              };

              return (
                <ClickableListItem onClick={onClick} key={text}>
                  <List.Item.Meta
                    avatar={
                      <input
                        type="checkbox"
                        checked={checked}
                        onClick={onClick}
                        onChange={() => {}}
                      />
                    }
                    description={text}
                  />
                </ClickableListItem>
              );
            })}
          </List>
        </ScrollableContent>
      )}
    </Container>
  );
};
