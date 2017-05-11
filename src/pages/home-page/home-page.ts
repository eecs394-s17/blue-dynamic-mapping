import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PromptsRootPage } from '../prompts-root-page/prompts-root-page';

import { SummaryPage } from '../summary-page/summary-page';
import { StorageService } from '../../providers/storage-service';

@Component({
  selector: 'home-page',
  templateUrl: 'home-page.html',
  providers: [StorageService]
})
export class HomePage {
  // use code from https://github.com/driftyco/ionic-preview-app/tree/master/src/pages/slides/basic
  slides = [
    {
      title: "Welcome to the Dynamic Mapping!",
      description: "Dynamic mapping and integration is a form of couples counseling in which couples create a map of their relationship dynamic as a tool to identify, heal and improve problem areas of the relationship. The map includes elements from each person’s family of origin, communication styles, conflict areas and reactions, strength, vulnerabilities and goals. Couples collaboratively and compassionately integrate new awarenesses, tools and healthy new pathways to create a happier and peaceful relationship.",
    },

  ];

  constructor(public navCtrl: NavController, private storageService: StorageService) {

  }

  // pushSummary(event) {
  //   this.storageService.getMostRecentReponse().then((data) => {
  //     console.log(data);
  //     this.navCtrl.push(SummaryPage, {
  //         prompts: data.getItem('prompts'),
  //         responses: data.getItem('responses')
  //       });
  //   });
  // }

  pushTrackArgument(event){
  	this.navCtrl.push(PromptsRootPage);
  }


}
