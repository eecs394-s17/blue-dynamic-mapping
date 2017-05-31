import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

import { PromptService } from '../../providers/prompt-service';
import { StorageService } from '../../providers/storage-service';

import { Prompt } from '../../models/prompt';
import { PromptPage } from '../prompt-page/prompt-page';
import { SummaryPage } from '../summary-page/summary-page';
import { MantraPage } from '../mantra-page/mantra-page';

@Component({
  selector: 'love-language-choices-page',
  templateUrl: 'love-language-choices-page.html',
  providers: [PromptService, StorageService]
})

export class LoveLanguageChoicesPage {
  // prompts: Prompt[];
  love_language_list: string[];
  love_language_selected: boolean[];
  callback: (boolean) => void;
  //current_prompt_index: number;
  //time_stamp: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private promptService: PromptService, private storageService: StorageService) {
    this.love_language_list = this.navParams.get('love_languages');
    // console.log("love-language-choices-page love_language_list: "+this.love_language_list);
    this.callback = navParams.get('callback');
    this.love_language_selected = [];
    this.load();

    //this.time_stamp = Math.floor(Date.now());
    //console.log("root time:" + this.time_stamp);
  }

  load() {
    for(var i=0; i<this.love_language_list.length; i++){
      console.log("love_language_list "+i+": "+this.love_language_list[i]);
      this.promptService.isLoveLanguageSelected(this.love_language_list[i]).then((seleted) => {
        console.log(seleted);
        this.love_language_selected.push(seleted);
        console.log("love_language_selected: "+this.love_language_selected);

      })
    }
  }

  subscribe(l, i){
    console.log("l: "+l);
    console.log("index: "+this.love_language_selected[i]);
    if(this.love_language_selected[i] == true){
      this.love_language_selected[i] = false;
      this.promptService.makeLoveLanguageInActive(l);

    }
    else{
      this.love_language_selected[i] = true;
      this.promptService.makeLoveLanguageActive(l);

    }
    this.callback(true);
  }

}
