import {isNumber, toInteger} from '../util/util';

export class NgbTime {
  hour: number;
  minute: number;
  second: number;

  constructor(hour?: number, minute?: number, second?: number) {
    this.hour = toInteger(hour);
    this.minute = toInteger(minute);
    this.second = toInteger(second);
  }

  changeHour(step = 1) { this.updateHour((isNaN(this.hour) ? 0 : this.hour) + step); }

  updateHour(hour: number) {
    if (isNumber(hour)) {
      this.hour = (hour < 0 ? 24 + hour : hour) % 24;
    } else {
      this.hour = NaN;
    }
  }

  changeMinute(step = 1) { this.updateMinute((isNaN(this.minute) ? 0 : this.minute) + step); }

  updateMinute(minute: number) {
    if (isNumber(minute)) {
      this.minute = minute % 60 < 0 ? 60 + minute % 60 : minute % 60;
      this.changeHour(Math.floor(minute / 60));
    } else {
      this.minute = NaN;
    }
  }

  changeSecond(step = 1) { this.updateSecond((isNaN(this.second) ? 0 : this.second) + step); }

  updateSecond(second: number) {
    if (isNumber(second)) {
      this.second = second < 0 ? 60 + second % 60 : second % 60;
      this.changeMinute(Math.floor(second / 60));
    } else {
      this.second = NaN;
    }
  }

  isValid(checkSecs = true) {
    return isNumber(this.hour) && isNumber(this.minute) && (checkSecs ? isNumber(this.second) : true);
  }

  toString() { return `${this.hour || 0}:${this.minute || 0}:${this.second || 0}`; }

  before(time: NgbTime, compareSecsIfSpecified = true) {
    return this.hour < time.hour || (this.hour === time.hour && this.minute < time.minute) ||
        (compareSecsIfSpecified && this.second && time.second && this.hour === time.hour &&
         this.minute === time.minute && this.second < time.second);
  }

  after(time: NgbTime, compareSecsIfSpecified = true) {
    return this.hour > time.hour || (this.hour === time.hour && this.minute > time.minute) ||
        (compareSecsIfSpecified && this.second && time.second && this.hour === time.hour &&
         this.minute === time.minute && this.second > time.second);
  }
}
