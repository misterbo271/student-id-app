import React from 'react';
import {CBAction, CBButton, CBContainer, CBIcon, CBText, CBTouchableOpacity, CBTouchableWithoutFeedback, CBView} from 'components';
import {appStyles} from "configs/styles";
import {strings} from "controls/i18n";
import RootNavigation from "screens/RootNavigation";
import dimens from "configs/dimens";

const AuthenticationContent = ({onRegister, onSRPLogin, onClose, onTermsAndConditions, onBlur}) => {

    return (
        <CBContainer>
            <CBTouchableWithoutFeedback style={{flex: 1}} define={'none'} onPress={onBlur}>
                <CBView style={{flex: 1, paddingVertical: 15, paddingHorizontal: 30}} define={'none'}>
                    <CBText style={[appStyles.title, {fontSize: dimens.xxLargeText, marginTop: 30, alignSelf: 'center'}]}>{strings('text_title_auth')}</CBText>
                    <CBText style={[appStyles.subtext, {marginTop: 10, alignSelf: 'center'}]} define={'subtext'}>{strings('text_subtitle_auth')}</CBText>
                    <CBButton buttonStyle={[appStyles.button, {borderRadius: 10, marginTop: 75}]} titleStyle={appStyles.button} type="outline" title={strings('button_login_by_srp')} onPress={onSRPLogin}/>
                    <CBButton buttonStyle={[appStyles.button, {borderRadius: 10, marginTop: 20}]} title={strings('button_register')} onPress={onRegister}/>
                    <CBAction style={{alignSelf: 'center', marginTop: 440}} title={strings('action_terms_and_conditions')} onPress={onTermsAndConditions}/>
                </CBView>
            </CBTouchableWithoutFeedback>
            <CBTouchableOpacity style={[appStyles.action, {position: 'absolute', top: 5, left: 5}]} define={'none'} onPress={onClose}>
                <CBIcon define={'icon'} type={'ionicon'} name={'close-outline'} size={30}/>
            </CBTouchableOpacity>
        </CBContainer>
    );
};

export default AuthenticationContent;
