import {Component, TemplateRef} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({templateUrl: './modal-stack.component.html'})
export class ModalStackComponent {
  constructor(private modalService: NgbModal) {}

  openModal(content: TemplateRef<any>) { this.modalService.open(content); }
}
