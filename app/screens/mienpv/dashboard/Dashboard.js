import React from 'react';
import SplashScreen from "react-native-splash-screen";
import Tracking from "screens/Tracking";

import DashboardContent from 'screens/mienpv/dashboard/content/DashboardContent';
import {DeviceEventEmitter, Platform} from "react-native";
import CBHelper from "helpers/CBHelper";
import StudentStore from "stores/StudentStore";

export default class Dashboard extends Tracking {

    constructor(props) {
        super(props);
        SplashScreen.hide();
    }

    componentDidMount() {
        super.componentDidMount();
        this.configSubscription = DeviceEventEmitter.addListener('SYNC_CONFIG', this.loadConfigEvent);
        this.load();
    }

    loadConfigEvent = () => {
        CBHelper.reactionApplication();
    };

    componentWillUnmount() {
        super.componentWillUnmount();
        this.configSubscription.remove();
    }

    load() {
        StudentStore.setRefreshing(true);
        StudentStore.fetchStudent();
    }

    // fetchStudent = () => {
    //     const api = new CBApi();
    //     const param = {
    //         id: 1812336
    //     }
    //     api.getStudent(param, false, true).then(({status, data}) => {
    //         if (status === CBConstant.STATUS_OK) {
    //             this.setState({
    //                 studentInfo: data.message || {}
    //             });
    //         }
    //     }).catch((error) => {
    //         console.log('error -> ' + JSON.stringify(error));
    //     });
    // }

    render() {
        return (
            <DashboardContent defaultParam={this.defaultParam}/>
        );
    }
}

