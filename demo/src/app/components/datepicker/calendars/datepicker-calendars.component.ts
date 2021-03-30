import {Component} from '@angular/core';

import {Snippet} from '../../../shared/code/snippet';
import {NgbdExamplesPage} from '../../shared/examples-page/examples.component';
import {NgbdDatepickerHebrew} from '../demos/hebrew/datepicker-hebrew';
import {NgbdDatepickerHebrewModule} from '../demos/hebrew/datepicker-hebrew.module';
import {NgbdDatepickerIslamicCivilModule} from '../demos/islamiccivil/datepicker-islamic-civil.module';
import {NgbdDatepickerIslamiccivil} from '../demos/islamiccivil/datepicker-islamiccivil';
import {NgbdDatepickerIslamicUmalquraModule} from '../demos/islamicumalqura/datepicker-islamic-umalqura.module';
import {NgbdDatepickerIslamicumalqura} from '../demos/islamicumalqura/datepicker-islamicumalqura';
import {NgbdDatepickerJalali} from '../demos/jalali/datepicker-jalali';
import {NgbdDatepickerJalaliModule} from '../demos/jalali/datepicker-jalali.module';
import { NgbdDatepickerBuddhistModule } from '../demos/buddhist/datepicker-buddhist.module';
import { NgbdDatepickerBuddhist } from '../demos/buddhist/datepicker-buddhist';

export const DEMO_CALENDAR_MODULES = [
  NgbdDatepickerHebrewModule,
  NgbdDatepickerJalaliModule,
  NgbdDatepickerIslamicCivilModule,
  NgbdDatepickerIslamicUmalquraModule,
  NgbdDatepickerBuddhistModule
];

const DEMOS = [
  {
    id: 'hebrew',
    title: 'Hebrew',
    type: NgbdDatepickerHebrew,
    code: require('!!raw-loader!./../demos/hebrew/datepicker-hebrew').default,
    markup: require('!!raw-loader!./../demos/hebrew/datepicker-hebrew.html').default
  },
  {
    id: 'jalali',
    title: 'Jalali',
    type: NgbdDatepickerJalali,
    code: require('!!raw-loader!./../demos/jalali/datepicker-jalali').default,
    markup: require('!!raw-loader!./../demos/jalali/datepicker-jalali.html').default
  },
  {
    id: 'islamiccivil',
    title: 'Islamic Civil',
    type: NgbdDatepickerIslamiccivil,
    code: require('!!raw-loader!./../demos/islamiccivil/datepicker-islamiccivil').default,
    markup: require('!!raw-loader!./../demos/islamiccivil/datepicker-islamiccivil.html').default
  },
  {
    id: 'islamicumalqura',
    title: 'Islamic Umm al-Qura',
    type: NgbdDatepickerIslamicumalqura,
    code: require('!!raw-loader!./../demos/islamicumalqura/datepicker-islamicumalqura').default,
    markup: require('!!raw-loader!./../demos/islamicumalqura/datepicker-islamicumalqura.html').default
  },
  {
    id: 'buddhist',
    title: 'Buddhist',
    type: NgbdDatepickerBuddhist,
    code: require('!!raw-loader!./../demos/buddhist/datepicker-buddhist')
      .default,
    markup: require('!!raw-loader!./../demos/buddhist/datepicker-buddhist.html')
      .default,
  },
];

@Component({
  selector: 'ngbd-datepicker-calendars',
  template: `
    <p>
      Datepicker relies on <code>NgbCalendar</code> abstract class for calendar-related calculations.
      Default implementation is the <code>NgbCalendarGregorian</code>, but can be any
      calendar that has notion of days, months and years.
    </p>

    <p>For instance, other calendar implementations available are:</p>
    <ul class="list-unstyled ml-4">
      <li><code>NgbCalendarHebrew</code> + <code>NgbDatepickerI18nHebrew</code></li>
      <li><code>NgbCalendarPersian</code></li>
      <li><code>NgbCalendarIslamicCivil</code></li>
      <li><code>NgbCalendarIslamicUmalqura</code></li>
    </ul>

    <ngb-alert [dismissible]="false">
      Please note that calendar support is experimental!
      We're not calendar experts and any community help is very much appreciated.
    </ngb-alert>

    <p>
      To use any of them, simply provide a different calendar implementation.
      Some calendars (like Hebrew in the example and demo below) also come with i18n support
      to override the way day/week/year numerals and weekday/month names are displayed.
    </p>

    <ngbd-code [snippet]="snippets.calendars"></ngbd-code>

    <br>

    <p>Here are some demos of the calendars you can use</p>

    <br>

    <ngbd-widget-demo *ngFor="let demo of demos"
      [id]="demo.id"
      [demoTitle]="demo.title"
      [code]="demo.code"
      [markup]="demo.markup"
      component="datepicker"
    >
      <ng-template [ngComponentOutlet]="demo.type"></ng-template>
    </ngbd-widget-demo>
  `
})
export class NgbdDatepickerCalendarsComponent extends NgbdExamplesPage {
  demos = DEMOS;

  snippets = {
    calendars: Snippet({
      lang: 'typescript',
      code: `
        providers: [
          {provide: NgbCalendar, useClass: NgbCalendarHebrew},
          {provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nHebrew}
      ]
      `,
    }),
  };
}
