import { Component, OnInit } from '@angular/core';
import { City } from '../../city.service';

@Component({
	selector: 'current',
	templateUrl: './current.component.html',
	styleUrls: ['./current.component.scss']
})
export class CurrentComponent implements OnInit {

	private iconNum: string = '';
	private weatherDesc: string = '';
	private temp: string = '';
	private readonly zeroKelvin: number = 273.15;

	constructor(
		private city: City
	) { }

	ngOnInit() {
		let url =
			'http://api.openweathermap.org/data/2.5/weather?q=' +
			this.city.current +
			'&APPID=a1d05b2b8a0e1a54cfe36b1dabdc519b';

		fetch(url)
			.then(resp => resp.json())
			.then(data => {
				this.iconNum = parseInt(data.weather[0].icon).toString();
				if (this.iconNum.length === 1) {
					this.iconNum = '0' + this.iconNum.toString();
				}
				//Mock wait to demo loading animation
				setTimeout(() => {
					this.weatherDesc = data.weather[0].description;
					this.temp = (data.main.temp - this.zeroKelvin).toFixed(1);
				}, 1000);
			});
	}
}