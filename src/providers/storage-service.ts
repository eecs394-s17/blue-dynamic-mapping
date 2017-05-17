import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import { Prompt } from '../models/prompt';

const JOURNALS_KEY = "journals_key";

@Injectable()
export class StorageService {

  constructor(private storage: Storage) {

  }

  async saveMostRecentJournalEntry(date, subject, thoughts){
    console.log('saving journal');
    
    let journals = await this.getAllJournalEntries();
   
    journals.push({
       timestamp: date,
       subject: subject,
       thougts: thoughts
    });

    return this.storage.set(JOURNALS_KEY, journals);
  }

  async getAllJournalEntries() {
    let storage = await this.storage.ready();
    let journals = await this.storage.get(JOURNALS_KEY);
    if (!journals) {
      journals = [];
    }

    return journals;
  }

  async getMostRecentJournalEntry() {
    let all_journals = await this.getAllJournalEntries();
    return all_journals.slice(-1)[0];
  }
}
