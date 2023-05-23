import React from 'react';
import {CBIcon, CBText, CBTouchableOpacity, CBView} from 'components/index';
import {appStyles} from 'configs/styles';
import {strings} from 'controls/i18n';
import dimens from 'configs/dimens';
import { io } from 'socket.io-client';

import ScanQRCode from 'screens/ScanQRCode';
import Base from "screens/Base";
import {RNCamera} from "react-native-camera";
import ScanIdentityContent from "screens/mienpv/identity/content/ScanIdentityContent";
import CBGlobal from "globals/CBGlobal";

const socket = io('http://172.20.10.3:3060/');

export default class ScanIdentity extends ScanQRCode {

    constructor(props) {
        super(props);
        this.camera = React.createRef();
        this.state = {
            scannedId: null,

        };
    }


    // call(param) {
    //     const api = new CBBms();
    //     api.putTicket(param, false, false).then(({status, data}) => {
    //         if (status === CBConstant.STATUS_OK) {
    //             Toast.show(strings('toast_boarding_ticket'), Toast.SHORT);
    //         }
    //     }).catch((error) => {
    //         console.log('error -> ' + JSON.stringify(error));
    //     });
    // }
    //
    // submit(param) {
    //     const api = new CBBms();
    //     api.getTicket(param, false, false).then(({status, data}) => {
    //         if (status === CBConstant.STATUS_OK) {
    //             const {routes} = SessionStore;
    //             const routeIds = routes?.map(i => i?.id) || [];
    //             const results = CBConverter.convertTicket(data?.data?.tickets) || [];
    //             const array = results.filter(i => {
    //                 const {agentId} = CBGlobal.userInfo;
    //                 const paymentAgentId = getId(i?.paymentInfo);
    //                 const isDiffAgent = !paymentAgentId || (paymentAgentId && paymentAgentId !== agentId);
    //                 const disabled = (CBControl.isGranted('11065') && i?.pickUpUser !== CBGlobal.userUsername) || (!CBControl.isGranted('5051') && i?.agentId !== agentId && isDiffAgent);
    //                 return routeIds.includes(i?.routeId) && !disabled;
    //             });
    //             if (array && Array.isArray(array) && array.length > 0) {
    //                 const isCanceled = array.some(i => i?.status === 3);
    //                 if (!isCanceled) {
    //                     const isMultiple = array.some(i => `${i?.routeId}|${i?.tripTime}|${DateUtil.convertServer(i?.tripDate)}` !== `${array[0]?.routeId}|${array[0]?.tripTime}|${DateUtil.convertServer(array[0]?.tripDate)}`);
    //                     if (isMultiple) {
    //                         this.alert(
    //                             strings('title_alert_other_ticket'),
    //                             strings('message_alert_other_ticket'),
    //                             [
    //                                 {text: strings('button_skip')},
    //                                 {
    //                                     text: strings('button_search'), onPress: () => {
    //                                         CBCache.keyword = param.booking_code || param.code;
    //                                         CBControl.navigateWith(CBServiceCode.APP_CONFIG_SEARCH);
    //                                     }
    //                                 }
    //                             ],
    //                             {onDismiss: this.onStopProcessing}
    //                         );
    //                         return;
    //                     }
    //                     const list = array.filter(i => i?.boardingStatus === 0) || [];
    //                     const ticket = list[0];
    //                     const infos = `${ticket?.pickUpTime || ticket?.tripTime}|${ticket?.tripName}|${DateUtil.convertLocal(ticket?.tripDate)}`;
    //                     const names = list.map(i => getName(i?.customerInfo)).join(', ');
    //                     const lengths = list.length;
    //                     const seatCodes = list.map(i => i?.seatInfo?.split('|')[0]).join(', ');
    //                     if (lengths > 0) {
    //                         this.alert(strings('action_boarding'), '',
    //                             [
    //                                 {text: strings('button_skip')},
    //                                 {
    //                                     text: strings('button_boarding'), onPress: () => this.call({
    //                                         tickets: list.map(i => {
    //                                             return {
    //                                                 id: i?.id,
    //                                                 row_version: i?.rowVersion,
    //                                                 boarding_status: 1
    //                                             };
    //                                         })
    //                                     })
    //                                 }
    //                             ],
    //                             {cancelable: false, onDismiss: this.onStopProcessing, children: <CBText style={[appStyles.text, {textAlign: 'center', marginTop: 24}]} define={'subtext'}>{`${strings('text_marked_boarding')}\n${infos}\n${names} - ${lengths} ${strings('text_ticket').toLowerCase()}: ${seatCodes}`}</CBText>}
    //                         );
    //                     } else {
    //                         this.onStopProcessing();
    //                         Toast.show(strings('error_valid_boarding_ticket'), Toast.SHORT);
    //                     }
    //                 } else {
    //                     this.alert(
    //                         strings('title_alert_canceled_ticket'),
    //                         strings('message_alert_canceled_ticket'),
    //                         [],
    //                         {onDismiss: this.onStopProcessing}
    //                     );
    //                 }
    //             } else {
    //                 this.alert(
    //                     strings('title_alert_query_ticket'),
    //                     strings('message_alert_query_ticket'),
    //                     [],
    //                     {onDismiss: this.onStopProcessing}
    //                 );
    //             }
    //         }
    //     }).catch((error) => {
    //         const {response: {status, data}, message} = error;
    //         if (status === 400 || message?.indexOf('400') > -1) {
    //             this.alert(
    //                 strings('title_alert_query_ticket'),
    //                 strings('message_alert_query_ticket'),
    //                 [],
    //                 {onDismiss: this.onStopProcessing}
    //             );
    //         } else {
    //             this.alert(
    //                 strings('title_alert_request'),
    //                 data?.error?.message || strings('message_alert_request'),
    //                 [],
    //                 {onDismiss: this.onStopProcessing}
    //             );
    //         }
    //     }).finally(() => {
    //         clearTimeout(this.trigger);
    //     });
    // }
    //
    // onSuccess(data) {
    //     const {index} = this.state;
    //     if (index === 0) {
    //         super.onSuccess(data);
    //     } else if (index === 1) {
    //         if (!this.isProcessing) {
    //             this.isProcessing = true;
    //             this.trigger = setTimeout(this.onStopProcessing, 2500);
    //             const {companyId} = CBGlobal.userInfo;
    //             const code = getCode(data.value);
    //             this.submit({
    //                 company_id: companyId,
    //                 ...code.length > 6 ? {
    //                     booking_code: code
    //                 } : {
    //                     code: code
    //                 }
    //             });
    //         }
    //     }
    // }

    onStopProcessing = () => this.isProcessing = false;

    onFinding = () => this.setState({index: 0});

    onBoarding = () => this.setState({index: 1});


    handleBarcodeScan = ({ data }) => {
        const {_id, address, name} = CBGlobal.userInfo;
        socket.emit('joinRoom', 'StudentID');
        socket.emit('dataEvent',  _id );
    };


    // render() {
    //     const {scannedId} = this.state;
    //     return (
    //         <ScanIdentityContent defaultParam={this.defaultParam} onScanQRCode={this.handleBarcodeScan}/>
    //     );
    // }

    renderFooter() {
        const {theme} = this.context;
        const {index} = this.state;
        return (
            <CBView style={[appStyles.footer, {paddingBottom: dimens.bottomSpace}]} define={'footer'}>
                <CBTouchableOpacity style={[appStyles.center, {height: 'auto'}]} define={'none'}>
                    <CBIcon containerStyle={{marginBottom: 5}} type={'font-awesome'} name={'ticket'} color={index === 0 ? theme.colors.primary : '#999999'} size={20}/>
                    <CBText style={[appStyles.blockquote, {color: index === 0 ? theme.colors.primary : '#999999', fontFamily: 'GoogleSans-Light'}]} define={'none'}>{'Quét mã'}</CBText>
                </CBTouchableOpacity>
            </CBView>
        );
    }
}
