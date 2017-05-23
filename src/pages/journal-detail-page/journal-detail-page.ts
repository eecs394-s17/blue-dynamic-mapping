import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { OldJournalsPage } from '../view-old-journals-page/view-old-journals-page';

import * as moment from 'moment';

@Component({
  selector: 'journal-detail-page',
  templateUrl: 'journal-detail-page.html',
})

export class JournalDetailPage {

  public journal: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  	this.journal = navParams.get('journal');

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

}
