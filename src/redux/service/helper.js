import axios from 'axios';
import api from './api';

export let instance;

export function createAxiosInstance(jwt) {
    instance = axios.create({
        baseURL: api.ROOT_URL,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });

    //TODO: Chongrui Add token later
    // instance.interceptors.request.use(function (config) {
    //     config.headers = {"Authorization": "Bearer " + jwt};
    //     return config
    // });
    return instance;
}
