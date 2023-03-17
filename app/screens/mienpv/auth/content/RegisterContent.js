import React, {useState} from 'react';
import {CBAction, CBBoxInput, CBButton, CBContainer, CBIcon, CBInput, CBText, CBTouchableOpacity, CBTouchableWithoutFeedback, CBView} from 'components';
import {Keyboard} from 'react-native';
import {appStyles} from 'configs/styles';
import {strings} from 'controls/i18n';
import colors from 'configs/colors';
import dimens from 'configs/dimens';
import * as yup from 'yup';
import {Formik} from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RootNavigation from 'screens/RootNavigation';

const FormikPassword = ({initialValues, onConfirmPassword}) => {
    const validationSchema = yup.object({
        password: yup.string()
            .required('Vui lòng điền mật khẩu'),
        confirmPassword: yup.string()
            .required('Vui lòng xác nhận mật khẩu')
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
            onSubmit={onConfirmPassword}>
            {
                ({handleChange, handleSubmit, values, errors}) => (
                    <>
                        <CBInput
                            inputContainerStyle={{marginTop: 35}}
                            style={{width: '100%', marginTop: 5}}
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
                        {values.password && values.password.length > 0 ? <CBAction style={{marginTop: 10, alignSelf: 'flex-end'}} title={!togglePassword ? strings('action_show_password') : strings('action_hide_password')} onPress={onTogglePassword}/> : null}
                        <CBButton containerStyle={{marginTop: 45}} buttonStyle={appStyles.button} title={'Tạo mật khẩu'} onPress={handleSubmit}/>
                    </>
                )
            }
        </Formik>
    )
}

const RegisterContent = () => {

    const [tab, setTab] = useState(0);
    const [srp, setSrp] = useState('');
    const [confirmSrp, setConfirmSrp] = useState('');
    const [errorSrp, setErrorSrp] = useState('');

    const onBlur = () => {
        Keyboard.dismiss();
    };

    const onChangeTab = (tab) => () => {
        setTab(tab);
    }

    const onConfirmPassword = async (values) => {
        const passwordValue = values.password;
        const mnemonicWords = require('mnemonic-words');
        try {
            await AsyncStorage.setItem('password', passwordValue);
        } catch (e) {
            console.log('Error saving new person: ', e);
        }
        let rand = [];
        for ( let i=0; i < 12; i++) {
            rand[i] = mnemonicWords[Math.floor(Math.random() * mnemonicWords.length)];
        }
        setSrp(rand);
        setTab(1);

    };

    const onCreatePassword = async () => {
        const SRPValue = srp?.join(' ');
        try {
            await AsyncStorage.setItem('srp', SRPValue);
        } catch (e) {
            console.log('Error saving new person: ', e);
        }
        if (confirmSrp === SRPValue) {
            RootNavigation.navigate('LoginOrRegister');
        } else {
            setErrorSrp('Không trùng khớp');
        }

    };

    const onAction = (action) => {
        if (this[action] && this[action].current) {
            this[action].current.focus();
        } else {
            Keyboard.dismiss();
        }
    };

    const onConfirmSrpChange = (confirmSrp) => {
        setConfirmSrp(confirmSrp);
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
            {tab === 0 ? <CBTouchableWithoutFeedback style={{flex: 1}} define={'none'} onPress={onBlur}>
                <CBView style={{flex: 1, paddingVertical: 15, paddingHorizontal: 30}} define={'none'}>
                    <CBText style={[appStyles.title, { marginTop: 30, alignSelf: 'center'}]} >{strings('text_create_password')}</CBText>
                    <CBText style={[appStyles.subtext, {marginTop: 10, alignSelf: 'center'}]} define={'subtext'}>{strings('text_note_password')}</CBText>
                    <FormikPassword initialValues={{password: '', confirmPassword: ''}} onConfirmPassword={onConfirmPassword}/>
                </CBView>
            </CBTouchableWithoutFeedback> : tab === 1 ?
                <CBTouchableWithoutFeedback style={{flex: 1}} define={'none'}>
                    <CBView style={{flex: 1, paddingVertical: 15, paddingHorizontal: 30}} define={'none'}>
                        <CBText style={[appStyles.title, { marginTop: 30, alignSelf: 'center'}]} >{strings('text_protect_wallet2')}</CBText>
                        <CBText style={[appStyles.title, { marginTop: 5, alignSelf: 'center'}]} >{strings('text_protect_wallet3')}</CBText>
                        <CBText style={[appStyles.note, { fontSize: dimens.normalText, marginTop: 10, alignSelf: 'center'}]} >{strings('text_remind_srp')}</CBText>
                        <CBView style={[appStyles.outline, {padding: 15, marginTop: 30, borderColor: colors.primaryColor, borderRadius: 16}]}>
                            <CBText style={[appStyles.text, {fontSize: dimens.largeText,padding: 6}]} selectable={true}>{srp?.join(' ')}</CBText>
                        </CBView>
                        <CBButton containerStyle={{marginTop: 45}} buttonStyle={appStyles.button} title={'Tiếp tục'} onPress={onChangeTab(2)}/>
                    </CBView>
                </CBTouchableWithoutFeedback> :  tab === 2 ?
                    <CBTouchableWithoutFeedback style={{flex: 1}} define={'none'}>
                        <CBView style={{flex: 1, paddingVertical: 15, paddingHorizontal: 30}} define={'none'}>
                            <CBText style={[appStyles.note, { fontSize: dimens.normalText, marginTop: 10, alignSelf: 'center'}]} >{strings('text_confirm_srp1')}</CBText>
                            <CBBoxInput
                                style={{marginTop: 15}}
                                header={true}
                                title={'Confirm Secret Recovery Phrase'}
                                placeholder={'Fill the srp to confirm'}
                                returnKeyType={'next'}
                                autoCapitalize={'none'}
                                value={confirmSrp}
                                maxLength={256}
                                onAction={onAction}
                                onChangeText={onConfirmSrpChange} />
                            {errorSrp.length > 0 ? <CBText>{errorSrp}</CBText> : null}
                            <CBButton containerStyle={{marginTop: 45}} buttonStyle={appStyles.button} title={'Xác nhận'} onPress={onCreatePassword}/>
                        </CBView>
                    </CBTouchableWithoutFeedback> : null}
        </CBContainer>
    );
};

export default RegisterContent;
