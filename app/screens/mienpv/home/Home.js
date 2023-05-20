import React, {useEffect, useState} from 'react';
import {DeviceEventEmitter, useColorScheme} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CBIcon, CBTouchableOpacity, CBView} from 'components';
import {appStyles} from 'configs/styles';
import {helpers} from 'configs/themes';
import dimens from 'configs/dimens';

import Booking from "screens/mienpv/home/Booking";
import Dashboard from 'screens/mienpv/dashboard/Dashboard';
import Identity from 'screens/mienpv/identity/Identity';
import Profile from 'screens/mienpv/profile/Profile';

const Tab = createBottomTabNavigator();
const Home = () => {
    const [permission, setPermission] = useState({isDashboard: false});
    const scheme = useColorScheme();
    const shadowStyle = helpers('shadow', scheme);
    const backgroundColor = helpers('background', scheme);
    const primaryColor = helpers('primary', scheme);
    const iconColor = helpers('icon', scheme);
    useEffect(() => {
        const tabHomeSubscription = DeviceEventEmitter.addListener('TAB_HOME', loadTabHomeEvent);
        return () => tabHomeSubscription.remove();
    }, []);
    const loadTabHomeEvent = () => {
        const isDashboard = true;
        setPermission({
            isDashboard
        });
    };
    const renderTabBarIcon = (name) => ({focused}) => {
        return (
            <CBView style={{position: 'absolute', top: 15}} define={'none'}>
                <CBIcon type={'ionicon'} name={name} color={focused ? primaryColor : iconColor} size={25}/>
                <CBIcon type={'ionicon'} name={'ellipse-sharp'} color={focused ? primaryColor : backgroundColor} size={6}/>
            </CBView>
        );
    };
    const renderCenterTabBarIcon = (name) => ({focused}) => {
        return (
            <CBTouchableOpacity style={[{position: 'absolute', top: 7.5}, {width: 45, height: 45, borderRadius: 22.5, backgroundColor: primaryColor}, {alignItems: 'center', justifyContent: 'center'}]} define={'none'}>
                <CBIcon type={'ionicon'} name={name} size={25} color={'#FFFFFF'}/>
            </CBTouchableOpacity>
        );
    };
    return (
        <Tab.Navigator
            initialRouteName={permission.isDashboard ? 'Dashboard' : 'Booking'}
            screenOptions={{
                lazy: true,
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                tabBarStyle: [appStyles.shadow, shadowStyle, {
                    position: 'absolute',
                    bottom: dimens.bottomSpace,
                    height: 60,
                    backgroundColor: backgroundColor,
                    marginHorizontal: 15,
                    paddingHorizontal: 20,
                    borderTopWidth: 0,
                    borderRadius: 30
                }]
            }}>
            {
                permission.isDashboard ?
                    <Tab.Screen name={'Dashboard'} component={Dashboard} options={{headerShown: false, tabBarIcon: renderTabBarIcon('book-outline')}}/>
                    :   <Tab.Screen name={'Booking'} component={Booking} options={{headerShown: false, tabBarIcon: renderTabBarIcon('book-outline')}}/>
            }
            <Tab.Screen name={'Identity'} component={Identity} options={{headerShown: false, tabBarIcon: renderTabBarIcon('qr-code-outline')}}/>
            <Tab.Screen name={'Profile'} component={Profile} options={{headerShown: false, tabBarIcon: renderTabBarIcon('person-outline')}}/>
        </Tab.Navigator>
    );
};

export default Home;
