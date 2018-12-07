import { LoadingController, AlertController, NavController, ToastController } from 'ionic-angular';
import { Component } from '@angular/core';
import { AppNet } from "../../../app/app.net";
import { AppUtil } from "../../../app/app.util";
import { PageBase } from '../../../app/app.page';
// import { PageRegister } from '../register/register';
import { AppConfig } from '../../../app/app.config';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';


@Component({
    selector: 'page-auth-login',
    templateUrl: 'login.html'
})
export class PageLogin extends PageBase {
    /********** 属性 ********/
    type: string = "person";  //加载ion-segment模块
    form = {
        'username': '',
        'password': '',
    };
    @ViewChild(Slides) slides: Slides;

    data = {
        session: AppConfig.getSession()
    }

    /********** 方法 ********/
    constructor(
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public toastCtrl: ToastController
    ) {
        super();
    }
    //登陆
    login() {
        let me = this;
        console.log(me.data.session)
        if (AppUtil.isEmpty(this.form.username)) {
            AppUtil.alert(this.alertCtrl, '请输入用户名或无限账号');
            return;
        } else if (AppUtil.isEmpty(this.form.password)) {
            AppUtil.alert(this.alertCtrl, '请输入密码');
            return;
        }

        let loading = me.loadingCreate(me.loadingCtrl, '登录中...');
        AppNet.post("/m/api_as/genal/login", me.form, function (data) {
            loading.dismiss();
            if (data.code == 'success') {
                setTimeout(() => {
                    AppUtil.toast(me.toastCtrl, data.msg);
                    me.navCtrl.pop();
                }, 500);
            } else {
                AppUtil.toast(me.toastCtrl, data.msg);
            }
        }, this.toastCtrl)
        loading.present();
    }

    //忘记密码
    forget() {
        AppUtil.toast(this.toastCtrl, "暂未 开通");
    }
    ionViewDidEnter() {

        this.slides.autoplayDisableOnInteraction = false;
    }
    //注册
    // register() {
    //     this.navCtrl.push(PageRegister);
    // }

}

