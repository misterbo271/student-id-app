import React, {Component} from 'react';
import {Appearance, AppState, Dimensions, Linking, LogBox, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import CBCache from 'caches/CBCache';
import CBConfig from 'configs/CBConfig';
import ConfigManager from 'controls/ConfigManager';
import CBGlobal from 'globals/CBGlobal';
import CBNotificationHandler from 'handlers/CBNotificationHandler';
import CBDeeplinkHandler from 'handlers/CBDeeplinkHandler';
import CBNative from 'modules/CBNative';
import CBSync from 'services/CBSync';
import CBRun from 'services/CBRun';
import JsonUtil from 'utils/JsonUtil';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ThemeProvider} from 'react-native-elements';
import {NavigationContainer} from '@react-navigation/native';
import {enableLatestRenderer} from 'react-native-maps';
import {setJSExceptionHandler, setNativeExceptionHandler} from 'react-native-exception-handler';
import CodePush from 'react-native-code-push';
import {LocaleConfig} from 'react-native-calendars';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import analytics from '@react-native-firebase/analytics';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import SplashScreen from 'react-native-splash-screen';
import Orientation from 'react-native-orientation';
import {ModalPortal} from 'react-native-modals';
import DeviceInfo from 'react-native-device-info';
import {Settings} from 'react-native-fbsdk-next';
import OneSignal from 'react-native-onesignal';
import RNRestart from 'react-native-restart';
import Parse from 'parse/react-native.js';
import {helpers} from 'configs/themes';
import {strings} from 'controls/i18n';
import colors from 'configs/colors';
import dimens from 'configs/dimens';
import {configure} from 'mobx';

import DropdownAlert from 'react-native-dropdownalert';
import DropdownAlertHolder from './DropdownAlertHolder';
import DialogAlert from './DialogAlert';
import DialogAlertHolder from './DialogAlertHolder';

import {RootStack} from './Router';

enableLatestRenderer();

const errorHandler = (e, isFatal) => {
    if (isFatal) {
        DialogAlertHolder.alert(strings('title_alert_crash'), strings('message_alert_crash'));
    } else {
        console.log(e);
    }
};

setJSExceptionHandler(errorHandler, !__DEV__);

setNativeExceptionHandler((errorString) => {
    DialogAlertHolder.alert(strings('title_alert_crash'), strings('message_alert_crash'));
});

LocaleConfig.locales['en'] = {
    monthNames: ['January -', 'February -', 'March -', 'April -', 'May -', 'June -', 'July -', 'August -', 'September -', 'October -', 'November -', 'December -'],
    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
};

LocaleConfig.locales['vi'] = {
    monthNames: ['Tháng 01 /', 'Tháng 02 /', 'Tháng 03 /', 'Tháng 04 /', 'Tháng 05 /', 'Tháng 06 /', 'Tháng 07 /', 'Tháng 08 /', 'Tháng 09 /', 'Tháng 10 /', 'Tháng 11 /', 'Tháng 12 /'],
    monthNamesShort: ['Th01', 'Th02', 'Th03', 'Th04', 'Th05', 'Th06', 'Th07', 'Th08', 'Th09', 'Th10', 'Th11', 'Th12'],
    dayNames: ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
    dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
};

LogBox.ignoreAllLogs(__DEV__);
LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state'
]);

GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    webClientId: '1067221269816-dppga34974mv72l966sdvdt1b8qbcaiu.apps.googleusercontent.com'
});

configure({
    enforceActions: 'never'
});

export default class App extends Component {

    constructor(props) {
        super(props);
        Parse.setAsyncStorage(AsyncStorage);
        Parse.initialize(CBConfig.BACK_4_APP_APPLICATION_ID, CBConfig.BACK_4_APP_JAVASCRIPT_KEY);
        Parse.serverURL = CBConfig.BACK_4_APP_URL;
        Settings.initializeSDK();
        this.navigationRef = React.createRef();
        this.routeNameRef = React.createRef();
        this.state = {
            theme: Appearance.getColorScheme(),
            appState: AppState.currentState,
            isSubscribed: false
        };
    }

    componentDidMount() {
        ConfigManager.execute();
        Promise.all([DeviceInfo.getUniqueId(), DeviceInfo.getDeviceName(), DeviceInfo.getManufacturer(), DeviceInfo.isEmulator(), CodePush.getUpdateMetadata()]).then(values => {
            CBCache.uniqueId = values[0] || '';
            CBCache.deviceId = encodeURIComponent(DeviceInfo.getDeviceId() || '');
            CBCache.deviceName = encodeURIComponent(values[1] || '');
            CBCache.manufacturer = encodeURIComponent(values[2] || '');
            CBCache.isEmulator = values[3] || false;
            CBCache.codePushVersion = values[4]?.label || CBNative.buildVersion;
        });

        this.dimensionsSubscription = Dimensions.addEventListener('change', this.handleAppWindowChange);

        this.appearanceSubscription = Appearance.addChangeListener(this.handleAppThemeChange);

        this.unsubscribeNetwork = NetInfo.addEventListener(this.handleConnectivityChange);

        this.appStateSubscription = AppState.addEventListener('change', this.handleAppStateChange);

        this.linkingSubscription = Linking.addEventListener('url', this.handleOpenUrl);
        Linking.getInitialURL().then((url) => {
            CBDeeplinkHandler.handleUrl(url);
        }).catch((error) => console.error('An error occurred', error));

        this.unsubscribeDynamicLinks = dynamicLinks().onLink(this.handleOpenDynamicUrl);
        dynamicLinks().getInitialLink().then((link) => {
            CBDeeplinkHandler.handleDynamicUrl(link?.url);
        }).catch((error) => console.error('An error occurred', error));

        messaging().onNotificationOpenedApp(remoteMessage => {
            const {data} = remoteMessage || {};
            CBNotificationHandler.onClick(null, data);
        });
        messaging().getInitialNotification().then(remoteMessage => {
            const {data} = remoteMessage || {};
            CBGlobal.appNotification = data;
        });
        this.unsubscribeMessaging = messaging().onMessage(async (remoteMessage) => {
            CBSync.syncNotification();
            CBSync.syncUnreadNotification();
            CBSync.syncOSNotification();
            const {messageId, notification, data} = remoteMessage;
            CBGlobal.appNotification = data;
            if (CBCache.messageId !== messageId) {
                const {title, body} = notification || {};
                const {title: osTitle, alert: osBody, custom: osData} = data || {};
                const additionalData = JsonUtil.parseJsonString(osData);
                if (additionalData && additionalData['a']) CBGlobal.appNotification = additionalData['a'];
                //DropdownAlertHolder.alertWithType('info', title || osTitle, body || osBody, {source: require('assets/images/ic_bell.png')});
                if (!osTitle && !osBody) {
                    const channelId = await notifee.createChannel({
                        id: 'code-base-channel',
                        name: 'CodeBase Channel',
                        importance: AndroidImportance.HIGH,
                        sound: 'default'
                    });
                    await notifee.displayNotification({
                        title: title || osTitle,
                        body: body || osBody,
                        data: data,
                        android: {
                            channelId,
                            smallIcon: 'ic_launcher',
                            pressAction: {
                                id: 'default'
                            }
                        }
                    });
                }
                CBCache.messageId = messageId;
            }
        });

        notifee.getInitialNotification().then(initialNotification => {
            const {notification} = initialNotification || {};
            const {data} = notification || {};
            CBGlobal.appNotification = data;
        });
        this.unsubscribeNotifee = notifee.onForegroundEvent(({type, detail}) => {
            const {notification} = detail || {};
            const {data} = notification || {};
            switch (type) {
                case EventType.PRESS:
                    CBNotificationHandler.onClick(null, data);
                    break;
                default:
                    break;
            }
        });

        OneSignal.setLogLevel(6, 0);
        OneSignal.setAppId(CBConfig.ONE_SIGNAL_APP_ID);
        /*OneSignal.promptForPushNotificationsWithUserResponse(response => {
            console.log('Prompt response:', response);
        });*/
        OneSignal.setNotificationWillShowInForegroundHandler(this.onReceived);
        OneSignal.setNotificationOpenedHandler(this.onOpened);
        OneSignal.getDeviceState().then(async deviceState => {
            if (deviceState?.userId) await AsyncStorage.setItem('@os_token', deviceState?.userId);
            this.setState({
                isSubscribed: deviceState?.isSubscribed || false
            }, this.onLoaded);
        }).catch(this.onLoaded);
    }

    componentWillUnmount() {
        this.dimensionsSubscription.remove();

        this.appearanceSubscription.remove();

        if (this.unsubscribeNetwork) this.unsubscribeNetwork();

        this.appStateSubscription.remove();

        this.linkingSubscription.remove();

        if (this.unsubscribeDynamicLinks) this.unsubscribeDynamicLinks();

        if (this.unsubscribeMessaging) this.unsubscribeMessaging();

        if (this.unsubscribeNotifee) this.unsubscribeNotifee();
    }

    handleAppWindowChange = ({window}) => {
        if (dimens.widthScreen !== window.width || dimens.heightScreen !== window.height) {
            RNRestart.Restart();
        }
    };

    handleAppThemeChange = (theme) => {
        this.setState({
            //theme: theme.colorScheme
            theme: Appearance.getColorScheme()
        });
    };

    handleConnectivityChange = (state) => {
        const {appState: action} = this.state;
        if (action === 'active') {
            const {isConnected} = state;
            if (!isConnected) {
                DropdownAlertHolder.alertWithType('error', strings('title_alert_no_internet'), strings('message_alert_no_internet'));
            }
        }
    };

    handleAppStateChange = async (state) => {
        this.setState({appState: state});
    };

    handleOpenUrl = (event) => {
        CBDeeplinkHandler.handleUrl(event?.url);
    };

    handleOpenDynamicUrl = (link) => {
        CBDeeplinkHandler.handleDynamicUrl(link?.url);
    };

    onReceived = ({notification}) => {
        const {appState: action} = this.state;
        CBNotificationHandler.onReceived(action, notification);
    };

    onOpened = ({action, notification}) => {
        CBNotificationHandler.onClick(action, notification?.payload?.additionalData || notification?.additionalData);
    };

    onLoaded = () => {
        SplashScreen.hide();
        Orientation.lockToPortrait();
    };

    onReady = () => {
        this.routeNameRef.current = this.navigationRef.current.getCurrentRoute().name;
    };

    onStateChange = async () => {
        const previousRouteName = this.routeNameRef.current;
        const currentRouteName = this.navigationRef.current.getCurrentRoute().name;
        if (previousRouteName !== currentRouteName) {
            await analytics().logScreenView({
                screen_name: currentRouteName,
                screen_class: currentRouteName
            });
        }
        this.routeNameRef.current = currentRouteName;
    };

    onTap = () => {
        CBRun.runCheckNotification();
    };

    render() {
        const {theme} = this.state;
        const barStyle = theme === 'dark' ? 'light-content' : 'dark-content';
        const statusBarColor = theme === 'dark' ? colors.statusBarDarkColor : colors.statusBarColor;
        const backgroundColor = theme === 'dark' ? colors.primaryDarkColor : colors.primaryColor;
        return (
            <ThemeProvider theme={helpers('elements', theme)}>
                <StatusBar barStyle={barStyle} backgroundColor={statusBarColor}/>
                <GestureHandlerRootView style={{flex: 1}}>
                    <NavigationContainer ref={this.navigationRef} onReady={this.onReady} onStateChange={this.onStateChange} theme={helpers('navigation', theme)} initialRouteName={'Home'}>
                        <RootStack/>
                    </NavigationContainer>
                </GestureHandlerRootView>
                <DropdownAlert ref={ref => DropdownAlertHolder.setDropdownAlert(ref)} containerStyle={{backgroundColor}} inactiveStatusBarStyle={barStyle} inactiveStatusBarBackgroundColor={statusBarColor} onTap={this.onTap}/>
                <DialogAlert ref={ref => DialogAlertHolder.setDialogAlert(ref)} theme={theme}/>
                <ModalPortal/>
            </ThemeProvider>
        );
    }
}
