import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PromptService } from '../../providers/prompt-service';
import { StorageService } from '../../providers/storage-service';

import { Prompt } from '../../models/prompt';
import { PromptPage } from '../prompt-page/prompt-page';
import { SummaryPage } from '../summary-page/summary-page';
import { MantraPage } from '../mantra-page/mantra-page';
import { ReminderPage } from '../reminder-page/reminder-page';

@Component({
  selector: 'prompts-root-page',
  templateUrl: 'prompts-root-page.html',
  providers: [PromptService, StorageService]
})

export class PromptsRootPage {
  prompts: Prompt[];
  responses: any;
  current_prompt_index: number;
  time_stamp: any;

  constructor(public navCtrl: NavController, private promptService: PromptService, private storageService: StorageService) {
    this.load();
    this.responses = {};  
    this.time_stamp = Math.round((new Date()).getTime() / 1000);
    console.log("root time:" + this.time_stamp);
  }

  load() {
    this.promptService.fetchPrompts().then((prompts: Prompt[]) => {
      this.setPrompts(prompts);
    });
  }

  setPrompts(prompts) {
    this.prompts = prompts;
    this.current_prompt_index = 0;
    this.displayNextPrompt();
  }

  displayNextPrompt() {
    this.navCtrl.setRoot(PromptPage, {
      prompt: this.prompts[this.current_prompt_index],
      first: this.current_prompt_index == 0,
      last: this.current_prompt_index == this.prompts.length-1,
      time_stamp: this.time_stamp,
      current: this.current_prompt_index,
      callback: this.promptCallback
    });
  }

  displayPrevPrompt() {
    this.navCtrl.setRoot(PromptPage, {
      prompt: this.prompts[this.current_prompt_index],
      first: this.current_prompt_index == 0,
      last: this.current_prompt_index == this.prompts.length-1,
      time_stamp: this.time_stamp,
      current: this.current_prompt_index,
      callback: this.promptCallback
    });
  }

  promptCallback = (responses, forward) => {
      this.responses[this.current_prompt_index] = responses;
      if (forward && this.current_prompt_index < this.prompts.length - 1) {
        this.current_prompt_index++;
        this.displayNextPrompt();
      } else if (!forward) {
        this.current_prompt_index--;
        this.displayPrevPrompt();
      } else {
        this.navCtrl.push(ReminderPage, {
          prompts: this.prompts,
          responses: this.responses,
          time_stamp: this.time_stamp
        });
      }
    }
}
