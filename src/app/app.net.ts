import { Http, RequestOptions } from "@angular/http";
import { AppConfig } from './app.config';
import { AppUtil } from './app.util';
import 'rxjs/add/operator/map';

export class AppNet {
    public static http: Http;

    public static setHttp(http: Http) {
        this.http = http;
    }
    //http get
    private static _get(url: string, params, fn?, toastCtrl?, cacheTimeout?: number) {
        var me = this;
        var skey = AppUtil.makeKey(url, params);
        var run = function (sessID) {
            if (me.http == null) {
                return;
            }
            if (typeof (params['_lg']) == 'undefined') {
                params['_lg'] = AppConfig.getLoginBunch();
            }
            if (typeof (params['lang']) == 'undefined') {
                params['_lang'] = AppConfig.getLang();
            }
            if (!AppUtil.isEmpty(sessID) && sessID.length >= 16) {
                params['PHPSESSID'] = sessID;
            }
            params['_pv'] = AppConfig.projectVersion();
            params['_plt'] = AppConfig.platform();
            AppUtil.updateParams(params, function (params) {
                var opts = new RequestOptions({ withCredentials: true, params: params });
                var rurl = AppUtil.getUrl(url);
                console.log(" get:", rurl)
                console.log("send:", params)
                me.http.get(rurl, opts).map(res => res.json()).subscribe(function (data) {
                    console.log("resp:", data);
                    if (AppUtil.isEmpty(data) || AppUtil.isEmpty(data.code)) {
                        if (toastCtrl) {
                            let toast = toastCtrl.create({
                                message: "提交失败，网络错误",
                                position: 'bottom',
                                cssClass: "toast-cus",
                                duration: 2000,
                            });
                            toast.present();
                        }
                        return;
                    }
                    AppConfig.setSessID(data);
                    try {
                        if (data.code == 'success') {
                            AppConfig.set(skey, data);
                            var sess = AppUtil.defValue(data, 'sess', null);
                            if (!AppUtil.isEmpty(sess)) {
                                AppConfig.setSession(sess);
                            }
                        } else if (data.code == 'nologin') {
                            AppConfig.setSession(null);
                        }
                        fn(data);
                    } catch (e) {
                        console.log("error: ", e);
                    }
                });
            });


        }
        AppConfig.getSessID(run);
    }

    public static get(url: string, params, fn?, toastCtrl?, cacheTimeout?: number) {
        if (cacheTimeout && cacheTimeout > 0) {
            var me = this;
            AppConfig.getWithTimeout(AppUtil.makeKey(url, params), cacheTimeout, function (data, isTimeout) {
                if (isTimeout) {
                    me._get(url, params, fn, toastCtrl, cacheTimeout);
                } else {
                    fn(data);
                }
            })
        } else {
            this._get(url, params, fn, toastCtrl, cacheTimeout);
        }
    }

    public static get_set_cache(url: string, params, data) {
        var skey = AppUtil.makeKey(url, params);
        if (data) {
            AppConfig.set(skey, {
                code: 'success',
                msg: '成功',
                data: data,
            });
        } else {
            AppConfig.remove(skey);
        }
    }

    //http post
    private static _post(url: string, params, fn?, toastCtrl?, cacheTimeout?: number) {
        var me = this;
        var skey = AppUtil.makeKey(url, params);
        var run = function (sessID) {
            if (me.http == null) {
                return;
            }
            if (typeof (params['_lg']) == 'undefined') {
                params['_lg'] = AppConfig.getLoginBunch();
            }
            if (typeof (params['lang']) == 'undefined') {
                params['_lang'] = AppConfig.getLang();
            }
            if (!AppUtil.isEmpty(sessID) && sessID.length >= 16) {
                params['PHPSESSID'] = sessID;
            }
            params['_pv'] = AppConfig.projectVersion();
            params['_plt'] = AppConfig.platform();
            AppUtil.updateParams(params, function (params) {
                var opts = new RequestOptions({ withCredentials: true });
                var rurl = AppUtil.getUrl(url);
                console.log("post:", rurl)
                console.log("send:", params)
                me.http.post(rurl, JSON.stringify(params), opts).map(res => res.json()).subscribe(function (data) {
                    console.log("resp:", data);
                    if (AppUtil.isEmpty(data) || AppUtil.isEmpty(data.code)) {
                        if (toastCtrl) {
                            let toast = toastCtrl.create({
                                message: "提交失败，网络错误",
                                position: 'bottom',
                                cssClass: "toast-cus",
                                duration: 2000,
                            });
                            toast.present();
                        }
                        return;
                    }
                    AppConfig.setSessID(data);
                    try {
                        if (data.code == 'success') {
                            AppConfig.set(skey, data);
                            var sess = AppUtil.defValue(data, 'sess', null);
                            if (!AppUtil.isEmpty(sess)) {
                                AppConfig.setSession(sess);
                            }
                        } else if (data.code == 'nologin') {
                            AppConfig.setSession(null);
                        }
                        fn(data);
                    } catch (e) {
                        console.log("error: ", e);
                    }
                });
            });
        }
        AppConfig.getSessID(run);
    }

    public static post(url: string, params, fn?, toastCtrl?, cacheTimeout?: number) {
        if (cacheTimeout && cacheTimeout > 0) {
            var me = this;
            AppConfig.getWithTimeout(AppUtil.makeKey(url, params), cacheTimeout, function (data, isTimeout) {
                if (isTimeout) {
                    me._post(url, params, fn, toastCtrl, cacheTimeout);
                } else {
                    fn(data);
                }
            })
        } else {
            this._post(url, params, fn, toastCtrl, cacheTimeout);
        }
    }

    public static post_set_cache(url: string, params, data) {
        var skey = AppUtil.makeKey(url, params);
        if (data) {
            AppConfig.set(skey, {
                code: 'success',
                msg: '成功',
                data: data,
            });
        } else {
            AppConfig.remove(skey);
        }
    }
}