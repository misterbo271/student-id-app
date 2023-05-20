import React from 'react';
import {Alert, Keyboard} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStore from 'stores/AppStore';

import LoginOrRegisterContent from 'screens/mienpv/auth/content/LoginOrRegisterContent';

import Base from 'screens/Base';

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
