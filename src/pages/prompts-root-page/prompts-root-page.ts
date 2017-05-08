import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PromptService } from '../../providers/prompt-service';
import { Prompt } from '../../models/prompt';
import { PromptPage } from '../prompt-page/prompt-page';

@Component({
  selector: 'prompts-root-page',
  templateUrl: 'prompts-root-page.html',
  providers: [PromptService]
})
export class PromptsRootPage {
  prompts: Prompt[];
  responses: any;
  current_prompt_index: number;

  constructor(public navCtrl: NavController, private promptService: PromptService) {
    this.load();  
    this.responses = {};
  }

  load() {
    this.promptService.getUserPrompts().then((prompts: Prompt[]) => {
      console.log(prompts);
      this.setPrompts(prompts);
    });
  }

  setPrompts(prompts) {
    this.prompts = prompts;
    this.current_prompt_index = 0;
    this.displayNextPrompt();
  }

  displayNextPrompt() {
    console.log("displaying prompt #", this.current_prompt_index);

    let callback = (responses, forward) => {
      this.responses[this.current_prompt_index] = responses;
      if (forward) {
        this.current_prompt_index++;
        this.displayNextPrompt();
      } else {
        this.current_prompt_index--;
        this.displayPrevPrompt();
      }
    }

    this.navCtrl.push(PromptPage, {
      prompt: this.prompts[this.current_prompt_index],
      first: this.current_prompt_index == 0,
      last: this.current_prompt_index == this.prompts.length - 1,
      callback: callback
    });
  }

  displayPrevPrompt() {
    this.navCtrl.pop();
    console.log("displaying prompt #", this.current_prompt_index);
  }
}  