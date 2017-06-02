export class NgbDate {
  static from(date: {year: number, month?: number, day?: number}) {
    let nDate = date ? new NgbDate(date.year, date.month ? date.month : 1, date.day ? date.day : 1) : null;
    if (nDate) {
      // add 1 to year to prevent any date in last valid javascript Date being picked and causing issues around
      // September
      let jDate = new Date(nDate.year + 1, nDate.month - 1, nDate.day);
      if (isNaN(jDate.getTime())) {
        nDate = null;
      }
    }
    return nDate;
  }

  constructor(public year: number, public month: number, public day: number) {}

  equals(other: NgbDate) {
    return other && this.year === other.year && this.month === other.month && this.day === other.day;
  }

  before(other: NgbDate) {
    if (!other) {
      return false;
    }

    if (this.year === other.year) {
      if (this.month === other.month) {
        return this.day === other.day ? false : this.day < other.day;
      } else {
        return this.month < other.month;
      }
    } else {
      return this.year < other.year;
    }
  }

  after(other: NgbDate) {
    if (!other) {
      return false;
    }
    if (this.year === other.year) {
      if (this.month === other.month) {
        return this.day === other.day ? false : this.day > other.day;
      } else {
        return this.month > other.month;
      }
    } else {
      return this.year > other.year;
    }
  }

  toString() { return `${this.year}-${this.month}-${this.day}`; }
}
