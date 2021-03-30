import {Component, TemplateRef} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({templateUrl: './modal-nesting.component.html'})
export class ModalNestingComponent {
  constructor(private modalService: NgbModal) {}

  openModal(content: TemplateRef<any>) { this.modalService.open(content); }

  search = (text$: Observable<string>) => text$.pipe(map(() => ['one', 'two', 'three']));
}
