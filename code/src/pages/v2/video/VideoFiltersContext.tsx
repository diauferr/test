import React, { createContext, useState } from 'react';
import { OrderType } from './hooks/search/useFiltersRequest';

interface VideoFiltersContextData {
  submit: number;
  updateData: () => void;

  order: OrderType;
  setOrder: (v: OrderType) => void;

  advancedVisible: boolean;
  advancedData: any;
  setAdvancedVisible: (v: boolean) => void;
  setAdvancedData: (v: object[]) => void;

  areaVisible: boolean;
  areaSearchValue: string;
  areaLoading: boolean;
  areaLoaded: boolean;
  areaError: boolean;
  areaData: any;
  areaRI: number;
  setAreaVisible: (v: boolean) => void;
  setAreaSearchValue: (v: string) => void;
  setAreaLoading: (v: boolean) => void;
  setAreaLoaded: (v: boolean) => void;
  setAreaError: (v: boolean) => void;
  setAreaData: (v: any) => void;
  setAreaRI: (v: number) => void;

  dateVisible: boolean;
  dateLoading: boolean;
  dateLoaded: boolean;
  dateError: boolean;
  dateData: any;
  dateRI: number;
  setDateVisible: (v: boolean) => void;
  setDateLoading: (v: boolean) => void;
  setDateLoaded: (v: boolean) => void;
  setDateError: (v: boolean) => void;
  setDateData: (v: any) => void;
  setDateRI: (v: number) => void;

  authorVisible: boolean;
  authorSearchValue: string;
  authorLoading: boolean;
  authorLoaded: boolean;
  authorError: boolean;
  authorData: any;
  authorRI: number;
  setAuthorVisible: (v: boolean) => void;
  setAuthorSearchValue: (v: string) => void;
  setAuthorLoading: (v: boolean) => void;
  setAuthorLoaded: (v: boolean) => void;
  setAuthorError: (v: boolean) => void;
  setAuthorData: (v: any) => void;
  setAuthorRI: (v: number) => void;

  eventVisible: boolean;
  eventSearchValue: string;
  eventLoading: boolean;
  eventLoaded: boolean;
  eventError: boolean;
  eventData: any;
  eventRI: number;
  setEventVisible: (v: boolean) => void;
  setEventSearchValue: (v: string) => void;
  setEventLoading: (v: boolean) => void;
  setEventLoaded: (v: boolean) => void;
  setEventError: (v: boolean) => void;
  setEventData: (v: any) => void;
  setEventRI: (v: number) => void;

  serieVisible: boolean;
  serieSearchValue: string;
  serieLoading: boolean;
  serieLoaded: boolean;
  serieError: boolean;
  serieData: any;
  serieRI: number;
  setSerieVisible: (v: boolean) => void;
  setSerieSearchValue: (v: string) => void;
  setSerieLoading: (v: boolean) => void;
  setSerieLoaded: (v: boolean) => void;
  setSerieError: (v: boolean) => void;
  setSerieData: (v: any) => void;
  setSerieRI: (v: number) => void;
}

export const VideoFiltersContext = createContext<VideoFiltersContextData>(
  {} as VideoFiltersContextData
);

export const VideoFiltersProvider: React.FC = ({ children }) => {
  const [submit, setSubmit] = useState<number>(0);
  const [order, setOrder] = useState<OrderType>('date:desc');

  const [advancedVisible, setAdvancedVisible] = useState<boolean>(false);
  const [advancedData, setAdvancedData] = useState<object[]>([
    { type: 'AND', text: '', exact: false }
  ]);

  const [dateVisible, setDateVisible] = useState<boolean>(false);
  const [dateLoading, setDateLoading] = useState<boolean>(false);
  const [dateLoaded, setDateLoaded] = useState<boolean>(false);
  const [dateError, setDateError] = useState<boolean>(false);
  const [dateData, setDateData] = useState<any>([]);
  const [dateRI, setDateRI] = useState<number>(0);

  const [areaVisible, setAreaVisible] = useState<boolean>(false);
  const [areaSearchValue, setAreaSearchValue] = useState<string>('');
  const [areaLoading, setAreaLoading] = useState<boolean>(false);
  const [areaLoaded, setAreaLoaded] = useState<boolean>(false);
  const [areaError, setAreaError] = useState<boolean>(false);
  const [areaData, setAreaData] = useState<any>([]);
  const [areaRI, setAreaRI] = useState<number>(0);

  const [authorVisible, setAuthorVisible] = useState<boolean>(false);
  const [authorSearchValue, setAuthorSearchValue] = useState<string>('');
  const [authorLoading, setAuthorLoading] = useState<boolean>(false);
  const [authorLoaded, setAuthorLoaded] = useState<boolean>(false);
  const [authorError, setAuthorError] = useState<boolean>(false);
  const [authorData, setAuthorData] = useState<any>([]);
  const [authorRI, setAuthorRI] = useState<number>(0);

  const [eventVisible, setEventVisible] = useState<boolean>(false);
  const [eventSearchValue, setEventSearchValue] = useState<string>('');
  const [eventLoading, setEventLoading] = useState<boolean>(false);
  const [eventLoaded, setEventLoaded] = useState<boolean>(false);
  const [eventError, setEventError] = useState<boolean>(false);
  const [eventData, setEventData] = useState<any>([]);
  const [eventRI, setEventRI] = useState<number>(0);

  const [serieVisible, setSerieVisible] = useState<boolean>(false);
  const [serieSearchValue, setSerieSearchValue] = useState<string>('');
  const [serieLoading, setSerieLoading] = useState<boolean>(false);
  const [serieLoaded, setSerieLoaded] = useState<boolean>(false);
  const [serieError, setSerieError] = useState<boolean>(false);
  const [serieData, setSerieData] = useState<any>([]);
  const [serieRI, setSerieRI] = useState<number>(0);

  const updateData = () => setSubmit(submit + 1);

  return (
    <VideoFiltersContext.Provider
      value={{
        submit,
        updateData,

        order,
        setOrder,

        advancedData,
        advancedVisible,
        setAdvancedData,
        setAdvancedVisible,

        dateData,
        dateError,
        dateLoaded,
        dateLoading,
        dateRI,
        dateVisible,
        setDateData,
        setDateError,
        setDateLoaded,
        setDateLoading,
        setDateRI,
        setDateVisible,

        areaData,
        areaError,
        areaLoaded,
        areaLoading,
        areaRI,
        areaSearchValue,
        areaVisible,
        setAreaData,
        setAreaError,
        setAreaLoaded,
        setAreaLoading,
        setAreaRI,
        setAreaSearchValue,
        setAreaVisible,

        authorData,
        authorError,
        authorLoaded,
        authorLoading,
        authorRI,
        authorSearchValue,
        authorVisible,
        setAuthorData,
        setAuthorError,
        setAuthorLoaded,
        setAuthorLoading,
        setAuthorRI,
        setAuthorSearchValue,
        setAuthorVisible,

        eventData,
        eventError,
        eventLoaded,
        eventLoading,
        eventRI,
        eventSearchValue,
        eventVisible,
        setEventData,
        setEventError,
        setEventLoaded,
        setEventLoading,
        setEventRI,
        setEventSearchValue,
        setEventVisible,

        serieData,
        serieError,
        serieLoaded,
        serieLoading,
        serieRI,
        serieSearchValue,
        serieVisible,
        setSerieData,
        setSerieError,
        setSerieLoaded,
        setSerieLoading,
        setSerieRI,
        setSerieSearchValue,
        setSerieVisible
      }}>
      {children}
    </VideoFiltersContext.Provider>
  );
};
