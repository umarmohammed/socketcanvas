import { Injectable, ElementRef } from '@angular/core';
import { Point } from '../models/point';
import { Subject } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CanvasService {
  private ctx: CanvasRenderingContext2D;
  canvasRect: ClientRect;
  canvasEl: HTMLCanvasElement;

  private pointSubject = new Subject<Point>();
  point$ = this.pointSubject.asObservable();

  characterImage$ = this.pointSubject.pipe(
    debounceTime(1000),
    map(() => this.canvasEl)
  );

  characterImageDataUrl$ = this.characterImage$.pipe(
    map(canvasEl => canvasEl.toDataURL()),
    tap(() => this.clear())
  );

  initCanvas(canvas: ElementRef) {
    this.canvasEl = canvas.nativeElement;
    this.ctx = this.canvasEl.getContext('2d');

    this.ctx.lineWidth = 35;
    this.ctx.lineCap = 'round';

    this.canvasRect = this.canvasEl.getBoundingClientRect();
  }

  onTouch(touchEvent: TouchEvent) {
    const point = this.touchEventToPoint(touchEvent);
    this.drawPoint(point);
    this.pointSubject.next(point);
  }

  private touchEventToPoint(touchEvent: TouchEvent): Point {
    return {
      x: touchEvent.touches[0].clientX - this.canvasRect.left,
      y: touchEvent.touches[0].clientY - this.canvasRect.top,
      start: touchEvent.type === 'touchstart'
    };
  }

  private clear() {
    this.ctx.clearRect(0, 0, this.canvasRect.width, this.canvasRect.height);
  }

  private drawPoint(point: Point) {
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
