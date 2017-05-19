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

    journals = journals.reverse();
    return journals;
  }

  async getMostRecentJournalEntry() {
    let all_journals = await this.getAllJournalEntries();
    return all_journals.slice(-1)[0];
  }

  async removeJournalEntry(j){
    let storage = await this.storage.ready();
    let all_journals = await this.getAllJournalEntries();
    let modified_journals = await this.determineKeytoDelete(all_journals, j);
    return this.storage.set(JOURNALS_KEY, modified_journals);
  }

  async determineKeytoDelete(all_journals, j){
    for(var i = 0; i < all_journals.length; i++) {
      if (all_journals[i].timestamp == j.timestamp){
        all_journals.splice(i,1);
        break;
      }
    }
    return all_journals;
  }

  clearKeys() {
    this.storage.clear().then(() => {
      console.log('Keys have been cleared');
      return true;
    });
  }
}
