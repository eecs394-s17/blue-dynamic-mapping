import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PromptService } from '../../providers/prompt-service';
import { Prompt } from '../../models/prompt';
import { PromptPage } from '../prompt-page/prompt-page';
import { HomePage } from '../home-page/home-page';

@Component({
  selector: 'old-responses-detail-page',
  templateUrl: 'old-responses-detail-page.html',
  providers: [PromptService]
})

export class OldResponsesDetailPage {
  time_stamp: any;
  prompts: Prompt[];
  responses_list = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, private promptService: PromptService) {

    // for(var i=0;i<this.prompts.length;i++){
    //   console.log("question:"+this.prompts[i].question);
    //   for(var j=0;j<this.responses_list[i].length;j++){
    //     console.log("response "+j+this.responses_list[i][j]);
    //     // this.promptService.recordResponse(this.time_stamp,this.prompts[i].question,this.responses_list[i][j]);
    //   }
    // }
    this.time_stamp = navParams.get('time_stamp');
    console.log("time_stamp: "+this.time_stamp);
    this.load();
    // console.log("responses_list[0]"+this.responses_list);
  }

  load() {
    this.promptService.fetchPrompts().then((prompts: Prompt[]) => {
      this.prompts = prompts;
      console.log("history responses detail:"+this.prompts);
      this.promptService.fetchOldResponses(this.time_stamp, this.prompts[0].question);
      // console.log(this.promptService.fetchOldResponses(this.time_stamp, this.prompts[0].question));
    });



  }

  getResponses(time_stamp, question){

  }








}
