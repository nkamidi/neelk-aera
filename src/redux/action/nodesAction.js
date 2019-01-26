import * as actions from './actionTypes';

export function getDevicesList() {
    return {
        type: actions.GET_DEVICE_LIST
    };
}

export function getNodes() {
    return {
        type: actions.GET_NODES
    };
}