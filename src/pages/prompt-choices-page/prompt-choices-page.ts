import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

import { PromptService } from '../../providers/prompt-service';
import { StorageService } from '../../providers/storage-service';

import { Prompt } from '../../models/prompt';
import { PromptPage } from '../prompt-page/prompt-page';
import { ResponseChoicesPage } from '../response-choices-page/response-choices-page';

@Component({
  selector: 'prompt-choices-page',
  templateUrl: 'prompt-choices-page.html',
  providers: [PromptService, StorageService]
})

export class PromptChoicesPage {
  prompts: any[];
  responses: any;
  //current_prompt_index: number;
  //time_stamp: any;

  constructor(public navCtrl: NavController, private promptService: PromptService, private storageService: StorageService) {
    this.load();

    //this.time_stamp = Math.floor(Date.now());
    //console.log("root time:" + this.time_stamp);
  }

  load() {
    this.promptService.fetchQuestionAndResponseChoices().then((prompts: any[]) => {
      this.setPrompts(prompts);
    });
  }

  setPrompts(prompts) {
    this.prompts = prompts;
    console.log(prompts);

  }

  itemTapped(event, item) {

    //let view = this.navCtrl.getActive().component.name;
  	this.navCtrl.push(ResponseChoicesPage, {
  		responses: this.prompts[item].response_data,
      callback: this.promptCallback});
  }

  displayNextPrompt() {
    // this.navCtrl.push(PromptPage, {
    //   prompt: this.prompts[this.current_prompt_index],
    //   first: this.current_prompt_index == 0,
    //   last: this.current_prompt_index == this.prompts.length - 1,
    //   time_stamp: this.time_stamp,
    //   callback: this.promptCallback
    // });
  }

  displayPrevPrompt() {
    this.navCtrl.pop();
  }

  promptCallback = (forward) => {
      this.load();
    }
}
