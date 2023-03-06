import DialogAlertHolder from '../../DialogAlertHolder';
import RootNavigation from 'screens/RootNavigation';
import CBCache from 'caches/CBCache';
import CBNotificationId from 'constants/CBNotificationId';
import CBControl from 'controls/CBControl';
import CBGlobal from 'globals/CBGlobal';
import CBSync from 'services/CBSync';
import JsonUtil from 'utils/JsonUtil';

export default class CBNotificationHandler {

    static onReceived(action, notification) {
        if (notification) {
            if (CBGlobal.appInitialize) {
                const notificationId = notification?.notificationId;
                const title = notification?.payload?.title || notification?.title;
                const body = notification?.payload?.body || notification?.body;
                const categoryId = Number(notification?.payload?.additionalData?.categoryId || notification?.additionalData?.categoryId);
                if (CBCache.notificationId !== notificationId && categoryId === CBNotificationId.POPUP_NOTIFICATION) {
                    CBCache.notificationId = notificationId;
                    const data = notification?.payload?.additionalData || notification?.additionalData;
                    const heading = data?.heading;
                    const content = data?.content;
                    const buttons = JsonUtil.parseJsonString(data?.buttons);
                    const options = JsonUtil.parseJsonString(data?.options);
                    DialogAlertHolder.alert(heading || title, content || body, buttons || [], options || {});
                } else {
                    CBSync.syncNotification();
                    CBSync.syncUnreadNotification();
                    CBSync.syncOSNotification();
                }
            }
        }
    }

    static onClick(action, data) {
        if (data) {
            if (!CBGlobal.appInitialize || !RootNavigation.isAvailable()) {
                CBGlobal.appNotification = data;
            } else {
                if (data?.refId) {
                    CBControl.navigateWith(data?.refId, data?.defaultParam, data?.injection);
                } else {
                    const categoryId = Number(data?.categoryId);
                    switch (categoryId) {
                        case CBNotificationId.INFORMATION:
                            break;
                        case CBNotificationId.NEW_VERSION:
                            break;
                        default:
                            break;
                    }
                }
            }
        }
    }
}
