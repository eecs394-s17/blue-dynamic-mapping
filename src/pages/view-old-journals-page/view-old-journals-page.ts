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
  timestamp: number;
  day: string;
  month: string;
  time: string;
  subject: string;
  thoughts: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storageService: StorageService) {

    this.load()

  }

  load(){
    this.storageService.getMostRecentJournalEntry().then((data) => {
      console.log(data);
      this.timestamp = data['timestamp'],
      this.subject = data['subject'],
      this.thoughts = data['thoughts']
    });
  }

  getDay() {
    return moment.unix(this.timestamp).format("DD");
  }
  getMonth() {
    return moment.unix(this.timestamp).format("MMM");
  }
  getTime(){
    return moment.unix(this.timestamp).format("h:mm a");
  }


}  