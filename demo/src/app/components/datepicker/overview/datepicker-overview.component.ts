import { ChangeDetectionStrategy, Component } from '@angular/core';

import { environment } from '../../../../environments/environment';

import {Snippet} from '../../../shared/code/snippet';
import { NgbdDemoList } from '../../shared';
import { NgbdOverview } from '../../shared/overview';

@Component({
  selector: 'ngbd-datepicker-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './datepicker-overview.component.html',
  host: {
    '[class.overview]': 'true'
  }
})

export class NgbdDatepickerOverviewComponent {

  snippets = {
    basic: Snippet({
      lang: 'html',
      code: `
        <!-- 1. inline datepicker -->
        <ngb-datepicker #d></ngb-datepicker>

        <!-- 2. datepicker in the popup -->
        <input type="text" ngbDatepicker #d="ngbDatepicker"/>
      `,
    }),
    popup: Snippet({
      lang: 'html',
      code: `
        <input type="text" ngbDatepicker #d="ngbDatepicker"/>
        <button (click)="d.toggle()">Toggle</button>
      `,
    }),
    form: Snippet({
      lang: 'html',
      code: `
        <input type="text" ngbDatepicker [(ngModel)]="date"/>
      `,
    }),
    selection: Snippet({
      lang: 'html',
      code: `
        <!-- inline -->
        <ngb-datepicker (dateSelect)="onDateSelect($event)"></ngb-datepicker>

        <!-- in the popup -->
        <input type="text" ngbDatepicker (dateSelect)="onDateSelect($event)"/>
      `,
    }),
    navigation: Snippet({
      lang: 'html',
      code: `
        <ngb-datepicker #d [startDate]="{year: 1789, month: 7}"></ngb-datepicker>
        <button (click)="d.navigateTo({year: 2048, month: 1})">Goto JAN 2048</button>
      `,
    }),
    dateStruct: Snippet({
      lang: 'typescript',
      code: `
        const date: NgbDateStruct = { year: 1789, month: 7, day: 14 }; // July, 14 1789
      `,
    }),
    date: Snippet({
      lang: 'typescript',
      code: `
        const date: NgbDate = new NgbDate(1789, 7, 14);                // July, 14 1789

        date.before({ year: 1789, month: 7, day: 14 });                // compare to a structure
        date.equals(NgbDate.from({ year: 1789, month: 7, day: 14 }));  // or to another date object
      `,
    }),
    nativeAdapter: Snippet({
      lang: 'typescript',
      code: `
        // native adapter is bundled with library
        providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]

        // or another native adapter that works with UTC dates
        providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeUTCAdapter}]
      `,
    }),
    adapter: Snippet({
      lang: 'typescript',
      code: `
        @Injectable()
        export abstract class NgbDateAdapter<D> {
          abstract fromModel(value: D): NgbDateStruct; // from your model -> internal model
          abstract toModel(date: NgbDateStruct): D; // from internal model -> your mode
        }

        // create your own if necessary
        providers: [{provide: NgbDateAdapter, useClass: YourOwnDateAdapter}]
      `,
    }),
    formatter: Snippet({
      lang: 'typescript',
      code: `
        @Injectable()
        export abstract class NgbDateParserFormatter {
          abstract parse(value: string): NgbDateStruct; // from input -> internal model
          abstract format(date: NgbDateStruct): string; // from internal model -> string
        }

        // create your own if necessary
        providers: [{provide: NgbDateParserFormatter, useClass: YourOwnParserFormatter}]
      `,
    }),
    dayTemplate: Snippet({
      lang: 'html',
      code: `
        <ng-template #t let-date>
        	{{ date.day }}
        </ng-template>

        <ngbDatepicker [dayTemplate]=“t”/>
      `,
    }),
    contentTemplate: Snippet({
      lang: 'html',
      code: `
        <ngb-datepicker #datepicker
                        [startDate]="{month: 8, year: 2016}"
                        [displayMonths]="2">
          <ng-template ngbDatepickerContent>
            <div *ngFor="let monthStruct of datepicker.state.months">
              <span>{{i18n.getMonthFullName(monthStruct.month)}} {{monthStruct.year}}</span>
              <ngb-datepicker-month-view [month]="monthStruct"></ngb-datepicker-month-view>
            </div>
          </ng-template>
        </ngb-datepicker>
      `,
    }),
    todayHTML: Snippet({
      lang: 'html',
      code: `
        <div class="ngb-dp-day ngb-dp-today">
          <!-- day cell content omitted -->
        </div>
      `,
    }),
    todayTemplate: Snippet({
      lang: 'html',
      code: `
        <ng-template #t let-today="today">
          <span *ngIf="today">...</span>
        </ng-template>

        <ngbDatepicker [dayTemplate]=“t”/>
      `,
    }),
    footerTemplate: Snippet({
      lang: 'html',
      code: `
        <ng-template #t>
          <button (click)="model = today">Today</button>
        </ng-template>

        <ngbDatepicker [footerTemplate]=“t”/>
      `,
    }),
    disablingTS: Snippet({
      lang: 'typescript',
      code: `
        // disable the 13th of each month
        const isDisabled = (date: NgbDate, current: {month: number}) => date.day === 13;
      `,
    }),
    disablingHTML: Snippet({
      lang: 'html',
      code: `
        <ngb-datepicker [minDate]="{year: 2010, month: 1, day: 1}"
                        [maxDate]="{year: 2048, month: 12, day: 31}"
                        [markDisabled]="isDisabled">
        </ngb-datepicker>
      `,
    }),
    i18n: Snippet({
      lang: 'typescript',
      code: `
        @Injectable()
        export abstract class NgbDatepickerI18n {
          abstract getWeekdayShortName(weekday: number): string;
          abstract getMonthShortName(month: number): string;
          abstract getMonthFullName(month: number): string;
          abstract getDayAriaLabel(date: NgbDateStruct): string;
        }

        // provide your own if necessary
        providers: [{provide: NgbDatepickerI18n, useClass: YourOwnDatepickerI18n}]
      `,
    }),
  };

  bootstrapVersion = environment.bootstrap;

  sections: NgbdOverview = {};

  constructor(demoList: NgbdDemoList) {
    this.sections = demoList.getOverviewSections('datepicker');
  }
}
