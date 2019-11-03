import { Component } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  template: `
    <div
      *ngFor="let color of colors"
      class="picker"
      [style.background]="color"
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
      }
    `
  ]
})
export class ColorPickerComponent {
  colors = ['#000', '#f00', '#0f0', '#00f'];
}
