import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class City {
  private _current: string = 'Dublin';

  constructor() {
  }

  get current(): string {
    return this._current;
  }

  set current(value: string) {
    this._current = value;
  }
}
