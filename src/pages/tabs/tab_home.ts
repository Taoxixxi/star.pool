import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppUtil } from '../../app/app.util';
import { AppNet } from '../../app/app.net';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppConfig } from '../../app/app.config';
import { PageBase } from '../../app/app.page';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

@Component({
    selector: 'page-tabs-tab_home',
    templateUrl: 'tab_home.html'
})
export class PageTabHome extends PageBase {
    defaultBanner = 'assets/imgs/banner_default.jpg';
    //banners = [];
    //slidi = 0;

    starhot_data = [];
    banners_force = false;

    starhot_data_force = false;
    browser: any;
    @ViewChild(Slides) slides: Slides;

    ann = null;
    ann_force = false;

    sett = AppConfig.getSett();

    rate_a = '0.0';
    rate_b = '0.0';
	// type: string = "ann";
    constructor(
        public navCtrl: NavController,
        public toastCtrl: ToastController,
        public iab: InAppBrowser) {
        super();
    }
    format_datetime(v) {
        var tm = new Date(v);
        return AppUtil.dateFormat(tm, 'M/d h:m');
    }
    refreshPage(refresher) {
        this.banners_force = true;
        this.ann_force = true;
        this.starhot_data_force = true;
        this.ionViewDidEnter();

        setTimeout(() => {
            if (refresher) {
                refresher.complete();
            }
        }, 2000);
    }

   
    ionViewDidLoad() {
        this.load_sett();

        // this.banners = [{
            // file_path: 'assets/imgs/banner_default.png',
        // }];

        //当页面加载的时候触发，下次再打开这个页面则不会触发;
        setTimeout(() => {
            AppUtil.checkUpdate();
        }, 5000);
    }

    //幻灯自动播放
    // runAutoPlayBanner() {
        // var me = this;
        // setTimeout(() => {
            // if (me.banners && me.banners.length > 0) {
                // if (me.slidi > me.banners.length) {
                    // me.slidi = 0;
                // }
                // me.slider.slideTo(me.slidi);
                // me.slidi++;
            // }
            // me.runAutoPlayBanner();
        // }, 5000);
    // }

    ionViewDidEnter() {

        var me = this;
        //加载banner
        // AppNet.get('/m/api_as/article/banner_list', { module: 1 }, function (data) {
            // if (data.code == 'success') {
                // if (data.data && data.data.length > 0) {
                    // var mdata = data.data;
                    // for (var i in mdata) {
                        // mdata[i].file_path = AppUtil.getImagePath(mdata[i].file_path, null, null, me.defaultBanner, true);
                    // }
                    // me.banners = mdata;
                    // me.banners_force = false;

                   // 更新幻灯
                    // me.slider.update();
                    // me.slidi = 0;
                // }
            // }
        // }, this.toastCtrl, this.banners_force ? -1 : 1800);

        //this.runAutoPlayBanner();
    }

    ionViewDidLeave() {
        if (this.browser) {
            this.browser.close();
        }
    }

    load_sett() {
        var me = this;
        // AppNet.get("/m/api_as/sett/all", {}, function (data) {
        //     if (data.code == 'success') {
        //         AppConfig.setSett(data.data, function () {
        //             me.sett = AppConfig.getSett();
        //         });
        //     }
        // }, this.toastCtrl, 300);
    }
    // goToSlide() {
    //     this.slides.slideTo(2, 500);
    //   }
}
