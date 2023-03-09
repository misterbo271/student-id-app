import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {useStateWithCallbackLazy} from 'hooks';
import {Keyboard, ScrollView, useColorScheme, View} from 'react-native';
import {Icon} from 'react-native-elements';
import Modal from 'react-native-modal';
import {appStyles} from 'configs/styles';
import {helpers} from 'configs/themes';
import colors from "configs/colors";
import dimens from "configs/dimens";
import {CBText} from "components/index";
import {strings} from "controls/i18n";
import CBButton from "components/CBButton";
import RootNavigation from "screens/RootNavigation";

const ResetWalletPopup = ({style, onAction}, ref) => {
    useImperativeHandle(ref, () => ({
        show,
        hide
    }));
    const [data, setData] = useState({});
    const [visible, setVisible] = useStateWithCallbackLazy(false);
    const {title = '', options = {}} = data;
    const show = (data) => {
        Keyboard.dismiss();
        setData(data);
        setVisible(true);
    };
    const hide = (callback) => {
        setVisible(false, fallback(callback));
    };
    const fallback = (callback) => () => {
        if (callback) setTimeout(callback, 300);
    };
    const onDismiss = () => {
        if (options && options.onDismiss && typeof options.onDismiss === 'function') {
            options.onDismiss();
        }
    };
    const onTouchOutside = () => {
        if (options && (options.cancelable === true || options.cancelable === undefined)) {
            hide();
        }
    };
    const onHardwareBackPress = () => {
        if (options && (options.cancelable === true || options.cancelable === undefined)) {
            hide();
        }
        return true;
    };

    const onSwipeOut = () => {
        hide();
    };

    const onAuthScreen = () => {
        RootNavigation.navigate('AuthScreen');
        hide();
    }

    const scheme = useColorScheme();
    const sheetStyle = helpers('sheet', scheme);
    return (
        <Modal
            style={[appStyles.modal, {flex: 1, justifyContent: "center", alignItems: "center", marginTop: 22}]}
            isVisible={visible}
            backdropOpacity={0.4}
            backdropTransitionOutTiming={0}
            propagateSwipe={true}
            onModalHide={onDismiss}
            onBackdropPress={onTouchOutside}
            onBackButtonPress={onHardwareBackPress}
            onSwipeComplete={onSwipeOut}
            swipeDirection={['down']}>
            {/*<View style={[appStyles.knob, {alignSelf: 'center'}, knobStyle]}/>*/}
            <View style={[appStyles.sheet, {paddingBottom: dimens.bottomSpace, backgroundColor: colors.contentColor, borderRadius: 16, height: 320, width: dimens.widthScreen - 70}, style, sheetStyle]}>
                <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                    <Icon type={'feather'} name={'alert-triangle'} color={colors.semiRed} size={34} style={{marginTop: 20}}/>
                    <CBText style={[appStyles.title, { marginTop: 15, color: colors.semiRed, alignSelf: 'center'}]} >{strings('text_confirm_reset_wallet_1')}</CBText>
                    <CBText style={[appStyles.title, { marginTop: 5, color: colors.semiRed, alignSelf: 'center'}]} >{strings('text_confirm_reset_wallet_2')}</CBText>
                    <CBText style={[appStyles.text, {marginTop: 15, alignSelf: 'center'}]} define={'subtext'}>Type Something Here</CBText>
                    <CBButton containerStyle={{paddingHorizontal: 35, paddingVertical: 20}} title={strings('action_agree_reset_wallet')} onPress={onAuthScreen}/>
                    <CBButton containerStyle={{paddingHorizontal: 35}} type="outline" title={strings('button_back')} onPress={hide}/>
                </ScrollView>
            </View>
        </Modal>
    );
};

export default forwardRef(ResetWalletPopup);
