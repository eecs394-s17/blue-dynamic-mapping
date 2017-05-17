import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { StorageService } from '../../providers/storage-service';
import { Prompt } from '../../models/prompt';
import { PromptPage } from '../prompt-page/prompt-page';
import { HomePage } from '../home-page/home-page';
import * as moment from 'moment';

@Component({
  selector: 'view-old-journals-page',
  templateUrl: 'view-old-journals-page.html',
  providers: [StorageService]
})

export class OldJournalsPage {
  journals: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storageService: StorageService) {
    this.load()
  }

  load(){
    this.storageService.getAllJournalEntries().then( (data) => {
      console.log(data);
      this.journals = data;
    });
  }

  // getDay() {
  //   return moment.unix(this.timestamp).format("DD");
  // }
  // getMonth() {
  //   return moment.unix(this.timestamp).format("MMM");
  // }
  // getTime(){
  //   return moment.unix(this.timestamp).format("h:mm a");
  // }


}
