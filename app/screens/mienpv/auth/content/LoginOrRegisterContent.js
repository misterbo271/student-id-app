import React, {useRef, useState} from 'react';
import {CBAction, CBAvatar, CBButton, CBContainer, CBInput, CBText, CBView} from 'components';
import ResetWalletPopup from 'screens/popup/ResetWalletPopup';
import {useTheme} from 'react-native-elements';
import dimens from "configs/dimens";
import {strings} from "controls/i18n";
import {appStyles} from "configs/styles";
import {Formik} from "formik";
import * as yup from 'yup';
import AsyncStorage from "@react-native-async-storage/async-storage";

const FormikInput = ({initialValues, onLogin}) => {
    const validationSchema = yup.object({
        password: yup.string()
            .required(strings('error_empty_password'))
    });

    const [togglePassword, setTogglePassword] = useState(true);

    const onTogglePassword = () => {
        setTogglePassword(!togglePassword);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={onLogin}>
            {
                ({handleChange, handleSubmit, values, errors}) => (
                    <>
                        <CBInput
                            style={{width: '100%', marginTop: 15}}
                            placeholder={'Nhập mật khẩu'}
                            returnKeyType={'go'}
                            autoCapitalize={'none'}
                            secureTextEntry={!togglePassword}
                            maxLength={64}
                            value={values.password}
                            error={errors.password}
                            onChangeText={handleChange('password')}
                            onSubmitEditing={handleSubmit}
                        />
                        {values.password && values.password.length > 0 ? <CBAction style={{marginTop: 10, alignSelf: 'flex-end'}} title={!togglePassword ? strings('action_show_password') : strings('action_hide_password')} onPress={onTogglePassword}/> : null}
                        <CBButton containerStyle={{marginTop: 25}} buttonStyle={[appStyles.button, {borderRadius: 10}]} title={strings('button_login')} onPress={handleSubmit}/>
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
                    size={140}
                    source={require('../../../../assets/images/fennec_chibi.jpeg')}
                    containerStyle={{justifyContent: 'center', alignSelf: 'center'}}
                />
                <CBText style={[appStyles.title, {marginTop: 50, alignSelf: 'center'}]}>Chào mừng quay trở lại</CBText>
                <CBView>
                    <CBText style={[appStyles.text, {marginTop: 20, marginBottom: 15}]} define={'subtext'}>{'Nhập mật khẩu'}</CBText>
                    <FormikInput initialValues={{username: '', password: ''}} onLogin={onLogin}/>
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
