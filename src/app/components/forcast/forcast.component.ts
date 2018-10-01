import { Component, OnInit, ElementRef } from '@angular/core';
import { City } from '../../city.service';
import * as d3 from '../../../d3.min';

type forcast = {
	date: number,
	name: string,
	iconNum: string,
	weatherDesc: string,
	temp: string
};

type graphDataPt = {
	x: number,
	y_avg: number, 
	y_min: number,
	y_max: number,
};

type datum = {
	x: number,
	y: number
}

@Component({
	selector: 'forcast',
	templateUrl: './forcast.component.html',
	styleUrls: ['./forcast.component.scss']
})
export class ForcastComponent implements OnInit {
	private forcastDays: forcast[] = [];
	private graphData: graphDataPt[] = [];
	private readonly zeroKelvin: number = 273.15;
	private readonly days: string[] = [
		'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
	];

	constructor(
		private el: ElementRef,
		private city: City
	) { }

	ngOnInit() {
		let url =
			'http://api.openweathermap.org/data/2.5/forecast?q=' +
			this.city.current +
			'&APPID=a1d05b2b8a0e1a54cfe36b1dabdc519b';

		fetch(url)
			.then(resp => resp.json())
			.then(data => {
				let currentDate = new Date().getDate(),
					i = 0;
				while (this.forcastDays.length < 3 && i < data.list.length) {
					let d = new Date(data.list[i].dt_txt);
					if (d.getDate() !== currentDate) {
						currentDate = d.getDate();
						let iconNum = parseInt(data.list[i].weather[0].icon).toString();
						if (iconNum.length === 1) {
							iconNum = '0' + iconNum.toString();
						}
						this.forcastDays.push({
							date: currentDate,
							name: this.days[d.getDay()],
							iconNum: iconNum,
							weatherDesc: data.list[i].weather[0].description,
							temp: (data.list[i].main.temp - this.zeroKelvin).toFixed(1)
						});
					}
					i += 1;
				}
				this.graphData = data.list.map(i => {
					return {
						x: i.dt * 1000,
						y: parseFloat((i.main.temp - this.zeroKelvin).toFixed(2))
					}
				});
				this.renderGraph();
			});
	}

	renderGraph() {
		let svg = d3.select(this.el.nativeElement).select('svg'),
			margin = {top: 60, right: 20, bottom: 30, left: 50},
			width = +svg.attr('width') - margin.left - margin.right,
			height = +svg.attr('height') - margin.top - margin.bottom,
			g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

		svg.attr('style', 'overflow: visible');

		let x = d3.scaleTime().rangeRound([0, width]),
			y = d3.scaleLinear().rangeRound([height, 0]);
		
		let line = d3.line()
			.x(d => x(d.x))
			.y(d => y(d.y));

		x.domain(d3.extent(this.graphData, d => d.x));
		y.domain(d3.extent(this.graphData, d => d.y));
		
		g.append('g')
			.attr('transform', `translate(0, ${height})`)
			.call(d3.axisBottom(x))
			.selectAll('.tick:nth-child(2n - 1)')
			.remove();
		
		g.append('g')
			.call(d3.axisLeft(y))
			.append('text')
				.attr('fill', 'darkslategray')
				.attr('transform', 'rotate(-90)')
				.attr('y', 6)
				.attr('dy', '0.71em')
				.attr('text-anchor', 'end')
				.text('Temperature (Celcius)');
		
		g.append('path')
			.datum(this.graphData)
			.attr('fill', 'none')
			.attr('stroke', 'darkorange')
			.attr('stroke-linejoin', 'round')
			.attr('stroke-linecap', 'round')
			.attr('stroke-width', 2)
			.attr('d', line);

		let formatDate = d => {
			d = new Date(d);
			return this.days[d.getDay()] + ' ' + d.toTimeString().substring(0, 5);
		}
			
		let popovers = g.selectAll('g.dataPt')
			.data(this.graphData)
			.enter()
			.append('g')
			.attr('class', 'dataPt');

		popovers.append('circle')
			.attr('fill', 'darkorange')
			.attr('r', 5)
			.attr('cx', d => x(d.x))
			.attr('cy', d => y(d.y));

		popovers.append('text')
			.attr('x', d => x(d.x) + 15)
			.attr('y', d => y(d.y) + 5)
			.attr('opacity', '0')
			.attr('style', `
				pointer-events: none;
				transition: opacity 0.2s;
			`)
			.html(d => `${formatDate(d.x)} - ${d.y}&deg;`);

		popovers.on('mouseover', function() {
			d3.select(this).select('text')
				.attr('opacity', 1);
			d3.select(this).select('circle')
				.attr('r', 10);
		});
		popovers.on('mouseout', function() {
			d3.select(this).select('text')
				.attr('opacity', 0);
			d3.select(this).select('circle')
				.attr('r', 5);
		});
	}
}