import React, {useState} from 'react';
import {CBAction, CBButton, CBContainer, CBIcon, CBInput, CBText, CBTouchableOpacity, CBTouchableWithoutFeedback, CBView} from 'components';
import {Keyboard} from "react-native";
import {appStyles} from "configs/styles";
import {strings} from "controls/i18n";
import colors from "configs/colors";
import dimens from "configs/dimens";
import * as yup from "yup";
import {Formik} from "formik";

const FormikPassword = () => {
    const validationSchema = yup.object({
        password: yup.string()
            .required('Vui lòng điền mật khẩu'),
        confirmPassword: yup.string()
            .required('Vui lòng xác nhận mật khẩu')
    });
    return (
        <Formik
            initialValues={{password: '', confirmPassword: ''}}
            validationSchema={validationSchema}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={values => console.log(values)}>
            {
                ({handleChange, handleSubmit, values, errors}) => (
                    <>
                        <CBInput
                            inputContainerStyle={{marginTop: 35}}
                            style={{width: '100%', marginTop: 5}}
                            placeholder={'Nhập mật khẩu'}
                            returnKeyType={'go'}
                            autoCapitalize={'none'}
                            maxLength={64}
                            value={values.password}
                            error={errors.password}
                            onChangeText={handleChange('password')}
                            onSubmitEditing={handleSubmit}
                        />
                        <CBInput
                            style={{width: '100%', marginTop: 5}}
                            placeholder={'Xác nhận mật khẩu'}
                            returnKeyType={'go'}
                            autoCapitalize={'none'}
                            maxLength={64}
                            value={values.confirmPassword}
                            error={errors.confirmPassword}
                            onChangeText={handleChange('confirmPassword')}
                            onSubmitEditing={handleSubmit}
                        />
                        <CBButton containerStyle={{marginTop: 25}} buttonStyle={appStyles.button} title={strings('button_login')} onPress={handleSubmit}/>
                    </>
                )
            }
        </Formik>
    )
}

const RegisterContent = () => {

    const [tab, setTab] = useState(0);

    const onBlur = () => {
        Keyboard.dismiss();
    };

    return (
        <CBContainer>
            <CBView>
                <CBText style={[appStyles.heading, { marginTop: 30, alignSelf: 'center'}]} >{strings('text_title_pcs_wallet')}</CBText>
                <CBView style={[appStyles.row, {justifyContent: 'center', marginTop: 20}]} define={'none'}>
                    <CBIcon type={'material-community'} name={'numeric-1-circle-outline'} color={colors.primaryColor} size={24}/>
                    <CBView style={[appStyles.separator, {width: 110, backgroundColor: colors.tabColor, marginVertical: 5}]} define={'none'}/>
                    <CBIcon type={'material-community'} name={'numeric-2-circle-outline'} color={colors.tabColor} size={24}/>
                    <CBView style={[appStyles.separator, {width: 110, backgroundColor: colors.tabColor, marginVertical: 5}]} define={'none'}/>
                    <CBIcon type={'material-community'} name={'numeric-3-circle-outline'} color={colors.tabColor} size={24}/>
                </CBView>
                <CBView style={[appStyles.row, {justifyContent: 'space-between', marginTop: 10}]} define={'none'}>
                    <CBText style={[appStyles.subtext, {fontSize: dimens.smallText, marginLeft: 10, color: colors.primaryColor}]}>{strings('text_create_password')}</CBText>
                    <CBText style={[appStyles.subtext, {fontSize: dimens.smallText, color: colors.tabColor}]}>{strings('text_wallet_security')}</CBText>
                    <CBText style={[appStyles.subtext, {fontSize: dimens.smallText, marginRight: 10, color: colors.tabColor}]}>{strings('text_confirm_srp')}</CBText>
                </CBView>
            </CBView>
            <CBTouchableWithoutFeedback style={{flex: 1}} define={'none'} onPress={onBlur}>
                <CBView style={{flex: 1, paddingVertical: 15, paddingHorizontal: 30}} define={'none'}>
                    <CBText style={[appStyles.title, { marginTop: 30, alignSelf: 'center'}]} >{strings('text_create_password')}</CBText>
                    <CBText style={[appStyles.subtext, {marginTop: 10, alignSelf: 'center'}]} define={'subtext'}>{strings('text_note_password')}</CBText>
                    <FormikPassword/>
                </CBView>
            </CBTouchableWithoutFeedback>
        </CBContainer>
    );
};

export default RegisterContent;
