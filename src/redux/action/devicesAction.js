import * as actions from './actionTypes';

export function getDeviceTypes() {
    return {
        type: actions.GET_DEVICE_TYPES
    };
}

export function getDevices() {
    return {
        type: actions.GET_DEVICES
    };
}