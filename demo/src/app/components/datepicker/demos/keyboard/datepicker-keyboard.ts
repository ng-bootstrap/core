import {Component, Injectable} from '@angular/core';
import {NgbDatepicker, NgbDatepickerKeyboardService, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

const Key = {
  PageUp: 'PageUp',
  PageDown: 'PageDown',
  End: 'End',
  Home: 'Home'
};

@Injectable()
export class CustomKeyboardService extends NgbDatepickerKeyboardService {
  processKey(event: KeyboardEvent, dp: NgbDatepicker) {
    const state = dp.state;
    switch (event.code) {
      case Key.PageUp:
        dp.focusDate(dp.calendar.getPrev(state.focusedDate, event.altKey ? 'y' : 'm'));
        break;
      case Key.PageDown:
        dp.focusDate(dp.calendar.getNext(state.focusedDate, event.altKey ? 'y' : 'm'));
        break;
      case Key.End:
        dp.focusDate(event.altKey ? state.maxDate : state.lastDate);
        break;
      case Key.Home:
        dp.focusDate(event.altKey ? state.minDate : state.firstDate);
        break;
      default:
        super.processKey(event, dp);
        return;
    }
    event.preventDefault();
    event.stopPropagation();
  }
}

@Component({
  selector: 'ngbd-datepicker-keyboard',
  templateUrl: './datepicker-keyboard.html',
  providers: [{provide: NgbDatepickerKeyboardService, useClass: CustomKeyboardService}]
})
export class NgbdDatepickerKeyboard {
  model: NgbDateStruct;
}
