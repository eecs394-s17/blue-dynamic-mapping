import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { PromptsRootPage } from '../prompts-root-page/prompts-root-page';

import { SummaryPage } from '../summary-page/summary-page';
import { JournalPage } from '../journal-page/journal-page';
import { StorageService } from '../../providers/storage-service';

import { AuthData } from '../../providers/auth-data';
import { LoginPage } from '../login/login';

@Component({
  selector: 'home-page',
  templateUrl: 'home-page.html',
  providers: [StorageService]
})
export class HomePage {
  // use code from https://github.com/driftyco/ionic-preview-app/tree/master/src/pages/slides/basic
  slides = [
    {
      title: "Welcome to Dynamic Mapping!",
      description: `Dynamic mapping and integration couple’s counseling helps couples identify and create balance in the dynamic of their relationship. The dynamic is the pattern of the interaction of thoughts feelings and actions in a relationship. Understanding comes through discovering how information from their past, approach to conflict, communication styles and love languages interact with and effect their partner and the relationship. This app will assist you in your understanding of the dynamic map. You will track your conflict with your partner. this will allow you to better identify patterns as well as what works and doesn’t work. In addition, you will be given prompts that will allow you to address current conflict in a more successful way thus decreasing the time spent in states of hurt, anger and resentment. Following the prompts that you collaboratively help to set, you will have more success navigating conflict areas of the relationship and have more happiness and peace.`,
    }
  ];

  constructor(public navCtrl: NavController, private storageService: StorageService, public authData: AuthData, public _app: App) {

  }

  pushTrackArgument(event){
  	this.navCtrl.push(PromptsRootPage);
  }

  pushJournalFeelings(event){
    this.navCtrl.push(JournalPage)
  }

  logOut(event){
    this.authData.logoutUser();
    this._app.getRootNav().setRoot(LoginPage);
  }


}
