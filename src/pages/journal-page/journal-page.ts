import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PromptsRootPage } from '../prompts-root-page/prompts-root-page';
import { FormBuilder } from '@angular/forms';

import { OldJournalsPage } from '../view-old-journals-page/view-old-journals-page';
import { StorageService } from '../../providers/storage-service';

@Component({
  selector: 'journal-page',
  templateUrl: 'journal-page.html',
  providers: [StorageService]
})

export class JournalPage {

  public journalForm: any;
  public dateTime : number;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, private storageService: StorageService) {

    this.journalForm = formBuilder.group({
        subject: [''],
        thoughts: ['']
    })

  }

  storeJournal(){
    this.dateTime = Math.round((new Date()).getTime() / 1000)
    this.storageService.saveMostRecentJournalEntry(this.dateTime, this.journalForm.value.subject, this.journalForm.value.thoughts). then((res) => {
      this.navCtrl.push(OldJournalsPage)
    });

  }
}
