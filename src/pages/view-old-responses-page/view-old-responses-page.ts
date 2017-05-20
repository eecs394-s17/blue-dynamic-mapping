import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PromptService } from '../../providers/prompt-service';
import { Prompt } from '../../models/prompt';
import { JournalDetailPage } from '../journal-detail-page/journal-detail-page';
import * as moment from 'moment';

@Component({
  selector: 'view-old-responses-page',
  templateUrl: 'view-old-responses-page.html',
  // providers: [StorageService]
  providers: [PromptService]
})

export class OldResponsesPage {
  time_stamps: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private promptService: PromptService) {
    this.load()
  }

  load(){

    this.promptService.getUserTimeStamps().then((data) => {
      this.time_stamps = data;
    });


  }
  getDay(timestamp) {
    return moment.unix(timestamp).format("DD");
  }
  getMonth(timestamp) {
    return moment.unix(timestamp).format("MMM");
  }
  getTime(timestamp){
    return moment.unix(timestamp).format("h:mm a");
  }



}
