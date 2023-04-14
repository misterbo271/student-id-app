import React, {Fragment} from 'react';
import {CBAvatar, CBContainer, CBHeader, CBIcon, CBImage, CBRollView, CBText, CBTouchableOpacity, CBView} from 'components';
import {useTheme} from 'react-native-elements';
import {appStyles} from "configs/styles";
import colors from "configs/colors";
import {moderateScale} from "utils/ThemeUtil";
import ImageUtil from "utils/ImageUtil";
import dimens from "configs/dimens";
import QRCode from "react-native-qrcode-svg";

const studyInfo = require("../../../../assets/jsons/study.json");

const DashboardContent = ({onLogin}) => {

    const {theme} = useTheme();
    const renderTitle = () => {
        return (
            <CBView style={[appStyles.row, {flex: 1, marginLeft: 20, marginRight: 10}]} define={'none'}>
                <CBAvatar
                    rounded
                    size={50}
                    source={require('assets/images/avatar.png')}
                />
                <CBText style={[appStyles.text, {fontFamily: 'GoogleSans-Medium', marginTop: 15, marginLeft: 10, color: colors.primaryColor}]}>Hi, Mien PV</CBText>
            </CBView>
        );
    }

    const renderLeftButton = () => {
        return <CBView style={{height: 1}} define={'none'}/>;
    }

    const renderRightButton = () => {
        return (
            <Fragment>
                <CBTouchableOpacity style={[appStyles.action, {backgroundColor: colors.backgroundColor, borderRadius: 20, marginRight: 5}]} define={'none'}>
                    <CBIcon type={'ionicon'} name={'search-outline'} define={'icon'} size={24}/>
                </CBTouchableOpacity>
                <CBTouchableOpacity style={[appStyles.action, {backgroundColor: colors.backgroundColor, borderRadius: 20, marginRight: 25}]} define={'none'}>
                    <CBIcon type={'ionicon'} name={'calendar-outline'} define={'icon'} size={24}/>
                </CBTouchableOpacity>
            </Fragment>
        );
    }

    const renderCard = () => {
        return (
            <CBTouchableOpacity style={[appStyles.seat, appStyles.shadow, {borderColor: colors.primaryColor, borderWidth: 2, padding: 15, alignItems: 'flex-start', justifyContent: 'flex-start'}]}>
                <CBView style={appStyles.row}>
                    <CBView style={[appStyles.row, {flex: 1}]}>
                        <CBImage containerStyle={[appStyles.image, {width: moderateScale(30), height: moderateScale(30)}]} source={ImageUtil.getImage('hcmut_logo')} resizeMode={'contain'}/>
                        <CBView style={{marginLeft: 10}}>
                            <CBText style={[appStyles.text, {fontSize: dimens.atomText ,color: colors.hcmutColor}, {fontFamily: 'GoogleSans-Bold'}]}>TRƯỜNG ĐẠI HỌC BÁCH KHOA - ĐHQG TPHCM</CBText>
                            <CBText style={[appStyles.text, {fontSize: 7.5 ,color: colors.hcmutColor}, {fontFamily: 'GoogleSans-Regular'}]}>HO CHI MINH CITY UNIVERSITY OF TECHNOLOGY - VNU HCM</CBText>
                        </CBView>
                    </CBView>
                </CBView>
                <CBView style={[appStyles.row]}>
                    <CBView style={{ flex: 1}}>
                        <CBView style={[appStyles.row, {marginTop: 5}]}>
                            <CBView style={[appStyles.row, {flex: 1}]}>
                                <CBView style={{alignSelf: 'center', marginTop: 5}} define={'none'}>
                                    <QRCode value={'908091'} size={35}/>
                                </CBView>
                                <CBView style={{marginLeft: 15}}>
                                    <CBText style={[appStyles.text, {fontSize: dimens.largeText, color: colors.hcmutTextColor}, {fontFamily: 'GoogleSans-Bold'}]}>THẺ SINH VIÊN</CBText>
                                    <CBText style={[appStyles.text, {fontStyle: 'italic', fontSize: dimens.smallText, color: colors.hcmutTextColor}, {fontFamily: 'GoogleSans-Regular'}]}>STUDENT ID CARD</CBText>
                                </CBView>
                            </CBView>
                        </CBView>
                        <CBView style={{marginTop: 5}}>
                            <CBText style={[appStyles.text, {fontFamily: 'GoogleSans-Bold'}]}>NGUYỄN VĂN</CBText>
                            <CBText style={[appStyles.text, {fontFamily: 'GoogleSans-Bold'}]}>A</CBText>
                        </CBView>
                        <CBView style={{marginTop: 5}}>
                            <CBText style={[appStyles.subtext, {fontFamily: 'GoogleSans-Medium'}]}>Đại học - chính quy</CBText>
                            <CBText style={[appStyles.subtext, {fontSize: dimens.smallText, fontStyle: 'italic', fontFamily: 'GoogleSans-Regular'}]}>Undergraduate - Fulltime</CBText>
                        </CBView>
                        <CBView style={[appStyles.row]}>
                            <CBText style={[appStyles.subtext, {fontFamily: 'GoogleSans-Medium'}]}>MSSV</CBText>
                            <CBText style={[appStyles.text, {fontSize: dimens.largeText, marginLeft: 5, fontFamily: 'GoogleSans-Bold'}]}>2121221</CBText>
                        </CBView>
                        <CBView style={[appStyles.row]}>
                            <CBView style={{marginRight: 10}}>
                                <CBText style={[appStyles.subtext, {fontSize: dimens.tinyText, fontFamily: 'GoogleSans-Regular'}]}>Hiệu lực đến</CBText>
                                <CBText style={[appStyles.subtext, {fontSize: dimens.tinyText, fontStyle: 'italic', fontFamily: 'GoogleSans-Regular'}]}>Valid Until</CBText>
                            </CBView>
                            <CBText style={[appStyles.text, {fontSize: dimens.normalText, marginLeft: 5, fontFamily: 'GoogleSans-Bold'}]}>10 / 2026</CBText>
                        </CBView>
                    </CBView>
                    <CBView>
                        <CBImage containerStyle={[appStyles.image, {width: moderateScale(100), height: moderateScale(100)}]} source={ImageUtil.getImage('student')} resizeMode={'contain'}/>
                    </CBView>
                </CBView>

            </CBTouchableOpacity>
        )
    }

    const renderStudy = (item, index) => {
        return (
            <CBTouchableOpacity key={index} style={{borderColor: colors.accentDarkColor, marginLeft: index > 0 ? 15 : 0}} define={'none'}>
                <CBView style={[{borderColor: colors.accentDarkColor, padding: 5, borderRadius: 10, backgroundColor: colors.accentDarkColor}, {width: dimens.widthScreen / 2.5, height: dimens.heightScreen / 5, marginTop: 10}]} define={'none'}>
                    <CBView style={[appStyles.row]}>
                        <CBView style={{flex: 1}}>
                            <CBImage containerStyle={[appStyles.image, {borderRadius: 10, width: moderateScale(40), height: moderateScale(40), alignSelf: 'center'}]} source={ImageUtil.getImage(item?.avatar)} resizeMode={'contain'}/>
                        </CBView>
                        <CBView style={{marginLeft: 10, flex: 2}}>
                            <CBText style={[appStyles.title]}>{item?.type}</CBText>
                        </CBView>
                    </CBView>
                    <CBText style={[appStyles.subtext, {marginTop: 15}]}>{item?.content}</CBText>
                </CBView>
            </CBTouchableOpacity>
            )
    }

    return (
        <CBContainer>
            <CBHeader style={{backgroundColor: colors.backgroundColor, textAlign: 'left'}} title={renderTitle()} headerLeft={renderLeftButton()} headerRight={renderRightButton()}/>
            <CBView style={{padding: 15, marginTop: 30}}>
                {renderCard()}
            </CBView>
            <CBText style={[appStyles.title, {fontSize: dimens.xxLargeText, marginTop: 30, paddingHorizontal: 15, color: colors.primaryColor}]}>Thông tin sinh viên</CBText>
            <CBRollView
                contentContainerStyle={{paddingHorizontal: 15, paddingVertical: 15}}
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {studyInfo.map(renderStudy)}
            </CBRollView>
        </CBContainer>
    );
};

export default DashboardContent;
