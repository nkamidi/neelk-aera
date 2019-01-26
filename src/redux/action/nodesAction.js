import * as actions from './actionTypes';

export function getDevicesList() {
    return {
        type: actions.GET_DEVICE_TYPES
    };
}

export function getNodes() {
    return {
        type: actions.GET_DEVICES
    };
}