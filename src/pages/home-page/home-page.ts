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
