import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Icon, useTheme} from 'react-native-elements';
import {appStyles} from 'configs/styles';
import {helpers} from 'configs/themes';

const CBButtonRound = ({style, textStyle, buttonStyle, disabled, type, name, color, size, title, onPress}) => {
    const {theme} = useTheme();
    const enabledStyle = helpers('enabled', theme.colors.scheme);
    const disabledStyle = helpers('disabled', theme.colors.scheme);
    return (
        <TouchableOpacity
            style={[{width: 'auto', alignItems: 'center', paddingHorizontal: 7.5}, style]}
            disabled={disabled}
            pointerEvents={disabled ? 'none' : 'auto'}
            onPress={onPress}>
            <View style={[appStyles.round, disabled ? disabledStyle : enabledStyle, buttonStyle]}>
                <Icon type={type} name={name} color={color} size={size}/>
            </View>
            {title && title.length > 0 ? <Text style={[appStyles.blockquote, {minWidth: 45, textAlign: 'center', marginTop: 5}, textStyle]} allowFontScaling={false} numberOfLines={1} ellipsizeMode={'tail'}>{title}</Text> : null}
        </TouchableOpacity>
    );
};

export default CBButtonRound;
