import { AppConfig } from './app.config';
import { md5 } from './../modules/blueimp/md5';
import { NavController, AlertController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppNet } from './app.net';

declare let cordova: any;
declare let AppVersion: any;

export class AppUtil {
    public static MAX_INT = 2147483647;
    public static isEmptyObject(a) {
        for (var _ in a) {
            return false
        }
        return true
    }

    public static isEmpty(a) {
        if (typeof (a) == 'undefined') {
            return true;
        } else if (typeof (a) == 'object') {
            return this.isEmptyObject(a);
        }
        return !a;
    }

    public static alert(alertCtrl, message, fn?) {
        let alert = alertCtrl.create({
            title: '提示',
            message: message,
            buttons: ['确定']
        });
        if (fn && typeof (fn) == 'function') {
            alert.onDidDismiss(fn);
        }
        alert.present();
    }

    public static confirm(alertCtrl: AlertController, message, fn?) {
        let alert = alertCtrl.create({
            title: '确认提示',
            message: message,
            buttons: [{
                text: '取消',
                role: 'cancel',
            },
            {
                text: '确定',
                handler: fn
            }]
        });
        alert.present();
    }

    public static toast(toastCtrl, message, fn?) {
        let toast = toastCtrl.create({
            message: message,
            position: 'bottom',
            cssClass: "toast-cus",
            duration: 2000,
        });
        if (fn && typeof (fn) == 'function') {
            toast.onDidDismiss(fn);
        }
        toast.present();
    }

    public static str(...args) {
        var strs = [];
        for (var i in args) {
            strs.push(JSON.stringify(args[i]));
        }
        return strs.join("\n");
    }

    /****** 对象转数组 *******/
    public static objectToArray(obj) {
        var result = [];
        if (this.isEmpty(obj) || typeof (obj) != 'object') {
            return result;
        }

        var j = 0;
        for (var i in obj) {
            result[j] = obj[i];
            j++
        }
        return result;
    }

    public static sleep(ms: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => resolve(), ms);
        });
    }

    public static getImagePath(path, basePath?, type?, defPath?, ignore?) {
        if (!path || path.length == 0) {
            if (defPath) {
                return defPath;
            }
            return "assets/imgs/default_image.png";
        }
        if (path.indexOf("http://") == 0
            || path.indexOf("https://") == 0
            || path.indexOf("assets") == 0
            || path.indexOf("data:image") == 0) {
            return path;
        }
        if (path.indexOf("//") == 0) {
            return 'http:' + path;
        }
        if (path.indexOf("://") == 0) {
            return 'http' + path;
        }
        if (path.indexOf("/") == 0) {
            return AppConfig.getBaseUrl(ignore) + path;
        }
        if (basePath && type) {
            return AppConfig.getBaseUrl(ignore) + basePath + '?size=' + type + '&path=' + path;
        }
        return AppConfig.getBaseUrl(ignore) + "/" + path;
    }

    public static getUrl(path) {
        if (!path || path.length == 0) {
            return "";
        }
        if (path.indexOf("http://") == 0
            || path.indexOf("https://") == 0) {
            return path;
        }
        return AppConfig.getBaseUrl() + path;
    }

    public static deepCopy(p, c) {
        var c = c || {};
        for (var i in p) {
            if (!p.hasOwnProperty(i)) {
                continue;
            }
            if (typeof p[i] === 'object') {
                c[i] = (p[i].constructor === Array) ? [] : {};
                this.deepCopy(p[i], c[i]);
            } else {
                c[i] = p[i];
            }
        }
        return c;
    }

    public static time(): number {
        var tm = new Date().getTime()
        return parseInt('' + Math.floor(tm / 1000));
    }

    public static getTime(str): number {
        var tm = new Date(str).getTime()
        return parseInt('' + Math.floor(tm / 1000));
    }

    public static makeKey(...args): string {
        var str = JSON.stringify(args);
        return md5(str);
    }

    public static defValue(a, key, def) {
        if (this.isEmpty(a) || this.isEmpty(a[key])) {
            return def;
        }
        return a[key];
    }

    public static getPercent(a, b, def) {
        if (typeof (a) == 'undefined' || typeof (b) == 'undefined') {
            if (typeof (def) == 'undefined') {
                return 0;
            } else {
                return def;
            }
        }
        var p = parseInt('' + (a / b * 100));
        if (p < 0) {
            p = 0;
        } else if (p > 100) {
            p = 100;
        }
        return p;
    }
    public static formatMoney(s, n) {
        if (n != 0) {
            n = n > 0 && n <= 20 ? n : 2;
            s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        } else {
            s = parseInt(s + "") + "";
        }
        var sp = s.split(".")
        var l = s.split(".")[0].split("").reverse(), r = sp.length > 1 ? '.' + sp[1] : '';
        var t = "", i = 0;
        for (; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return t.split("").reverse().join("") + r;
    }

    public static formatFixed(num, n) {
        var p = Math.pow(10, n);
        return (Math.floor(num * p) / p).toFixed(n);
    }

    public static formatFloat(v, nFixed2?) {
        var fx = nFixed2 ? 0 : 2;
        if (!v) {
            return (0.0).toFixed(fx);
        }
        var vv = parseFloat(v);
        vv = Math.abs(vv);
        if (vv >= 10000.0) {
            if (vv >= 100000000.0) {
                if (vv >= 10000000000000.0) {
                    return 'N';
                }
                return this.formatFixed(vv / 100000000.0, 2) + '亿';
            }
            return this.formatFixed(vv / 10000.0, 2) + '万';
        }
        return this.formatFixed(vv, fx);
    }

    public static formatDistance(v, nFixed2?) {
        var fx = nFixed2 ? 0 : 2;
        if (!v) {
            return (0.0).toFixed(fx);
        }
        var vv = parseFloat(v);
        vv = Math.abs(vv);
        console.log(vv);
        if (vv >= 1000.0) {
            return this.formatFixed(vv / 1000.0, 2) + 'km';
        }
        return this.formatFixed(vv, fx);
    }

    public static formatInt(v) {
        return this.formatFloat(v, true);
    }
    public static formatFloatbai(v) {
        var number = v;
        var date = number * 100;
        return date;
    }

    public static formatNumber(n) {
        n = isNaN(n) ? 0.0 : n;
        var b = parseInt(n).toString();
        var len = b.length;
        if (len <= 3) { return b; }
        var r = len % 3;
        return r > 0 ? b.slice(0, r) + "," + b.slice(r, len).match(/\d{3}/g).join(",") : b.slice(r, len).match(/\d{3}/g).join(",");
    }

    public static timeAgo(str) {
        if (this.isEmpty(str)) {
            return '';
        }
        var langarr = ['前', '年', '月', '周', '日', '小时', '分钟', '秒', '刚刚'];
        var tm = typeof (str) == 'string' ? (new Date(str)).getTime() : str;
        var differ = ((new Date()).getTime() / 1000) - (tm / 1000);
        return AppUtil.timeAgoBySecond(differ, langarr);
    }

    public static timeAgoBySecond(differ, langarr?) {
        langarr = langarr || ['以内', '年', '月', '周', '日', '小时', '分钟', '秒', '1分钟内'];
        if (isNaN(differ)) {
            return '';
        }
        if (differ < 60) {
            return langarr[8];
        }
        var differ_y = Math.floor(differ / 365.0 / 86400.0);
        var differ_m = Math.floor(differ / 30.0 / 86400.0);
        var differ_w = Math.floor(differ / 7.0 / 86400.0);
        var differ_d = Math.floor(differ / 86400.0);
        var differ_h = Math.floor(differ / 3600.0);
        var differ_min = Math.floor(differ / 60.0);
        var differ_s = Math.floor(differ);

        if (differ_y) {
            return differ_y + langarr[1] + langarr[0];
        } else if (differ_m) {
            return differ_m + langarr[2] + langarr[0];
        } else if (differ_w) {
            return differ_w + langarr[3] + langarr[0];
        } else if (differ_d) {
            return differ_d + langarr[4] + langarr[0];
        } else if (differ_h) {
            return differ_h + langarr[5] + langarr[0];
        } else if (differ_min) {
            return differ_min + langarr[6] + langarr[0];
        } else {
            return differ_s + langarr[7] + langarr[0];
        }
    }

    public static dateFormat(date, fmt) { //author: meizz 
        var o = {
            "M+": date.getMonth() + 1, //月份 
            "d+": date.getDate(), //日 
            "h+": date.getHours(), //小时 
            "m+": date.getMinutes(), //分 
            "s+": date.getSeconds(), //秒 
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
            "S": date.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    public static jsonParse(data) {
        try {
            return typeof (data) == 'string' ? JSON.parse(data) : data;
        }
        catch (e) { }
        return {};
    }

    public static unique(s, cb) {
        var arr = s.sort().join(",,").replace(/(,|^)([^,]+)(,,\2)+(,|$)/g, "$1$2$4").replace(/,,+/g, ",").replace(/,$/, "").split(",");

        cb = cb || function (v) { return v; }

        for (var i in arr) {
            arr[i] = cb(arr[i]);
        }
        return arr;
    }

    public static pagination(pageNo, pageSize, array) {
        var offset = (pageNo - 1) * pageSize;
        return (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize);
    }

    public static isNumber(n, accurate?) {
        if (accurate) {
            return typeof (n) === 'number' && isFinite(n)
        } else {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }
    }

    public static arrayMerge(...args) {
        var i, j, k = 0, res = [];
        for (i in args) {
            for (j in args[i]) {
                if (this.isNumber(j)) {
                    res[k++] = args[i][j];
                } else {
                    res[j] = args[i][j];
                }
            }
        }
        return res;
    }

    public static arrayRemove(arr, ...args) {
        var i, j, hv = false, res = [];
        for (i in arr) {
            hv = false;
            for (j in args) {
                if (i == args[j]) {
                    hv = true;
                    break;
                }
            }
            if (!hv) {
                res.push(arr[i]);
            }
        }
        return res;
    }

    public static inArray(v, arr) {
        if (typeof (arr) != 'object' || typeof (v) == 'object' || this.isEmpty(arr)) {
            return false;
        }
        for (var i in arr) {
            if ('' + arr[i] == '' + v) {
                return true;
            }
        }
        return false;
    }

    public static getNextPage(arr, psz) {
        if (this.isEmpty(arr) || this.isEmpty(psz)) {
            return 1;
        }
        return Math.floor(arr.length / psz) + 1;
    }

    public static combineMoreData(old, come, psz) {
        if (this.isEmpty(come)) {
            return old;
        }
        if (this.isEmpty(old) || this.isEmpty(psz)) {
            return come;
        }
        var remove = old.length - (this.getNextPage(old, psz) - 1) * psz;
        for (var i = 0; i < remove; i++) {
            old.pop();
        }
        for (var j in come) {
            old.push(come[j]);
        }
        return old;
    }

    public static parseQueryString(argu) {
        var str = argu.split('?')[1];
        var result = {};
        var temp = str.split('&');
        for (var i = 0; i < temp.length; i++) {
            var temp2 = temp[i].split('=');
            result[temp2[0]] = temp2[1];
        }
        return result;
    }

    public static hrefBanner(item, navCtrl: NavController, iab: InAppBrowser) {
        if (this.isEmpty(item)) {
            return null;
        }
        var url;
        if (item.url.indexOf("http://") == 0 || item.url.indexOf("https://") == 0) {
            const browser = iab.create(item.url);
            browser.show();
            return browser;
        } else if (item.url.indexOf("/") == 0) {
            url = AppConfig.getBaseUrl() + item.url;
            const browser = iab.create(url);
            browser.show();
            return browser;
        } else if (item.url.indexOf("/") > 0) {
            url = AppConfig.getBaseUrl() + "/" + item.url;
            const browser = iab.create(url);
            browser.show();
            return browser;
        } else {
            var uris = item.url.split("?");
            if (uris.length < 2) {
                return null;
            }
            var type = uris[0];
            //var params = this.parseQueryString(item.url);
            switch (type) {
                case 'article':
                    break;
            }
        }
        return null;
    }

    public static toMinute(sec, start): string {
        var s = sec - start;
        var vm = Math.floor(s / 3600);
        var vs = '' + Math.floor((s - vm * 3600) / 60);
        var r = '';
        r += ('' + vm).length == 1 ? '0' + vm : vm;
        r += ':' + (vs.length == 1 ? '0' + vs : vs);
        return r;
    }

    public static getPartTime(part) {
        var sec = 0;
        var i;
        for (i in part) {
            if (!this.isEmpty(part[i]) && typeof (part[i]) != "function" && part[i].length == 3) {
                sec += (part[i][2] - part[i][1]);
            }
        }
        var c = Math.ceil(sec / 60);
        var labels = [];
        var x = 0;
        var tx = '';
        for (i in part) {
            if (!this.isEmpty(part[i]) && typeof (part[i]) != "function" && part[i].length == 3) {
                var j = part[i][1] + x;
                var itx = '';
                var ifirst = true;
                for (; j < part[i][2]; j += 10800) {
                    itx = this.toMinute(j, part[i][0]);
                    if (ifirst) {
                        labels.pop();
                        ifirst = false;
                        if (tx.length > 0) {
                            itx = tx + '/' + itx;
                        }
                    }
                    labels.push(itx);
                }
                x = j - part[i][2];
                if (x <= 0) {
                    itx = this.toMinute(j, part[i][0]);
                    labels.push(itx);
                }
                tx = itx;
            }
        }

        return { count: c, labels: labels };
    }

    public static ge(a) {
        return typeof (a) == 'string' ? (document.getElementById ? document.getElementById(a) : null) : a
    }

    public static parseFloat(a) {
        var r = parseFloat(a);
        if (isNaN(r)) {
            return 0.0;
        }
        return r;
    }

    public static parseInt(a) {
        var r = parseInt(a);
        if (isNaN(r)) {
            return 0;
        }
        return r;
    }



    /******** 版本更新 *********/
    public static getVersionCode(): string {
        var version = '0.0.0';
        if (typeof (AppVersion) != 'undefined' && typeof (AppVersion.version) != 'undefined') {
            version = AppVersion.version;
        }
        if (version == '0.0.0') {
            return AppConfig.projectVersionCode();
        }
        return version;
    }

    public static getVersionNumber(): number {
        var build = 0;
        if (typeof (AppVersion) != 'undefined' && typeof (AppVersion.build) != 'undefined') {
            build = AppVersion.build;
        }
        if (build == 0) {
            return AppConfig.projectVersion();
        }
        return build;
    }

    public static checkUpdate(force = false) {
        if (AppConfig.isAndroid() && typeof (cordova) != 'undefined') {
            //AppConfig.getWithTimeout('checkUpdate', force ? -1 : 86400, function (data, isTimeout) {
            //if (isTimeout || !data) {
            //AppConfig.set('checkUpdate', true);

            var appUpdate = cordova.require('cordova-plugin-app-update.AppUpdate');
            if (!this.isEmpty(cordova)) {
                appUpdate.checkAppUpdate(AppConfig.getAndroidUpdateUrl());
            }
            //}
            //});
        }
    }

    /**************系统消息 ********/
    public static updateParams(params, fn) {
        AppConfig.get('xid_xiaoxi', function (p) {
            params['xid_xiaoxi'] = p || 0;
            fn(params);
        });
    }
    public static setXID(type, id) {
        if (AppUtil.isEmpty(type) || AppUtil.isEmpty(id)) {
            return;
        }
        id = parseInt(id);
        if (type == 'xiaoxi') {
            this.setXIDImpl('xid_xiaoxi', id);
        }
    }

    public static setXIDImpl(key, id) {
        AppConfig.get(key, function (params) {
            var lid = params || 0;
            if (id > lid) {
                AppConfig.set(key, id);
            }
        });
    }

    public static setXIDCount(type, id, count) {
        if (AppUtil.isEmpty(type) || AppUtil.isEmpty(id)) {
            return;
        }
        id = parseInt(id);
        count = parseInt(count);
        if (type == 'xiaoxi') {
            AppConfig.get('limit_xid_xiaoxi', function (xval) {
                var xid = 0;
                if (xval == null || xval == '') {
                    xid = -1;
                } else {
                    xid = parseInt(xval);
                }
                if (id >= xid || isNaN(xid)) {
                    AppConfig.set('limit_xid_xiaoxi', id);
                    AppConfig.set('xid_count_xiaoxi', count);
                }
            });
        }
    }

    public static clearXIDCount(type) {
        if (AppUtil.isEmpty(type)) {
            return;
        }
        if (type == 'xiaoxi') {
            AppConfig.set('xid_count_xiaoxi', 0);
        }
    }

    public static getXIDCount(type, fn) {
        var mcount = 0;
        if (AppUtil.isEmpty(type)) {

            fn(mcount);
            return;
        }
        if (type == 'xiaoxi') {
            AppConfig.get('xid_count_xiaoxi', function (count) {
                if (!count) {
                    count = 0;
                }
                fn(count);
            });
            return;
        }
        fn(mcount);
        return;
    }

    public static Rad(d) {
        return d * Math.PI / 180.0;//经纬度转换成三角函数中度分表形式。
    }

    public static config_system_data = null;
    public static config(fn) {
        if (!this.config_system_data) {
            AppConfig.get('config_system_data', (d) => {
                if (d) {
                    this.config_system_data = d;
                    fn(d);
                } else {
                    AppNet.get('/m/api_as/config/system', {}, function (data) {
                        if (data.code == 'success') {
                            console.log(data.data);
                            AppUtil.config_system_data = data.data;
                            AppConfig.set('config_system_data', data.data);
                            fn(AppUtil.config_system_data);
                        }
                    }, null, 3600);
                }
            });
        }
        return this.config_system_data;
    }

    public static configReset(fn?) {
        AppNet.get('/m/api_as/config/system', {}, function (data) {
            if (data.code == 'success') {
                console.log("config =>", data);
                AppConfig.set('config_system_data', data.data);
                AppUtil.config_system_data = data.data;
                if (fn) {
                    fn(AppUtil.config_system_data);
                }
            }
        }, null, -1);
    }

    public static setConfig(c) {
        if (!this.isEmpty(c)) {
            this.config_system_data = c;
        }
    }

    public static calcDistance(lat1, lng1, lat2, lng2) {
        var radLat1 = this.Rad(lat1);
        var radLat2 = this.Rad(lat2);
        var a = radLat1 - radLat2;
        var b = this.Rad(lng1) - this.Rad(lng2);
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
            Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
        s = s * 6378.137;// EARTH_RADIUS;
        s = Math.round(s * 10000) / 10;
        return s;
    }

    public static replaceTo(navCtrl: NavController, page, navParams) {
        return navCtrl.push(page, navParams).then(() => {
            var l = navCtrl.length();
            if (l >= 2) {
                navCtrl.remove(navCtrl.length() - 2, 1);
            }
        });
    }

    public static account(sess) {
        if (typeof (sess['username']) != 'undefined' || sess['username'].length > 0) {
            return sess['username'];
        } else if (typeof (sess['umobile']) != 'undefined' || sess['umobile'].length > 0) {
            return sess['umobile'];
        } else if (typeof (sess['uemail']) != 'undefined' || sess['uemail'].length > 0) {
            return sess['uemail'];
        } else if (typeof (sess['uopenid']) != 'undefined' || sess['uopenid'].length > 0) {
            return sess['uopenid'];
        }
        return '';
    }
    
    public static isNum(str) {
        var newstr = str.replace(/[^0-9]/ig, "");
        return newstr;
    }

    public static objectToPairArray(obj) {
        if (!obj) {
            return [];
        }
        var t = [];
        for (var i in obj) {
            t.push({
                key: i,
                value: obj[i],
            });
        }
        return t;
    }
}