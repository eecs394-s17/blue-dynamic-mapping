import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PromptService } from '../../providers/prompt-service';
import { Prompt } from '../../models/prompt';
import { PromptPage } from '../prompt-page/prompt-page';
import { HomePage } from '../home-page/home-page';

@Component({
  selector: 'summary-page',
  templateUrl: 'summary-page.html',
  providers: [PromptService]
})

export class SummaryPage {
  prompts: Prompt[];
  responses_list = [];

  received_responses: any;
  current_prompt_index: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private promptService: PromptService) {
    this.received_responses = {};

    this.prompts = this.navParams.get('prompts');
    this.received_responses = this.navParams.get('responses');

    this.load();  
  }

  load() {

    this.promptService.getUserPrompts().then((prompts: Prompt[]) => {
      this.setPrompts(prompts);
    });

    this.getUserResponses();

  }

  setPrompts(prompts) {
    this.prompts = prompts;
    this.current_prompt_index = 0;
    console.log(this.prompts);
  }

  getUserResponses(){
    var totalLength = Object.keys(this.received_responses).length;
    let temp_list = []
    for (var i = 0; i < totalLength; i++){
      temp_list[i] = Array.from((this.received_responses[i]).values())
    }

    console.log(temp_list);
    console.log(this.received_responses);

    this.responses_list = temp_list;

  }

  returnHome(){
    this.navCtrl.setRoot(HomePage);
  }


}  