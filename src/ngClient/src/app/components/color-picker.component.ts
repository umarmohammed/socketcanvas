import { Component } from '@angular/core';
import { ColorsService } from '../services/colors.service';

@Component({
  selector: 'app-color-picker',
  template: `
    <div
      *ngFor="let color of colors.all$ | async"
      class="picker"
      [style.background]="color.hex"
      (click)="colors.setColor(color.hex)"
      [class.selected]="color.selected"
    ></div>
  `,
  styles: [
    `
      :host {
        display: flex;
        justify-content: space-evenly;
        width: 100%;
      }
      .picker {
        padding: 30px;
        border-radius: 50%;
        border: 5px solid white;
      }
      .picker.selected {
        border: 5px solid yellow;
      }
    `
  ]
})
export class ColorPickerComponent {
  constructor(public colors: ColorsService) {}
}
