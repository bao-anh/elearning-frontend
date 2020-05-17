import { call, put, select, take } from 'redux-saga/effects';
import AppInfo from '../../models/AppInfo';
import { callApi } from '../../services';
import * as Actions from '../actions/appinfo';
import * as Types from '../actions/types';
import { AppState } from './../appstate';
import { AppInfoState } from './../reducers/appInfo';

function getAppInfo(appNameId: string) {
    return callApi({ url: '/data?type=get_app_info&appNameId=' + appNameId, params: null, method: 'post' });
}

function getAllAppInfo() {
    return callApi({ url: '/data?type=get_all_app_info', params: null, method: 'post' });
}

function* getAppInfoSaga() {
    while(true) {
        try {
            let action = yield take(Types.GET_APP_INFO);
            let appNameId: string = action.appNameId;
            let appInfoState: AppInfoState = yield select((appState: AppState) => appState.appInfoState);
            let appInfo;
            if(appInfoState.data && appInfoState.data[appNameId]){
                appInfo = AppInfo.fromJS(appInfoState.data[appNameId]);
            }
            if(!appInfo){
                appInfo = yield call(getAppInfo, appNameId);
            }
            if(appInfo){
                yield put(Actions.getAppInfoSuccess([AppInfo.fromJS(appInfo)]));
            } else {
                yield put(Actions.getAppInfoFailed('app info null'));
            }
        } catch(e){
            yield put(Actions.getAppInfoFailed(e));
        }
    }
}

const MIN_APP = 19;

function* getAllAppInfoSaga() {
    while(true) {
        try {
            yield take(Types.GET_ALL_APP_INFO);
            let appInfoState: AppInfoState = yield select((appState: AppState) => appState.appInfoState);
            let appInfos: Array<AppInfo> = [];
            if(appInfoState && appInfoState.list && appInfoState.list.length === MIN_APP){
                appInfoState.list.forEach((app: any) => {
                    let appInfo: AppInfo = AppInfo.fromJS(app);
                    appInfos.push(appInfo);
                });
            }
            if(appInfos.length === 0){
                let apps = yield call(getAllAppInfo);
                apps && apps.forEach((app: any) => {
                    let appInfo: AppInfo = AppInfo.fromJS(app);
                    appInfos.push(appInfo);
                });
            }
            yield put(Actions.getAllAppInfoSuccess(appInfos));
        } catch(e){
            yield put(Actions.getAllAppInfoFailed(e));
        }
    }
}

export const appInfoSaga = [
    getAppInfoSaga(),
    getAllAppInfoSaga()
];