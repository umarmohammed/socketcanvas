import { Injectable, ElementRef } from '@angular/core';
import { Point } from '../models/point';
import { Subject } from 'rxjs';
import { ColorsService } from './colors.service';
import { withLatestFrom, map } from 'rxjs/operators';
import { SocketService } from './socket.service';

@Injectable({ providedIn: 'root' })
export class CanvasService {
  private ctx: CanvasRenderingContext2D;
  private canvasRect: ClientRect;
  private canvasEl: HTMLCanvasElement;

  private pointSubject = new Subject<Point>();
  point$ = this.pointSubject.asObservable().pipe(
    withLatestFrom(this.colors.selectedColor$),
    map(([point, color]) => ({ ...point, color }))
  );

  constructor(private colors: ColorsService, private socket: SocketService) {
    this.socket.point$.subscribe((point: Point) => this.drawPoint(point));
    this.point$.subscribe(point => this.socket.send(point));
  }

  initCanvas(canvas: ElementRef) {
    this.canvasEl = canvas.nativeElement;
    this.ctx = this.canvasEl.getContext('2d');

    this.ctx.lineWidth = 20;
    this.ctx.lineCap = 'round';

    this.canvasRect = this.canvasEl.getBoundingClientRect();
  }

  onTouch(touchEvent: TouchEvent) {
    const point = this.touchEventToPoint(touchEvent);
    this.pointSubject.next(point);
  }

  drawPoint(point: Point) {
    point.start ? this.drawStartPoint(point) : this.drawMovePoint(point);
  }

  private touchEventToPoint(touchEvent: TouchEvent): Point {
    return {
      x: touchEvent.touches[0].clientX - this.canvasRect.left,
      y: touchEvent.touches[0].clientY - this.canvasRect.top,
      start: touchEvent.type === 'touchstart'
    };
  }

  private drawStartPoint(point: Point) {
    this.ctx.beginPath();
    this.ctx.moveTo(point.x, point.y);
  }

  private drawMovePoint(point: Point) {
    this.ctx.lineTo(point.x, point.y);
    this.ctx.stroke();
    this.ctx.strokeStyle = point.color;
    this.ctx.moveTo(point.x, point.y);
  }
}
