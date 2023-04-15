import React from 'react';
import SplashScreen from "react-native-splash-screen";
import Tracking from "screens/Tracking";
import PendingContent from "screens/mienpv/auth/content/PendingContent";
import RootNavigation from "screens/RootNavigation";
import {strings} from "controls/i18n";
import JsonUtil from "utils/JsonUtil";
import CBConstant from "constants/CBConstant";
import Base from 'screens/Base';

export default class Pending extends Base {

    constructor(props) {
        super(props);
        SplashScreen.hide();
    }

    render() {
        return (
            <PendingContent defaultParam={this.defaultParam}/>
        );
    }
}

