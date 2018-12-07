import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MultiPickerModule } from 'ion-multi-picker';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AllwaysWorldAssets } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { ProgressBarComponent } from '../modules/progress-bar/progress-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { QRCodeModule } from 'angularx-qrcode';

import { PageTabAccount } from '../pages/tabs/tab_account';
import { PageTabs } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BackButtonService } from '../modules/BackButtonService';
import { PageTabHome } from '../pages/tabs/tab_home';

import { AutoresizeDirective } from '../modules/AutoresizeTextArea';
import { PageLogin } from '../pages/auth/login/login'


@NgModule({
    declarations: [
        AutoresizeDirective,
        AllwaysWorldAssets,
        ProgressBarComponent,
        PageTabAccount,
        PageTabHome,
        PageTabs,
        PageLogin,
    ],
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        MultiPickerModule,
        QRCodeModule,
        IonicModule.forRoot(AllwaysWorldAssets, {
            tabsHideOnSubPages: 'true', //隐藏全部子页面tabs
            backButtonText: "返回"
        }),
        IonicStorageModule.forRoot({
            name: "_AllwaysWorldAssets",
            storeName: "_AllwaysWorldAssets",
            driverOrder: ['indexeddb', 'localstorage', 'sqlite'],
        }),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        AllwaysWorldAssets,
        PageTabAccount,
        PageTabHome,
        PageTabs,
        PageLogin,
    ],
    providers: [
        Camera,
        ImagePicker,
        InAppBrowser,
        BarcodeScanner,
        StatusBar,
        SplashScreen,
        BackButtonService,
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule { }
