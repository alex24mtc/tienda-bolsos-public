import { Component, OnInit } from '@angular/core';
import {style, state, animate, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-animaciones',
  templateUrl: './animaciones.component.html',
  styleUrls: ['./animaciones.component.scss'],

  animations: [
    trigger('fadeInOut', [
    transition(':enter', [ // :enter is alias to 'void => *'
    style({opacity:0}),
    animate(500, style({opacity:1}))
    ]),
    transition(':leave', [ // :leave is alias to '* => void'
    animate(500, style({opacity:0}))
    ])
    ])
    ]


})
export class AnimacionesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
