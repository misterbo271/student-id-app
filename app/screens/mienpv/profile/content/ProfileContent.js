import React, {useEffect, useRef, useState} from 'react';
import {DeviceEventEmitter} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CBAction, CBActionSheet, CBAvatar, CBIcon, CBImage, CBRefreshControl, CBScrollView, CBText, CBTouchableOpacity, CBView} from 'components';
import JsonUtil from 'utils/JsonUtil';
import {useTheme} from 'react-native-elements';
import {appStyles} from 'configs/styles';
import {strings} from 'controls/i18n';
import dimens from 'configs/dimens';
import {observer} from 'mobx-react';
import CBGlobal from "globals/CBGlobal";

const BodyBlock = observer(({style, contentStyle, code, type, name, color, size, onPress}) => {

    const {theme} = useTheme();

    return (
        <CBTouchableOpacity style={[appStyles.item, {borderRadius: 15, backgroundColor: theme.colors.hide}, contentStyle, style]} define={'none'}>
            <CBIcon type={type} name={name} color={color} size={size}/>
            <CBText style={[appStyles.text, {flex: 1, marginHorizontal: 15}]} define={'text'}>{code}</CBText>
            <CBIcon define={'icon'} type={'ionicon'} name={'chevron-forward-outline'} size={20}/>
        </CBTouchableOpacity>
    );
});


const ProfileContent = ({defaultParam, onPress, onLogout, onPressUrl, onEditProfile}) => {

    const {theme} = useTheme();
    const cbActionSheetRef = useRef(null);
    const [info, setInfo] = useState(null);
    const {_id, address, name, phone_number, status, email, day_of_birth, id_back_image, id_front_image, selfie_image} = CBGlobal.userInfo;

    useEffect(() => {
        loadApplicationOrProfileEvent();
        const applicationSubscription = DeviceEventEmitter.addListener('RETARGET_APPLICATION', loadApplicationOrProfileEvent);
        const profileSubscription = DeviceEventEmitter.addListener('SYNC_PROFILE', loadApplicationOrProfileEvent);
        return () => {
            applicationSubscription.remove();
            profileSubscription.remove();
        };
    }, []);

    const loadApplicationOrProfileEvent = () => {
        AsyncStorage.getItem('@user_info').then(value => {
            const userInfo = JsonUtil.parseJsonString(value);
            setInfo(userInfo);
        });
    };

    return (
        <CBView style={{flex: 1, backgroundColor: theme.colors.primary}} define={'none'}>
            <CBView style={[appStyles.row, {paddingVertical: 15, paddingHorizontal: 30, marginTop: dimens.statusBar}]} define={'none'}>
                <CBTouchableOpacity style={{flex: 1, marginRight: 15}} define={'none'} onPress={onEditProfile}>
                    <CBView style={appStyles.row} define={'none'}>
                        <CBText style={[appStyles.title, {color: '#FFFFFF'}]} allowFontScaling={false} define={'none'}>{name}</CBText>
                        {status === 'verified' ? <CBIcon containerStyle={{marginLeft: 5}} type={'material'} name={'verified'} color={'#FFFFFF'} size={20}/> : null}
                    </CBView>
                    <CBView style={appStyles.row}>
                        <CBText style={[appStyles.text, {marginRight: 5, color: '#FFFFFF'}]} allowFontScaling={false} define={'none'}>{_id}</CBText>
                        <CBIcon containerStyle={{marginLeft: 5}} type={'ionicon'} name={'create-outline'} color={'#FFFFFF'} size={20}/>
                    </CBView>
                </CBTouchableOpacity>
                <CBAvatar
                    containerStyle={{borderRadius: 15}}
                    overlayContainerStyle={{backgroundColor: theme.colors.hide, borderRadius: 15}}
                    icon={{type: 'ion-icons', name: 'person', color: 'white'}}
                    size={'large'}
                    source={require('assets/images/avatar.png')}/>
            </CBView>
            <CBScrollView
                style={[appStyles.content, {borderTopLeftRadius: 30, borderTopRightRadius: 30}]}
                contentContainerStyle={{padding: 30}}
                showsVerticalScrollIndicator={false}
                refreshControl={<CBRefreshControl/>}
                define={'content'}>
                <CBView style={[{marginBottom: 15}, {borderRadius: 15, backgroundColor: theme.colors.hide}]} define={'none'}>
                    <CBTouchableOpacity style={[appStyles.item, {borderRadius: 15}, appStyles.divider, {borderTopWidth: 1}]} define={'divider'} onPress={onLogout}>
                        <CBIcon type={'ionicon'} name={'call-outline'} color={theme.colors.primary} size={25}/>
                        <CBText style={[appStyles.text, {flex: 1, marginLeft: 15, marginRight: 15}]} define={'text'}>{phone_number}</CBText>
                    </CBTouchableOpacity>
                    <CBTouchableOpacity style={[appStyles.item, {borderRadius: 15}]} define={'none'} onPress={onPress({refId: 'Setting'})}>
                        <CBIcon type={'material-community'} name={'email-outline'} color={theme.colors.primary} size={25}/>
                        <CBText style={[appStyles.text, {flex: 1, marginLeft: 15, marginRight: 15}]} define={'text'}>{email}</CBText>
                    </CBTouchableOpacity>
                </CBView>
                {/*<BodyBlock style={{marginBottom: 15}} code={'Học phí'} type={'ionicon'} name={'information-circle-outline'} color={theme.colors.primary} size={25} onPress={onPress}/>*/}
                {/*<BodyBlock style={{marginBottom: 15}} code={'E-learning'} type={'ionicon'} name={'analytics-outline'} color={theme.colors.primary} size={25} onPress={onPress}/>*/}
                {/*<BodyBlock style={{marginBottom: 15}} code={'Thời khoá biểu'} type={'ionicon'} name={'business-outline'} color={theme.colors.primary} size={25} onPress={onPress}/>*/}
                {/*<BodyBlock style={{marginBottom: 15}} code={'Lịch thi'} type={'ionicon'} name={'book-outline'} color={theme.colors.primary} size={25} onPress={onPress}/>*/}
                {/*<BodyBlock style={{marginBottom: 15}} code={'Bảng điểm'} type={'ionicon'} name={'bus-outline'} color={theme.colors.primary} size={25} onPress={onPress}/>*/}
                {/*<BodyBlock style={{marginBottom: 15}} code={'Đăng ký môn học'} type={'ionicon'} name={'bus-outline'} color={theme.colors.primary} size={25} onPress={onPress}/>*/}
                <CBView style={[{marginBottom: 15}, {borderRadius: 15, backgroundColor: theme.colors.hide}]} define={'none'}>
                    <CBTouchableOpacity style={[appStyles.item, {borderRadius: 15}]} define={'none'} onPress={onPress({refId: 'Setting'})}>
                        <CBIcon type={'ionicon'} name={'settings-outline'} color={theme.colors.primary} size={25}/>
                        <CBText style={[appStyles.text, {flex: 1, marginLeft: 15, marginRight: 15}]} define={'text'}>{strings('action_setting')}</CBText>
                        <CBIcon define={'icon'} type={'ionicon'} name={'chevron-forward-outline'} size={20}/>
                    </CBTouchableOpacity>
                    <CBTouchableOpacity style={[appStyles.item, {borderRadius: 15}, appStyles.divider, {borderTopWidth: 1}]} define={'divider'} onPress={onLogout}>
                        <CBIcon type={'ionicon'} name={'log-out-outline'} color={theme.colors.primary} size={25}/>
                        <CBText style={[appStyles.text, {flex: 1, marginLeft: 15, marginRight: 15}]} define={'text'}>{strings('action_logout')}</CBText>
                    </CBTouchableOpacity>
                </CBView>
                <CBView style={{height: 120}} define={'none'}/>
            </CBScrollView>
            <CBActionSheet ref={cbActionSheetRef}/>
        </CBView>
    );
};

export default ProfileContent;
