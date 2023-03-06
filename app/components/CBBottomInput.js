import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {useStateWithCallbackLazy} from 'hooks';
import {Keyboard, Text, useColorScheme, View} from 'react-native';
import EventTracker from 'controls/EventTracker';
import CBControl from 'controls/CBControl';
import {Button, Input} from 'react-native-elements';
import Modal from 'react-native-modal';
import {appStyles} from 'configs/styles';
import {helpers} from 'configs/themes';
import {strings} from 'controls/i18n';

const CBBottomInput = ({style, onAction}, ref) => {
    useImperativeHandle(ref, () => ({
        show,
        hide
    }));
    const [data, setData] = useState({});
    const [visible, setVisible] = useStateWithCallbackLazy(false);
    const [value, setValue] = useState('');
    const {title = '', buttons = [], options = {}} = data;
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
    const onChangeText = text => setValue(text);
    const onPress = (index) => () => {
        const button = buttons[index];
        if (button && button.onPress && typeof button.onPress === 'function') {
            hide(button.onPress(value));
        } else if (button && button.refId) {
            hide(() => CBControl.navigateWith(button.refId, button.defaultParam, button.injection));
        } else if (button && button.name) {
            if (onAction && typeof onAction === 'function') {
                hide(onAction(button.name));
            } else {
                hide();
            }
        } else {
            hide();
        }
        if (button && button.tracking) {
            EventTracker.logEvent('cb_bottom_input', {action: `click_button_${button.tracking}`});
        }
    };
    const renderButtons = () => {
        return buttons.map((i, k) => <Button key={k} disabled={!value.trim()} containerStyle={{marginTop: 15, paddingHorizontal: 15}} buttonStyle={appStyles.button} title={i.text} onPress={onPress(k)}/>)
    };
    const scheme = useColorScheme();
    const knobStyle = helpers('knob', scheme);
    const sheetStyle = helpers('sheet', scheme);
    const labelStyle = helpers('label', scheme);
    const captionStyle = helpers('caption', scheme);
    return (
        <Modal
            style={appStyles.modal}
            isVisible={visible}
            backdropOpacity={0.5}
            backdropTransitionOutTiming={0}
            propagateSwipe={true}
            onModalHide={onDismiss}
            onBackdropPress={onTouchOutside}
            onBackButtonPress={onHardwareBackPress}
            onSwipeComplete={onSwipeOut}
            swipeDirection={['down']}
            avoidKeyboard={true}>
            <View style={[appStyles.knob, {alignSelf: 'center'}, knobStyle]}/>
            <View style={[appStyles.sheet, {height: 266}, style, sheetStyle]}>
                {title ? <Text style={[appStyles.label, {margin: 15}, labelStyle]} numberOfLines={1} ellipsizeMode={'tail'}>{title}</Text> : null}
                <Input
                    containerStyle={{flex: 1, paddingHorizontal: 15}}
                    inputContainerStyle={{flex: 1, height: '100%', paddingVertical: 10}}
                    inputStyle={{flex: 1, height: '100%', paddingVertical: 10, textAlignVertical: 'top'}}
                    multiline={true}
                    placeholder={strings('placeholder_content')}
                    returnKeyType={'default'}
                    autoCapitalize={'none'}
                    maxLength={300}
                    value={value}
                    errorStyle={[appStyles.caption, captionStyle, {textAlign: 'right'}]}
                    errorMessage={strings('text_note_content')}
                    onChangeText={onChangeText}
                />
                {renderButtons()}
            </View>
        </Modal>
    );
};

export default forwardRef(CBBottomInput);
