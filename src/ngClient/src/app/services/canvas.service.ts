import { Injectable, ElementRef } from '@angular/core';
import { Point } from '../models/point';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CanvasService {
  private ctx: CanvasRenderingContext2D;
  private canvasRect: ClientRect;
  private canvasEl: HTMLCanvasElement;

  initCanvas(canvas: ElementRef) {
    this.canvasEl = canvas.nativeElement;
    this.ctx = this.canvasEl.getContext('2d');

    this.ctx.lineWidth = 20;
    this.ctx.lineCap = 'round';

    this.canvasRect = this.canvasEl.getBoundingClientRect();
  }

  touchEventToPoint(touchEvent: TouchEvent): Point {
    return {
      x: touchEvent.touches[0].clientX - this.canvasRect.left,
      y: touchEvent.touches[0].clientY - this.canvasRect.top,
      start: touchEvent.type === 'touchstart'
    };
  }

  drawPoint(point: Point) {
    point.start ? this.drawStartPoint(point) : this.drawMovePoint(point);
  }

  private drawStartPoint(point: Point) {
    this.ctx.beginPath();
    this.ctx.moveTo(point.x, point.y);
  }

  private drawMovePoint(point: Point) {
    this.ctx.lineTo(point.x, point.y);
    this.ctx.stroke();
    this.ctx.moveTo(point.x, point.y);
  }
}
