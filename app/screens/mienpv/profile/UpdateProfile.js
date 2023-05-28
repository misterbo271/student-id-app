import React from 'react';
import SplashScreen from "react-native-splash-screen";
import Tracking from "screens/Tracking";
import UpdateProfileContent from "screens/mienpv/profile/content/UpdateProfileContent";
import RootNavigation from "screens/RootNavigation";
import CBApi from "services/CBApi";
import ApiRequest from 'app/requests/ApiRequest';
import Toast from "react-native-simple-toast";
import "react-native-get-random-values";
import { MerkleTree } from 'merkletreejs'
import sha256 from 'crypto-js/sha256';

// Inject the missing features with the ethers shims
import "@ethersproject/shims";
//import "./libs/shims";
import {ethers, Signer, providers} from 'ethers';

import {observer} from "mobx-react";
import StudentStore from "stores/StudentStore";

@observer
export default class UpdateProfile extends Tracking {

    constructor(props) {
        super(props);
        SplashScreen.hide();
    }

    submit(param) {

        ApiRequest.updateStudent(param,  (data) => {
            StudentStore.fetchStudent();
            //RootNavigation.navigate('Pending');
        }, (error) => {
            Toast.show('Không xác nhận được tài khoản', Toast.SHORT);
            console.log('error -> ' + JSON.stringify(error));
        });
    }

    onUpdate = (values) => {
        const {studentInfo} = StudentStore;
        const signature = (
            {
                name: "Profile",
                version: "0.0.1",
                chainId: 0xaa36a7,
                verifyingContract: "0x46ECCE43b97eD208183E1619Ac90F7B72fFc2a2D"
            },
            {
                Update: [
                    { name: "tokenId", type: "uint256" },
                    { name: "merkleRoot", type: "bytes32" },
                ]
            },
            {
                Update: {
                    tokenId: studentInfo._id.toString(),
                    merkleRoot: ethers.utils.hexlify(studentInfo.root)
                }
            }
        )

        this.submit({
            id: Number(values.id),
            address: studentInfo.address,
            day_of_birth: values?.birthday,
            email: values?.email,
            phone_number: values?.phoneNumber,
            selfie_image: studentInfo?.selfie_image,
            id_front_image: studentInfo?.id_front_image,
            id_back_image: studentInfo?.id_back_image,
            root: studentInfo?.root,
            signature: signature?.Update?.merkleRoot
        });
    };

    render() {
        const {studentInfo} = StudentStore;
        return (
            <UpdateProfileContent defaultParam={this.defaultParam} onUpdate={this.onUpdate}/>
        );
    }
}

