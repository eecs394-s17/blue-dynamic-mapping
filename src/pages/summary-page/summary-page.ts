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
  time_stamp: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private promptService: PromptService) {
    this.received_responses = {};

    this.prompts = this.navParams.get('prompts');
    this.received_responses = this.navParams.get('responses');
    this.time_stamp = this.navParams.get('time_stamp');
    this.load();
    // console.log("prompts:"+this.prompts.length);
    // console.log("responses_list:"+this.responses_list.length);
    for(var i=0;i<this.prompts.length;i++){
      // console.log("question:"+this.prompts[i].question);
      for(var j=0;j<this.responses_list[i].length;j++){
        // console.log("response "+j+this.responses_list[i][j]);
        this.promptService.recordResponse(this.time_stamp,this.prompts[i].question,this.responses_list[i][j]);
      }
    }

  }

  load() {

    this.promptService.getUserPrompts().then((prompts: Prompt[]) => {
      this.setPrompts(prompts);
    });

    this.getUserResponses();

    this.promptService.postArgumentTracking(this.responses_list);
    // console.log("summary-page time:"+this.time_stamp);
    // console.log("summary prompts:"+this.prompts);


  }

  setPrompts(prompts) {
    this.prompts = prompts;
    this.current_prompt_index = 0;
    // console.log(this.prompts);
  }

  getUserResponses(){
    var totalLength = Object.keys(this.received_responses).length;
    let temp_list = []
    for (var i = 0; i < totalLength; i++){
      temp_list[i] = Array.from((this.received_responses[i]).values())
    }

    // console.log("getUserResponses:"+temp_list);
    // console.log("getUserResponses:"+this.received_responses);

    this.responses_list = temp_list;

  }

  // recordQuestionsResponses(){
  //   for(var i=0; i < )
  // }

  returnHome(){
    this.navCtrl.setRoot(HomePage);
  }


}
