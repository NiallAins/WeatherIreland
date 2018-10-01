import { Component } from '@angular/core';
import { City } from './city.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor(private city: City) {
	}
}
