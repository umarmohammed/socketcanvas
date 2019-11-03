import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { webSocket } from 'rxjs/webSocket';
import { CanvasService } from './canvas.service';

@Injectable({ providedIn: 'root' })
export class OcrService {
  private url = `${environment.baseUrl}api/point`;

  private subject = webSocket(this.url);

  point$ = this.subject.asObservable();

  constructor(private canvas: CanvasService) {}

  onTouch(touchEvent: TouchEvent) {
    const point = this.canvas.touchEventToPoint(touchEvent);
    this.subject.next(point);
  }
}
