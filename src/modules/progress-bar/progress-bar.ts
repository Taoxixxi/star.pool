import { Component, Input } from '@angular/core';

@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.html'
})
export class ProgressBarComponent {

  @Input('progress') progress;

  constructor() {

  }

  get_percent(v) {
      if(v <= 100.0) {
          return v.toFixed(1) + '%';
      }
      return '100.0%';
  }
}
