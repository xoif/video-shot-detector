import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="headline">
  <h1>Video Shot Detector</h1>
  </div>
  <VideoShotDetector></VideoShotDetector>
`,
  styles: [`
  .headline { box-shadow: 0 2px 0 rgba(0, 0, 0, 0.2); }
  `]
})
export class AppComponent {}
