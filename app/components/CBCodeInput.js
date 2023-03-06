import React, {forwardRef, useEffect} from 'react';
import {Platform, Text, TextInput, TouchableWithoutFeedback, useColorScheme, View} from 'react-native';
import {appStyles} from 'configs/styles';
import {helpers} from 'configs/themes';

const majorVersionIOS = parseInt(Platform.Version, 10);
const isOTPSupported = Platform.OS === 'ios' && majorVersionIOS >= 12;

const CBCodeInput = ({containerStyle, inputStyle, autoFocus, count, value, errorMessage, onChangeCode, onFillCode}, ref) => {
    const fields = [];
    useEffect(() => {
        if (autoFocus) onPress();
    }, []);
    const onFocus = (k) => {
        if (fields && Array.isArray(fields) && fields[k]) {
            fields[k].focus();
        }
    };
    const onBlur = () => {
        if (fields && Array.isArray(fields)) {
            for (const field of fields) {
                field.blur();
            }
        }
    };
    const onPress = () => {
        const digits = Array.from(value || '').filter(digit => !!digit);
        onFocus(Math.min(digits.length, count - 1));
    };
    const onChangeText = (k) => (digit) => {
        let digits = Array.from(value || '').slice();
        const oldLength = digits[k] ? digits[k].length : 0;
        const newLength = digit.length;
        if (newLength - oldLength >= count) {
            digits = Array.from(digit || '').slice(oldLength, newLength);
            if (onChangeCode && typeof onChangeCode === 'function') {
                onChangeCode(digits.join('').slice(0, count));
            }
        } else {
            if (digit.length === 0) {
                if (digits.length > 0) {
                    digits = digits.slice(0, digits.length - 1);
                }
            } else {
                Array.from(digit || '').forEach(value => {
                    digits[k] = value;
                    k += 1;
                });
                k -= 1;
            }
            if (onChangeCode && typeof onChangeCode === 'function') {
                onChangeCode(digits.join('').slice(0, count));
            }
        }
        const result = digits.join('');
        if (result.length >= count) {
            onBlur();
            if (onFillCode && typeof onFillCode === 'function') {
                setTimeout(() => onFillCode(result.slice(0, count)), 300);
            }
        } else {
            if (digit.length === 0 && k > 0) {
                onFocus(k - 1);
            }
            if (digit.length > 0 && k < count - 1) {
                onFocus(k + 1);
            }
        }
    };
    const onKeyPress = (k) => (e) => {
        const {nativeEvent: {key}} = e;
        if (key === 'Backspace') {
            if (!Array.from(value || '')[k] && k > 0) {
                onChangeText(k - 1, '');
                onFocus(k - 1);
            }
        }
    };
    const scheme = useColorScheme();
    const codeStyle = helpers('code', scheme);
    const errorStyle = helpers('error', scheme);
    return (
        <View ref={ref} style={containerStyle}>
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={[appStyles.row, {justifyContent: 'space-between'}]}>
                    {new Array(count).fill(1).map((i, k) => <View key={k} pointerEvents={'none'}>
                        <TextInput
                            style={[appStyles.code, codeStyle, inputStyle]}
                            ref={ref => fields[k] = ref}
                            numberOfLines={1}
                            ellipsizeMode={'tail'}
                            keyboardType={'number-pad'}
                            textContentType={isOTPSupported ? 'oneTimeCode' : 'none'}
                            value={Array.from(value || '')[k]}
                            onChangeText={onChangeText(k)}
                            onKeyPress={onKeyPress(k)}
                        />
                    </View>)}
                </View>
            </TouchableWithoutFeedback>
            <Text style={[appStyles.error, {margin: 5}, errorStyle]}>{errorMessage}</Text>
        </View>
    );
};

export default forwardRef(CBCodeInput);
