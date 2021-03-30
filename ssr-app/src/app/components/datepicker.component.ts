import { Component } from '@angular/core';

@Component({
  selector: 'datepicker-component',
  template: `
    <form class="form-inline">
      <div class="form-group mr-5">
        <ngb-datepicker [(ngModel)]="model1" name="inline" [startDate]="model1"></ngb-datepicker>
      </div>

      <div class="form-group">
        <div class="input-group">
          <input class="form-control" placeholder="yyyy-mm-dd"
                 name="popup" [(ngModel)]="model2" ngbDatepicker #d="ngbDatepicker">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" (click)="d.toggle()" type="button">Open</button>
          </div>
        </div>
      </div>
    </form>
  `
})
export class DatepickerComponent {
  model1 = {year: 1789, month: 7, day: 14};
  model2 = {year: 1789, month: 7, day: 14};
}
