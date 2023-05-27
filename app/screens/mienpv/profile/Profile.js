import React from 'react';
import {CBContainer, CBText} from 'components';
import {appStyles} from 'configs/styles';

import Base from 'screens/Base';
import RootNavigation from "screens/RootNavigation";
import {strings} from "controls/i18n";
import CBHelper from "helpers/CBHelper";
import CBHandler from "handlers/CBHandler";

import ProfileContent from "screens/mienpv/profile/content/ProfileContent";

export default class Profile extends Base {

    onPress = (item) => () => {
        const {refId, name, defaultParam} = item || {};
        RootNavigation.navigate(refId, {
            title: name,
            defaultParam: defaultParam
        });
    };

    onLogout = () => {
        this.alert(strings('title_alert_sign_out'),
            strings('message_alert_sign_out'),
            [
                {text: strings('button_skip')},
                {text: strings('button_ok'), onPress: () => CBHelper.resetApplication()},
            ]
        );
    };

    onPressUrl = (url) => () => {
        if (url) CBHandler.openUrl(url);
    };

    onEditProfile = () => {
        RootNavigation.navigate('UpdateProfile');
    };


    render() {
        return <ProfileContent defaultParam={this.defaultParam} onPress={this.onPress} onLogout={this.onLogout} onPressUrl={this.onPressUrl} onEditProfile={this.onEditProfile}/>;
    }

}