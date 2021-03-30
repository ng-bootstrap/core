import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <ngb-alert type="success" [dismissible]="false">
        This is a minimal CLI app for issue reproduction purposes
      </ngb-alert>
    </div>
  `,
})
export class AppComponent {
}
