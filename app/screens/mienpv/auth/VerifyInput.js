import React from 'react';
import SplashScreen from "react-native-splash-screen";
import Tracking from "screens/Tracking";
import VerifyInputContent from "screens/mienpv/auth/content/VerifyInputContent";

export default class VerifyInput extends Tracking {

    constructor(props) {
        super(props);
        SplashScreen.hide();
    }

    render() {
        return (
            <VerifyInputContent defaultParam={this.defaultParam}/>
        );
    }
}

