import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Prompt } from '../models/prompt';
import { PROMPTS } from '../mock-prompts'

@Injectable()

export class PromptService {

  getUserPrompts(): Promise<Prompt[]> {
    return Promise.resolve(PROMPTS);
  }
}
