import React from 'react';
import SplashScreen from "react-native-splash-screen";
import Tracking from "screens/Tracking";
import IdentityContent from "screens/mienpv/identity/content/IdentityContent";

export default class Identity extends Tracking {

    constructor(props) {
        super(props);
        SplashScreen.hide();
    }

    render() {
        return (
            <IdentityContent/>
        );
    }
}

