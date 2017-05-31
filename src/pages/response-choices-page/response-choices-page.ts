import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

import { PromptService } from '../../providers/prompt-service';
import { StorageService } from '../../providers/storage-service';

import { Prompt } from '../../models/prompt';
import { PromptPage } from '../prompt-page/prompt-page';
import { SummaryPage } from '../summary-page/summary-page';
import { MantraPage } from '../mantra-page/mantra-page';

@Component({
  selector: 'response-choices-page',
  templateUrl: 'response-choices-page.html',
  providers: [PromptService, StorageService]
})

export class ResponseChoicesPage {
  prompts: Prompt[];
  responses: any;
  callback: (boolean) => void;
  //current_prompt_index: number;
  //time_stamp: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private promptService: PromptService, private storageService: StorageService) {
    this.responses = this.navParams.get('responses');
    this.callback = navParams.get('callback');
    this.load();

    //this.time_stamp = Math.floor(Date.now());
    //console.log("root time:" + this.time_stamp);
  }

  load() {
    this.promptService.fetchPrompts().then((prompts: Prompt[]) => {
     // this.setPrompts(prompts);
    });
  }

  // setPrompts(prompts) {
  //   this.prompts = prompts;
  //   this.displayNextPrompt();
  // }

  // itemTapped(event, item) {

  //   let view = this.navCtrl.getActive().component.name;
  // 	this.navCtrl.push(ItemDetailsPage, {
  // 		item: item});
  // }

  subscribe(r){

    if(r.is_active == true ){
      this.promptService.makeResponseInactive(r.key);
      // console.log(' TRUE cal.name ' + cal.name)
      // console.log('TRUE cal.subscribed ' + cal.subscribed)
      // console.log('TRUE cal.id ' + cal.id)
    }
    else{
      this.promptService.makeResponseActive(r.key);
      // console.log('FALSE cal.name ' + cal.name)
      // console.log('FALSE cal.subscribed ' + cal.subscribed)
      // console.log('FALSE cal.id ' + cal.id)
    }
    this.callback(true);
  }

}
