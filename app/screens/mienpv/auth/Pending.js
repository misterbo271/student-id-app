import React from 'react';
import SplashScreen from "react-native-splash-screen";
import PendingContent from "screens/mienpv/auth/content/PendingContent";
import RootNavigation from "screens/RootNavigation";
import Base from 'screens/Base';

export default class Pending extends Base {

    constructor(props) {
        super(props);
        SplashScreen.hide();
    }

    onVerifyInput = () => {
        RootNavigation.navigate('VerifyInput');
    };

    onLogin = () => {
        RootNavigation.navigate('LoginOrRegister');
    };

    render() {
        return (
            <PendingContent defaultParam={this.defaultParam} onVerifyInput={this.onVerifyInput} onLogin={this.onLogin}/>
        );
    }
}

