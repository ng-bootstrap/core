import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbDatepicker, NgbDatepickerContent} from './datepicker';
import {NgbDatepickerMonth} from './datepicker-month';
import {NgbDatepickerNavigation} from './datepicker-navigation';
import {NgbInputDatepicker} from './datepicker-input';
import {NgbDatepickerDayView} from './datepicker-day-view';
import {NgbDatepickerNavigationSelect} from './datepicker-navigation-select';

export {NgbDatepicker, NgbDatepickerContent, NgbDatepickerNavigateEvent, NgbDatepickerState} from './datepicker';
export {NgbInputDatepicker} from './datepicker-input';
export {NgbCalendar, NgbPeriod, NgbCalendarGregorian} from './ngb-calendar';
export {NgbCalendarIslamicCivil} from './hijri/ngb-calendar-islamic-civil';
export {NgbCalendarIslamicUmalqura} from './hijri/ngb-calendar-islamic-umalqura';
export {NgbCalendarPersian} from './jalali/ngb-calendar-persian';
export {NgbCalendarHebrew} from './hebrew/ngb-calendar-hebrew';
export {NgbDatepickerI18nHebrew} from './hebrew/datepicker-i18n-hebrew';
export {NgbCalendarBuddhist} from './buddhist/ngb-calendar-buddhist';
export {NgbDatepickerMonth} from './datepicker-month';
export {NgbDatepickerDayView} from './datepicker-day-view';
export {NgbDatepickerNavigation} from './datepicker-navigation';
export {NgbDatepickerNavigationSelect} from './datepicker-navigation-select';
export {NgbDatepickerConfig} from './datepicker-config';
export {NgbInputDatepickerConfig} from './datepicker-input-config';
export {NgbDatepickerI18n, NgbDatepickerI18nDefault} from './datepicker-i18n';
export {NgbDateStruct} from './ngb-date-struct';
export {NgbDate} from './ngb-date';
export {NgbDateAdapter} from './adapters/ngb-date-adapter';
export {NgbDateNativeAdapter} from './adapters/ngb-date-native-adapter';
export {NgbDateNativeUTCAdapter} from './adapters/ngb-date-native-utc-adapter';
export {NgbDateParserFormatter} from './ngb-date-parser-formatter';
export {NgbDatepickerKeyboardService} from './datepicker-keyboard-service';

@NgModule({
  declarations: [
    NgbDatepicker, NgbDatepickerContent, NgbDatepickerMonth, NgbDatepickerNavigation, NgbDatepickerNavigationSelect,
    NgbDatepickerDayView, NgbInputDatepicker
  ],
  exports: [NgbDatepicker, NgbDatepickerContent, NgbInputDatepicker, NgbDatepickerMonth],
  imports: [CommonModule, FormsModule],
  entryComponents: [NgbDatepicker]
})
export class NgbDatepickerModule {
}
