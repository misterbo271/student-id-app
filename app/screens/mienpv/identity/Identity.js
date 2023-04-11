import React from 'react';
import SplashScreen from "react-native-splash-screen";
import Tracking from "screens/Tracking";
import RootNavigation from "screens/RootNavigation";
import IdentityContent from "screens/mienpv/identity/content/IdentityContent";

export default class Identity extends Tracking {

    constructor(props) {
        super(props);
        SplashScreen.hide();
    }

    onScanQRCode = () => {
        this.scanner = true;
        RootNavigation.navigate('ScanIdentity');
    };

    render() {
        return (
            <IdentityContent defaultParam={this.defaultParam} onScanQRCode={this.onScanQRCode}/>
        );
    }
}

