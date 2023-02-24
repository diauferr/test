import axios, { AxiosRequestConfig } from 'axios';
import { Books } from '../types/books.js';

//to-do: add data arg with type any on axios config
export const getBooks = async (url: string, data: any): Promise<Books> => {
    const config: AxiosRequestConfig = {
        method: 'get',
        url,
        data
    };

    const response = await axios(config);
    return response.data;
};
