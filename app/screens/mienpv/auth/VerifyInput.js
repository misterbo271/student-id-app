import React from 'react';
import SplashScreen from "react-native-splash-screen";
import Tracking from "screens/Tracking";
import VerifyInputContent from "screens/mienpv/auth/content/VerifyInputContent";
import RootNavigation from "screens/RootNavigation";
import CBApi from "services/CBApi";
import ApiRequest from 'app/requests/ApiRequest';
import Toast from "react-native-simple-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";
import { MerkleTree } from 'merkletreejs'
import sha256 from 'crypto-js/sha256';

// Inject the missing features with the ethers shims
import "@ethersproject/shims";
//import "./libs/shims";
import {ethers} from 'ethers';
// Import the ethers library
import JsonUtil from "utils/JsonUtil";
import {AppState} from "react-native";
import StudentStore from "stores/StudentStore";
import {observer} from "mobx-react";

@observer
export default class VerifyInput extends Tracking {

    constructor(props) {
        super(props);
        SplashScreen.hide();
        this.state = {
            address: '',
            studentId: null,
        }
    }


    componentDidMount() {
        super.componentDidMount();
        this.load();
    }

    load() {
        AsyncStorage.getItem('address')
            .then(data => {
                this.setState({
                    address: data
                })
            })
            .catch(e => {
                console.log(`mienpv :: ${JSON.stringify(e)}`);
            })
    }

    submit(param) {
        ApiRequest.setStudent(param,  (data) => {
            RootNavigation.navigate('Pending');
        }, (error) => {
            Toast.show('Không xác nhận được tài khoản', Toast.SHORT);
            console.log('error -> ' + JSON.stringify(error));
        });
    }

    onPending = (values) => {
        const {address} = this.state;
        const selfieImage = "https://file.com/selfie";
        const idBackImage = "https://file.com/idBackImage";
        const idFrontImage = "https://file.com/idFrontImage";
        const leave = [values.name, values.birthday, values.email, values.phoneNumber, selfieImage, idBackImage, idBackImage];
        const leaves = leave.map(x => sha256(x));
        const tree = new MerkleTree(leaves, sha256);
        const root = '0x' + tree.getRoot().toString('hex');
        StudentStore.setStudentId(Number(values.id));
        this.submit({
            id: Number(values.id),
            address: address,
            day_of_birth: values?.birthday,
            email: values?.email,
            phone_number: values?.phoneNumber,
            selfie_image: selfieImage,
            id_front_image: idFrontImage,
            id_back_image: idBackImage,
            root: root
        });
        // RootNavigation.navigate('Pending');
    };

    render() {
        return (
            <VerifyInputContent defaultParam={this.defaultParam} onPending={this.onPending}/>
        );
    }
}

