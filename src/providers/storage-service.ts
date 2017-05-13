import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import { Prompt } from '../models/prompt';

@Injectable()
export class StorageService {

  constructor(private storage: Storage) {

  }

  saveMostRecentJournalEntry(date, subject, thoughts){

    // var obj = JSON.parse( localStorage.getItem('obj') ) || {};
    console.log('saving journal');

    return this.storage.ready().then(() => {
      return this.storage.set('timestamp', date).then((res) => {
        console.log(res);
        return this.storage.set('subject', subject).then((res) => {
          console.log(res);
          return this.storage.set('thoughts', thoughts).then((res) => {
            console.log(res);
            return true;
          })
        })
      })
    })
  }

  getMostRecentJournalEntry(){
    console.log('fetching responses');
    return this.storage.ready().then(() => {
      return this.storage.get('timestamp').then((timestamp) => {
        return this.storage.get('subject').then((subject) => {
          return this.storage.get('thoughts').then((thoughts) => {
            return {
              timestamp: timestamp,
              subject: subject,
              thoughts: thoughts
            };
          });
        });
      })
    });
  }

}
