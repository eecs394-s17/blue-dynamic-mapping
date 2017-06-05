import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { PromptService } from '../../providers/prompt-service';
import { Prompt } from '../../models/prompt';
import { OldResponsesDetailPage } from '../old-responses-detail-page/old-responses-detail-page';
import * as moment from 'moment';

@Component({
  selector: 'view-old-responses-page',
  templateUrl: 'view-old-responses-page.html',
  // providers: [StorageService]
  providers: [PromptService]
})

export class OldResponsesPage {
  time_stamps: any;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams, private promptService: PromptService) {
    this.load()
  }

  load(){

    this.promptService.getUserTimeStamps().then((data) => {
      if(data == undefined){
        this.time_stamps = [];
      }
      else{
        this.time_stamps = data.reverse();
      }
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

  expandEntry(t){
    // let loader = this.loadingCtrl.create({
    //   content: "Please wait...",
    // });

    // loader.present();
    this.promptService.fetchOldResponse(t).then((response) => {
      // loader.dismiss();
      this.navCtrl.push(OldResponsesDetailPage, {
        time_stamp: t,
        response: response
      });
    });

    
  }


}
