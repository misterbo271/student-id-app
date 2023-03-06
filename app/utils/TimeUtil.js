import moment from 'moment';

export default class TimeUtil {

    static getTimezone() {
        return moment().utcOffset() / 60;
    }

    static getCurrentMillisecond() {
        const now = moment().format('HH:mm');
        return moment(now, 'HH:mm').valueOf();
    }

    static getCurrentUnix() {
        const now = moment().format('HH:mm');
        return moment(now, 'HH:mm').unix();
    }

    static getCurrent() {
        return moment().format('HH:mm');
    }

    static convert(time, format) {
        return moment(time, format).format('HH:mm');
    }

    static convertLocal(date) {

    }

    static day(time, format = 'HH:mm') {
        return moment(time, format).day();
    }

    static unix(time, format = 'HH:mm') {
        return moment(time, format).unix();
    }

    static millisecond(time, format = 'HH:mm') {
        return moment(time, format).valueOf();
    }

    static add(date, amount, unit) {
        return moment(date, 'HH:mm').add(amount, unit).format('HH:mm');
    }

    static subtract(date, amount, unit) {
        return moment(date, 'HH:mm').subtract(amount, unit).format('HH:mm');
    }

    static compare(begin, from, to, end) {

    }

    static array(begin, end) {

    }

    static diff(begin, end, unit = 'minutes') {
        const b = moment(begin, 'HH:mm');
        const e = moment(end, 'HH:mm');
        return b.diff(e, unit);
    }

    static startOf(time, unit) {
        return moment(time, 'HH:mm').startOf(unit).format('HH:mm');
    }

    static endOf(time, unit) {
        return moment(time, 'HH:mm').endOf(unit).format('HH:mm');
    }

    static getHalfStringFromMillisecond(millisecond) {
        if (!millisecond) return '';
        return moment(millisecond).format('HH:mm');
    }

    static getQuarterStringFromMillisecond(millisecond) {
        if (!millisecond) return '';
        return moment(millisecond).format('HH');
    }

    static getHalfString(time) {
        if (!time) return '';
        return moment(time, 'HH:mm').format('HH:mm');
    }

    static getQuarterString(time) {
        if (!time) return '';
        return moment(time, 'HH:mm').format('HH');
    }
}
