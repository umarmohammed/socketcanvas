import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { webSocket } from 'rxjs/webSocket';
import { Point } from '../models/point';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private url = `${environment.baseUrl}api/point`;

  private socketSubject = webSocket(this.url);

  point$ = this.socketSubject.asObservable();

  send(point: Point) {
    this.socketSubject.next(point);
  }
}
