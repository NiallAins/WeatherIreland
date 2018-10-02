import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ForcastComponent } from './components/forcast/forcast.component';
import { CurrentComponent } from './components/current/current.component';
import { WeatherReportComponent } from './components/weather-report/weather-report.component';

const appRoutes: Routes = [
  {
    path: 'current',
    component:  CurrentComponent
  },
  {
    path: 'forcast',
    component:  ForcastComponent
  },
  {
    path: 'WeatherIreland/current',
    component:  CurrentComponent
  },
  {
    path: 'WeatherIreland/forcast',
    component:  ForcastComponent
  },
  {
    path: '',
    component:  HomeComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ForcastComponent,
    CurrentComponent,
    WeatherReportComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
