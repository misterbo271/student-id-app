import React from 'react';
import RootNavigation from 'screens/RootNavigation';
import {Keyboard} from 'react-native';
import {CBAction, CBButton, CBCodeInput, CBContainer, CBIcon, CBText, CBTouchableOpacity, CBTouchableWithoutFeedback, CBView} from 'components';
import CBConstant from 'constants/CBConstant';
import FirebaseAuth from 'services/FirebaseAuth';
import PhoneNumberUtil from 'utils/PhoneNumberUtil';
import Toast from 'react-native-simple-toast';
import {appStyles} from 'configs/styles';
import {strings} from 'controls/i18n';

import {Formik} from 'formik';
import * as yup from 'yup';

import Base from 'screens/Base';

export default class Verify extends Base {

    validationSchema = yup.object({
        code: yup.string()
            .matches(CBConstant.CODE_REGEX_PATTERN, strings('error_valid_code'))
            .required(strings('error_empty_code'))
    });

    constructor(props) {
        super(props);
        this.count = 1;
        this.state = {
            countryCode: '',
            phoneNumber: '',
            countdown: CBConstant.COUNTDOWN
        };
    }

    componentDidMount() {
        super.componentDidMount();
        this.load();
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        clearInterval(this.countdowner);
    }

    load() {
        this.setState({
            countryCode: this.defaultParam?.countryCode || '',
            phoneNumber: this.defaultParam?.phoneNumber || ''
        }, this.startCountdown);
    }

    startCountdown = () => {
        this.count = this.count + 1;
        this.countdowner = setInterval(() => {
            const {countdown} = this.state;
            if (countdown > 0) {
                this.setState({countdown: countdown - 1});
            } else {
                clearInterval(this.countdowner);
            }
        }, 1000);
    };

    onBlur = () => {
        Keyboard.dismiss();
    };

    onBack = () => {
        RootNavigation.goBack();
    };

    onVerify = (values) => {
        FirebaseAuth.verifyOTP(values.code, true, true, (user) => {
            if (user) {
                console.log(`dctan :: ${JSON.stringify(user)}`);
            }
        });
    };

    submitViaPhone(param) {
        FirebaseAuth.clearOTP();
        FirebaseAuth.sendOTP(PhoneNumberUtil.insertCountryCode(param.countryCode, param.phoneNumber), true, true, (result) => {
            if (result) {
                Toast.show(strings('toast_resend'), Toast.SHORT);
                this.setState({
                    countdown: CBConstant.COUNTDOWN * this.count
                }, this.startCountdown);
            }
        });
    }

    onResend = () => {
        const {countryCode, phoneNumber} = this.state;
        this.submitViaPhone({
            countryCode: countryCode,
            phoneNumber: phoneNumber
        });
    };

    render() {
        const {countryCode, phoneNumber, countdown} = this.state;
        return (
            <CBContainer>
                <CBTouchableWithoutFeedback style={{flex: 1}} define={'none'} onPress={this.onBlur}>
                    <CBView style={{flex: 1, paddingVertical: 15, paddingHorizontal: 30}} define={'none'}>
                        <CBText style={[appStyles.heading, {marginTop: 60}]} define={'heading'}>{strings('text_title_verify')}</CBText>
                        <CBText style={[appStyles.subtext, {marginTop: 5}]} define={'subtext'}>{strings('text_subtitle_verify').replace('{0}', `(${countryCode}) ${phoneNumber}`)}</CBText>
                        <Formik
                            initialValues={{code: ''}}
                            validationSchema={this.validationSchema}
                            validateOnChange={false}
                            validateOnBlur={false}
                            onSubmit={this.onVerify}>
                            {
                                ({handleChange, handleSubmit, values, errors}) => (
                                    <>
                                        <CBCodeInput
                                            style={{marginTop: 30}}
                                            autoFocus={true}
                                            count={6}
                                            value={values.code}
                                            errorMessage={errors.code}
                                            onChangeCode={handleChange('code')}
                                            onFillCode={handleSubmit}
                                        />
                                        <CBButton containerStyle={{marginTop: 15}} buttonStyle={appStyles.button} title={strings('button_verify')} onPress={handleSubmit}/>
                                    </>
                                )
                            }
                        </Formik>
                        {countdown > 0 ? <CBText style={[appStyles.subtext, {textAlign: 'center', marginTop: 30}]} define={'subtext'}>{strings('text_not_receive_code')}</CBText> : null}
                        {countdown < 1 ? <CBAction style={{alignSelf: 'center', marginTop: 30}} title={strings('action_resend')} onPress={this.onResend}/> : <CBText style={[appStyles.subtext, {textAlign: 'center'}]} define={'subtext'}>{strings('text_resend_code').replace('{0}', countdown)}</CBText>}
                    </CBView>
                </CBTouchableWithoutFeedback>
                <CBTouchableOpacity style={[appStyles.action, {position: 'absolute', top: 5, left: 5}]} define={'none'} onPress={this.onBack}>
                    <CBIcon define={'icon'} type={'ionicon'} name={'chevron-back-outline'} size={25}/>
                </CBTouchableOpacity>
            </CBContainer>
        );
    }
}
