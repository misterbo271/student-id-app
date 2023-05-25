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

    const formikRef = useRef(null);
    const noteInputRef = useRef(null);
    const validationSchema = yup.object({
        password: yup.string()
            .required(strings('error_empty_password'))
    });

    const [togglePassword, setTogglePassword] = useState(true);

    const onTogglePassword = () => {
        setTogglePassword(!togglePassword);
    };

    const onFieldClear = (name, defaultValue) => () => {
        formikRef.current.setFieldValue(name, defaultValue);
        formikRef.current.setFieldError(name, '');
    };

    const onFieldFocus = (name) => () => {
        formikRef.current.setFieldError(name, '');
    };

    const onNextInput = (name) => () => {
        switch (name) {
            case 'note':
                noteInputRef.current.focus();
                break;
            default:
                break;
        }
    };

    return (
        <>
        <Formik
            innerRef={formikRef}
            enableReinitialize={true}
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
                                    returnKeyType={'next'}
                                    autoCapitalize={'none'}
                                    // secureTextEntry={!togglePassword}
                                    maxLength={64}
                                    value={values.id}
                                    // error={errors.id}
                                    onChangeText={handleChange('id')}
                                    onFocus={onFieldFocus('id')}
                                    onSubmitEditing={onNextInput('fullName')}
                                />
                            </CBView>

                        </CBView>

                        <CBText style={[appStyles.text, {marginBottom: 10, marginTop: 20}]} define={'subtext'}>{'Họ và tên'}</CBText>
                        <CBInput
                            style={{width: '100%', marginTop: 5}}
                            placeholder={'Nhập họ và tên'}
                            returnKeyType={'next'}
                            autoCapitalize={'none'}
                            maxLength={64}
                            value={values.fullName}
                            error={errors.fullName}
                            onChangeText={handleChange('fullName')}
                            onSubmitEditing={onNextInput('phoneNumber')}
                        />
                        <CBText style={[appStyles.text, {marginBottom: 10}]} define={'subtext'}>{'Số điện thoại'}</CBText>
                        <CBInput
                            style={{width: '100%', marginTop: 5}}
                            placeholder={'Nhập số điện thoại'}
                            returnKeyType={'next'}
                            autoCapitalize={'none'}
                            maxLength={12}
                            value={values.phoneNumber}
                            error={errors.phoneNumber}
                            onChangeText={handleChange('phoneNumber')}
                            onSubmitEditing={onNextInput('address')}
                        />
                        <CBText style={[appStyles.text, {marginBottom: 10}]} define={'subtext'}>{'Địa chỉ'}</CBText>
                        <CBInput
                            style={{width: '100%', marginTop: 5}}
                            placeholder={'Nhập địa chỉ'}
                            returnKeyType={'next'}
                            autoCapitalize={'none'}
                            maxLength={64}
                            value={values.address}
                            error={errors.address}
                            onChangeText={handleChange('address')}
                            onSubmitEditing={onNextInput('email')}
                        />
                        <CBText style={[appStyles.text, {marginBottom: 15}]} define={'subtext'}>{'Email'}</CBText>
                        <CBInput
                            style={{width: '100%', marginTop: 5}}
                            placeholder={'Nhập email'}
                            returnKeyType={'next'}
                            autoCapitalize={'none'}
                            maxLength={64}
                            value={values.email}
                            error={errors.email}
                            onChangeText={handleChange('email')}
                            onSubmitEditing={onNextInput('birthday')}
                        />
                        <CBText style={[appStyles.text, {marginBottom: 10}]} define={'subtext'}>{'Ngày sinh'}</CBText>
                        <CBInput
                            style={{width: '100%', marginTop: 5}}
                            placeholder={'Nhập ngày sinh'}
                            returnKeyType={'go'}
                            autoCapitalize={'none'}
                            // secureTextEntry={!togglePassword}
                            maxLength={64}
                            value={values.birthday}
                            error={errors.birthday}
                            onChangeText={handleChange('birthday')}
                            onSubmitEditing={handleSubmit}
                        />
                        <CBButton containerStyle={{marginTop: 25}} buttonStyle={[appStyles.button, {borderRadius: 10}]} title={'Xác nhận'} onPress={handleSubmit}/>
                    </>
                )
            }
        </Formik>
            </>
    );
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
                    <FormikInput initialValues={{id: '', fullName: '', phoneNumber: '', address: '', email: '', birthday: ''}} onPending={onPending}/>
                </CBScrollView>
                {/*<ResetWalletPopup ref={resetWalletPopupRef}/>*/}
            </CBView>

        </CBContainer>
    );
};

export default VerifyInputContent;
