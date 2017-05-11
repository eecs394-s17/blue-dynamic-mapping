import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Prompt } from '../models/prompt';
import { ConfirmedResponses } from '../models/confirmed-response';
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

  




}
