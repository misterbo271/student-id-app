import React, {useRef, useState} from 'react';
import {CBAction, CBAvatar, CBButton, CBContainer, CBInput, CBRefreshControl, CBScrollView, CBText, CBView} from 'components';
import ResetWalletPopup from 'screens/popup/ResetWalletPopup';
import {useTheme} from 'react-native-elements';
import {strings} from "controls/i18n";
import {appStyles} from "configs/styles";
import {Formik} from "formik";
import * as yup from 'yup';

const FormikInput = ({initialValues}) => {
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
            onSubmit={console.log('ahiih')}>
            {
                ({handleChange, handleSubmit, values, errors}) => (
                    <>
                        <CBText style={[appStyles.text, {marginTop: 10, marginBottom: 10}]} define={'subtext'}>{'ID'}</CBText>
                        <CBInput
                            style={{width: '100%', marginTop: 5}}
                            placeholder={'Nhập Id'}
                            returnKeyType={'go'}
                            autoCapitalize={'none'}
                            secureTextEntry={!togglePassword}
                            maxLength={64}
                            value={values.id}
                            error={errors.id}
                            onChangeText={handleChange('id')}
                            onSubmitEditing={handleSubmit}
                        />
                        <CBText style={[appStyles.text, {marginBottom: 10}]} define={'subtext'}>{'Họ và tên'}</CBText>
                        <CBInput
                            style={{width: '100%', marginTop: 5}}
                            placeholder={'Nhập họ và tên'}
                            returnKeyType={'go'}
                            autoCapitalize={'none'}
                            secureTextEntry={!togglePassword}
                            maxLength={64}
                            value={values.fullName}
                            error={errors.fullName}
                            onChangeText={handleChange('fullName')}
                            onSubmitEditing={handleSubmit}
                        />
                        <CBText style={[appStyles.text, {marginBottom: 10}]} define={'subtext'}>{'Đại học'}</CBText>
                        <CBInput
                            style={{width: '100%', marginTop: 5}}
                            placeholder={'Nhập tên trường'}
                            returnKeyType={'go'}
                            autoCapitalize={'none'}
                            secureTextEntry={!togglePassword}
                            maxLength={64}
                            value={values.school}
                            error={errors.school}
                            onChangeText={handleChange('school')}
                            onSubmitEditing={handleSubmit}
                        />
                        <CBText style={[appStyles.text, {marginBottom: 10}]} define={'subtext'}>{'Khoa'}</CBText>
                        <CBInput
                            style={{width: '100%', marginTop: 5}}
                            placeholder={'Nhập khoa'}
                            returnKeyType={'go'}
                            autoCapitalize={'none'}
                            secureTextEntry={!togglePassword}
                            maxLength={64}
                            value={values.faculty}
                            error={errors.faculty}
                            onChangeText={handleChange('faculty')}
                            onSubmitEditing={handleSubmit}
                        />
                        <CBText style={[appStyles.text, {marginBottom: 15}]} define={'subtext'}>{'Email'}</CBText>
                        <CBInput
                            style={{width: '100%', marginTop: 5}}
                            placeholder={'Nhập email'}
                            returnKeyType={'go'}
                            autoCapitalize={'none'}
                            secureTextEntry={!togglePassword}
                            maxLength={64}
                            value={values.email}
                            error={errors.email}
                            onChangeText={handleChange('email')}
                            onSubmitEditing={handleSubmit}
                        />
                        <CBText style={[appStyles.text, {marginBottom: 10}]} define={'subtext'}>{'Ngày sinh'}</CBText>
                        <CBInput
                            style={{width: '100%', marginTop: 5}}
                            placeholder={'Nhập ngày sinh'}
                            returnKeyType={'go'}
                            autoCapitalize={'none'}
                            secureTextEntry={!togglePassword}
                            maxLength={64}
                            value={values.dayOfBirth}
                            error={errors.dayOfBirth}
                            onChangeText={handleChange('dayOfBirth')}
                            onSubmitEditing={handleSubmit}
                        />
                        <CBButton containerStyle={{marginTop: 25}} buttonStyle={[appStyles.button, {borderRadius: 10}]} title={'Submit'} onPress={handleSubmit}/>
                    </>
                )
            }
        </Formik>
    )
}

const PendingContent = ({defaultParam}) => {

    const {theme} = useTheme();
    const resetWalletPopupRef = useRef();

    return (
        <CBContainer>
            <CBView style={{flex: 1, paddingHorizontal: 30}} define={'none'}>
                <CBText style={[appStyles.title, {marginTop: 10, alignSelf: 'center'}]}>Thông tin cá nhân</CBText>
                {/*<CBScrollView*/}
                {/*    style={[appStyles.content]}*/}
                {/*    showsVerticalScrollmIndicator={false}*/}
                {/*    refreshControl={<CBRefreshControl/>}*/}
                {/*    define={'content'}>*/}
                {/*    <FormikInput initialValues={{id: '', fullName: '', school: '', faculty: '', email: '', dayOfBirth: ''}}/>*/}
                {/*</CBScrollView>*/}
                {/*<ResetWalletPopup ref={resetWalletPopupRef}/>*/}
            </CBView>

        </CBContainer>
    );
};

export default PendingContent;
