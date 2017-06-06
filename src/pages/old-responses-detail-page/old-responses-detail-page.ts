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
  // response: any;
  prompts: Prompt[];
  questions: string[];
  responses: any;

  responses_list: string[];
  questions_list: string[];


  constructor(public navCtrl: NavController, public navParams: NavParams, private promptService: PromptService) {

    // for(var i=0;i<this.prompts.length;i++){
    //   console.log("question:"+this.prompts[i].question);
    //   for(var j=0;j<this.responses_list[i].length;j++){
    //     console.log("response "+j+this.responses_list[i][j]);
    //     // this.promptService.recordResponse(this.time_stamp,this.prompts[i].question,this.responses_list[i][j]);
    //   }
    // }
    this.responses_list = [];
    this.time_stamp = navParams.get('time_stamp');
    this.questions = [];
    this.responses = {};

    let response = navParams.get('response');
    for (var q in response) {
      // change "fullstophere" back to "."
      // if(q.indexOf("fullstophere") != -1){
      //   this.questions.push(q.replace("fullstophere", "."));
      // }
      // // console.log("q: "+q);
      // else{
      this.questions.push(q);
      // }
      this.responses[q] = response[q];
      console.log(q+": "+ this.responses[q]);
    }

    // console.log(this.questions);


    // console.log("detail time_stamp: "+this.time_stamp);
    this.load();
    // console.log("responses_list[0]"+this.responses_list);
    // console.log("detail responses_list:"+this.responses_list);
  }

  load() {
    // this.promptService.fetchOldQuestions(this.time_stamp).then((questions) => {
    //   this.questions_list = questions;
    //   console.log("questions_list: "+this.questions_list);
    //   for(var i=0; i<this.questions_list.length; i++){
    //     this.promptService.fetchOldResponses(this.time_stamp, this.questions_list[i]).then((responses) => {
    //       console.log(responses);
    //       this.responses_list.push(responses);
    //       // console.log("detail responses_list "+i+": "+this.responses_list[i]);

    //       console.log("detail responses_list "+0+": "+this.responses_list[0]);
    //       console.log("detail responses_list "+1+": "+this.responses_list[1]);
    //       console.log("detail responses_list "+2+": "+this.responses_list[2]);
    //       console.log("detail responses_list "+3+": "+this.responses_list[3]);
    //       console.log("detail responses_list "+4+": "+this.responses_list[4]);
    //     })
    //   }
    // })
  }







}
