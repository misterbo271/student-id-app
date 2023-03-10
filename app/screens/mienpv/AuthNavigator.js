import React from 'react';
import {Platform} from 'react-native';
import {useTheme} from "react-native-elements";
import {CBIcon, CBView} from "app/components";
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {HeaderBackButton} from '@react-navigation/elements';
import {appStyles} from 'configs/styles';
import colors from 'configs/colors';
import dimens from 'configs/dimens';

import LoginOrRegister from 'screens/mienpv/auth/LoginOrRegister';
import Authentication from 'screens/mienpv/auth/Authentication';
import Register from 'screens/mienpv/auth/Register';
import {strings} from "controls/i18n";

const Stack = createStackNavigator();
export const AuthStack = () => {
    const {theme} = useTheme();
    const statusColor = theme.colors.scheme === 'dark' ? colors.statusBarDarkColor : colors.statusBarColor;
    const textColor = '#FFFFFF';
    const renderHeaderBackImage = (props) => {
        if (Platform.OS === 'android') {
            return <CBIcon type={'ionicon'} name={'chevron-back-outline'} color={props.tintColor} size={25}/>;
        } else {
            return (
                <CBView style={[appStyles.action, {marginLeft: 5}]} define={'none'}>
                    <CBIcon type={'ionicon'} name={'chevron-back-outline'} color={props.tintColor} size={25}/>
                </CBView>
            );
        }
    };
    return (
        <Stack.Navigator
            initialRouteName={'LoginOrRegister'}
            screenOptions={{
                ...TransitionPresets.SlideFromRightIOS,
                gestureEnabled: false,
                headerStyle: {backgroundColor: statusColor},
                headerLeft: (props) => <HeaderBackButton {...props}/>,
                headerBackImage: renderHeaderBackImage,
                headerBackTitleVisible: false,
                headerTitleAllowFontScaling: false,
                headerBackAllowFontScaling: false,
                headerTitleAlign: 'left',
                headerTintColor: textColor,
                headerTitleStyle: {
                    fontSize: dimens.largeText,
                    color: textColor,
                    fontFamily: 'GoogleSans-Bold'
                }
            }}>
            <Stack.Screen name={'LoginOrRegister'} component={LoginOrRegister} options={{title: strings('screen_login')}}/>
            <Stack.Screen name={'Authentication'} component={Authentication} options={{title: strings('screen_login')}}/>
            <Stack.Screen name={'Register'} component={Register} options={{title: strings('screen_login')}}/>
        </Stack.Navigator>
    );
}
