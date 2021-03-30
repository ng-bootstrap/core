import {ChangeDetectionStrategy, ChangeDetectorRef, Component, TemplateRef} from '@angular/core';
import {ModalDismissReasons, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({templateUrl: './modal-autoclose.component.html', changeDetection: ChangeDetectionStrategy.OnPush})
export class ModalAutoCloseComponent {
  private modalRef: NgbModalRef | null = null;
  reason = '';
  options = {};

  constructor(private modalService: NgbModal, private cd: ChangeDetectorRef) {}

  openModal(content?: TemplateRef<any>) {
    this.modalRef = this.modalService.open(content, this.options);
    this.modalRef.result.then(
        () => {
          this.reason = `Closed`;
          this.cd.markForCheck();
        },
        reason => {
          if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            this.reason = 'Click';
          } else if (reason === ModalDismissReasons.ESC) {
            this.reason = 'Escape';
          } else {
            this.reason = 'Other';
          }
          this.cd.markForCheck();
        });
  }

  closeModal() {
    if (this.modalRef) {
      this.modalRef.close();
      this.modalRef = null;
    }
  }

  reset() {
    this.closeModal();
    this.reason = '';
    this.options = {};
  }
}
