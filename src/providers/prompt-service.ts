import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Prompt } from '../models/prompt';
import { ConfirmedResponses } from '../models/confirmed-response';
import { PROMPTS } from '../mock-prompts'

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

}
