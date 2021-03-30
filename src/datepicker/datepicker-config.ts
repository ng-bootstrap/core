import {Injectable, TemplateRef} from '@angular/core';
import {TranslationWidth} from '@angular/common';
import {DayTemplateContext} from './datepicker-day-template-context';
import {NgbDateStruct} from './ngb-date-struct';

/**
 * A configuration service for the [`NgbDatepicker`](#/components/datepicker/api#NgbDatepicker) component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the datepickers used in the application.
 */
@Injectable({providedIn: 'root'})
export class NgbDatepickerConfig {
  dayTemplate: TemplateRef<DayTemplateContext>;
  dayTemplateData: (date: NgbDateStruct, current?: {year: number, month: number}) => any;
  footerTemplate: TemplateRef<any>;
  displayMonths = 1;
  firstDayOfWeek = 1;
  markDisabled: (date: NgbDateStruct, current?: {year: number, month: number}) => boolean;
  minDate: NgbDateStruct;
  maxDate: NgbDateStruct;
  navigation: 'select' | 'arrows' | 'none' = 'select';
  outsideDays: 'visible' | 'collapsed' | 'hidden' = 'visible';
  showWeekdays = true;
  showWeekNumbers = false;
  startDate: {year: number, month: number};
  weekdays: TranslationWidth | boolean = TranslationWidth.Short;
}
