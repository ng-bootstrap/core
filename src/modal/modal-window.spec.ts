import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NgbModalWindow} from './modal-window';

describe('ngb-modal-dialog', () => {

  let fixture: ComponentFixture<NgbModalWindow>;

  beforeEach(() => {
    TestBed.configureTestingModule({declarations: [NgbModalWindow]});
    fixture = TestBed.createComponent(NgbModalWindow);
  });

  describe('basic rendering functionality', () => {

    it('should render default modal window', () => {
      fixture.detectChanges();

      const modalEl: Element = fixture.nativeElement;
      const dialogEl: Element = fixture.nativeElement.querySelector('.modal-dialog');

      expect(modalEl).toHaveCssClass('modal');
      expect(dialogEl).toHaveCssClass('modal-dialog');
    });

    it('should render default modal window with a specified size', () => {
      fixture.componentInstance.size = 'sm';
      fixture.detectChanges();

      const dialogEl: Element = fixture.nativeElement.querySelector('.modal-dialog');
      expect(dialogEl).toHaveCssClass('modal-dialog');
      expect(dialogEl).toHaveCssClass('modal-sm');
    });

    it('should render default modal window with a specified class', () => {
      fixture.componentInstance.windowClass = 'custom-class';
      fixture.detectChanges();

      expect(fixture.nativeElement).toHaveCssClass('custom-class');
    });

    it('aria attributes', () => {
      fixture.detectChanges();
      const dialogEl: Element = fixture.nativeElement.querySelector('.modal-dialog');

      expect(fixture.nativeElement.getAttribute('role')).toBe('dialog');
      expect(dialogEl.getAttribute('role')).toBe('document');
    });

    it('should render modal dialog with a specified class', () => {
      fixture.componentInstance.modalDialogClass = 'custom-dialog-class';
      fixture.detectChanges();

      const dialogEl: Element = fixture.nativeElement.querySelector('.modal-dialog');
      expect(dialogEl).toHaveCssClass('modal-dialog');
      expect(dialogEl).toHaveCssClass('custom-dialog-class');
    });
  });
});
