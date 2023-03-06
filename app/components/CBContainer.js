import React, {forwardRef} from 'react';
import {KeyboardAvoidingView, Platform, SafeAreaView, useColorScheme, View} from 'react-native';
import {appStyles} from 'configs/styles';
import {helpers} from 'configs/themes';

const CBContainer = ({style, children, removeIOS = false, keyboardVerticalOffset = 0}, ref) => {
    const scheme = useColorScheme();
    const containerStyle = helpers('container', scheme);
    const contentStyle = helpers('content', scheme);
    return (
        <SafeAreaView ref={ref} style={[appStyles.container, containerStyle]}>
            {!removeIOS && Platform.OS === 'ios' ? <KeyboardAvoidingView style={{flex: 1}} keyboardVerticalOffset={keyboardVerticalOffset} behavior={'padding'}>
                <View style={[appStyles.content, style, contentStyle]}>
                    {children}
                </View>
            </KeyboardAvoidingView> :
            <View style={[appStyles.content, style, contentStyle]}>
                {children}
            </View>}
        </SafeAreaView>
    );
};

export default forwardRef(CBContainer);
