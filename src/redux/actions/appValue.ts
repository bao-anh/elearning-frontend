import { AlertType } from './../../components/MyAlert';
import * as Types from './types';

interface ShowImageDialogAction {
    type: typeof Types.SHOW_IMAGE_DIALOG,
    url: string,
}

interface ShowAlertAction {
    type: typeof Types.SHOW_ALERT,
    msg: string,
    alertType: AlertType,
    onClose?: Function
}

export type AppValueAction = ShowImageDialogAction | ShowAlertAction | MyAnyAction;

const XXX ="xxx";
interface MyAnyAction {
    type: typeof XXX
}

export function showImageDialog(url: string): ShowImageDialogAction {
    return {
        type: Types.SHOW_IMAGE_DIALOG, 
        url: url,
    };
}

export function showAlert(msg: string, alertType: AlertType, onClose?: Function) : ShowAlertAction {
    return {
        type: Types.SHOW_ALERT,
        msg: msg,
        alertType: alertType,
        onClose: onClose
    }
}