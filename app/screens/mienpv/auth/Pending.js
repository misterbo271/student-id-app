import React from 'react';
import SplashScreen from "react-native-splash-screen";
import PendingContent from "screens/mienpv/auth/content/PendingContent";
import RootNavigation from "screens/RootNavigation";
import Base from 'screens/Base';
import StudentStore from "stores/StudentStore";
import {observer} from 'mobx-react';
import ApiRequest from "app/requests/ApiRequest";
import Toast from "react-native-simple-toast";

@observer
export default class Pending extends Base {

    constructor(props) {
        super(props);
        this.state = {
            studentInfo: {}
        }
        SplashScreen.hide();
    }

    submit(param) {
        ApiRequest.getStudent(param,  (data) => {
           this.setState({
               studentInfo: data?.message
           })
        }, (error) => {
            console.log('error -> ' + JSON.stringify(error));
        });
    }

    onVerifyInput = () => {
        RootNavigation.navigate('VerifyInput');
    };

    onLogin = () => {
        RootNavigation.navigate('LoginOrRegister');
    };

    onConfirm = () => {
        const {studentId} = StudentStore;
        this.submit({id: studentId});
    }

    render() {
        const {studentInfo} = this.state;
        console.log(`mienpv :: ${JSON.stringify(studentInfo)}`);
        return (
            <PendingContent defaultParam={this.defaultParam} onVerifyInput={this.onVerifyInput} onLogin={this.onLogin} onConfirm={this.onConfirm} studentInfo={studentInfo}/>
        );
    }
}

