import React from 'react';
import {Platform, useColorScheme, View} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {appStyles} from 'configs/styles';
import {strings} from 'controls/i18n';
import colors from 'configs/colors';
import dimens from 'configs/dimens';

import Home from 'screens/mienpv/home/Home';
import Web from 'screens/Web';
import Empty from 'screens/Empty';
import Introduction from 'screens/mienpv/auth/Introduction';
import Dashboard from "screens/mienpv/dashboard/Dashboard";
import Profile from "screens/mienpv/profile/Profile";
import ScanIdentity from "screens/mienpv/identity/ScanIdentity";
import VerifyInput from "screens/mienpv/auth/VerifyInput";
import UpdateProfile from "screens/mienpv/profile/UpdateProfile";
import Pending from 'screens/mienpv/auth/Pending';

const Stack = createStackNavigator();
export const UserStack = () => {
    const scheme = useColorScheme();
    const textColor = scheme === 'dark' ? colors.primaryTextDarkColor : colors.primaryTextColor;
    const renderHeaderBackImage = (props) => {
        if (Platform.OS === 'android') {
            return <Ionicons name={'chevron-back-outline'} color={props.tintColor} size={25}/>;
        } else {
            return (
                <View style={[appStyles.action, {marginLeft: 5}]}>
                    <Ionicons name={'chevron-back-outline'} color={props.tintColor} size={25}/>
                </View>
            );
        }
    };
    return (
        <Stack.Navigator
            initialRouteName={'Home'}
            screenOptions={{
                ...TransitionPresets.SlideFromRightIOS,
                headerBackImage: renderHeaderBackImage,
                headerBackTitleVisible: false,
                headerTitleAllowFontScaling: false,
                headerBackAllowFontScaling: false,
                headerTitleAlign: 'center',
                headerTintColor: textColor,
                headerTitleStyle: {
                    fontSize: dimens.largeText,
                    fontFamily: 'GoogleSans-Regular'
                }
            }}>
            <Stack.Screen name={'Home'} component={Home} options={{headerShown: false}}/>
            <Stack.Screen name={'Web'} component={Web} options={{title: strings('screen_web')}}/>
            <Stack.Screen name={'Empty'} component={Empty} options={{title: strings('screen_empty')}}/>
            <Stack.Screen name={'Introduction'} component={Introduction} options={{...TransitionPresets.ModalSlideFromBottomIOS, headerShown: false}}/>
            <Stack.Screen name={'Dashboard'} component={Dashboard} options={{headerShown: false}}/>
            <Stack.Screen name={'Profile'} component={Profile} options={{headerShown: false}}/>
            <Stack.Screen name={'ScanIdentity'} component={ScanIdentity} options={{headerShown: false}}/>
            <Stack.Screen name={'VerifyInput'} component={VerifyInput} options={{title: 'Thông tin cá nhân'}}/>
            <Stack.Screen name={'UpdateProfile'} component={UpdateProfile} options={{title: 'Cập nhật thông tin'}}/>
            <Stack.Screen name={'Pending'} component={Pending} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
};
