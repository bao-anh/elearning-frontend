import { Reducer } from 'redux';
import * as Types from '../actions';
import { AlertType } from './../../components/MyAlert';
import { AppValueAction } from './../actions/appValue';

export interface AppValueEntity {
    image: string,

    msg: string,
    alertType: AlertType,
    onClose?: Function,
}

export class AppValueState implements AppValueEntity {
    image: string;
    msg: string;
    alertType: AlertType;
    onClose?: Function;

    constructor(props?: AppValueEntity | any) {
        this.image = props?.image ?? "";
        this.msg = props?.msg ?? "";
        this.alertType = props?.alertType ?? AlertType.info;
        this.onClose = props?.onClose ?? function() {};
    }

    static init() {
        return new AppValueState();
    }
}


const appValueState: Reducer<AppValueState> = 
(state: AppValueState = AppValueState.init(), action: AppValueAction ): AppValueState => {
    switch (action.type) {
        case Types.SHOW_IMAGE_DIALOG: {
            return { ...state, image: action.url };
        }
        case Types.SHOW_ALERT: {
            return { ...state, msg: action.msg, alertType: action.alertType, onClose: action.onClose };
        }
        default:
            return state;
    }
}

export default appValueState;