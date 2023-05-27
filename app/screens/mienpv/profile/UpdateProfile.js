import React from 'react';
import SplashScreen from "react-native-splash-screen";
import Tracking from "screens/Tracking";
import UpdateProfileContent from "screens/mienpv/profile/content/UpdateProfileContent";
import RootNavigation from "screens/RootNavigation";
import CBApi from "services/CBApi";
import ApiRequest from 'app/requests/ApiRequest';
import Toast from "react-native-simple-toast";

export default class UpdateProfile extends Tracking {

    constructor(props) {
        super(props);
        SplashScreen.hide();
    }

    submit(param) {

        ApiRequest.setStudent(param,  (data) => {
            RootNavigation.navigate('Pending');
        }, (error) => {
            Toast.show('Không xác nhận được tài khoản', Toast.SHORT);
            console.log('error -> ' + JSON.stringify(error));
        });
    }

    onUpdate = (values) => {
        this.submit({
            id: Number(values.id),
            address: values.address,
            day_of_birth: values?.birthday,
            email: values?.email,
            phone_number: values?.phoneNumber,
            selfie_image: 'no',
            id_front_image: 'no',
            id_back_image: 'no',
            root: 'abcxyz'
        });
    };

    render() {
        return (
            <UpdateProfileContent defaultParam={this.defaultParam} onUpdate={this.onUpdate}/>
        );
    }
}

