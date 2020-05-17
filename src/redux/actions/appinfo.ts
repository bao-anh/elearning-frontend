import AppInfo from '../../models/AppInfo';
import * as Types from './types';

export interface AppInfoAction {
    type: string,
    appNameId?: string,
    data?: Array<AppInfo>,
    error?: any,
}

export function getAppInfo(appNameId: string): AppInfoAction {
    return {
        type: Types.GET_APP_INFO, 
        appNameId: appNameId,
    };
}

export function getAppInfoSuccess(appInfos: Array<AppInfo>): AppInfoAction {
    return {
        type: Types.GET_APP_INFO_SUCCESS, 
        data: appInfos,
    };
}

export function getAppInfoFailed(error: any): AppInfoAction {
    return {
        type: Types.GET_APP_INFO_FAILURE, 
        error: error,
    };
}

export function getAllAppInfo(): AppInfoAction {
    return {
        type: Types.GET_ALL_APP_INFO, 
    };
}

export function getAllAppInfoSuccess(appInfos: Array<AppInfo>): AppInfoAction {
    return {
        type: Types.GET_ALL_APP_INFO_SUCCESS, 
        data: appInfos,
    };
}

export function getAllAppInfoFailed(error: any): AppInfoAction {
    return {
        type: Types.GET_ALL_APP_INFO_FAILURE, 
        error: error,
    };
}