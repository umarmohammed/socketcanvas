import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CanvasService } from './services/canvas.service';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  template: `
    <canvas
      #canvas
      width="300"
      height="500"
      (touchmove)="canvasService.onTouch($event)"
      (touchstart)="canvasService.onTouch($event)"
    ></canvas>
    <app-color-picker></app-color-picker>
  `,
  styles: [
    `
      :host {
        display: grid;
        place-items: center;
        height: calc(100vh - 30px);
        grid-template-rows: 1fr 70px;
      }
      canvas {
        border: 2px solid #1976d2;
        border-radius: 5px;
      }
    `
  ]
})
export class AppComponent implements AfterViewInit {
  @ViewChild('canvas', { static: false }) canvas: ElementRef;

  constructor(public canvasService: CanvasService, public ocr: SocketService) {}

  ngAfterViewInit() {
    this.canvasService.initCanvas(this.canvas);
  }
}
