import React from 'react';
import AuthenticationContent from 'screens/mienpv/auth/content/AuthenticationContent';

import Base from 'screens/Base';
import RootNavigation from "screens/RootNavigation";
import {Keyboard} from "react-native";
import {strings} from "controls/i18n";
import CBConstant from "constants/CBConstant";
import JsonUtil from "utils/JsonUtil";

export default class Authentication extends Base {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        super.componentDidMount();
    }

    componentWillUnmount() {
        super.componentWillUnmount();
    }


    onRegister = () => {
        RootNavigation.navigate('Register');
    };

    onSRPLogin = () => {
        RootNavigation.navigate('SRPLogin');
    };

    onBlur = () => {
        Keyboard.dismiss();
    };

    onClose = () => {
        RootNavigation.goBack();
    };


    onTermsAndConditions = () => {
        RootNavigation.navigate('Web', {
            title: strings('screen_terms_and_conditions'),
            defaultParam: JsonUtil.buildDefaultParam({
                uri: CBConstant.URI_TERMS_AND_CONDITIONS
            })
        });
    };

    render() {
        return (
            <AuthenticationContent onRegister={this.onRegister} onSRPLogin={this.onSRPLogin} onClose={this.onClose} onTermsAndConditions={this.onTermsAndConditions}/>
        );
    }
}