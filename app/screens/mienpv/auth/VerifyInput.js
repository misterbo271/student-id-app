import React from 'react';
import SplashScreen from "react-native-splash-screen";
import Tracking from "screens/Tracking";
import VerifyInputContent from "screens/mienpv/auth/content/VerifyInputContent";
import RootNavigation from "screens/RootNavigation";
import CBApi from "services/CBApi";

export default class VerifyInput extends Tracking {

    constructor(props) {
        super(props);
        SplashScreen.hide();
    }

    submit(param) {
        const api = new CBApi();
        api.createStudent(param, (data) => {
            console.log(`mienpv :: ${JSON.stringify(data)}`);
            RootNavigation.navigate('Pending');
        }, (error) => {
            console.log('error -> ' + JSON.stringify(error));
        });
    }

    onPending = () => {
        RootNavigation.navigate('Pending');
        // this.submit({
        //     ids: ["1812336"],
        //     names: ["Terry"]
        // })
    };

    render() {
        return (
            <VerifyInputContent defaultParam={this.defaultParam} onPending={this.onPending}/>
        );
    }
}

