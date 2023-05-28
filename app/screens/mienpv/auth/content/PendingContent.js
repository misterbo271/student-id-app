import React, {Fragment, useRef, useState} from 'react';
import {CBAction, CBAvatar, CBButton, CBContainer, CBHeader, CBIcon, CBImage, CBInput, CBTouchableOpacity, CBText, CBView} from 'components';
import ResetWalletPopup from 'screens/popup/ResetWalletPopup';
import {useTheme} from 'react-native-elements';
import {strings} from "controls/i18n";
import {appStyles} from "configs/styles";
import {Formik} from "formik";
import * as yup from 'yup';
import {moderateScale} from "utils/ThemeUtil";
import ImageUtil from "utils/ImageUtil";
import colors from "configs/colors";
import dimens from "configs/dimens";
import StudentStore from "stores/StudentStore";

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
                        <CBButton containerStyle={{marginTop: 25}} buttonStyle={[appStyles.button, {borderRadius: 10}]} title={'Submit'} onPress={handleSubmit}/>
                    </>
                )
            }
        </Formik>
    )
}

const PendingContent = ({defaultParam, onVerifyInput, onLogin, onConfirm, studentInfo}) => {

    const {theme} = useTheme();
    const resetWalletPopupRef = useRef();

    const renderTitle = () => {
        return (
            <CBView style={[appStyles.row, {flex: 1, marginRight: 10}]} define={'none'}>
                <CBText style={[appStyles.text, {fontSize: dimens.xLargeText, fontFamily: 'GoogleSans-Medium', marginTop: 15, marginLeft: 10, color: colors.primaryColor}]}>Xác thực thông tin</CBText>
            </CBView>
        );
    }
    const renderLeftButton = () => {
        return <CBView style={{height: 1}} define={'none'}/>;
    }

    const renderRightButton = () => {
        return (
            <Fragment>
                <CBTouchableOpacity style={[appStyles.action, {marginRight: 5}]} define={'none'} onPress={onVerifyInput}>
                    <CBIcon type={'ionicon'} name={'create-outline'} define={'icon'} size={30}/>
                </CBTouchableOpacity>
            </Fragment>
        );
    }

    return (
        <CBContainer>
            <CBView style={{flex: 1, paddingHorizontal: 30}} define={'none'}>
                <CBHeader style={{backgroundColor: colors.backgroundColor, textAlign: 'left'}} title={renderTitle()} headerLeft={renderLeftButton()} headerRight={renderRightButton()}/>
                <CBImage containerStyle={[appStyles.image, {alignSelf: 'center', marginTop: 120, width: moderateScale(240), height: moderateScale(240)}]} source={studentInfo !== {} && studentInfo?.status === 'verified' ? ImageUtil.getImage('verified') : ImageUtil.getImage('pending')} resizeMode={'contain'}/>
                {studentInfo === {} ? <CBText style={[appStyles.text, {marginTop: 10, alignSelf: 'center'}]}>Thông tin của bạn đang được Admin xem xét và phê duyệt</CBText> : null}
                {studentInfo !== {} && studentInfo?.status === 'verified' ?  <CBButton buttonStyle={{ marginTop: 30, alignSelf: 'center', width: dimens.widthScreen / 2, borderWidth: 1}} title={'Về trang chủ'} onPress={onLogin}/>
                : <CBButton buttonStyle={{ marginTop: 30, alignSelf: 'center', width: dimens.widthScreen / 2, borderWidth: 1}} title={'Cập nhật'} onPress={onConfirm}/> }
            </CBView>

        </CBContainer>
    );
};

export default PendingContent;
