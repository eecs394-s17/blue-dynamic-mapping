import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PromptService } from '../../providers/prompt-service';
import { StorageService } from '../../providers/storage-service';

import { Prompt } from '../../models/prompt';
import { PromptPage } from '../prompt-page/prompt-page';
import { SummaryPage } from '../summary-page/summary-page';
import { MantraPage } from '../mantra-page/mantra-page';

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
    this.time_stamp = Math.floor(Date.now());
    console.log("root time:" + this.time_stamp);
  }

  load() {
    this.promptService.fetchPrompts().then((prompts: Prompt[]) => {
      this.setPrompts(prompts);
      console.log(prompts);
    });
  }

  setPrompts(prompts) {
    this.prompts = prompts;
    this.current_prompt_index = 0;
    this.displayNextPrompt();
  }

  displayNextPrompt() {
    this.navCtrl.push(PromptPage, {
      prompt: this.prompts[this.current_prompt_index],
      first: this.current_prompt_index == 0,
      last: this.current_prompt_index == this.prompts.length - 1,
      time_stamp: this.time_stamp,
      callback: this.promptCallback
    });
  }

  displayPrevPrompt() {
    this.navCtrl.pop();
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
        // this.storageService.saveMostRecentResponse(this.prompts, this.responses).then((res) => {
        //   console.log(res);
        //   this.storageService.getMostRecentReponse().then((res) => {
        //     console.log(res);
        //   });
        // });

        this.navCtrl.push(SummaryPage, {
          prompts: this.prompts,
          responses: this.responses,
          time_stamp: this.time_stamp
        });
      }
    }
}
