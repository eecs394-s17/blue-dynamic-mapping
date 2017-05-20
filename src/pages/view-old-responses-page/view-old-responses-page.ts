import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { StorageService } from '../../providers/storage-service';
import { Prompt } from '../../models/prompt';
import { JournalDetailPage } from '../journal-detail-page/journal-detail-page';
import * as moment from 'moment';

@Component({
  selector: 'view-old-responses-page',
  templateUrl: 'view-old-responses-page.html',
  providers: [StorageService]
})

export class OldResponsesPage {
  journals: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storageService: StorageService) {
    this.load()
  }

  load(){

    this.storageService.getAllJournalEntries().then( (data) => {
      this.journals = data;
    });

  }

  getDay(j) {
    return moment.unix(j.timestamp).format("DD");
  }
  getMonth(j) {
    return moment.unix(j.timestamp).format("MMM");
  }
  getTime(j){
    return moment.unix(j.timestamp).format("h:mm a");
  }

  removeJournalEntry(j){
    this.storageService.removeJournalEntry(j).then( () => {
      this.load();
    });
  }

  expandEntry(j){
    this.navCtrl.push(JournalDetailPage, {
       journal: j
    })
  }


}
