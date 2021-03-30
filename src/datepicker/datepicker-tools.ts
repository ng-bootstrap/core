import {NgbDate} from './ngb-date';
import {DatepickerViewModel, DayViewModel, MonthViewModel} from './datepicker-view-model';
import {NgbCalendar} from './ngb-calendar';
import {NgbDatepickerI18n} from './datepicker-i18n';

export function isChangedDate(prev?: NgbDate | null, next?: NgbDate | null): boolean {
  return !dateComparator(prev, next);
}

export function isChangedMonth(prev?: NgbDate | null, next?: NgbDate | null): boolean {
  return !prev && !next ? false : !prev || !next ? true : prev.year !== next.year || prev.month !== next.month;
}

export function dateComparator(prev?: NgbDate | null, next?: NgbDate | null): boolean {
  return (!prev && !next) || (!!prev && !!next && prev.equals(next));
}

export function checkMinBeforeMax(minDate?: NgbDate | null, maxDate?: NgbDate | null): void {
  if (maxDate && minDate && maxDate.before(minDate)) {
    throw new Error(`'maxDate' ${maxDate} should be greater than 'minDate' ${minDate}`);
  }
}

export function checkDateInRange(date?: NgbDate | null, minDate?: NgbDate | null, maxDate?: NgbDate | null): NgbDate |
    null {
  if (date && minDate && date.before(minDate)) {
    return minDate;
  }
  if (date && maxDate && date.after(maxDate)) {
    return maxDate;
  }

  return date || null;
}

export function isDateSelectable(date: NgbDate | null | undefined, state: DatepickerViewModel) {
  const {minDate, maxDate, disabled, markDisabled} = state;
  // clang-format off
  return !(
    date === null ||
    date === undefined ||
    disabled ||
    (markDisabled && markDisabled(date, {year: date.year, month: date.month})) ||
    (minDate && date.before(minDate)) ||
    (maxDate && date.after(maxDate))
  );
  // clang-format on
}

export function generateSelectBoxMonths(
    calendar: NgbCalendar, date: NgbDate, minDate: NgbDate | null, maxDate: NgbDate | null) {
  if (!date) {
    return [];
  }

  let months = calendar.getMonths(date.year);

  if (minDate && date.year === minDate.year) {
    const index = months.findIndex(month => month === minDate.month);
    months = months.slice(index);
  }

  if (maxDate && date.year === maxDate.year) {
    const index = months.findIndex(month => month === maxDate.month);
    months = months.slice(0, index + 1);
  }

  return months;
}

export function generateSelectBoxYears(date: NgbDate, minDate: NgbDate | null, maxDate: NgbDate | null) {
  if (!date) {
    return [];
  }

  const start = minDate ? Math.max(minDate.year, date.year - 500) : date.year - 10;
  const end = maxDate ? Math.min(maxDate.year, date.year + 500) : date.year + 10;

  const length = end - start + 1;
  const numbers = Array(length);
  for (let i = 0; i < length; i++) {
    numbers[i] = start + i;
  }

  return numbers;
}

export function nextMonthDisabled(calendar: NgbCalendar, date: NgbDate, maxDate: NgbDate | null) {
  const nextDate = Object.assign(calendar.getNext(date, 'm'), {day: 1});
  return maxDate != null && nextDate.after(maxDate);
}

export function prevMonthDisabled(calendar: NgbCalendar, date: NgbDate, minDate: NgbDate | null) {
  const prevDate = Object.assign(calendar.getPrev(date, 'm'), {day: 1});
  return minDate != null && (prevDate.year === minDate.year && prevDate.month < minDate.month ||
                             prevDate.year < minDate.year && minDate.month === 1);
}

export function buildMonths(
    calendar: NgbCalendar, date: NgbDate, state: DatepickerViewModel, i18n: NgbDatepickerI18n,
    force: boolean): MonthViewModel[] {
  const {displayMonths, months} = state;
  // move old months to a temporary array
  const monthsToReuse = months.splice(0, months.length);

  // generate new first dates, nullify or reuse months
  const firstDates = Array.from({length: displayMonths}, (_, i) => {
    const firstDate = Object.assign(calendar.getNext(date, 'm', i), {day: 1});
    months[i] = <any>null;

    if (!force) {
      const reusedIndex = monthsToReuse.findIndex(month => month.firstDate.equals(firstDate));
      // move reused month back to months
      if (reusedIndex !== -1) {
        months[i] = monthsToReuse.splice(reusedIndex, 1)[0];
      }
    }

    return firstDate;
  });

  // rebuild nullified months
  firstDates.forEach((firstDate, i) => {
    if (months[i] === null) {
      months[i] = buildMonth(calendar, firstDate, state, i18n, monthsToReuse.shift() || {} as MonthViewModel);
    }
  });

  return months;
}

export function buildMonth(
    calendar: NgbCalendar, date: NgbDate, state: DatepickerViewModel, i18n: NgbDatepickerI18n,
    month: MonthViewModel = {} as MonthViewModel): MonthViewModel {
  const {dayTemplateData, minDate, maxDate, firstDayOfWeek, markDisabled, outsideDays, weekdayWidth, weekdaysVisible} =
      state;
  const calendarToday = calendar.getToday();

  month.firstDate = <any>null;
  month.lastDate = <any>null;
  month.number = date.month;
  month.year = date.year;
  month.weeks = month.weeks || [];
  month.weekdays = month.weekdays || [];

  date = getFirstViewDate(calendar, date, firstDayOfWeek);

  // clearing weekdays, if not visible
  if (!weekdaysVisible) {
    month.weekdays.length = 0;
  }

  // month has weeks
  for (let week = 0; week < calendar.getWeeksPerMonth(); week++) {
    let weekObject = month.weeks[week];
    if (!weekObject) {
      weekObject = month.weeks[week] = {number: 0, days: [], collapsed: true};
    }
    const days = weekObject.days;

    // week has days
    for (let day = 0; day < calendar.getDaysPerWeek(); day++) {
      if (week === 0 && weekdaysVisible) {
        month.weekdays[day] = i18n.getWeekdayLabel(calendar.getWeekday(date), weekdayWidth);
      }

      const newDate = new NgbDate(date.year, date.month, date.day);
      const nextDate = calendar.getNext(newDate);

      const ariaLabel = i18n.getDayAriaLabel(newDate);

      // marking date as disabled
      let disabled = !!((minDate && newDate.before(minDate)) || (maxDate && newDate.after(maxDate)));
      if (!disabled && markDisabled) {
        disabled = markDisabled(newDate, {month: month.number, year: month.year});
      }

      // today
      let today = newDate.equals(calendarToday);

      // adding user-provided data to the context
      let contextUserData =
          dayTemplateData ? dayTemplateData(newDate, {month: month.number, year: month.year}) : undefined;

      // saving first date of the month
      if (month.firstDate === null && newDate.month === month.number) {
        month.firstDate = newDate;
      }

      // saving last date of the month
      if (newDate.month === month.number && nextDate.month !== month.number) {
        month.lastDate = newDate;
      }

      let dayObject = days[day];
      if (!dayObject) {
        dayObject = days[day] = {} as DayViewModel;
      }
      dayObject.date = newDate;
      dayObject.context = Object.assign(dayObject.context || {}, {
        $implicit: newDate,
        date: newDate,
        data: contextUserData,
        currentMonth: month.number,
        currentYear: month.year, disabled,
        focused: false,
        selected: false, today
      });
      dayObject.tabindex = -1;
      dayObject.ariaLabel = ariaLabel;
      dayObject.hidden = false;

      date = nextDate;
    }

    weekObject.number = calendar.getWeekNumber(days.map(day => day.date), firstDayOfWeek);

    // marking week as collapsed
    weekObject.collapsed = outsideDays === 'collapsed' && days[0].date.month !== month.number &&
        days[days.length - 1].date.month !== month.number;
  }

  return month;
}

export function getFirstViewDate(calendar: NgbCalendar, date: NgbDate, firstDayOfWeek: number): NgbDate {
  const daysPerWeek = calendar.getDaysPerWeek();
  const firstMonthDate = new NgbDate(date.year, date.month, 1);
  const dayOfWeek = calendar.getWeekday(firstMonthDate) % daysPerWeek;
  return calendar.getPrev(firstMonthDate, 'd', (daysPerWeek + dayOfWeek - firstDayOfWeek) % daysPerWeek);
}
