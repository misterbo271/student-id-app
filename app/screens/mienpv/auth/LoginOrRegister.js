import React from 'react';
import {Alert, DeviceEventEmitter, Keyboard, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStore from 'stores/AppStore';

import LoginOrRegisterContent from 'screens/mienpv/auth/content/LoginOrRegisterContent';

import Base from 'screens/Base';
import StudentStore from "stores/StudentStore";
import CBGlobal from "globals/CBGlobal";
import JsonUtil from "utils/JsonUtil";
import CBHelper from "helpers/CBHelper";
import {PERMISSIONS, request} from "react-native-permissions";
import CBSyncHandler from "handlers/CBSyncHandler";
import CBRunHandler from "handlers/CBRunHandler";

export default class LoginOrRegister extends Base {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        super.componentDidMount();
    }

    componentWillUnmount() {
        super.componentWillUnmount();
    }

    onBlur = () => {
        Keyboard.dismiss();
    };

    onLogin = async (values) => {
        try {
            const value = await AsyncStorage.getItem('password')
            const value1 = await AsyncStorage.getItem('srp')
            if(values.password === value) {
                //RootNavigation.navigate('Home');
                AppStore.setMode('User');
            }
            else {
                Alert.alert(
                    'Fail!',
                    `User has unsuccessfully signed in!`,
                );
            }
        } catch(e) {
            // error reading value
        }
    };

    render() {
        return (
            <LoginOrRegisterContent onLogin={this.onLogin} onBlur={this.onBlur}/>
        );
    }
}
