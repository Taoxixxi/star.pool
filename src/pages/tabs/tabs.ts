import { Component, ViewChild } from '@angular/core';
import { Platform, Tabs } from 'ionic-angular';
import { BackButtonService } from '../../modules/BackButtonService';
import { PageTabAccount } from '../tabs/tab_account';
import { AppConfig } from '../../app/app.config';
import { PageBase } from '../../app/app.page';
import { PageTabHome } from './tab_home';

@Component({
    selector:'page-tabs',
    templateUrl: 'tabs.html'
})
export class PageTabs extends PageBase {
    @ViewChild('mainTabs') tabRef: Tabs;
    data = {
        isLogin: AppConfig.isLogin(),
    }
    tab0Root = PageTabHome;
    // tab1Root = PageTabMarket;
    // tab1Root = PageBazaar;
    // tab2Root = PageTabWallet;
    tab3Root = PageTabAccount;

    constructor(private backButtonService: BackButtonService,
        platform: Platform) {
        super();
        platform.ready().then(() => {
            this.backButtonService.registerBackButtonAction(this.tabRef);
        });
    }
}
