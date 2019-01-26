import {createAxiosInstance} from './helper';
import api from './api';

let expensesApi = {
    uploadFile(data, fileType) {
        //console.log("expensesApi-uploadFile-data:", data);
        let instance = createAxiosInstance('');
        const authToken = sessionStorage.getItem('authToken');

        return instance.post(`${api.ROOT_URL}/expense-manager/upload-file-2`, data, {
            headers: {
                'Authorization': `Token ${authToken}`,
                'Content-Type': 'text/plain'
            }
        });
    },
    getExpensesData(timePeriod) {
        //console.log("expensesApi-getExpensesData-data:", timePeriod);
        let instance = createAxiosInstance('');
        const authToken = sessionStorage.getItem('authToken');

        return instance.get(`${api.ROOT_URL}/expense-manager/list?timePeriod=${timePeriod}`, {
            headers: {
                'Authorization': `Token ${authToken}`,
                'Content-Type': 'text/plain'
            }
        });
    }

};

export default expensesApi;
