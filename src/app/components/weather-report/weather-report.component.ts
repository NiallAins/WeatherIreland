import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'weather-report',
  templateUrl: './weather-report.component.html',
  styleUrls: ['./weather-report.component.scss']
})
export class WeatherReportComponent implements OnInit {

  @Input() icon: string  = '';
  @Input() desc: string = '';
  @Input() temp: string = '';

  private iconUrl: string = 'https://vortex.accuweather.com/adc2010/images/slate/icons/'

  constructor() { }

  ngOnInit() {
  }
}
