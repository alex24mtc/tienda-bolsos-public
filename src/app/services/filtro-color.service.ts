import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FiltroColorService {
  color = localStorage.getItem('colorFiltroColor')  ?   localStorage.getItem('colorFiltroColor')  : null;

  constructor() {}

  get() {
    return this.color;
  }
  set(filtro) {
    this.color = filtro;
    localStorage.setItem('colorFiltroColor', this.color);
  }
}