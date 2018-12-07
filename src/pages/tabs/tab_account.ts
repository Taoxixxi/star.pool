import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AppConfig } from '../../app/app.config';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppUtil } from '../../app/app.util';
import { AppNet } from '../../app/app.net';
import { PageBase } from '../../app/app.page';
import { PageLogin } from '../auth/login/login';

@Component({
    selector: 'page-tab_account',
    templateUrl: 'tab_account.html'
})
export class PageTabAccount extends PageBase {
    testRadioOpen: boolean;
    testRadioResult;
    data = {
        defAvatar: 'assets/imgs/logo.png',
        defAvatar1: 'assets/imgs/logo.png',
        loginUser: null,
    };
    data_force = false;
    mcount = 0;
    avatar_url = this.data.defAvatar;
    sett = AppConfig.getSett();

    constructor(public navCtrl: NavController,
        public toastCtrl: ToastController,
        public alerCtrl: AlertController,
        public iab: InAppBrowser) {
        super();
    }

    refreshPage(refresher) {
        this.data_force = true;
        this.ionViewDidEnter();

        setTimeout(() => {
            if (refresher) {
                refresher.complete();
            }
        }, 2000);
    }
    ionViewDidLoad() {
        super.ionViewDidLoad();
        //当页面加载的时候触发，下次再打开这个页面则不会触发;
        this.data_force = true;

        console.log("session:", this.sess);

        var me = this;
        AppConfig.getLoginUser(function (user) {
            if (user) {
                if (me.isLogin) {
                    user.avatar_url = AppUtil.getImagePath(user.avatar_url, '/index/avatar/show', 'middle', me.data.defAvatar);
                } else {
                    user.avatar_url = AppUtil.getImagePath(user.avatar_url, '/index/avatar/show', 'middle', me.data.defAvatar1);
                }
                me.avatar_url = user.avatar_url;
                me.data.loginUser = user;
            }
        });
    }

    ionViewWillEnter() {
        //当将要进入页面时触发
        if (!this.isLogin) {
            this.data.loginUser = null;
        }
    }

    ionViewDidEnter() {
        //当进入页面时触发
        AppUtil.getXIDCount('xiaoxi', function (c) {
            me.mcount = c;
        });

        var me = this;
        if (me.isLogin) {
            AppNet.get("/m/api_as/account/refresh_userinfo", {}, function (data) {
                if (data.code == 'success') {
                    me.data_force = false;
                    setTimeout(function () {
                        AppUtil.getXIDCount('xiaoxi', function (c) {
                            me.mcount = c;
                        });
                    }, 300);
                }
            }, this.toastCtrl, this.data_force ? -1 : 360);
        }

        this.load_sett();
    }

    load_sett() {
        var me = this;
        AppNet.get("/m/api_as/sett/all", {}, function (data) {
            if (data.code == 'success') {
                AppConfig.setSett(data.data, function () {
                    me.sett = AppConfig.getSett();
                });
            }
        }, this.toastCtrl, 300);
    }

    ionViewDidLeave() {
        //离开页面时触发
    }
    
    login(){
        this.navCtrl.push(PageLogin);
    }
}
