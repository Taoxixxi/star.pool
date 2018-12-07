import { AppUtil } from "./app.util"
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';

export class AppConfig {

    /********** 属性 **********/
    private static _debug = false;
    private static _storage: Storage;
    private static _runOnce: false;
    private static _session: any;
    private static _sett: any;
    private static _sessid: any;
    private static _platform: Platform;
    private static _lang = 'cn';
    private static _projectVersion = 10;
    private static _projectVersionCode = "0.0.10";
    private static _pageObserver = [];


    /********** 方法 **********/
    public static projectVersion() {
        return this._projectVersion;
    }

    public static projectVersionCode() {
        return this._projectVersionCode;
    }

    public static insertObserver(page) {
        page.sess = this._session;
        page.isLogin = this.isLogin();
        this._pageObserver.push(page);
    }

    public static getLang() {
        return this._lang;
    }
    public static setLang(l) {
        this._lang = l;
        this.set('lang', l);
        return this._lang
    }
    public static setStorage(storage: Storage) {
        this._storage = storage;
    }
    public static Init() {
        if (this._runOnce) {
            return;
        }
        if (!this.canStorage()) {
            return;
        }
        var me = this;
        this.get("session", function (data) {
            me._session = data;
            var isLogin = me.isLogin();
            for (var i in me._pageObserver) {
                me._pageObserver[i].sess = me._session;
                me._pageObserver[i].isLogin = isLogin;
            }
        });
        this.get("lang", function (data) {
            if (!!data && ('' + data).length > 0) {
                me._lang = data;
            }
        });
    }
    public static isDebug() {
        return this._debug;
    }

    public static getSession() {
        return this._session;
    }

    public static setSession(s) {
        if (!this.canStorage()) {
            return;
        }
        var me = this;
        this.set("session", s, function (data) {
            me._session = data;
            var isLogin = me.isLogin();
            for (var i in me._pageObserver) {
                me._pageObserver[i].sess = me._session;
                me._pageObserver[i].isLogin = isLogin;
            }
            if (!AppUtil.isEmpty(s)) {
                me.set("login_user", {
                    mobile: s.umobile,
                    username: s.username,
                    avatar_url: s.avatar_url,
                    name: s.name,
                });
                setTimeout(() => {
                    AppUtil.setXID('xiaoxi', s['xid_xiaoxi']);
                    AppUtil.setXIDCount('xiaoxi', s['xid_xiaoxi'], s['xid_count_xiaoxi']);
                }, 100);
            }
        });
    }

    public static getLoginBunch() {
        if (AppUtil.isEmpty(this._session)) {
            return '';
        }
        return this._session.login_bunch;
    }

    public static getLoginUser(fn) {
        if (!this.canStorage()) {
            return null;
        }
        this.get("login_user", fn);
    }

    public static isLogin() {
        if (AppUtil.isEmpty(this._session)) {
            return false;
        }
        if (AppUtil.isEmpty(this._session["uid"])) {
            return false;
        }
        if (this._session["uid"] > 0) {
            return true;
        }
        return false;
    }

    public static getUid() {
        if (AppUtil.isEmpty(this._session)) {
            return 0;
        }
        if (AppUtil.isEmpty(this._session["uid"])) {
            return 0;
        }
        return parseInt('' + this._session["uid"]);
    }

    public static getBaseUrl(ignore?) {
        // var debugUrl = "http://localhost/chainbank.site/public";  //本地
        // var releaseUrl = "http://chain.starpower.ltd";
        var debugUrl = "http://localhost/chainbank.site/public";
        var releaseUrl = "http://chain.starpower.ltd";
        if (!ignore) {
            if (this.isDebug()) {
                return debugUrl;
            } else {
                return releaseUrl;
            }
        } else {
            return releaseUrl;
        }
    }

    public static getBaseHost(ignore?) {
        var debugUrl = "localhost:5888";
        var releaseUrl = "localhost:5888";
        if (!ignore) {
            if (this.isDebug()) {
                return debugUrl;
            } else {
                return releaseUrl;
            }
        } else {
            return releaseUrl;
        }
    }

    public static getAndroidUpdateUrl() {
        return this.getBaseUrl() + '/m/ver/android_update';
    }

    //获取设备高度
    public static getWindowHeight() {
        return this._platform.height();
    }

    //获取设备宽度
    public static getWindowWidth() {
        return this._platform.width();
    }

    /******** 平台判断 ********/
    public static setPlatform(p: Platform) {
        this._platform = p;
    }

    public static isAndroid() {
        if (this._platform) {
            return this._platform.is("android")
        }
        return false;
    }

    public static isIOS() {
        if (this._platform) {
            return this._platform.is("ios")
        }
        return false;
    }

    public static isWindows() {
        if (this._platform) {
            return this._platform.is("windows")
        }
        return false;
    }

    public static platform() {
        if (this._platform) {
            var names = this._platform.versions();
            var nms = [];
            for (var i in names) {
                nms.push(i + (typeof (names[i]) == 'undefined' ? '' : names[i].str));
            }
            return nms.join(',');
        }
        return '';
    }

    /********** 存储 *********** */
    public static remove(key, fn?) {
        if (!this.canStorage()) {
            if (fn) {
                fn(null);
            }
            return;
        }
        this._storage.remove(key).then(fn);
    }

    public static canStorage() {
        return !AppUtil.isEmpty(this._storage);
    }

    public static set(key, val, fn?) {
        if (!this.canStorage()) {
            if (fn) {
                fn(null);
            }
            return;
        }
        //console.log(AppUtil.time());
        this._storage.set(key, { __AUTO_TIME_TAG: AppUtil.time(), val: val }).then(function (data) {
            if (fn) {
                fn(data.val);
            }
        });
    }
    public static get(key, fn) {
        if (!this.canStorage()) {
            fn(null);
            return;
        }
        this._storage.get(key).then(function (data) {
            if (data) {
                fn(data.val);
            } else {
                fn(null);
            }
        });
    }

    public static clearAll() {
        if (this._storage) {
            this._storage.clear();
        }
        if (this._sessid) {
            this._sessid = 0;
        }
        if (this._session) {
            this._session = null;
            var isLogin = this.isLogin();
            for (var i in this._pageObserver) {
                this._pageObserver[i].sess = this._session;
                this._pageObserver[i].isLogin = isLogin;
            }
        }
    }

    public static getWithTimeout(key, timeout_second, fn) {
        if (!this.canStorage()) {
            fn(null, true);
            return;
        }
        this._storage.get(key).then(function (data) {
            var now = AppUtil.time();
            if (!data || !data.__AUTO_TIME_TAG) {
                fn(null, true);
                return;
            }
            if (data.__AUTO_TIME_TAG > now
                || (now - data.__AUTO_TIME_TAG) > timeout_second) {
                fn(data.val, true);
            } else {
                fn(data.val, false);
            }
        });
    }

    public static setSessID(pkg) {
        if (!this.canStorage() || AppUtil.isEmpty(pkg)) {
            return;
        }
        if (AppUtil.isEmpty(pkg["PHPSESSID"])) {
            return;
        }
        if (pkg["PHPSESSID"] == this._sessid) {
            return;
        }
        var me = this;
        this.set("PHPSESSID", pkg["PHPSESSID"], function (data) {
            me._sessid = data;
        });
    }

    public static getSessID(fn) {
        if (!AppUtil.isEmpty(this._sessid)) {
            fn(this._sessid);
        } else {
            this.get("PHPSESSID", fn);
        }
    }

    public static getSett() {
        return this._sett;
    }

    public static setSett(s, fn?) {
        if (!this.canStorage()) {
            return;
        }
        var me = this;
        this.set("sett", s, function (data) {
            me._sett = data;
            if (fn) {
                fn();
            }
        });
    }

    public static scannerDefaultOptions() {
        return {
            //用前置摄像头
            preferFrontCamera: false, // iOS and Android
            //是否显示切换摄像头按钮
            showFlipCameraButton: false, // iOS and Android
            //显示灯光按钮
            showTorchButton: false, // iOS and Android
            //显示灯光
            torchOn: false, // Android, launch with the torch switched on (if available)
            //扫描历史
            saveHistory: true, // Android, save scan history (default false)
            prompt: "请将目标放入扫码区", // Android
            //扫码延迟
            resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            //扫码格式
            //formats: "QR_CODE,UPC_A,UPC_E,EAN_8,EAN_13", // default: all but PDF_417 and RSS_EXPANDED
            //横屏
            //orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
            //不要动画
            disableAnimations: true, // iOS
            //不要滴滴声
            disableSuccessBeep: false // iOS and Android
        }
    }
}