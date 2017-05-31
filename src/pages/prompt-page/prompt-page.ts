import { Component } from '@angular/core';
import { NavController, NavParams, ViewController} from 'ionic-angular';

import { Prompt } from '../../models/prompt';
import { PromptService } from '../../providers/prompt-service'


@Component({
  	selector: 'prompt-page',
  	templateUrl: 'prompt-page.html',
    providers: [PromptService]
})

export class PromptPage {
	prompt: Prompt;
	selected_responses: Set<string>;
	can_go_back: boolean;
	can_go_next: boolean;
	first: boolean;
	last: boolean;
  time_stamp: any; // get current time_stamp from prompts-root-page
	callback: (responses: Set<string>, forward: boolean) => void;

  	constructor(private navController: NavController, private navParams: NavParams, private viewCtrl: ViewController, private promptService: PromptService) {
  		this.selected_responses = new Set();
  		this.callback = navParams.get('callback');
  		this.prompt = navParams.get('prompt');
  		this.first = navParams.get('first');
  		this.last = navParams.get('last');
  		this.can_go_back = !this.first;
  		this.can_go_next = true;
      this.time_stamp = navParams.get('time_stamp');
  	}

  	ionViewWillEnter() {
  		this.viewCtrl.showBackButton(!this.can_go_back);
  	}

  	nextText() {
  		return 'Next';
  	}

  	responseSelected = (response, selected) => {
  		if (selected) {
  			this.selected_responses.add(response);
        console.log("select reponse:"+this.time_stamp+" "+response);

  		} else {
  			this.selected_responses.delete(response);
        console.log("delete response:"+this.time_stamp+" "+response);
  		}
  	}

    select_ans(response) {
      this.selected_responses.add(response);
    }



  	backAction(event) {
  		this.callback(this.selected_responses, false);
  	}

  	nextAction(event) {
  		this.callback(this.selected_responses, true);
  	}
  }
