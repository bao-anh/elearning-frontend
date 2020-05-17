import { Reducer } from 'redux';
import { REHYDRATE } from 'redux-persist';
import AppInfo from '../../models/AppInfo';
import { replaceItem } from '../../utils';
import * as Types from '../actions';
import { AppInfoAction } from './../actions/appinfo';

export interface AppInfoState {
    loading: boolean,
    list: Array<AppInfo>,
    data: any,
    error: any,
}

const initState = {
    loading: false,
    data: {},
    list: [],
    error: null,
}

const appValueState: Reducer<AppInfoState> = (state: AppInfoState = initState, action: AppInfoAction | any ): AppInfoState => {
    switch (action.type) {
        case REHYDRATE: {
            if(action.payload){
                let list = action.payload.appInfoState?.list;
                if(list){
                    let map: any = {};
                    list.forEach((info: any) => {
                        let appInfo: AppInfo = AppInfo.fromJS(info);
                        map[appInfo.appNameId] = appInfo;
                    });
                    state.list = list;
                    state.data = map;
                }
            }
            return { ...state };
        }
        case Types.GET_APP_INFO: {
            return { ...state, loading: true };
        }
        case Types.GET_APP_INFO_SUCCESS: {
            let map = state.data ?? {};
            if(action.data){
                action.data.forEach((info: any) => {
                    let appInfo: AppInfo = AppInfo.fromJS(info);
                    if(!map[appInfo.appNameId]){
                        state.list.push(appInfo);
                    } else {
                        replaceItem(state.list, 'appNameId', appInfo);
                    }
                    map[appInfo.appNameId] = appInfo;
                });
            }
            return { ...state, loading: false, data: map, error: null };
        }
        case Types.GET_APP_INFO_FAILURE: {
            return { ...state, loading: false, error: action.error };
        }
        case Types.GET_ALL_APP_INFO: {
            return { ...state, loading: true };
        }
        case Types.GET_ALL_APP_INFO_SUCCESS: {
            let map = state.data ?? {};
            if(action.data){
                action.data.forEach((info: any) => {
                    let appInfo: AppInfo = AppInfo.fromJS(info);
                    map[appInfo.appNameId] = appInfo;
                    replaceItem(state.list, 'appNameId', appInfo);
                });
            }
            return { ...state, loading: false, data: map, error: null };
        }
        case Types.GET_ALL_APP_INFO_FAILURE: {
            return { ...state, loading: false, error: action.error };
        }
        default:
            return state;
    }
}

export default appValueState;