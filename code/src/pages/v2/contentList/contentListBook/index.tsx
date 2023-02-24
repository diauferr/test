import React, { useState, useEffect } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { ArrowLeft, ArrowRight } from './arrows';
import { Card } from './card';
import { useDrag } from '../hooks/useDrag';
import { getBooks } from '../services/getBooks';
import { Books } from '../types/books.js';

import * as S from './styles';

//definitions from react-horizontal-scroll-menu
type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

const elemPrefix = 'book';
const getId = (index: number) => `${elemPrefix}${index}`;

const getItems = () =>
    Array(20)
        .fill(0)
        .map((_, ind) => ({ id: getId(ind) }));

export const ContentListBook: React.FC = () => {
    const [items] = useState(getItems);

    const { dragStart, dragStop, dragMove, dragging } = useDrag();
    const handleDrag =
        ({ scrollContainer }: scrollVisibilityApiType) =>
        (ev: React.MouseEvent) =>
            dragMove(ev, (posDiff) => {
                if (scrollContainer.current) {
                    scrollContainer.current.scrollLeft += posDiff;
                }
            });

    const [selected, setSelected] = React.useState<string>('');
    const handleItemClick = (itemId: string) => () => {
        if (dragging) {
            return false;
        }
        setSelected(selected !== itemId ? itemId : '');
    };

    //ContentListBook component, doing a request and returning the results from `elastic` mocked data
    const [results, setResults] = useState<Books['hits']['hits'] | any>([]);
    const [loading, isLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            isLoading(true);

            const data = {
                query: {
                    match: { title: 'processo' }
                }
            };

            const response = await getBooks('/mockElastic.json', data);
            const mappedData = response.hits.hits.map((res: any) => {
                return {
                    tag: res._source.tag,
                    title: res._source.title,
                    cover: res._source.cover,
                    author: res._source.author,
                    date: res._source.date,
                    desc: res._source.desc
                };
            });
            setResults(mappedData);
            isLoading(false);
        };

        fetchData();
    }, []);

    return (
        <S.Container>
            {loading && <div>Loading...</div>}
            {!loading && (
                <div>
                    <S.Wrapper>
                        <h2>Livros</h2>
                        <a href="#">ver mais</a>
                    </S.Wrapper>
                    <ScrollMenu
                        LeftArrow={ArrowLeft}
                        RightArrow={ArrowRight}
                        onMouseDown={() => dragStart}
                        onMouseUp={() => dragStop}
                        onMouseMove={handleDrag}>
                        {results.map((results: any) => (
                            <Card
                                tag={results.tag}
                                title={results.title}
                                cover={results.cover}
                                author={results.author}
                                date={results.date}
                                desc={results.desc}
                                link={results.link}
                                itemId={results.title}
                                key={results.title}
                                onClick={handleItemClick(results.title)}
                                selected={results.title === selected}
                            />
                        ))}
                    </ScrollMenu>
                </div>
            )}
        </S.Container>
    );
};

export default ContentListBook;
