import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PromptsRootPage } from '../prompts-root-page/prompts-root-page';

@Component({
  selector: 'home-page',
  templateUrl: 'home-page.html'
})
export class HomePage {
	
  constructor(public navCtrl: NavController) {

  }

  pushJournal(event) {

  }

  pushTrackArgument(event){
  	this.navCtrl.push(PromptsRootPage);
  }


}
