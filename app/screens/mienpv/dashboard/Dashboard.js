import React, {Fragment} from 'react';
import SplashScreen from "react-native-splash-screen";
import Tracking from "screens/Tracking";
import DashboardContent from "screens/mienpv/dashboard/content/DashboardContent";

export default class Dashboard extends Tracking {

    constructor(props) {
        super(props);
        SplashScreen.hide();
    }

    render() {
        return (
            <DashboardContent/>
        );
    }
}

