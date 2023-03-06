import React from 'react';
import {StyleSheet} from 'react-native';
import {moderateScale} from 'utils/ThemeUtil';
import colors from 'configs/colors';
import dimens from 'configs/dimens';

export const appStyles = StyleSheet.create({
    status: {
        width: '100%',
        height: dimens.appBar,
        backgroundColor: colors.statusBarColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999
    },
    shadow: {
        borderRadius: 8,
        shadowColor: colors.shadowColor,
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 0.1,
        elevation: 3
    },
    wrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: colors.contentColor
    },
    content: {
        flex: 1,
        backgroundColor: colors.contentColor
    },
    body: {
        flex: 1,
        padding: 15
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15
    },
    image: {
        width: moderateScale(240),
        height: moderateScale(240),
        resizeMode: 'contain'
    },
    symbol: {
        width: moderateScale(45),
        height: moderateScale(45),
        resizeMode: 'contain'
    },
    action: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    h1: {
        fontSize: dimens.largeText,
        color: colors.primaryTextColor,
        fontFamily: 'GoogleSans-Bold',
        textAlign: 'center'
    },
    h2: {
        fontSize: dimens.normalText,
        color: colors.primaryTextColor,
        fontFamily: 'GoogleSans-Regular',
        textAlign: 'center'
    },
    label: {
        fontSize: dimens.mediumText,
        color: colors.primaryColor,
        fontFamily: 'GoogleSans-Medium'
    },
    title: {
        fontSize: dimens.largeText,
        color: colors.primaryTextColor,
        fontFamily: 'GoogleSans-Medium'
    },
    heading: {
        fontSize: dimens.normalText,
        color: colors.primaryTextColor,
        fontFamily: 'GoogleSans-Regular'
    },
    text: {
        fontSize: dimens.mediumText,
        color: colors.primaryTextColor,
        fontFamily: 'GoogleSans-Regular'
    },
    subtext: {
        fontSize: dimens.normalText,
        color: colors.secondaryTextColor,
        fontFamily: 'GoogleSans-Regular'
    },
    blockquote: {
        fontSize: dimens.smallText,
        color: colors.secondaryTextColor,
        fontFamily: 'GoogleSans-Regular'
    },
    letter: {
        fontSize: dimens.atomText,
        color: colors.secondaryTextColor,
        fontFamily: 'GoogleSans-Regular'
    },
    error: {
        fontSize: dimens.normalText,
        color: colors.errorTextColor,
        fontFamily: 'GoogleSans-Regular'
    },
    popup: {
        backgroundColor: colors.contentColor,
        padding: 15,
        borderRadius: 8
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0
    },
    sheet: {
        width: dimens.widthScreen,
        paddingBottom: dimens.bottomSpace,
        backgroundColor: colors.contentColor,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    cover: {
        width: '100%',
        height: (0.9 * dimens.widthScreen) / 2
    },
    negative: {
        fontSize: dimens.mediumText,
        color: colors.primaryTextColor,
        fontFamily: 'GoogleSans-Regular',
        padding: 2
    },
    positive: {
        fontSize: dimens.mediumText,
        color: colors.primaryColor,
        fontFamily: 'GoogleSans-Regular',
        padding: 2
    },
    column: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    wrap: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.contentColor,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderColor: colors.lineColor,
        borderTopWidth: 1
    },
    dropdown: {
        padding: 5,
        backgroundColor: colors.backgroundColor,
        borderWidth: 0
    },
    chip: {
        height: 35,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.backgroundColor,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 20
    },
    tag: {
        backgroundColor: colors.backgroundColor,
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 24,
        marginTop: 10,
        marginRight: 10
    },
    mark: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 4
    },
    active: {
        backgroundColor: colors.activeTagColor
    },
    highlight: {
        color: colors.primaryColor,
        fontFamily: 'GoogleSans-Bold'
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15
    },
    pack: {
        padding: 0,
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    separator: {
        height: 1,
        backgroundColor: colors.lineColor
    },
    space: {
        height: 10,
        backgroundColor: colors.hideColor
    },
    divider: {
        borderBottomWidth: 1,
        borderColor: colors.lineColor
    },
    stroke: {
        width: 1,
        backgroundColor: colors.lineColor
    },
    sphere: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25
    },
    round: {
        height: 32,
        width: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16
    },
    wave: {
        position: 'absolute',
        alignSelf: 'center',
        width: '100%',
        height: 41,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.lineColor
    },
    tab: {
        backgroundColor: colors.contentColor,
        borderTopWidth: 10,
        borderBottomWidth: 10,
        borderColor: colors.hideColor,
        shadowOpacity: 0,
        elevation: 0
    },
    toast: {
        position: 'absolute',
        bottom: 15,
        alignSelf: 'center',
        backgroundColor: colors.primaryTextColor,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20
    },
    bottom: {
        borderWidth: 1,
        borderColor: colors.lineColor,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
    },
    search: {
        backgroundColor: colors.backgroundColor,
        borderRadius: 20,
        borderWidth: 0
    },
    box: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: colors.lineColor
    },
    case: {
        borderWidth: 1,
        borderRadius: 4
    },
    lonely: {
        height: 40
    },
    many: {
        minHeight: 30,
        maxHeight: 120
    },
    input: {
        flex: 1,
        paddingVertical: 0,
        paddingHorizontal: 0,
        fontSize: dimens.mediumText,
        color: colors.primaryTextColor,
        fontFamily: 'GoogleSans-Regular'
    },
    single: {
        height: 40
    },
    multiple: {
        minHeight: 30,
        maxHeight: 120,
        marginVertical: 5,
        textAlignVertical: 'top'
    },
    code: {
        width: 50,
        height: 50,
        paddingVertical: 0,
        paddingHorizontal: 15,
        fontSize: dimens.mediumText,
        color: colors.primaryTextColor,
        fontFamily: 'GoogleSans-Regular',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: colors.lineColor,
        borderRadius: 10
    },
    seat: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        borderRadius: 4,
        borderColor: colors.primaryTextColor
    },
    triangle: {
        position: 'absolute',
        top: -1,
        right: -1,
        width: 0,
        height: 0,
        borderBottomWidth: 13,
        borderRightWidth: 13,
        borderBottomColor: 'transparent',
        borderRightColor: colors.primaryTextColor
    },
    outline: {
        backgroundColor: colors.contentColor,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.lineColor
    },
    metric: {
        padding: 10,
        borderRadius: 4,
        justifyContent: 'space-between'
    },
    amount: {
        fontSize: dimens.megaLargeText,
        color: colors.metricTextColor,
        fontFamily: 'GoogleSans-Bold'
    },
    extend: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
