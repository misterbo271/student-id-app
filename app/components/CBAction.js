import React, {forwardRef} from 'react';
import {Text, TouchableOpacity, useColorScheme} from 'react-native';
import {appStyles} from 'configs/styles';
import {helpers} from 'configs/themes';

const CBAction = ({style, disabled, iconLeft, title, titleStyle, iconRight, onPress}, ref) => {
    const scheme = useColorScheme();
    const activeStyle = helpers('active', scheme);
    const inactiveStyle = helpers('inactive', scheme);
    return (
        <TouchableOpacity
            ref={ref}
            style={[appStyles.row, style]}
            disabled={disabled}
            pointerEvents={disabled ? 'none' : 'auto'}
            onPress={onPress}>
            {iconLeft}
            <Text style={[appStyles.text, disabled ? inactiveStyle : activeStyle, titleStyle]}>{title}</Text>
            {iconRight}
        </TouchableOpacity>
    );
};

export default forwardRef(CBAction);

