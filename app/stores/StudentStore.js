import {makeAutoObservable} from 'mobx';
import CBConstant from 'constants/CBConstant';
import CBApi from 'services/CBApi';

class StudentStore {
    refreshing = false;
    studentInfo = {};

    constructor() {
        makeAutoObservable(this);
    }

    setRefreshing(refreshing) {
        this.refreshing = refreshing;
    }

    fetchStudent(callback, showLoading = false, showError = true) {
        const param = {
            id: 1812336
        }
        const api = new CBApi();
        api.getStudent(param, showLoading, showError).then(({status, data}) => {
            if (status === CBConstant.STATUS_OK) {
                this.studentInfo = data?.message || {};
                callback && callback();
            } else {
                callback && callback();
            }
        }).catch((error) => {
            this.refreshing = false;
            callback && callback();
        });
    }

    reset() {
        this.studentInfo = {};
    }

    clear() {
        this.refreshing = false;
        this.studentInfo = {};
    }
}

export default new StudentStore();
