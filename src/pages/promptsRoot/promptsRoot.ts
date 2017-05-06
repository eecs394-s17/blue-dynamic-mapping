import { Component } from '@angular/core';
import { PromptService } from '../../providers/prompt-service';
import { Prompt } from '../../models/prompt';

@Component({
  selector: 'page-prompts-root',
  templateUrl: 'promptsRoot.html',
  providers: [PromptService]
})
export class promptsRootPage {
  constructor( private promptService: PromptService) {
    this.load();
    
  }

  load(){
 
    this.promptService.getUserPrompts().then((events: Prompt[]) => {
         console.log(events);

      });

  }

}
