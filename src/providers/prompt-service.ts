import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Prompt } from '../models/prompt';
import { Responses } from '../models/responses';
// import { ConfirmedResponses } from '../models/confirmed-response';
import { PROMPTS } from '../mock-prompts'

import * as firebase from "firebase";
import { FIREBASE_CONFIG } from "../../APP_SECRETS";
firebase.initializeApp(FIREBASE_CONFIG);

@Injectable()
export class PromptService {
  getUserId() {
    return '1';
  }

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

  async fetchPrompts() {
    let question_map = await this.fetchQuestionMap();
    let response_map = await this.fetchResponseMap();
    let prompt_map = await this.fetchPromptMap();
    let prompt_order = await this.fetchPromptOrder();
    let active_response_map = await this.fetchActiveResponseMap();

    let prompt_JSONs = this.generatePromptJSONS(prompt_map, question_map, response_map, active_response_map);
    let sorted_prompt_JSONs = this.sortPromptJSONs(prompt_order, prompt_JSONs);

    let prompts = sorted_prompt_JSONs.map(this.JSONtoPrompt);
    console.log(prompts);
    return prompts;
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
      // console.log(time_stamps);
      // console.log(time_stamp.toString());
      // console.log("time_stamps: "+time_stamps.indexOf("1494705326902"));
      if(time_stamps.indexOf(time_stamp.toString())<0){
        // console.log("not have this time_stamp!"+time_stamps.indexOf(time_stamp));
        database.ref('/Users/1/PriorResponses').child(time_stamp).child(question).push(response);

      }
      else{
        console.log("this time_stamp alreay exist!");
        database.ref('/Users/1/PriorResponses'+time_stamp+"/").child(question).push(response);
      }
    })
    // console.log("recordResponse:"+time_stamp+question+response);
  }




  // New Stuff
  async fetchDataAtRef(ref) {
    let snapshot = await firebase.database().ref(ref).once('value');
    return snapshot.val();
  }

  async fetchQuestionMap() {
    return this.fetchDataAtRef('/QuestionMap/');
  }

  async fetchResponseMap() {
    return this.fetchDataAtRef('/ResponseMap/');
  }

  async fetchPromptMap() {
    return this.fetchDataAtRef('/PromptMap/');
  }

  async fetchPromptOrder() {
    return this.fetchDataAtRef('/PromptOrder/');
  }

  async fetchActiveResponseMap() {
    return this.fetchDataAtRef('/Users/' + this.getUserId() + '/' + 'ResponseChoices');
  }

  generatePromptJSONS(prompt_map, question_map, response_map, active_response_map) {
    let prompts = [];
    for (var prompt_key in prompt_map) {
      let prompt = prompt_map[prompt_key];

      let question_key = prompt.question_key;
      let question = question_map[question_key];

      let response_keys = prompt.response_keys;
      let responses = [];
      response_keys.forEach((key) => {
        if (!(key in active_response_map && active_response_map[key] == false)) {
          responses.push(response_map[key]);
        }
      });

      let p = {
        key: prompt_key,
        question: question,
        responses: responses
      };

      prompts.push(p);
    }

    return prompts;
  }

  sortPromptJSONs(prompt_order, prompt_JSONs) {
    prompt_JSONs.sort((lhs, rhs) =>  {
      return prompt_order[lhs.key] - prompt_order[rhs.key];
    });

    return prompt_JSONs;
  }

  async fetchQuestionAndResponseChoices() {
    let question_map = await this.fetchQuestionMap();
    let response_map = await this.fetchResponseMap();
    let prompt_map = await this.fetchPromptMap();  
    let active_response_map = await this.fetchActiveResponseMap();

    let data = [];
    for (var prompt_key in prompt_map) {
      let prompt = prompt_map[prompt_key];

      let question_key = prompt.question_key;
      let question = question_map[question_key];
      let question_data = {text: question, key: question_key};

      let response_keys = prompt.response_keys;
      let response_data = [];
      response_keys.forEach((key) => {
        let is_active = !(key in active_response_map && active_response_map[key] == false);
        response_data.push({
            text:      response_map[key], 
            key:       key, 
            is_active: is_active
          });
      });

      data.push({question_data: question_data, response_data: response_data});
    }

    return data;
  }

  async makeResponseActive(response_key) {
    return firebase.database().ref('/Users/').child(this.getUserId()).child('ResponseChoices').child(response_key).set(true);
  }

  async makeResponseInactive(response_key) {
    return firebase.database().ref('/Users/').child(this.getUserId()).child('ResponseChoices').child(response_key).set(false);
  }
}
