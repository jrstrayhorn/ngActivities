import { Component, Input } from '@angular/core';
import { ICar } from './demo';

@Component({
  selector: 'app-car-item',
  template: '<li>{{car.color}}</li>',
})
export class CarItemComponent {
  @Input()
  car: ICar;
}
