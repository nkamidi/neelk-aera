import {createAxiosInstance} from './helper';
import api from './api';

let booksApi = {
    getBooksList() {
        let instance = createAxiosInstance('');
        return instance.get(`${api.BOOKS_LIST_URL}/overview.json`, {
            params: {
                "api-key": api.API_KEY
            }
        });
    }
};

export default booksApi;
