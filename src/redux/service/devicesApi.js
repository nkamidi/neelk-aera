import {createAxiosInstance} from './helper';
import api from './api';

import data from '../../utils/deviceTypes';
import nodes from '../../utils/nodes';

let devicesApi = {
    getNodes() {
        return {data: nodes};
        /*let instance = createAxiosInstance('');
        const authToken = sessionStorage.getItem('authToken');

        return instance.get(`${api.ROOT_URL}/device-manager/list`, {
            headers: {
                'Authorization': `Token ${authToken}`,
                'Content-Type': 'text/plain'
            }
        });*/
    },
    getDevicesList() {
        return {data: data.deviceTypes};
        /*let instance = createAxiosInstance('');
        const authToken = sessionStorage.getItem('authToken');

        return instance.get(`${api.ROOT_URL}/device-manager/list`, {
            headers: {
                'Authorization': `Token ${authToken}`,
                'Content-Type': 'text/plain'
            }
        });*/
    },
    addNewDevice(deviceData) {
        // Here we are checking for duplicate entry. This works only for first time since the data read here is not dynamically refreshed.

        // Creating a mock response for web service call
        if (nodes.TopologyNodes.findIndex(device => device['node_name'].toLowerCase() === deviceData['deviceName'].trim().toLowerCase()) < 0) {
            return {status: 'success'};
        } else {
            return {status: 'fail', message: 'Device with same name already exists'}
        }
    }
};

export default devicesApi;
