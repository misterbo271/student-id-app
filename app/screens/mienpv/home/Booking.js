import React from 'react';
import {DeviceEventEmitter, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CBGlobal from 'globals/CBGlobal';
import CBRunHandler from 'handlers/CBRunHandler';
import CBSyncHandler from 'handlers/CBSyncHandler';
import CBHelper from 'helpers/CBHelper';
import JsonUtil from 'utils/JsonUtil';
import {PERMISSIONS, request} from 'react-native-permissions';
import SplashScreen from 'react-native-splash-screen';
import {observer} from 'mobx-react';

import Base from 'screens/Base';

@observer
export default class Booking extends Base {

    constructor(props) {
        super(props);
        SplashScreen.hide();
    }

    componentDidMount() {
        super.componentDidMount();
        this.configSubscription = DeviceEventEmitter.addListener('SYNC_CONFIG', this.loadConfigEvent);
        this.load();
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.configSubscription.remove();
        clearTimeout(this.timer);
    }

    loadConfigEvent = () => {
        CBHelper.reactionApplication();
    };

    load() {
        AsyncStorage.getItem('@user_info').then((values) => {
            CBGlobal.userInfo = values ? JsonUtil.parseJsonString(values) : {};


            CBHelper.reactionApplication();
            CBHelper.refreshApplication(async () => {
                if (Platform.OS === 'ios') await request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY); // Hot fix ios
                DeviceEventEmitter.emit('TAB_HOME');
                CBSyncHandler.sync();
                CBRunHandler.run();
            });
        });
    }

    render() {
        return null;
    }
}
