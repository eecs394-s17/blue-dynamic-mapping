import { Component } from '@angular/core';

import { Prompt } from '../../models/prompt';


@Component({
  	selector: 'prompt-page',
  	templateUrl: 'prompt-page.html'
})

export class PromptPage {
	prompt: Prompt;

  	constructor() {
  		let p = new Prompt();
  		p.question = "Aha suh Aki?"
  		p.responses = ["NM u?", "jchillen", "same as stan", "Totony", "Seb Inc.", "Stan Was here", "gud", "gr8 m8 thx 4 askin"];
  		p.max_choices = 5;

  		this.prompt = p;
  	}

  	responseSelected(event, response) {
  		event.target.clicked != event.target.clicked;
  		console.log(event.target);
  		console.log("selected " + response);
  	}
}

class Selected {
	color: string = 'blue';
	outline: boolean = false;
}

class Unselected {
	color: string = 'red';
	outline: boolean = true;
}