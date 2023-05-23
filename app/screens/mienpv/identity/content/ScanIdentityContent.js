import React, {Fragment, useEffect, useRef, useState} from 'react';
import { Linking } from 'react-native';
import {CBAvatar, CBButton, CBContainer, CBHeader, CBIcon, CBText, CBTouchableOpacity, CBView} from 'components';
import {useTheme} from 'react-native-elements';
import CBGlobal from "globals/CBGlobal";
import {RNCamera} from "react-native-camera";
import io from 'socket.io-client';
import socketIOClient from "socket.io-client";
const ScanIdentityContent = ({defaultParam, onScanQRCode}) => {

    const socket = io('http://localhost:3060');
    const username = 'mienpv';
    const {theme} = useTheme();
    const {_id, address, name} = CBGlobal.userInfo;
    const [scannedId, setScannedId] = useState(null);


    const handleBarcodeScan = ({ data }) => {
        setScannedId(data); // Store the scanned ID in the state
        socket.emit('transmitId', data); // Emit the scanned ID to the server
    };


    return (
        <CBView style={{ flex: 1 }}>
            <RNCamera
                style={{ flex: 1 }}
                onBarCodeRead={handleBarcodeScan}
                captureAudio={false}
            />
            <CBText>Scanned ID: {scannedId}</CBText>
        </CBView>
    );
};

export default ScanIdentityContent;
