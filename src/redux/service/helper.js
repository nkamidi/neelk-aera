import axios from 'axios';
import api from './api';

export let instance;

export function createAxiosInstance(jwt) {
    instance = axios.create({
        baseURL: api.BOOKS_LIST_URL,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });

    return instance;
}
