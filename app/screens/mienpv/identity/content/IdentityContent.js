import React, {Fragment} from 'react';
import { Linking } from 'react-native';
import {CBAvatar, CBButton, CBContainer, CBHeader, CBIcon, CBText, CBTouchableOpacity, CBView} from 'components';
import {useTheme} from 'react-native-elements';
import {appStyles} from "configs/styles";
import colors from "configs/colors";
import dimens from "configs/dimens";
import QRCode from "react-native-qrcode-svg";
import CBGlobal from "globals/CBGlobal";

const IdentityContent = ({defaultParam, onScanQRCode}) => {

    const {theme} = useTheme();
    const {_id, address, name} = CBGlobal.userInfo;
    const renderTitle = () => {
        return (
            <CBView style={[appStyles.row, {flex: 1, marginLeft: 20, marginRight: 10}]} define={'none'}>
                <CBText style={[appStyles.text, {fontFamily: 'GoogleSans-Medium', marginTop: 15, marginLeft: 10, color: colors.primaryColor}]}>{`Xin chào, ${name}`}</CBText>
            </CBView>
        );
    }

    const renderLeftButton = () => {
        return <CBView style={{height: 1}} define={'none'}/>;
    }

    const renderRightButton = () => {
        return (
            <Fragment>
                <CBTouchableOpacity style={[appStyles.action, {backgroundColor: colors.backgroundColor, borderRadius: 20, marginRight: 5}]} define={'none'} onPress={onScanQRCode}>
                    <CBIcon type={'ionicon'} name={'qr-code-outline'} define={'icon'} size={24}/>
                </CBTouchableOpacity>
                <CBTouchableOpacity style={[appStyles.action, {backgroundColor: colors.backgroundColor, borderRadius: 20, marginRight: 25}]} define={'none'}>
                    <CBIcon type={'ionicon'} name={'reorder-three-outline'} define={'icon'} size={24}/>
                </CBTouchableOpacity>
            </Fragment>
        );
    }

    return (
        <CBContainer>
            <CBHeader style={{backgroundColor: colors.backgroundColor, textAlign: 'left'}} title={renderTitle()} headerLeft={renderLeftButton()} headerRight={renderRightButton()}/>
            <CBView style={[appStyles.item, {marginTop: 55, padding: 25}]} define={'none'}>
                <CBView style={[appStyles.mark, {borderRadius: 10, width: dimens.widthScreen - 55, backgroundColor: colors.ocean}]} define={'none'}>
                    <CBView style={[appStyles.row, {flex: 1, justifyContent: 'center'}]} define={'none'}>
                        <CBAvatar
                            rounded
                            size={80}
                            source={require('assets/images/avatar.png')}
                        />
                    </CBView>
                    <CBView style={{marginTop: 50}}>
                        <CBText style={[appStyles.text, {fontFamily: 'GoogleSans-Medium', alignSelf: 'center'}]}>{name}</CBText>
                    </CBView>
                    <CBView style={{alignSelf: 'center', padding: 15, marginTop: 40}} define={'none'}>
                        <QRCode
                            value={'http://localhost:3000/portal/account'}
                            size={200}/>
                    </CBView>
                    <CBView style={{padding: 40}}>
                        <CBButton buttonStyle={[appStyles.circle, {backgroundColor: colors.primaryColor, borderRadius: 20, marginTop: 15}]} title={'Mã QR của bạn ở đây'} onPress={() => Linking.openURL('http://localhost:3000/portal/account')}/>
                    </CBView>
                </CBView>
            </CBView>

        </CBContainer>
    );
};

export default IdentityContent;
