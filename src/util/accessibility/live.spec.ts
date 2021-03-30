import {TestBed, ComponentFixture, inject} from '@angular/core/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {Live, ARIA_LIVE_DELAY} from './live';



function getLiveElement(): HTMLElement {
  return document.body.querySelector('#ngb-live') !as HTMLElement;
}



describe('LiveAnnouncer', () => {
  let live: Live;
  let fixture: ComponentFixture<TestComponent>;

  const say = () => { fixture.debugElement.query(By.css('button')).nativeElement.click(); };

  describe('live announcer', () => {
    beforeEach(() => TestBed.configureTestingModule({
      providers: [Live, {provide: ARIA_LIVE_DELAY, useValue: null}],
      declarations: [TestComponent],
    }));

    beforeEach(inject([Live], (_live: Live) => {
      live = _live;
      fixture = TestBed.createComponent(TestComponent);
    }));

    it('should correctly update the text message', () => {
      say();
      const liveElement = getLiveElement();
      expect(liveElement.textContent).toBe('test');
      expect(liveElement.id).toBe('ngb-live');
    });

    it('should remove the used element from the DOM on destroy', () => {
      say();
      live.ngOnDestroy();

      expect(getLiveElement()).toBeFalsy();
    });
  });
});



@Component({template: `<button (click)="say()">say</button>`})
class TestComponent {
  constructor(public live: Live) {}
  say() { this.live.say('test'); }
}
