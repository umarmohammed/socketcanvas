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
        margin: 10px 0;
      }
      .picker {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 3px solid white;
      }
      .picker.selected {
        border: 3px solid yellow;
      }
    `
  ]
})
export class ColorPickerComponent {
  constructor(public colors: ColorsService) {}
}
