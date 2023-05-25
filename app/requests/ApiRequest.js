import CBConstant from 'constants/CBConstant';
import CBApi from 'services/CBApi';

export default class ApiRequest {

    static getStudent(param, callbackSuccess, callbackError, showLoading = true, showError = true) {
        const api = new CBApi();
        api.getStudent(param, showLoading, showError).then(({status, data}) => {
            if (status === CBConstant.STATUS_OK) {
                callbackSuccess && callbackSuccess(data);
            } else {
                callbackError && callbackError(data);
            }
        }).catch((error) => {
            callbackError && callbackError(error);
        });
    }

    static setStudent(param, callbackSuccess, callbackError, showLoading = true, showError = true) {
        const api = new CBApi();
        api.submitStudent(param, showLoading, showError).then(({status, data}) => {
            if (status === CBConstant.STATUS_OK) {
                callbackSuccess && callbackSuccess(data);
            } else {
                callbackError && callbackError(data);
            }
        }).catch((error) => {
            callbackError && callbackError(error);
        });
    }
}