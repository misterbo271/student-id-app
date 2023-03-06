import React, {Fragment, useRef, useState} from 'react';
import {Keyboard, Platform} from "react-native";
import {
    CBAction,
    CBAvatar, CBButton,
    CBContainer, CBHeader, CBIcon, CBImage, CBInput,
    CBScrollView,
    CBText, CBTouchableOpacity,
    CBTouchableWithoutFeedback, CBView
} from 'components';
import ResetWalletPopup from 'screens/popup/ResetWalletPopup';
import {useTheme} from 'react-native-elements';
import dimens from "configs/dimens";
import {strings} from "controls/i18n";
import {appStyles} from "configs/styles";
import {Formik} from "formik";
import * as yup from 'yup';

const FormikInput = () => {
    const validationSchema = yup.object({
        password: yup.string()
            .required(strings('error_empty_password'))
    });
    return (
        <Formik
            initialValues={{username: '', password: ''}}
            validationSchema={validationSchema}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={values => console.log(values)}>
            {
                ({handleChange, handleSubmit, values, errors}) => (
                    <>
                        <CBInput
                            style={{width: '100%', marginTop: 15}}
                            placeholder={'Nhập mật khẩu'}
                            returnKeyType={'go'}
                            autoCapitalize={'none'}
                            maxLength={64}
                            value={values.password}
                            error={errors.password}
                            onChangeText={handleChange('password')}
                            onSubmitEditing={handleSubmit}
                        />
                        <CBButton containerStyle={{marginTop: 25}} buttonStyle={appStyles.button} title={strings('button_login')} onPress={handleSubmit}/>
                    </>
                )
            }
        </Formik>
    )
}

const LoginOrRegisterContent = ({onLogin}) => {

    const {theme} = useTheme();
    const resetWalletPopupRef = useRef();

    const onResetWallet = () => {
        resetWalletPopupRef.current.show({});
    };

    return (
        <CBContainer>
            <CBView style={{flex: 1, paddingVertical: 55, paddingHorizontal: 30}} define={'none'}>
                <CBAvatar
                    size={100}
                    source={require('../../../../assets/images/fennec_chibi.jpeg')}
                    containerStyle={{marginTop: 20, marginLeft: dimens.widthScreen / 2 - 84, borderRadius: 30}}
                />
                <CBText style={[appStyles.heading, {marginTop: 50, alignSelf: 'center'}]}>Chào mừng quay trở lại</CBText>
                <CBView>
                    <CBText style={[appStyles.text, {marginTop: 20, marginBottom: 15}]} define={'subtext'}>{'Nhập mật khẩu'}</CBText>
                    <FormikInput/>
                    <CBText style={[appStyles.text, {marginTop: 90, alignSelf: 'center'}]} define={'subtext'}>{'Không thể đăng nhập? Bạn có thể XOÁ'}</CBText>
                    <CBText style={[appStyles.text, {marginTop: 5, alignSelf: 'center'}]} define={'subtext'}>ví hiện tại của bạn và cài một ví mới khác.</CBText>
                    <CBAction style={{alignSelf: 'center', marginTop: 15}} title={'Reset Wallet'} onPress={onResetWallet}/>
                </CBView>
                <ResetWalletPopup ref={resetWalletPopupRef}/>
            </CBView>

        </CBContainer>
    );
};

export default LoginOrRegisterContent;
