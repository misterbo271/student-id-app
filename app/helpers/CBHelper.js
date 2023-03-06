import {DeviceEventEmitter} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ability from 'abilities/Ability';
import EventTracker from 'controls/EventTracker';
import CBDatabase from 'databases/CBDatabase';
import CBGlobal from 'globals/CBGlobal';
import AppStore from 'stores/AppStore';

export default class CBHelper {

    static retargetApplication(event = true) {
        if (event) DeviceEventEmitter.emit('RETARGET_APPLICATION');
    }

    static resetApplication() {
        setTimeout(async () => {
            EventTracker.removeUserId();

            const db = new CBDatabase();
            db.clear();

            const keys = await AsyncStorage.getAllKeys();
            await AsyncStorage.multiRemove(keys.filter(i => i !== '@app_introduction' && i !== '@user_username'));

            CBGlobal.userToken = '';
            CBGlobal.userRefresh = '';
            CBGlobal.userExpired = '0';

            Ability.update([]);

            this.retargetApplication(false);

            AppStore.setMode('Auth');
        }, 100);
    }

    static refreshApplication(callback) {
        callback && callback();
    }

    static reactionApplication() {

    }
}
