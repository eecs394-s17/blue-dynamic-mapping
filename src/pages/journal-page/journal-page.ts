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
    this.dateTime = new Date().getTime();
    this.storageService.saveMostRecentJournalEntry(this.dateTime, this.journalForm.value.subject, this.journalForm.value.thoughts). then((res) => {
      console.log(res);
    });
    this.storageService.getMostRecentJournalEntry().then((data) => {
      this.navCtrl.push(OldJournalsPage) 
    });
  }


 // this.storageService.saveMostRecentResponse(this.prompts, this.responses).then((res) => {
    //   console.log(res);
    //   this.storageService.getMostRecentReponse().then((res) => {
    //     console.log(res);
    //   });
    // });

  // pushSummary(event) {
  //   this.storageService.getMostRecentReponse().then((data) => {
  //     console.log(data);
  //     this.navCtrl.push(SummaryPage, {
  //         prompts: data.getItem('prompts'),
  //         responses: data.getItem('responses')
  //       });
  //   });
  // }



}
