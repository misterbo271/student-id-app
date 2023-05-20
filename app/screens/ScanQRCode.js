import React, {Fragment} from 'react';
import {AppState, Platform} from 'react-native';
import RootNavigation from 'screens/RootNavigation';
import {CBButton, CBIcon, CBText, CBTouchableOpacity, CBView} from 'app/components';
import EventTracker from 'controls/EventTracker';
import {check, openSettings, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {CameraScreen} from 'react-native-camera-kit';
import {RNCamera} from 'react-native-camera';
import {debounce} from 'lodash';
import {appStyles} from 'configs/styles';
import {strings} from 'controls/i18n';
import dimens from 'configs/dimens';

import Base from 'screens/Base';
import axios from "axios";

const anchor = Platform.select({android: 5, ios: dimens.statusBar + 5});
const top = (dimens.heightScreen / 2) + (dimens.widthScreen / 2);
const left = dimens.widthScreen / 2;
const margin = dimens.widthScreen / 7;
const size = dimens.widthScreen - (2 * margin);

const CAMERA_VIEW_WIDTH = dimens.widthScreen;
const CAMERA_VIEW_HEIGHT = dimens.heightScreen;

const topMargin = margin;
const leftMargin = (dimens.heightScreen - size) / 2;
const frameWidth = size;
const frameHeight = size;

const scanAreaX = leftMargin / CAMERA_VIEW_HEIGHT;
const scanAreaY = topMargin / CAMERA_VIEW_WIDTH;
const scanAreaWidth = frameWidth / CAMERA_VIEW_HEIGHT;
const scanAreaHeight = frameHeight / CAMERA_VIEW_WIDTH;

export default class ScanQRCode extends Base {

    constructor(props) {
        super(props);
        this.camera = React.createRef();
        this.state = {
            index: 1,
            toggleCamera: false,
            toggleModule: true,
            togglePermission: true,
            toggleTorch: false,
            toggleVision: false
        };
    }

    componentDidMount() {
        super.componentDidMount();
        this.appStateSubscription = AppState.addEventListener('change', this.handleAppStateChange);
        this.timer = setTimeout(this.checkCameraPermission, 1000);
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.appStateSubscription.remove();
        clearTimeout(this.timer);
    }

    handleAppStateChange = async (state) => {
        if (state === 'active') {
            this.checkCameraPermission();
        }
    };

    checkCameraPermission = async () => {
        const result = await check(Platform.select({
            android: PERMISSIONS.ANDROID.CAMERA,
            ios: PERMISSIONS.IOS.CAMERA
        }));
        if (result === RESULTS.GRANTED) {
            this.grantedPermission();
        } else {
            this.showAlertGrantPermission();
        }
    };

    requestCameraPermission = async () => {
        const result = await request(Platform.select({
            android: PERMISSIONS.ANDROID.CAMERA,
            ios: PERMISSIONS.IOS.CAMERA
        }));
        if (result === RESULTS.GRANTED) {
            this.grantedPermission();
        } else {
            this.deniedPermission();
        }
    };

    showAlertGrantPermission = () => {
        this.alert(strings('title_alert_permissions'),
            Platform.select({
                android: strings('message_alert_camera_permission_android'),
                ios: strings('message_alert_camera_permission_ios')
            }),
            [
                {text: strings('button_close'), onPress: this.deniedPermission},
                {text: strings('button_next'), onPress: this.requestCameraPermission}
            ]
        );
    };

    grantedPermission = () => {
        this.setState({toggleCamera: true});
    };

    deniedPermission = () => {
        this.setState({togglePermission: false});
    };

    onExit = () => {
        const {index} = this.state;
        if (index === 0) {
            RootNavigation.goBack();
        } else if (index === 1) {
            RootNavigation.callback('onEnded', null);
            RootNavigation.goBack();
        }
        EventTracker.logEvent('screen_scan_qr_code', {action: 'click_button_exit'});
    };

    onSuccess(data) {
        RootNavigation.callback('onScanned', data);
        RootNavigation.goBack();
    }

    onFailure() {

    }

    onGoogleVisionBarcodesDetected = ({barcodes}) => {
        const array = barcodes.filter(barcode => barcode?.format !== 'None');
        if (array && Array.isArray(array) && array.length > 0) {
            this.onSuccess({value: array[0].data});
        }
    };

    onGoogleVisionBarcodesDetectedDebounce = debounce(this.onGoogleVisionBarcodesDetected, 300, {leading: true, trailing: false});

    onBarCodeRead = (event) => {
        this.onSuccess({value: event.data, type: event.type});
    };

    onBarCodeReadDebounce = debounce(this.onBarCodeRead, 300, {leading: true, trailing: false});

    handleQRScanned = async (event) => {
        try {
            const loginUrl = event.data;
            this.setState({isLoading: true});

            // Parse the query parameters from the login URL
            const urlSearchParams = new URLSearchParams(loginUrl.split('?')[1]);
            const username = urlSearchParams.get('username');
            const password = urlSearchParams.get('password');

            // Send a POST request to the login endpoint with the username and password parameters
            const response = await fetch('https://example.com/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            // Handle the response here
        } catch (error) {
            console.error(error);
        } finally {
            this.setState({isLoading: true});
        }
    };

    onLogin = (email, password) => () => {
        const url = 'http://localhost:3000/session/signin';
        const data = {
            email: email,
            password: password
        };
        axios.post(url, data)
            .then((response) => {
                // Xử lý kết quả trả về nếu đăng nhập thành công
                console.log(`mienpv :: ${JSON.stringify(response.data)}`);
                //console.log(response.data);
            })
            .catch((error) => {
                // Xử lý lỗi nếu có
                console.log(error);
            });

        // return axios.post(url, data);
    };

    onReadCode = (event) => {
        // this.onSuccess({value: event.nativeEvent.codeStringValue});
        this.onLogin('admin@gmail.com', '123456');
    };

    onReadCodeDebounce = debounce(this.onReadCode, 300, {leading: true, trailing: false});

    onAllowPermission = () => {
        openSettings().catch(() => console.log('Cannot open settings.'));
        EventTracker.logEvent('screen_scan_qr_code', {action: 'click_button_allow'});
    };

    toggleModule = () => {
        const {toggleModule} = this.state;
        this.setState({toggleModule: !toggleModule});
        EventTracker.logEvent('screen_scan_qr_code', {action: 'click_button_module', stage: String(!toggleModule)});
    };

    toggleTorch = () => {
        const {toggleModule, toggleTorch} = this.state;
        this.setState({toggleTorch: !toggleTorch}, async () => !toggleModule && await this.camera.current.onSetTorch());
        EventTracker.logEvent('screen_scan_qr_code', {action: 'click_button_torch', stage: String(!toggleTorch)});
    };

    toggleVision = () => {
        const {toggleVision} = this.state;
        this.setState({toggleVision: !toggleVision});
        EventTracker.logEvent('screen_scan_qr_code', {action: 'click_button_vision', stage: String(!toggleVision)});
    };

    renderFooter() {
        return null;
    }

    render() {
        const {theme} = this.context;
        const {toggleCamera, toggleModule, togglePermission, toggleTorch, toggleVision} = this.state;
        const backgroundColor = 'rgba(0, 0, 0, 0.75)';
        return (
            <CBView style={[appStyles.container, {backgroundColor: '#000000'}]} define={'none'}>
                <CBView style={[appStyles.content, {backgroundColor: '#000000'}]} define={'none'}>
                    {!togglePermission ? <CBView style={[appStyles.overlay, {backgroundColor: '#000000'}]} define={'none'}>
                        <CBText style={[appStyles.subtext, {color: '#FFFFFF', textAlign: 'center'}]} define={'none'}>{`${strings('text_allow_camera')}\n${strings('text_description_camera')}`}</CBText>
                        <CBButton containerStyle={{marginTop: 15}} buttonStyle={{borderColor: '#FFFFFF'}} titleStyle={{color: '#FFFFFF'}} type={'outline'} title={strings('action_allow_permission')} onPress={this.onAllowPermission}/>
                    </CBView> : null}
                    {toggleCamera ? <Fragment>
                        {!toggleModule ? <CameraScreen
                                ref={this.camera}
                                style={{flex: 1}}
                                scanBarcode={true}
                                showFrame={true}
                                hideControls={true}
                                offsetForScannerFrame={margin}
                                heightForScannerFrame={size}
                                colorForScannerFrame={theme.colors.primary}
                                frameColor={theme.colors.primary}
                                laserColor={'#FFFFFF'}
                                onReadCode={this.onReadCodeDebounce}
                            /> :
                            <RNCamera
                                ref={this.camera}
                                style={{flex: 1}}
                                captureAudio={false}
                                rectOfInterest={{
                                    x: scanAreaX,
                                    y: scanAreaY,
                                    width: scanAreaWidth,
                                    height: scanAreaHeight,
                                }}
                                cameraViewDimensions={{
                                    width: CAMERA_VIEW_WIDTH,
                                    height: CAMERA_VIEW_HEIGHT,
                                }}
                                flashMode={toggleTorch ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
                                onBarCodeRead={!toggleVision ? this.onBarCodeReadDebounce : null}
                                onGoogleVisionBarcodesDetected={toggleVision ? this.onGoogleVisionBarcodesDetectedDebounce : null}>
                                <CBView style={{flex: 1}} define={'none'}>
                                    <CBView style={{flex: 1, backgroundColor}} define={'none'}/>
                                    <CBView style={{flexDirection: 'row', justifyContent: 'space-between'}} define={'none'}>
                                        <CBView style={{width: margin, backgroundColor}} define={'none'}/>
                                        <CBView style={{width: size, height: size, borderWidth: 2, borderColor: theme.colors.primary}} define={'none'}/>
                                        <CBView style={{width: margin, backgroundColor}} define={'none'}/>
                                    </CBView>
                                    <CBView style={{flex: 1, backgroundColor}} define={'none'}/>
                                </CBView>
                            </RNCamera>}
                        <CBText style={[appStyles.subtext, {color: '#FFFFFF', alignSelf: 'center'}, {position: 'absolute', top: top - 20}]} define={'none'}>{strings('text_align_qr_code')}</CBText>
                        <CBTouchableOpacity style={[appStyles.action, {position: 'absolute', top: top + 10, left: left - 20}]} define={'none'} onPress={this.toggleTorch}>
                            <CBIcon type={'ionicon'} name={toggleTorch ? 'flash-off-outline' : 'flash-outline'} color={'#FFFFFF'} size={25}/>
                        </CBTouchableOpacity>
                        {/*{toggleModule ? <CBTouchableOpacity style={[appStyles.action, {position: 'absolute', top: top + 10, left: left + 5}]} define={'none'} onPress={this.toggleVision}>
                            <CBIcon type={'ionicon'} name={toggleVision ? 'eye-off-outline' : 'eye-outline'} color={'#FFFFFF'} size={25}/>
                        </CBTouchableOpacity> : null}*/}
                    </Fragment> : null}
                    <CBTouchableOpacity style={[appStyles.action, {position: 'absolute', top: anchor, left: 5}]} define={'none'} onPress={this.onExit}>
                        <CBIcon type={'ionicon'} name={'close-outline'} color={'#FFFFFF'} size={30}/>
                    </CBTouchableOpacity>
                    <CBTouchableOpacity style={[appStyles.action, {position: 'absolute', top: anchor, right: 5}]} define={'none'} onPress={this.toggleModule}>
                        <CBIcon type={'ionicon'} name={!toggleModule ? 'camera-outline' : 'aperture-outline'} color={'#FFFFFF'} size={25}/>
                    </CBTouchableOpacity>
                </CBView>
                {this.renderFooter()}
            </CBView>
        );
    }
}
