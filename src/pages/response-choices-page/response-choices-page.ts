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
  //current_prompt_index: number;
  //time_stamp: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private promptService: PromptService, private storageService: StorageService) {
    this.responses = this.navParams.get('responses');
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


}
