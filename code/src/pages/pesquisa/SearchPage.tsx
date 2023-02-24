/* eslint-disable react-hooks/rules-of-hooks */

import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import { useHistory, matchPath } from 'react-router';
import { useReturnUrlFromPdf } from '../../Hooks/useReturnUrlFromPdf';
import { SearchResults } from './components/SearchResults';
import { ContentListBook } from '../v2/contentList/contentListBook';
import { ContentTypeName } from './enums/ContentTypeName';
import { useDoRequest } from '../../Hooks/useDoRequest';
import { GlobalSearchRequests } from '../../requests/search/GlobalSearchRequests';
import { useSearchFilter } from './hooks/useSearchFilter';
import { useSearchContext } from './hooks/useSearchContext';
import { GlobalFilter } from './components/filters/GlobalFilter/GlobalFilter';
import { PeriodicFilter } from './components/filters/PeriodicFilter';
import { PeriodicSearchRequest } from '../../requests/search/PeriodicSearchRequest';
import { BookFilter } from './components/filters/BookFilter';
import { BookSearchRequests } from '../../requests/search/BookSearchRequests';
import { VideoSearchRequests } from '../../requests/search/VideoSearchRequests';
import { NewsletterFilter } from './components/filters/NewsletterFilter';
import { NewsletterSearchResult } from './components/filters/NewsletterFilter/NewsletterSearchResult';
import { CodeFilter } from './components/filters/CodeFilter';
import { CodeSearchRequests } from '../../requests/search/CodeSearchRequest';
import { SearchFilter } from '../../models/search/SearchFilter';
import { LegislationSearchRequests } from '../../requests/search/LegislationSearchRequests';
import { LegislationFilter } from './components/filters/LegislationFilter/LegislationFilter';
import Content from '../../components/_templates/Content';

const requestMap = {
    [ContentTypeName.ALL]: (filter, searchInTitle = false) =>
        GlobalSearchRequests.doGlobalSearch(filter, searchInTitle),
    [ContentTypeName.PERIODIC]: (filter, searchInTitle = false) =>
        PeriodicSearchRequest.doPeriodicSearch(filter, searchInTitle),
    [ContentTypeName.BOOK]: (filter, searchInTitle = false) =>
        BookSearchRequests.doBookSearch(filter, searchInTitle),
    [ContentTypeName.VIDEO]: (filter) =>
        VideoSearchRequests.doVideoSearch(filter),
    [ContentTypeName.CODE]: (filter) => CodeSearchRequests.doCodeSearch(filter),
    [ContentTypeName.NEWSLETTER]: () => Promise.resolve([]),
    [ContentTypeName.LEGISLATION]: (filter, searchInTitle = false) =>
        LegislationSearchRequests.doLegislationSearch(filter, searchInTitle)
};

export const SearchPage = () => {
    const { filter, contentType } = useSearchFilter();
    const { setSearchResults, setTitleSearchResult } = useSearchContext();
    const { returnToHereFromPdf } = useReturnUrlFromPdf();
    const [result, loading, error, doRequest] = useDoRequest();
    const [titleResult, titleResultLoading, , doTitleRequest] = useDoRequest(
        []
    );

    useEffect(() => {
        if (filter === SearchFilter.Empty) return;

        if (!contentType) return;

        const reqMap = requestMap[contentType];

        if (reqMap) {
            doRequest(() => reqMap(filter));
        }

        if (
            !!filter.words &&
            filter.page === 1 &&
            !filter.bookIdList &&
            !filter.periodicIdList
        ) {
            if (reqMap) {
                doTitleRequest(() => reqMap(filter, true));
            }
        } else {
            doTitleRequest(() => Promise.resolve([]));
        }

        returnToHereFromPdf();
    }, [contentType, filter]);

    useEffect(() => {
        setSearchResults(result as any);
    }, [result]);

    useEffect(() => {
        setTitleSearchResult(titleResult);
    }, [titleResult]);

    return (
        <Content
            //  @ts-ignore
            Filter={
                <Switch>
                    <Route
                        path={`/pesquisa/${ContentTypeName.ALL}/:queryString?`}
                        component={GlobalFilter}
                    />
                    <Route
                        path={`/pesquisa/${ContentTypeName.PERIODIC}/:queryString?`}
                        component={PeriodicFilter}
                    />
                    <Route
                        path={`/pesquisa/${ContentTypeName.BOOK}/:queryString?`}
                        component={BookFilter}
                    />
                    <Route
                        path={`/pesquisa/${ContentTypeName.NEWSLETTER}/:queryString?`}
                        component={NewsletterFilter}
                    />

                    <Route
                        path={`/pesquisa/${ContentTypeName.CODE}/:queryString?`}
                        component={CodeFilter}
                    />
                    <Route
                        path={`/pesquisa/${ContentTypeName.LEGISLATION}/:queryString?`}
                        component={LegislationFilter}
                    />
                    <Redirect
                        from="*"
                        to={`/pesquisa/${ContentTypeName.ALL}`}
                    />
                </Switch>
            }
            Content={
                <Switch>
                    <Route
                        path={`/pesquisa/${ContentTypeName.NEWSLETTER}/:queryString?`}
                        render={() => <NewsletterSearchResult />}
                    />
                    <Route
                        path={`/pesquisa/todos`}
                        render={() => <ContentListBook />}
                    />
                    <Route
                        path={`*`}
                        render={() => (
                            <SearchResults
                                {...{
                                    error,
                                    loading: loading || titleResultLoading
                                }}
                            />
                        )}
                    />
                </Switch>
            }
        />
    );
};
