import React from 'react';
import {DeviceEventEmitter} from 'react-native';
import CBConstant from 'constants/CBConstant';
import CBConverter from 'databases/CBConverter';
import CBDatabase from 'databases/CBDatabase';
import CBGlobal from 'globals/CBGlobal';
import Parse from 'parse/react-native.js';
import CBApi from "services/CBApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import JsonUtil from "utils/JsonUtil";

export default class CBSync {

    static syncService(callback) {
        const query = new Parse.Query('Service');
        query.find().then(queryResult => {
            const db = new CBDatabase();
            db.create(CBConstant.SERVICE_SCHEMA, CBConverter.convertService(queryResult), (result) => {
                if (result) {
                    DeviceEventEmitter.emit('SYNC_SERVICE');
                }
            });
        }).catch((error) => {
            console.log('error -> ' + JSON.stringify(error));
        }).finally(() => {
            callback && callback();
        });
    }



    static syncProfile(callback) {
        const param = {id: 1812336};

        const auth = new CBApi();
        auth.getStudent(param, false, false).then(async ({status, data}) => {
            if (status === CBConstant.STATUS_OK) {
                const userInfo = data?.message;
                // const value = await AsyncStorage.getItem('@app_company');
                // const appCompany = JsonUtil.parseJsonString(value);
                // if (appCompany) {
                //     userInfo['companyId'] = appCompany?.id;
                //     userInfo['companyName'] = appCompany?.name;
                //     userInfo['companyFullName'] = appCompany?.fullName;
                //     userInfo['companyCode'] = appCompany?.companyCode;
                // }

                await AsyncStorage.setItem('@user_info', JSON.stringify(userInfo || {}));
                CBGlobal.userInfo = userInfo || {};

                DeviceEventEmitter.emit('SYNC_CONFIG');
                DeviceEventEmitter.emit('TAB_HOME');
            }
            callback && callback();
        }).catch((error) => {
            callback && callback();
        });
    }

    static syncNotification(callback) {
        callback && callback();
    }

    static syncUnreadNotification(callback) {
        callback && callback();
    }

    static syncOSNotification(callback) {
        callback && callback();
    }

    static syncComplete(callback) {
        CBGlobal.appComplete = true;
        DeviceEventEmitter.emit('SYNC_COMPLETE');
        callback && callback();
    }
}
