import React from 'react';
import SplashScreen from "react-native-splash-screen";
import Tracking from "screens/Tracking";
import VerifyInputContent from "screens/mienpv/auth/content/VerifyInputContent";
import RootNavigation from "screens/RootNavigation";

export default class VerifyInput extends Tracking {

    constructor(props) {
        super(props);
        SplashScreen.hide();
    }

    onPending = () => {
        RootNavigation.navigate('Pending');
    };

    render() {
        return (
            <VerifyInputContent defaultParam={this.defaultParam} onPending={this.onPending}/>
        );
    }
}

