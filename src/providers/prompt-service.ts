import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Prompt } from '../models/prompt';
// import { ConfirmedResponses } from '../models/confirmed-response';
import { PROMPTS } from '../mock-prompts'

import * as firebase from "firebase";
import { FIREBASE_CONFIG } from "../../APP_SECRETS";
firebase.initializeApp(FIREBASE_CONFIG);

@Injectable()
export class PromptService {


  getUserPrompts(): Promise<Prompt[]> {
    return Promise.resolve(PROMPTS.map(this.parsePrompt));
  }

  parsePrompt(data): Prompt {
  	let p = new Prompt();
  	p.question = data.question;
  	p.responses = data.responses;
  	p.max_choices = data.max_choices;
  	return p;
  }

  fetchPrompts(){

    let prompts = []
    return firebase.database().ref('/Prompts/').once('value').then((snapshot) => {
        var promptJSONS = snapshot.val();
        prompts = prompts.concat(promptJSONS.map(this.JSONtoPrompt));
        return prompts
  })

  }

  getUserTimeStamps(){
    // let time_stamps = [];
    return firebase.database().ref('/Users/1/').once('value').then((snapshot) => {
        var time_stamps = snapshot.val();
        // console.log("getUserTimeStamps:"+Object.keys(time_stamps));
        return Object.keys(time_stamps);
    })
  }

  JSONtoPrompt(data){
    let p = new Prompt();
    p.question = data.question;
    p.max_choices = data.max_choices;
    p.responses = data.responses;
    return p;
  }

  postArgumentTracking(response){
    firebase.database().ref('/Users/').child('1').child('1').set({
      responses: response
    });
  }


  recordResponse(time_stamp, question, response){

    var database = firebase.database();
    this.getUserTimeStamps().then((time_stamps)=>{
      console.log(time_stamps);
      console.log(time_stamp.toString());
      // console.log("time_stamps: "+time_stamps.indexOf("1494705326902"));
      if(time_stamps.indexOf(time_stamp.toString())<0){
        // console.log("not have this time_stamp!"+time_stamps.indexOf(time_stamp));
        database.ref('/Users/1/').child(time_stamp).child(question).push(response);

      }
      else{
        console.log("this time_stamp alreay exist!");
        database.ref('/Users/1/'+time_stamp+"/").child(question).push(response);
      }
    })
    // console.log("recordResponse:"+time_stamp+question+response);
  }








}
