import { Component, OnInit } from '@angular/core';
import { City } from '../../city.service';
import { Statement } from '@angular/compiler';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private readonly cities: string[] = [
    'Athlone',
    'Belfast',
    'Cork',
    'Derry',
    'Donegal',
    'Dublin',
    'Galway',
    'Limerick',
    'Waterford'
  ];

  private dropdownOpen: boolean = false;

  constructor(private city: City) {
  }

  private changeCity(c) {
    this.city.current = c;
  }
}


