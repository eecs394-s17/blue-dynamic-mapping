import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import { Prompt } from '../models/prompt';

@Injectable()
export class StorageService {

  constructor(private storage: Storage) {

  }

  saveMostRecentResponse(prompts: Prompt[], responses: any) {
    console.log('saving responses');
    return this.storage.ready().then(() => {
      return this.storage.set('prompts', prompts).then((res) => {
        console.log(res);
        return this.storage.set('responses', responses).then((res) => {
          console.log(res);
          return true;
        });
      });
      
      
    });
  }

  getMostRecentReponse() {
    console.log('fetching responses');
    return this.storage.ready().then(() => {
      return this.storage.get('prompts').then((prompts) => {
        return this.storage.get('responses').then((responses) => {
          return {
            prompts: prompts,
            responses: responses
          };
        });
      });
    }); 
  }


}
