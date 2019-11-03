import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CanvasService } from './services/canvas.service';
import { OcrService } from './services/ocr.service';
import { Point } from './models/point';

@Component({
  selector: 'app-root',
  template: `
    <canvas
      #canvas
      width="300"
      height="500"
      (touchmove)="onTouchEvent($event)"
      (touchstart)="onTouchEvent($event)"
    ></canvas>
  `,
  styles: [
    `
      :host {
        display: grid;
        place-items: center;
        height: 80vh;
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

  constructor(private canvasService: CanvasService, private ocr: OcrService) {
    this.ocr.point$.subscribe((point: Point) =>
      this.canvasService.drawPoint(point)
    );
  }

  ngAfterViewInit() {
    this.canvasService.initCanvas(this.canvas);
  }

  onTouchEvent(touchEvent: TouchEvent) {
    this.ocr.onTouch(touchEvent);
  }
}
