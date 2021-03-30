import {Component, ChangeDetectionStrategy} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

const items = ['one', 'two', 'three'];

@Component({templateUrl: './typeahead-autoclose.component.html', changeDetection: ChangeDetectionStrategy.OnPush})
export class TypeaheadAutoCloseComponent {
  showHint = false;

  search(text$: Observable<string>) {
    return text$.pipe(
        map(term => (term === '' ? items : items.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1))
                        .slice(0, 10)));
  }
}
