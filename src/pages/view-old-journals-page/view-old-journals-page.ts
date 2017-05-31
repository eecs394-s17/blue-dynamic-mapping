import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { StorageService } from '../../providers/storage-service';
import { Prompt } from '../../models/prompt';
import { JournalDetailPage } from '../journal-detail-page/journal-detail-page';
import * as moment from 'moment';

@Component({
  selector: 'view-old-journals-page',
  templateUrl: 'view-old-journals-page.html',
  providers: [StorageService]
})

export class OldJournalsPage {
  journals: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, private storageService: StorageService) {
    this.load()
  }

  load(){

    this.storageService.getAllJournalEntries().then( (data) => {
      console.log(data);
      
      this.journals = data.sort(function(a, b){
        return b.timestamp-a.timestamp
      });
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
      let alert = this.alertCtrl.create({
      title: 'Confirm Delete Entry',
      message: 'Are you sure you want to delete this entry?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: ()=> {
            this.storageService.removeJournalEntry(j).then( () => {
              this.load();
            });
          }
        }
      ]
    });
    alert.present();
  }



  expandEntry(j){
    this.navCtrl.push(JournalDetailPage, {
       journal: j
    })
  }


}
