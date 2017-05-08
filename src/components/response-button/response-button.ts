import { Component, Input } from '@angular/core';

@Component({
  	selector: 'response-button',
  	templateUrl: 'response-button.html'
})

export class ResponseButton {
	@Input() response: string;
  @Input() callback: (response: string, selected: boolean) => void; 
  selected: boolean;
  

  	constructor() {
  		this.selected = false;
  	}

  	responseSelected(event) {
  		this.selected = !this.selected;
      this.callback(this.response, this.selected);
  	}
}
