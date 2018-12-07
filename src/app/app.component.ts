import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { PageTabs } from '../pages/tabs/tabs';
import { Http } from '@angular/http';
import { AppNet } from './app.net';
import { AppConfig } from './app.config';

@Component({
    templateUrl: 'app.html'
})
export class AllwaysWorldAssets {
    rootPage: any = PageTabs;

    constructor(platform: Platform,
        statusBar: StatusBar,
        splashScreen: SplashScreen,
        http: Http,
        storage: Storage) {

        AppNet.setHttp(http);
        AppConfig.setPlatform(platform);
        AppConfig.setStorage(storage);
        AppConfig.Init();


        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.

            statusBar.overlaysWebView(false);

            statusBar.backgroundColorByHexString("#3d3e3f");
            //statusBar.backgroundColorByName("black");
            // statusBar.styleDefault();
            statusBar.styleLightContent();
            splashScreen.hide();
        });
    }
}
