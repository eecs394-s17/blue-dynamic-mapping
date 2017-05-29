import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

import { Prompt } from '../../models/prompt';
import { SummaryPage } from '../summary-page/summary-page';


@Component({
  	selector: 'mantra-page',
  	templateUrl: 'mantra-page.html'
})

export class MantraPage {
	prompt: Prompt;
	selected_responses: Set<string>;
	can_go_back: boolean;
	can_go_next: boolean;
	first: boolean;
	last: boolean;
	callback: (responses: Set<string>, forward: boolean) => void;

	mantra: string;

	prompts: Prompt[];
  responses_list = [];
	responses: any;
  time_stamp: any;

  	constructor(private navController: NavController, private navParams: NavParams, private viewCtrl: ViewController) {
  		this.selected_responses = new Set();
  		this.can_go_back = !this.first;
  		this.can_go_next = true;

		  this.responses = {};

    	this.prompts = this.navParams.get('prompts');
    	this.responses = this.navParams.get('responses');
      this.time_stamp = this.navParams.get('time_stamp');
  	}

  	ionViewWillEnter() {
  		this.viewCtrl.showBackButton(!this.can_go_back);
  	}

  	nextText() {
  		return 'Finish';
  	}

  	mantraEntered(enteredMantra){

		this.mantra = enteredMantra;
		console.log(this.mantra);
  	}


  	backAction(event) {
  		this.navController.pop();
  	}

  	nextAction(event) {

		 this.navController.push(SummaryPage, {
          prompts: this.prompts,
          responses: this.responses,
		  mantra: this.mantra,
      time_stamp: this.time_stamp
        });
  	}
  }
