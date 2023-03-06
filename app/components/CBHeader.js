import React from 'react';
import {Text, TouchableOpacity, useColorScheme, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {appStyles} from 'configs/styles';
import {helpers} from 'configs/themes';

const CBHeader = ({style, title, subtitle, note, headerLeft, headerRight, onNavigation}) => {
    const scheme = useColorScheme();
    const statusStyle = helpers('status', scheme);
    const iconColor = helpers('icon', scheme);
    const h1Style = helpers('h1', scheme);
    const subtextStyle = helpers('subtext', scheme);
    const h2Style = helpers('h2', scheme);
    const renderLeftButton = () => {
        return (
            <TouchableOpacity style={[appStyles.action, {marginLeft: 5}]} onPress={onNavigation}>
                <Icon type={'ionicon'} name={'chevron-back-outline'} size={25} color={iconColor}/>
            </TouchableOpacity>
        );
    };
    const renderTitle = () => {
        if (typeof title === 'string') {
            return (
                <View style={[{flex: 1, marginLeft: 15, marginRight: 15}]}>
                    <Text style={[appStyles.h1, h1Style, style]} allowFontScaling={false} numberOfLines={1} ellipsizeMode={'tail'}>
                        {title}
                        {note && note.length > 0 ? <Text style={[appStyles.subtext, {fontFamily: 'GoogleSans-Regular'}, subtextStyle]} allowFontScaling={false} numberOfLines={1} ellipsizeMode={'tail'}>{` ${note}`}</Text> : null}
                    </Text>
                    {subtitle && subtitle.length > 0 ? <Text style={[appStyles.h2, h2Style, style]} allowFontScaling={false} numberOfLines={1} ellipsizeMode={'tail'}>{subtitle}</Text> : null}
                </View>
            );
        } else if (title && typeof title === 'object') {
            return title;
        } else {
            return null;
        }
    }
    const renderRightButton = () => {
        return <View style={{width: 40, marginRight: 5}}/>;
    };
    return (
        <View style={[appStyles.status, statusStyle]}>
            {headerLeft ? headerLeft : renderLeftButton()}
            {renderTitle()}
            {headerRight ? headerRight : renderRightButton()}
        </View>
    );
};

export default CBHeader;
