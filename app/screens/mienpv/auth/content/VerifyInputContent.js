import React, {useRef, useState} from 'react';
import {CBAction, CBAvatar, CBButton, CBContainer, CBInput, CBImage, CBRefreshControl, CBScrollView, CBText, CBView} from 'components';
import ResetWalletPopup from 'screens/popup/ResetWalletPopup';
import {useTheme} from 'react-native-elements';
import {strings} from "controls/i18n";
import {appStyles} from "configs/styles";
import {Formik} from "formik";
import * as yup from 'yup';
import {moderateScale} from "utils/ThemeUtil";
import ImageUtil from "utils/ImageUtil";

const FormikInput = ({initialValues, onPending}) => {
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
            //validationSchema={validationSchema}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={onPending}>
            {
                ({handleChange, handleSubmit, values, errors}) => (
                    <>
                        <CBView style={[appStyles.row]}>
                            <CBImage containerStyle={[appStyles.image, {width: moderateScale(100), height: moderateScale(100)}]} source={ImageUtil.getImage('upload_avatar')} resizeMode={'contain'}/>
                            <CBView style={[appStyles.row, {marginLeft: 35}]}>
                                <CBText style={[appStyles.text, {marginTop: 10, marginRight: 10, marginBottom: 10}]} define={'subtext'}>{'ID'}</CBText>
                                <CBInput
                                    inputContainerStyle={{width: '55%', marginTop: 15}}
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
                            </CBView>

                        </CBView>

                        <CBText style={[appStyles.text, {marginBottom: 10, marginTop: 20}]} define={'subtext'}>{'Họ và tên'}</CBText>
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

const VerifyInputContent = ({defaultParam, onPending}) => {

    const {theme} = useTheme();
    const resetWalletPopupRef = useRef();

    return (
        <CBContainer>
            <CBView style={{flex: 1, paddingHorizontal: 30}} define={'none'}>
                <CBText style={[appStyles.title, {marginBottom: 20, marginTop: 15, textAlign: 'center'}]}>{'Điền thông tin'}</CBText>
                <CBScrollView
                    style={[appStyles.content]}
                    showsVerticalScrollIndicator={false}
                    refreshControl={<CBRefreshControl/>}
                    define={'content'}>
                    <FormikInput initialValues={{id: '', fullName: '', school: '', faculty: '', email: '', dayOfBirth: ''}} onPending={onPending}/>
                </CBScrollView>
                {/*<ResetWalletPopup ref={resetWalletPopupRef}/>*/}
            </CBView>

        </CBContainer>
    );
};

export default VerifyInputContent;
