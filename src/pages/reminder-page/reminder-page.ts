import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

import { Prompt } from '../../models/prompt';
import { SummaryPage } from '../summary-page/summary-page';
import { PromptService } from '../../providers/prompt-service';

@Component({
  	selector: 'reminder-page',
  	templateUrl: 'reminder-page.html',
    providers: [PromptService]
})

export class ReminderPage {
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
  love_language_list: string[];
  love_language_is_selected: boolean[];
  love_language_chosen: string[];

  	constructor(private navController: NavController, private navParams: NavParams, private viewCtrl: ViewController, private promptService: PromptService) {
  		this.selected_responses = new Set();
  		this.can_go_back = !this.first;
  		this.can_go_next = true;

		  this.responses = {};

    	this.prompts = this.navParams.get('prompts');
    	this.responses = this.navParams.get('responses');
      this.time_stamp = this.navParams.get('time_stamp');

      this.love_language_list = [];
      this.love_language_is_selected = [];
      this.love_language_chosen = [];


      this.load();
  	}

    load(){
      this.promptService.fetAllLoveLanguage().then((love_language_list) => {
        this.love_language_list = love_language_list;
        // console.log("reminder-page love_language_list: "+this.love_language_list);
        for(var i=0; i<this.love_language_list.length; i++){
          // console.log(i+": "+this.love_language_list[i]);
          this.promptService.isLoveLanguageSelected(this.love_language_list[i]).then((selected) => {
            // console.log(i+": "+selected);
            this.love_language_is_selected.push(selected);
            // console.log(this.love_language_is_selected);
            if(this.love_language_is_selected.length == this.love_language_list.length){
              // console.log("push done!");
              for(var j=0; j<this.love_language_is_selected.length; j++){
                if(this.love_language_is_selected[j] == true){
                  console.log(j+": "+this.love_language_is_selected[j]);
                  // this.love_language_chosen.push(this.love_language_list[j]);
                  this.promptService.getLoveLanguageURL(this.love_language_list[j]).then((url) => {
                    // console.log(this.love_language_list[j]+": "+url);
                    this.love_language_chosen.push(url);
                    console.log(this.love_language_chosen);
                  })
                }
              }

            }
          })
        }
      })
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
    	  time_stamp: this.time_stamp
        });
  	}
  }
