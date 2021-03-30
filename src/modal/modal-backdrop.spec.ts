import {TestBed} from '@angular/core/testing';

import {NgbModalBackdrop} from './modal-backdrop';

describe('ngb-modal-backdrop', () => {

  beforeEach(() => { TestBed.configureTestingModule({declarations: [NgbModalBackdrop]}); });

  it('should render backdrop with required CSS classes', () => {
    const fixture = TestBed.createComponent(NgbModalBackdrop);

    fixture.detectChanges();
    expect(fixture.nativeElement).toHaveCssClass('modal-backdrop');
    expect(fixture.nativeElement).toHaveCssClass('show');
    expect(fixture.nativeElement).not.toHaveCssClass('fade');
  });

  it('should render correct CSS classes for animations', () => {
    const fixture = TestBed.createComponent(NgbModalBackdrop);
    fixture.componentInstance.animation = true;

    fixture.detectChanges();
    expect(fixture.nativeElement).toHaveCssClass('show');
    expect(fixture.nativeElement).toHaveCssClass('fade');
  });
});
