import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

class ColorPickerState {
  hex: string;
  selected: boolean;
}

const initialState: ColorPickerState[] = [
  { hex: '#000', selected: true },
  { hex: '#f00', selected: false },
  { hex: '#0f0', selected: false },
  { hex: '#00f', selected: false }
];

class State {
  colors: ColorPickerState[];
}

@Injectable({ providedIn: 'root' })
export class ColorsService {
  private store = new BehaviorSubject<State>({ colors: initialState });

  selectedColor$ = this.store.pipe(
    map(state => state.colors.find(color => color.selected).hex)
  );

  all$ = this.store.pipe(map(state => state.colors));

  setColor(hex: string) {
    const state = this.store.value;

    const colors = state.colors.map(color =>
      color.hex === hex
        ? { hex: color.hex, selected: true }
        : { hex: color.hex, selected: false }
    );

    this.store.next({
      colors
    });
  }
}
