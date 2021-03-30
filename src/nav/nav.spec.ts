import {Component} from '@angular/core';
import {ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {NgbNav, NgbNavConfig, NgbNavItem, NgbNavLink, NgbNavModule, NgbNavOutlet} from './nav.module';
import {createGenericTestComponent, isBrowser, isBrowserVisible} from '../test/common';
import {isDefined} from '../util/util';
import {Key} from 'src/util/key';
import {NgbConfig} from '../ngb-config';
import {NgbConfigAnimation} from '../test/ngb-config-animation';
import createSpy = jasmine.createSpy;

function createTestComponent(html: string, detectChanges = true) {
  return createGenericTestComponent(html, TestComponent, detectChanges) as ComponentFixture<TestComponent>;
}

function getNavDirective(fixture: ComponentFixture<any>): NgbNav {
  return fixture.debugElement.query(By.directive(NgbNav)).injector.get(NgbNav);
}

function getNav(fixture: ComponentFixture<any>): HTMLElement {
  return fixture.debugElement.query(By.directive(NgbNav)).nativeElement;
}

function getOutlet(fixture: ComponentFixture<any>): HTMLElement {
  return fixture.debugElement.query(By.directive(NgbNavOutlet)).nativeElement;
}

function getContents(fixture: ComponentFixture<any>): HTMLElement[] {
  return Array.from(getOutlet(fixture).children) as HTMLElement[];
}

function getContent(fixture: ComponentFixture<any>): HTMLElement {
  return Array.from(getOutlet(fixture).children)[0] as HTMLElement;
}

function getItems(fixture: ComponentFixture<any>): HTMLElement[] {
  return fixture.debugElement.queryAll(By.directive(NgbNavItem)).map(debugElement => debugElement.nativeElement);
}

function getLinks(fixture: ComponentFixture<any>): HTMLElement[] {
  return fixture.debugElement.queryAll(By.directive(NgbNavLink)).map(debugElement => debugElement.nativeElement);
}

function createKeyDownEvent(key: number) {
  const event = {which: key, preventDefault: () => {}, stopPropagation: () => {}};
  spyOn(event, 'preventDefault');
  spyOn(event, 'stopPropagation');
  return event;
}

function expectLinks(fixture: ComponentFixture<any>, expected: boolean[], shouldHaveNavItemClass = false) {
  const links = getLinks(fixture);
  expect(links.length).toBe(expected.length, `expected to find ${expected.length} links, but found ${links.length}`);

  links.forEach(({classList}, i) => {
    expect(classList.contains('nav-link')).toBe(true, `link should have 'nav-link' class`);
    expect(classList.contains('active'))
        .toBe(expected[i], `link should ${expected[i] ? '' : 'not'} have 'active' class`);
    expect(classList.contains('nav-item'))
        .toBe(shouldHaveNavItemClass, `link should ${shouldHaveNavItemClass ? '' : 'not'} have 'nav-item' class`);
  });
}

function expectContents(fixture: ComponentFixture<any>, expected: string[], activeIndex = 0) {
  const contents = getContents(fixture);
  expect(contents.length)
      .toBe(expected.length, `expected to find ${expected.length} contents, but found ${contents.length}`);

  for (let i = 0; i < expected.length; ++i) {
    const text = contents[i].innerText;
    expect(text).toBe(expected[i], `expected to find '${expected[i]}' in content ${i + 1}, but found '${text}'`);
    expect(contents[i].classList.contains('active'))
        .toBe(i === activeIndex, `content should ${i === activeIndex ? '' : 'not'} have 'active' class`);
  }
}

describe('nav', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [NgbNavModule],
    });
  });

  it('should initialize inputs with default values', inject([NgbNavConfig], config => {
       const nav = new NgbNav('tablist', config, <any>null, null);
       expect(nav.destroyOnHide).toBe(config.destroyOnHide);
       expect(nav.roles).toBe(config.roles);
     }));

  it(`should set and allow overriding CSS classes`, () => {
    const fixture = createTestComponent(`
      <ul ngbNav #n="ngbNav" [class]="'nav-tabs my-nav'">
        <li ngbNavItem [class]="'my-nav-item'">
            <a ngbNavLink [class]="'my-nav-link'"></a>
            <ng-template ngbTabContent></ng-template>
        </li>
      </ul>
      <div [ngbNavOutlet]="n" [class]="'my-tab-content'"></div>
    `);

    expect(getNav(fixture)).toHaveCssClass('nav');
    expect(getNav(fixture)).toHaveCssClass('my-nav');
    expect(getItems(fixture)[0]).toHaveCssClass('nav-item');
    expect(getItems(fixture)[0]).toHaveCssClass('my-nav-item');
    expect(getLinks(fixture)[0]).toHaveCssClass('nav-link');
    expect(getLinks(fixture)[0]).toHaveCssClass('my-nav-link');
    expect(getOutlet(fixture)).toHaveCssClass('tab-content');
    expect(getOutlet(fixture)).toHaveCssClass('my-tab-content');
    expect(getContent(fixture)).toHaveCssClass('tab-pane');
  });

  it(`should set correct A11Y roles`, () => {
    const fixture = createTestComponent(`
      <ul ngbNav #n="ngbNav" class="nav-tabs">
        <li ngbNavItem>
            <a ngbNavLink></a>
            <ng-template ngbTabContent></ng-template>
        </li>
      </ul>
      <div [ngbNavOutlet]="n"></div>
    `);

    expect(getNav(fixture).getAttribute('role')).toBe('tablist');
    expect(getLinks(fixture)[0].getAttribute('role')).toBe('tab');
    expect(getContent(fixture).getAttribute('role')).toBe('tabpanel');
  });

  it(`should not set any A11Y roles if [roles]='false'`, () => {
    const fixture = createTestComponent(`
      <ul ngbNav #n="ngbNav" [roles]="false" class="nav-tabs">
        <li ngbNavItem>
            <a ngbNavLink></a>
            <ng-template ngbTabContent></ng-template>
        </li>
      </ul>
      <div [ngbNavOutlet]="n"></div>
    `);

    expect(getNav(fixture).getAttribute('role')).toBeNull();
    expect(getLinks(fixture)[0].getAttribute('role')).toBeNull();
    expect(getContent(fixture).getAttribute('role')).toBeNull();
  });

  it(`should allow overriding any A11Y roles`, () => {
    const fixture = createTestComponent(`
      <ul ngbNav #n="ngbNav" role="list" class="nav-tabs">
        <li ngbNavItem>
            <a ngbNavLink role="alert"></a>
            <ng-template ngbTabContent></ng-template>
        </li>
      </ul>
      <div [ngbNavOutlet]="n" paneRole="myRole"></div>
    `);

    expect(getNav(fixture).getAttribute('role')).toBe('list');
    expect(getLinks(fixture)[0].getAttribute('role')).toBe('alert');
    expect(getContent(fixture).getAttribute('role')).toBe('myRole');
  });

  it(`should set orientation CSS and 'aria-orientation' correctly`, () => {
    const fixture = createTestComponent(`
      <ul ngbNav #n="ngbNav" [orientation]="orientation" [roles]="roles">
        <li ngbNavItem>
            <a ngbNavLink></a>
            <ng-template ngbTabContent></ng-template>
        </li>
      </ul>
    `);

    // horizontal + 'tablist'
    expect(getNav(fixture)).not.toHaveCssClass('flex-column');
    expect(getNav(fixture).getAttribute('aria-orientation')).toBeNull();

    // vertical + 'tablist'
    fixture.componentInstance.orientation = 'vertical';
    fixture.detectChanges();
    expect(getNav(fixture)).toHaveCssClass('flex-column');
    expect(getNav(fixture).getAttribute('aria-orientation')).toBe('vertical');

    // vertical + no 'tablist'
    fixture.componentInstance.roles = false;
    fixture.detectChanges();
    expect(getNav(fixture)).toHaveCssClass('flex-column');
    expect(getNav(fixture).getAttribute('aria-orientation')).toBeNull();

    // horizontal + no 'tablist'
    fixture.componentInstance.orientation = 'horizontal';
    fixture.detectChanges();
    expect(getNav(fixture)).not.toHaveCssClass('flex-column');
    expect(getNav(fixture).getAttribute('aria-orientation')).toBeNull();
  });

  it(`should initially select first tab, if no [activeId] provided`, () => {
    const fixture = createTestComponent(
        `
      <ul ngbNav #n="ngbNav" class="nav-tabs" (activeIdChange)="onActiveIdChange($event)" (navChange)="onNavChange($event)">
        <li [ngbNavItem]="1">
            <a ngbNavLink>link 1</a>
            <ng-template ngbNavContent>content 1</ng-template>
        </li>
        <li [ngbNavItem]="2">
            <a ngbNavLink>link 2</a>
            <ng-template ngbNavContent>content 2</ng-template>
        </li>
      </ul>
      <div [ngbNavOutlet]="n"></div>
    `,
        false);

    const navChangeSpy = spyOn(fixture.componentInstance, 'onNavChange');
    const activeIdChangeSpy = spyOn(fixture.componentInstance, 'onActiveIdChange');
    fixture.detectChanges();

    expectLinks(fixture, [true, false]);
    expectContents(fixture, ['content 1']);
    expect(activeIdChangeSpy).toHaveBeenCalledWith(1);
    expect(navChangeSpy).toHaveBeenCalledTimes(0);
  });

  it(`should initially select nothing, if [activeId] provided is incorrect`, () => {
    const fixture = createTestComponent(`
      <ul ngbNav #n="ngbNav" [activeId]="100" class="nav-tabs">
        <li ngbNavItem>
            <a ngbNavLink>link 1</a>
            <ng-template ngbNavContent>content 1</ng-template>
        </li>
      </ul>
      <div [ngbNavOutlet]="n"></div>
    `);

    expectLinks(fixture, [false]);
    expect(getContent(fixture)).toBeUndefined();
  });

  it(`should work without any items provided`, () => {
    const fixture = createTestComponent(`
      <ul ngbNav #n="ngbNav" class="nav-tabs">
      </ul>
      <div [ngbNavOutlet]="n"></div>
    `);

    expect(getLinks(fixture).length).toBe(0);
    expect(getContent(fixture)).toBeUndefined();
  });

  it(`should work without nav content provided`, () => {
    const fixture = createTestComponent(`
      <ul ngbNav #n="ngbNav" class="nav-tabs">
        <li ngbNavItem>
            <a ngbNavLink>link 1</a>
        </li>
        <li ngbNavItem domId="two">
            <a ngbNavLink>link 2</a>
        </li>
      </ul>
      <div [ngbNavOutlet]="n"></div>
    `);

    expectLinks(fixture, [true, false]);
    expectContents(fixture, ['']);

    getLinks(fixture)[1].click();
    fixture.detectChanges();
    expectLinks(fixture, [false, true]);
    expectContents(fixture, ['']);
  });

  it(`should work without 'ngbNavOutlet'`, () => {
    const fixture = createTestComponent(`
      <ul ngbNav class="nav-tabs">
        <li ngbNavItem>
            <a ngbNavLink>link 1</a>
        </li>
        <li ngbNavItem domId="two">
            <a ngbNavLink>link 2</a>
        </li>
      </ul>
    `);

    expectLinks(fixture, [true, false]);

    getLinks(fixture)[1].click();
    fixture.detectChanges();
    expectLinks(fixture, [false, true]);
  });

  it(`should work with dynamically generated navs`, () => {
    const fixture = createTestComponent(`
      <ul ngbNav #n="ngbNav" [(activeId)]="activeId" class="nav-tabs">
        <li *ngFor="let item of items" [ngbNavItem]="item">
            <a ngbNavLink>link {{ item }}</a>
            <ng-template ngbNavContent>content {{ item }}</ng-template>
        </li>
      </ul>
      <div [ngbNavOutlet]="n"></div>
    `);

    // 2 navs
    expect(fixture.componentInstance.activeId).toBe(1);
    expectLinks(fixture, [true, false]);
    expectContents(fixture, ['content 1']);

    // 1 nav
    fixture.componentInstance.items.shift();
    fixture.detectChanges();

    expect(fixture.componentInstance.activeId).toBe(1);
    expectLinks(fixture, [false]);
    expect(getContent(fixture)).toBeUndefined();

    // adjust activeId
    fixture.componentInstance.activeId = 2;
    fixture.detectChanges();
    expectLinks(fixture, [true]);
    expectContents(fixture, ['content 2']);

    // no navs
    fixture.componentInstance.items.shift();
    fixture.detectChanges();

    expect(fixture.componentInstance.activeId).toBe(2);
    expect(getLinks(fixture).length).toBe(0);
    expect(getContent(fixture)).toBeUndefined();
  });

  it(`should work with conditional nav items`, () => {
    const fixture = createTestComponent(`
      <ul ngbNav #n="ngbNav" [(activeId)]="activeId" class="nav-tabs">
        <li [ngbNavItem]="1" *ngIf="visible">
            <a ngbNavLink>link 1</a>
            <ng-template ngbNavContent>content 1</ng-template>
        </li>
        <li [ngbNavItem]="2" *ngIf="visible">
            <a ngbNavLink>link 2</a>
            <ng-template ngbNavContent>content 2</ng-template>
        </li>
      </ul>
      <div [ngbNavOutlet]="n"></div>
    `);

    fixture.componentInstance.activeId = 2;
    fixture.detectChanges();

    expect(fixture.componentInstance.visible).toBe(false);
    expectLinks(fixture, []);
    expectContents(fixture, []);

    fixture.componentInstance.visible = true;
    fixture.detectChanges();

    expectLinks(fixture, [false, true]);
    expectContents(fixture, ['content 2']);
  });

  it(`should change navs with [activeId] binding`, () => {
    const fixture = createTestComponent(`
      <ul ngbNav #n="ngbNav" [activeId]="activeId" class="nav-tabs">
        <li [ngbNavItem]="1">
            <a ngbNavLink>link 1</a>
            <ng-template ngbNavContent>content 1</ng-template>
        </li>
        <li [ngbNavItem]="2">
            <a ngbNavLink>link 2</a>
            <ng-template ngbNavContent>content 2</ng-template>
        </li>
      </ul>
      <div [ngbNavOutlet]="n"></div>
    `);

    expectLinks(fixture, [true, false]);
    expectContents(fixture, ['content 1']);

    fixture.componentInstance.activeId = 2;
    fixture.detectChanges();
    expectLinks(fixture, [false, true]);
    expectContents(fixture, ['content 2']);
  });

  it(`should work navs with boundary [ngbNavItem] values`, () => {
    const fixture = createTestComponent(`
      <ul ngbNav #n="ngbNav" [activeId]="activeId" class="nav-tabs">
        <li [ngbNavItem]="0">
            <a ngbNavLink>link 1</a>
            <ng-template ngbNavContent>content 1</ng-template>
        </li>
        <li [ngbNavItem]="true">
            <a ngbNavLink>link 2</a>
            <ng-template ngbNavContent>content 2</ng-template>
        </li>
        <li [ngbNavItem]="false">
            <a ngbNavLink>link 3</a>
            <ng-template ngbNavContent>content 3</ng-template>
        </li>
        <li [ngbNavItem]="''">
            <a ngbNavLink>link 4</a>
            <ng-template ngbNavContent>content 4</ng-template>
        </li>
      </ul>
      <div [ngbNavOutlet]="n"></div>
    `);

    expectLinks(fixture, [true, false, false, false]);
    expectContents(fixture, ['content 1']);

    fixture.componentInstance.activeId = true;
    fixture.detectChanges();
    expectLinks(fixture, [false, true, false, false]);
    expectContents(fixture, ['content 2']);

    fixture.componentInstance.activeId = false;
    fixture.detectChanges();
    expectLinks(fixture, [false, false, true, false]);
    expectContents(fixture, ['content 3']);

    fixture.componentInstance.activeId = 0;
    fixture.detectChanges();
    expectLinks(fixture, [true, false, false, false]);
    expectContents(fixture, ['content 1']);

    fixture.componentInstance.activeId = '';
    fixture.detectChanges();
    expectLinks(fixture, [false, false, false, false]);
    expectContents(fixture, []);
  });

  it(`should allow overriding ids used in DOM with [domId]`, () => {
    const fixture = createTestComponent(`
      <ul ngbNav #n="ngbNav" class="nav-tabs">
        <li ngbNavItem domId="one">
            <a ngbNavLink>link 1</a>
            <ng-template ngbNavContent>content 1</ng-template>
        </li>
        <li ngbNavItem domId="two">
            <a ngbNavLink>link 2</a>
            <ng-template ngbNavContent>content 2</ng-template>
        </li>
      </ul>
      <div [ngbNavOutlet]="n"></div>
    `);

    const links = getLinks(fixture);

    expect(links[0].id).toBe('one');
    expect(links[1].id).toBe('two');
    expect(getContent(fixture).id).toBe('one-panel');
  });

  it(`should fallback to [domId] if [ngbNavItem] is not set`, () => {
    const fixture = createTestComponent(`
      <ul ngbNav #n="ngbNav" class="nav-tabs">
        <li ngbNavItem>
            <a ngbNavLink>link 1</a>
            <ng-template ngbNavContent>content 1</ng-template>
        </li>
        <li ngbNavItem domId="two">
            <a ngbNavLink>link 2</a>
            <ng-template ngbNavContent>content 2</ng-template>
        </li>
      </ul>
      <div [ngbNavOutlet]="n"></div>
    `);

    const nav = getNavDirective(fixture);

    expectLinks(fixture, [true, false]);
    expectContents(fixture, ['content 1']);

    nav.select('two');
    fixture.detectChanges();
    expectLinks(fixture, [false, true]);
    expectContents(fixture, ['content 2']);
  });

  describe(`change with`, () => {

    let fixture: ComponentFixture<TestComponent>;
    let links: HTMLElement[];
    let nav: NgbNav;
    let navChangeSpy: jasmine.Spy;
    let activeIdChangeSpy: jasmine.Spy;
    let hiddenNavSpy: jasmine.Spy;
    let shownNavSpy: jasmine.Spy;
    let hiddenItemSpy: jasmine.Spy;
    let shownItemSpy: jasmine.Spy;

    beforeEach(() => {
      fixture = createTestComponent(`
        <ul ngbNav #n="ngbNav" class="nav-tabs" [(activeId)]="activeId" (activeIdChange)="onActiveIdChange($event)"
        (shown)="onNavShown($event)" (hidden)="onNavHidden($event)" (navChange)="onNavChange($event)">
          <li [ngbNavItem]="1" (hidden)="onItemHidden(1)" (shown)="onItemShown(1)">
              <a ngbNavLink>link 1</a>
              <ng-template ngbNavContent>content 1</ng-template>
          </li>
          <li [ngbNavItem]="2" (hidden)="onItemHidden(2)" (shown)="onItemShown(2)">
              <a ngbNavLink>link 2</a>
              <ng-template ngbNavContent>content 2</ng-template>
          </li>
          <li [ngbNavItem]="3" [disabled]="true" (hidden)="onItemHidden(3)" (shown)="onItemShown(3)">
              <a ngbNavLink>disabled</a>
              <ng-template ngbNavContent>content 3</ng-template>
          </li>
        </ul>
        <div [ngbNavOutlet]="n"></div>
      `);

      navChangeSpy = spyOn(fixture.componentInstance, 'onNavChange');
      activeIdChangeSpy = spyOn(fixture.componentInstance, 'onActiveIdChange');
      hiddenItemSpy = spyOn(fixture.componentInstance, 'onItemHidden');
      shownItemSpy = spyOn(fixture.componentInstance, 'onItemShown');
      hiddenNavSpy = spyOn(fixture.componentInstance, 'onNavHidden');
      shownNavSpy = spyOn(fixture.componentInstance, 'onNavShown');
      links = getLinks(fixture);
      nav = getNavDirective(fixture);

      expectLinks(fixture, [true, false, false]);
      expectContents(fixture, ['content 1']);
    });

    it(`(click) should change navs`, () => {
      links[1].click();
      fixture.detectChanges();

      expectLinks(fixture, [false, true, false]);
      expectContents(fixture, ['content 2']);
      expect(fixture.componentInstance.activeId).toBe(2);
      expect(activeIdChangeSpy).toHaveBeenCalledWith(2);
      expect(navChangeSpy).toHaveBeenCalledWith({activeId: 1, nextId: 2, preventDefault: jasmine.any(Function)});
      expect(hiddenItemSpy).toHaveBeenCalledWith(1);
      expect(shownItemSpy).toHaveBeenCalledWith(2);
      expect(hiddenNavSpy).toHaveBeenCalledWith(1);
      expect(shownNavSpy).toHaveBeenCalledWith(2);
    });

    it(`(click) on the same nav should do nothing`, () => {
      links[0].click();
      fixture.detectChanges();

      expectLinks(fixture, [true, false, false]);
      expectContents(fixture, ['content 1']);
      expect(fixture.componentInstance.activeId).toBe(1);
      expect(activeIdChangeSpy).toHaveBeenCalledTimes(0);
      expect(navChangeSpy).toHaveBeenCalledTimes(0);
      expect(hiddenItemSpy).not.toHaveBeenCalled();
      expect(shownItemSpy).not.toHaveBeenCalled();
      expect(hiddenNavSpy).not.toHaveBeenCalled();
      expect(shownNavSpy).not.toHaveBeenCalled();
    });

    it(`(click) should not change to a disabled nav`, () => {
      links[2].click();
      fixture.detectChanges();

      expectLinks(fixture, [true, false, false]);
      expectContents(fixture, ['content 1']);
      expect(fixture.componentInstance.activeId).toBe(1);
      expect(activeIdChangeSpy).toHaveBeenCalledTimes(0);
      expect(navChangeSpy).toHaveBeenCalledTimes(0);
      expect(hiddenItemSpy).not.toHaveBeenCalled();
      expect(shownItemSpy).not.toHaveBeenCalled();
      expect(hiddenNavSpy).not.toHaveBeenCalled();
      expect(shownNavSpy).not.toHaveBeenCalled();
    });

    it(`[activeId] should change navs`, () => {
      fixture.componentInstance.activeId = 2;
      fixture.detectChanges();

      expectLinks(fixture, [false, true, false]);
      expectContents(fixture, ['content 2']);
      expect(fixture.componentInstance.activeId).toBe(2);
      expect(activeIdChangeSpy).toHaveBeenCalledTimes(0);
      expect(navChangeSpy).toHaveBeenCalledTimes(0);
      expect(hiddenItemSpy).toHaveBeenCalledWith(1);
      expect(shownItemSpy).toHaveBeenCalledWith(2);
      expect(hiddenNavSpy).toHaveBeenCalledWith(1);
      expect(shownNavSpy).toHaveBeenCalledWith(2);
    });

    it(`[activeId] on the same nav should do nothing`, () => {
      fixture.componentInstance.activeId = 1;
      fixture.detectChanges();

      expectLinks(fixture, [true, false, false]);
      expectContents(fixture, ['content 1']);
      expect(fixture.componentInstance.activeId).toBe(1);
      expect(activeIdChangeSpy).toHaveBeenCalledTimes(0);
      expect(navChangeSpy).toHaveBeenCalledTimes(0);
      expect(hiddenItemSpy).not.toHaveBeenCalled();
      expect(shownItemSpy).not.toHaveBeenCalled();
      expect(hiddenNavSpy).not.toHaveBeenCalled();
      expect(shownNavSpy).not.toHaveBeenCalled();
    });

    it(`[activeId] should change to a disabled nav`, () => {
      fixture.componentInstance.activeId = 3;
      fixture.detectChanges();

      expectLinks(fixture, [false, false, true]);
      expectContents(fixture, ['content 3']);
      expect(fixture.componentInstance.activeId).toBe(3);
      expect(activeIdChangeSpy).toHaveBeenCalledTimes(0);
      expect(navChangeSpy).toHaveBeenCalledTimes(0);
      expect(hiddenItemSpy).toHaveBeenCalledWith(1);
      expect(shownItemSpy).toHaveBeenCalledWith(3);
      expect(hiddenNavSpy).toHaveBeenCalledWith(1);
      expect(shownNavSpy).toHaveBeenCalledWith(3);
    });

    it(`[activeId] should change to an invalid nav`, () => {
      fixture.componentInstance.activeId = 1000;
      fixture.detectChanges();

      expectLinks(fixture, [false, false, false]);
      expect(getContent(fixture)).toBeUndefined();
      expect(fixture.componentInstance.activeId).toBe(1000);
      expect(activeIdChangeSpy).toHaveBeenCalledTimes(0);
      expect(navChangeSpy).toHaveBeenCalledTimes(0);
      expect(hiddenItemSpy).toHaveBeenCalledWith(1);
      expect(shownItemSpy).not.toHaveBeenCalled();
      expect(hiddenNavSpy).toHaveBeenCalledWith(1);
      expect(shownNavSpy).not.toHaveBeenCalled();
    });

    it(`'.select()' should change navs`, () => {
      nav.select(2);
      fixture.detectChanges();

      expectLinks(fixture, [false, true, false]);
      expectContents(fixture, ['content 2']);
      expect(fixture.componentInstance.activeId).toBe(2);
      expect(activeIdChangeSpy).toHaveBeenCalledWith(2);
      expect(navChangeSpy).toHaveBeenCalledTimes(0);
      expect(hiddenItemSpy).toHaveBeenCalledWith(1);
      expect(shownItemSpy).toHaveBeenCalledWith(2);
      expect(hiddenNavSpy).toHaveBeenCalledWith(1);
      expect(shownNavSpy).toHaveBeenCalledWith(2);
    });

    it(`'.select()' on the same nav should do nothing`, () => {
      nav.select(1);
      fixture.detectChanges();

      expectLinks(fixture, [true, false, false]);
      expectContents(fixture, ['content 1']);
      expect(fixture.componentInstance.activeId).toBe(1);
      expect(activeIdChangeSpy).toHaveBeenCalledTimes(0);
      expect(navChangeSpy).toHaveBeenCalledTimes(0);
      expect(hiddenItemSpy).not.toHaveBeenCalled();
      expect(shownItemSpy).not.toHaveBeenCalled();
      expect(hiddenNavSpy).not.toHaveBeenCalled();
      expect(shownNavSpy).not.toHaveBeenCalled();
    });

    it(`'.select()' should change to a disabled nav`, () => {
      nav.select(3);
      fixture.detectChanges();

      expectLinks(fixture, [false, false, true]);
      expectContents(fixture, ['content 3']);
      expect(fixture.componentInstance.activeId).toBe(3);
      expect(activeIdChangeSpy).toHaveBeenCalledWith(3);
      expect(navChangeSpy).toHaveBeenCalledTimes(0);
      expect(navChangeSpy).toHaveBeenCalledTimes(0);
      expect(hiddenItemSpy).toHaveBeenCalledWith(1);
      expect(shownItemSpy).toHaveBeenCalledWith(3);
      expect(hiddenNavSpy).toHaveBeenCalledWith(1);
      expect(shownNavSpy).toHaveBeenCalledWith(3);
    });

    it(`'.select()' should change to an invalid nav`, () => {
      nav.select(1000);
      fixture.detectChanges();

      expectLinks(fixture, [false, false, false]);
      expect(getContent(fixture)).toBeUndefined();
      expect(fixture.componentInstance.activeId).toBe(1000);
      expect(activeIdChangeSpy).toHaveBeenCalledWith(1000);
      expect(navChangeSpy).toHaveBeenCalledTimes(0);
      expect(hiddenItemSpy).toHaveBeenCalledWith(1);
      expect(shownItemSpy).not.toHaveBeenCalled();
      expect(hiddenNavSpy).toHaveBeenCalledWith(1);
      expect(shownNavSpy).not.toHaveBeenCalled();
    });
  });

  it(`should not change container scroll position after switching navs`, () => {
    const fixture = createTestComponent(`
        <div class="container" style="overflow: scroll; height: 5rem; border: 1px solid gray; padding-top: 2rem;">
          <ul ngbNav #n="ngbNav" class="nav-tabs">
            <li ngbNavItem>
                <a ngbNavLink>link 1</a>
                <ng-template ngbNavContent>content 1</ng-template>
            </li>
            <li ngbNavItem>
                <a ngbNavLink>link 2</a>
                <ng-template ngbNavContent>content 2</ng-template>
            </li>
          </ul>
          <div [ngbNavOutlet]="n"></div>
        </div>
      `);

    const links = getLinks(fixture);
    const container = fixture.nativeElement.querySelector('.container');

    // scroll to bottom
    container.scrollTop = container.scrollHeight;
    const {scrollTop} = container;
    expect(container.scrollTop).toBe(scrollTop);

    // staying at the same position after changing the nav
    links[1].click();
    fixture.detectChanges();
    expect(container.scrollTop).toBe(scrollTop);
  });

  describe(`(navChange) preventDefault()`, () => {

    let fixture: ComponentFixture<TestComponent>;
    let links: HTMLElement[];
    let navChangeSpy: jasmine.Spy;
    let activeIdChangeSpy: jasmine.Spy;

    beforeEach(() => {
      fixture = createTestComponent(`
        <ul ngbNav #n="ngbNav" class="nav-tabs" [(activeId)]="activeId" (activeIdChange)="onActiveIdChange($event)"
        (navChange)="onNavChangePrevent($event)">
          <li [ngbNavItem]="1">
              <a ngbNavLink>link 1</a>
              <ng-template ngbNavContent>content 1</ng-template>
          </li>
          <li [ngbNavItem]="2">
              <a ngbNavLink>link 2</a>
              <ng-template ngbNavContent>content 2</ng-template>
          </li>
        </ul>
        <div [ngbNavOutlet]="n"></div>
      `);

      navChangeSpy = spyOn(fixture.componentInstance, 'onNavChangePrevent').and.callThrough();
      activeIdChangeSpy = spyOn(fixture.componentInstance, 'onActiveIdChange');
      links = getLinks(fixture);

      expectLinks(fixture, [true, false]);
      expectContents(fixture, ['content 1']);
    });

    it(`on (click) should not change navs`, () => {
      links[1].click();
      fixture.detectChanges();

      expectLinks(fixture, [true, false]);
      expectContents(fixture, ['content 1']);
      expect(fixture.componentInstance.activeId).toBe(1);
      expect(activeIdChangeSpy).toHaveBeenCalledTimes(0);
      expect(navChangeSpy).toHaveBeenCalledWith({activeId: 1, nextId: 2, preventDefault: jasmine.any(Function)});
    });
  });

  it(`should work with two-way [(activeId)] binding`, () => {
    const fixture = createTestComponent(`
      <ul ngbNav #n="ngbNav" [(activeId)]="activeId" (activeIdChange)="onActiveIdChange($event)" class="nav-tabs">
        <li [ngbNavItem]="1">
            <a ngbNavLink>link 1</a>
            <ng-template ngbNavContent>content 1</ng-template>
        </li>
        <li [ngbNavItem]="2">
            <a ngbNavLink>link 2</a>
            <ng-template ngbNavContent>content 2</ng-template>
        </li>
      </ul>
      <div [ngbNavOutlet]="n"></div>
    `);

    const activeIdChangeSpy = spyOn(fixture.componentInstance, 'onActiveIdChange');

    expect(fixture.componentInstance.activeId).toBe(1);

    getLinks(fixture)[1].click();
    fixture.detectChanges();
    expect(activeIdChangeSpy).toHaveBeenCalledWith(2);
    expect(fixture.componentInstance.activeId).toBe(2);
  });

  it(`should render only one nav content by default`, () => {
    const fixture = createTestComponent(`
      <ul ngbNav #n="ngbNav" class="nav-tabs">
        <li ngbNavItem>
            <a ngbNavLink>link 1</a>
            <ng-template ngbNavContent>content 1</ng-template>
        </li>
        <li ngbNavItem>
            <a ngbNavLink>link 2</a>
            <ng-template ngbNavContent>content 2</ng-template>
        </li>
      </ul>
      <div [ngbNavOutlet]="n"></div>
    `);

    expectContents(fixture, ['content 1']);

    getLinks(fixture)[1].click();
    fixture.detectChanges();
    expectContents(fixture, ['content 2']);
  });

  it(`should render all nav contents with [destroyOnHide]='false'`, () => {
    const fixture = createTestComponent(`
      <ul ngbNav #n="ngbNav" class="nav-tabs" [destroyOnHide]="false">
        <li ngbNavItem>
            <a ngbNavLink>link 1</a>
            <ng-template ngbNavContent>content 1</ng-template>
        </li>
        <li ngbNavItem>
            <a ngbNavLink>link 2</a>
            <ng-template ngbNavContent>content 2</ng-template>
        </li>
      </ul>
      <div [ngbNavOutlet]="n"></div>
    `);

    expectContents(fixture, ['content 1', 'content 2'], 0);

    getLinks(fixture)[1].click();
    fixture.detectChanges();
    expectContents(fixture, ['content 1', 'content 2'], 1);
  });

  it(`should allow overriding [destroyOnHide] per nav item (destroyOnHide === true)`, () => {
    const fixture = createTestComponent(`
      <ul ngbNav #n="ngbNav" class="nav-tabs">
        <li ngbNavItem>
            <a ngbNavLink>link 1</a>
            <ng-template ngbNavContent>content 1</ng-template>
        </li>
        <li ngbNavItem [destroyOnHide]="false">
            <a ngbNavLink>link 2</a>
            <ng-template ngbNavContent>content 2</ng-template>
        </li>
      </ul>
      <div [ngbNavOutlet]="n"></div>
    `);

    expectContents(fixture, ['content 1', 'content 2'], 0);

    getLinks(fixture)[1].click();
    fixture.detectChanges();
    expectContents(fixture, ['content 2']);
  });

  it(`should allow overriding [destroyOnHide] per nav item (destroyOnHide === false)`, () => {
    const fixture = createTestComponent(`
      <ul ngbNav #n="ngbNav" [destroyOnHide]="false" class="nav-tabs">
        <li ngbNavItem>
            <a ngbNavLink>link 1</a>
            <ng-template ngbNavContent>content 1</ng-template>
        </li>
        <li ngbNavItem [destroyOnHide]="true">
            <a ngbNavLink>link 2</a>
            <ng-template ngbNavContent>content 2</ng-template>
        </li>
      </ul>
      <div [ngbNavOutlet]="n"></div>
    `);

    expectContents(fixture, ['content 1']);

    getLinks(fixture)[1].click();
    fixture.detectChanges();
    expectContents(fixture, ['content 1', 'content 2'], 1);
  });

  it(`should work with alternative markup without <ul> and <li>`, () => {
    const fixture = createTestComponent(`
      <nav ngbNav #n="ngbNav" class="nav-tabs">
        <ng-container ngbNavItem>
            <a ngbNavLink>link 1</a>
            <ng-template ngbNavContent>content 1</ng-template>
        </ng-container>
        <ng-container ngbNavItem>
            <a ngbNavLink>link 2</a>
            <ng-template ngbNavContent>content 2</ng-template>
        </ng-container>
      </nav>
      <div [ngbNavOutlet]="n"></div>
    `);

    expectLinks(fixture, [true, false], true);
    expectContents(fixture, ['content 1']);

    getLinks(fixture)[1].click();
    fixture.detectChanges();
    expectLinks(fixture, [false, true], true);
    expectContents(fixture, ['content 2']);
  });

  it(`should add correct CSS classes for disabled tabs`, () => {
    const fixture = createTestComponent(`
        <ul ngbNav #n="ngbNav" class="nav-tabs">
          <li ngbNavItem [disabled]="disabled">
              <a ngbNavLink>link 1</a>
              <ng-template ngbNavContent>content 1</ng-template>
          </li>
        </ul>
        <div [ngbNavOutlet]="n"></div>
      `);

    const links = getLinks(fixture);
    expectLinks(fixture, [true]);
    expect(links[0]).toHaveCssClass('disabled');
    expectContents(fixture, ['content 1']);

    fixture.componentInstance.disabled = false;
    fixture.detectChanges();
    expectLinks(fixture, [true]);
    expect(links[0]).not.toHaveCssClass('disabled');
    expectContents(fixture, ['content 1']);
  });

  it(`should set 'aria-selected', 'aria-controls' and 'aria-labelledby' attributes correctly`, () => {
    const fixture = createTestComponent(`
      <ul ngbNav #n="ngbNav" class="nav-tabs">
        <li ngbNavItem domId="one">
            <a ngbNavLink>link 1</a>
            <ng-template ngbNavContent>content 1</ng-template>
        </li>
        <li ngbNavItem domId="two">
            <a ngbNavLink>link 2</a>
            <ng-template ngbNavContent>content 2</ng-template>
        </li>
      </ul>
      <div [ngbNavOutlet]="n"></div>
    `);

    const links = getLinks(fixture);
    expect(links[0].getAttribute('aria-controls')).toBe('one-panel');
    expect(links[0].getAttribute('aria-selected')).toBe('true');
    expect(links[1].getAttribute('aria-controls')).toBeNull();
    expect(links[1].getAttribute('aria-selected')).toBe('false');
    expect(getContent(fixture).getAttribute('aria-labelledby')).toBe('one');

    links[1].click();
    fixture.detectChanges();
    expect(links[0].getAttribute('aria-controls')).toBeNull();
    expect(links[0].getAttribute('aria-selected')).toBe('false');
    expect(links[1].getAttribute('aria-controls')).toBe('two-panel');
    expect(links[1].getAttribute('aria-selected')).toBe('true');
    expect(getContent(fixture).getAttribute('aria-labelledby')).toBe('two');
  });

  it(`should set 'aria-disabled' attribute correctly`, () => {
    const fixture = createTestComponent(`
      <ul ngbNav #n="ngbNav" class="nav-tabs">
        <li ngbNavItem [disabled]="disabled">
            <a ngbNavLink>link 1</a>
            <ng-template ngbNavContent>content 1</ng-template>
        </li>
      </ul>
      <div [ngbNavOutlet]="n"></div>
    `);

    const links = getLinks(fixture);
    expect(links[0].getAttribute('aria-disabled')).toBe('true');

    fixture.componentInstance.disabled = false;
    fixture.detectChanges();
    expect(links[0].getAttribute('aria-disabled')).toBe('false');
  });

  it(`should pass the 'active' value to content template`, () => {
    const fixture = createTestComponent(`
      <ul ngbNav #n="ngbNav" class="nav-tabs" [destroyOnHide]="false">
        <li ngbNavItem>
            <a ngbNavLink>link 1</a>
            <ng-template ngbNavContent let-active>1-{{ active }}</ng-template>
        </li>
        <li ngbNavItem>
            <a ngbNavLink>link 2</a>
            <ng-template ngbNavContent let-active>2-{{ active }}</ng-template>
        </li>
      </ul>
      <div [ngbNavOutlet]="n"></div>
    `);

    expectContents(fixture, ['1-true', '2-false'], 0);

    getLinks(fixture)[1].click();
    fixture.detectChanges();
    expectContents(fixture, ['1-false', '2-true'], 1);
  });

  describe(`nav keyboard navigation`, () => {
    it(`should not work for nav with role different from 'tablist`, () => {
      const fixture = createTestComponent(`
        <ul ngbNav #n="ngbNav" [roles]="false" class="nav-tabs" keyboard="true">
          <li ngbNavItem>
              <a ngbNavLink></a>
              <ng-template ngbTabContent></ng-template>
          </li>
          <li ngbNavItem>
              <a ngbNavLink></a>
              <ng-template ngbTabContent></ng-template>
          </li>
        </ul>
        <div [ngbNavOutlet]="n"></div>
      `);

      const links = getLinks(fixture);
      const eventArrowRight = createKeyDownEvent(Key.ArrowRight);

      links[0].focus();
      expect(document.activeElement).toBe(links[0]);

      fixture.debugElement.query(By.directive(NgbNav)).triggerEventHandler('keydown.arrowRight', eventArrowRight);
      fixture.detectChanges();
      expect(document.activeElement).toBe(links[0]);
    });

    it(`should ignore disabled tabs`, () => {
      const fixture = createTestComponent(`
      <ul ngbNav #n="ngbNav" class="nav-tabs" keyboard="true">
        <li [ngbNavItem]="1">
            <a ngbNavLink>link 1</a>
            <ng-template ngbNavContent>content 1</ng-template>
        </li>
        <li [ngbNavItem]="2" [disabled]="true">
            <a ngbNavLink>disabled</a>
            <ng-template ngbNavContent>content 2</ng-template>
        </li>
        <li [ngbNavItem]="3">
            <a ngbNavLink>link 3</a>
            <ng-template ngbNavContent>content 3</ng-template>
        </li>
      </ul>
      <div [ngbNavOutlet]="n"></div>
    `);

      const links = getLinks(fixture);
      const eventArrowRight = createKeyDownEvent(Key.ArrowRight);

      links[0].focus();
      expect(document.activeElement).toBe(links[0]);
      expectLinks(fixture, [true, false, false]);

      fixture.debugElement.query(By.directive(NgbNav)).triggerEventHandler('keydown.arrowRight', eventArrowRight);
      fixture.detectChanges();
      expect(document.activeElement).toBe(links[2]);
      expectLinks(fixture, [true, false, false]);
    });

    it(`should move focus correctly between tablinks on 'arrow right', 'arrow left',
         'home', 'end' keydown when keyboard is true`,
       () => {
         const fixture = createTestComponent(`
        <ul ngbNav #n="ngbNav" class="nav-tabs" keyboard="true">
          <li ngbNavItem>
              <a ngbNavLink></a>
              <ng-template ngbTabContent></ng-template>
          </li>
          <li ngbNavItem>
              <a ngbNavLink></a>
              <ng-template ngbTabContent></ng-template>
          </li>
          <li ngbNavItem>
              <a ngbNavLink></a>
              <ng-template ngbTabContent></ng-template>
          </li>
        </ul>
        <div [ngbNavOutlet]="n"></div>
      `);

         const links = getLinks(fixture);
         const eventArrowRight = createKeyDownEvent(Key.ArrowRight);
         const eventArrowLeft = createKeyDownEvent(Key.ArrowLeft);
         const eventHomeKey = createKeyDownEvent(Key.Home);
         const eventEndKey = createKeyDownEvent(Key.End);

         links[0].focus();
         expect(document.activeElement).toBe(links[0]);
         expectLinks(fixture, [true, false, false]);

         fixture.debugElement.query(By.directive(NgbNav)).triggerEventHandler('keydown.arrowRight', eventArrowRight);
         fixture.detectChanges();
         expect(document.activeElement).toBe(links[1]);
         expectLinks(fixture, [true, false, false]);

         fixture.debugElement.query(By.directive(NgbNav)).triggerEventHandler('keydown.arrowLeft', eventArrowLeft);
         fixture.detectChanges();
         expect(document.activeElement).toBe(links[0]);
         expectLinks(fixture, [true, false, false]);

         fixture.debugElement.query(By.directive(NgbNav)).triggerEventHandler('keydown.End', eventEndKey);
         fixture.detectChanges();
         expect(document.activeElement).toBe(links[2]);
         expectLinks(fixture, [true, false, false]);

         fixture.debugElement.query(By.directive(NgbNav)).triggerEventHandler('keydown.Home', eventHomeKey);
         fixture.detectChanges();
         expect(document.activeElement).toBe(links[0]);
         expectLinks(fixture, [true, false, false]);
       });

    it(`should move focus correctly for vertical nav on 'arrow down', 'arrow up',
       'home', 'end' keydown when keyboard is true`,
       () => {
         const fixture = createTestComponent(`
      <ul ngbNav #n="ngbNav" class="nav-tabs" keyboard="true" orientation="vertical">
        <li ngbNavItem>
            <a ngbNavLink></a>
            <ng-template ngbTabContent></ng-template>
        </li>
        <li ngbNavItem>
            <a ngbNavLink></a>
            <ng-template ngbTabContent></ng-template>
        </li>
        <li ngbNavItem>
            <a ngbNavLink></a>
            <ng-template ngbTabContent></ng-template>
        </li>
      </ul>
      <div [ngbNavOutlet]="n"></div>
    `);

         const links = getLinks(fixture);
         const eventArrowUp = createKeyDownEvent(Key.ArrowUp);
         const eventArrowDown = createKeyDownEvent(Key.ArrowDown);
         const eventHomeKey = createKeyDownEvent(Key.Home);
         const eventEndKey = createKeyDownEvent(Key.End);

         links[0].focus();
         expect(document.activeElement).toBe(links[0]);
         expectLinks(fixture, [true, false, false]);

         fixture.debugElement.query(By.directive(NgbNav)).triggerEventHandler('keydown.arrowDown', eventArrowDown);
         fixture.detectChanges();
         expect(document.activeElement).toBe(links[1]);
         expectLinks(fixture, [true, false, false]);

         fixture.debugElement.query(By.directive(NgbNav)).triggerEventHandler('keydown.arrowUp', eventArrowUp);
         fixture.detectChanges();
         expect(document.activeElement).toBe(links[0]);
         expectLinks(fixture, [true, false, false]);

         fixture.debugElement.query(By.directive(NgbNav)).triggerEventHandler('keydown.End', eventEndKey);
         fixture.detectChanges();
         expect(document.activeElement).toBe(links[2]);
         expectLinks(fixture, [true, false, false]);

         fixture.debugElement.query(By.directive(NgbNav)).triggerEventHandler('keydown.Home', eventHomeKey);
         fixture.detectChanges();
         expect(document.activeElement).toBe(links[0]);
         expectLinks(fixture, [true, false, false]);
       });

    it(`should change tab and focus  on 'arrow right', 'arrow left',
         'home', 'end' keydown keydown when keyboard is 'changeWithArrows'`,
       () => {
         const fixture = createTestComponent(`
          <ul ngbNav #n="ngbNav" class="nav-tabs" keyboard="changeWithArrows">
            <li ngbNavItem>
                <a ngbNavLink></a>
                <ng-template ngbTabContent></ng-template>
            </li>
            <li ngbNavItem>
                <a ngbNavLink></a>
                <ng-template ngbTabContent></ng-template>
            </li>
            <li ngbNavItem>
                <a ngbNavLink></a>
                <ng-template ngbTabContent></ng-template>
            </li>
          </ul>
          <div [ngbNavOutlet]="n"></div>
        `);

         const links = getLinks(fixture);
         const eventArrowRight = createKeyDownEvent(Key.ArrowRight);
         const eventArrowLeft = createKeyDownEvent(Key.ArrowLeft);
         const eventHomeKey = createKeyDownEvent(Key.Home);
         const eventEndKey = createKeyDownEvent(Key.End);

         links[0].focus();
         expect(document.activeElement).toBe(links[0]);
         expectLinks(fixture, [true, false, false]);

         fixture.debugElement.query(By.directive(NgbNav)).triggerEventHandler('keydown.arrowRight', eventArrowRight);
         fixture.detectChanges();
         expect(document.activeElement).toBe(links[1]);
         expectLinks(fixture, [false, true, false]);

         fixture.debugElement.query(By.directive(NgbNav)).triggerEventHandler('keydown.arrowLeft', eventArrowLeft);
         fixture.detectChanges();
         expect(document.activeElement).toBe(links[0]);
         expectLinks(fixture, [true, false, false]);

         fixture.debugElement.query(By.directive(NgbNav)).triggerEventHandler('keydown.End', eventEndKey);
         fixture.detectChanges();
         expect(document.activeElement).toBe(links[2]);
         expectLinks(fixture, [false, false, true]);

         fixture.debugElement.query(By.directive(NgbNav)).triggerEventHandler('keydown.Home', eventHomeKey);
         fixture.detectChanges();
         expect(document.activeElement).toBe(links[0]);
         expectLinks(fixture, [true, false, false]);
       });

  });

});

if (isBrowserVisible('ngb-nav animations')) {
  describe('ngb-nav animations', () => {

    @Component({
      template: `
        <ul ngbNav #n="ngbNav" class="nav-tabs" (shown)="onNavShownSpy($event)" (hidden)="onNavHiddenSpy($event)">
          <li [ngbNavItem]="1" (shown)="onItemShownSpy(1)" (hidden)="onItemHiddenSpy(1)">
            <a ngbNavLink>link 1</a>
            <ng-template ngbNavContent>content 1</ng-template>
          </li>
          <li [ngbNavItem]="2" (shown)="onItemShownSpy(2)" (hidden)="onItemHiddenSpy(2)">
            <a ngbNavLink>link 2</a>
            <ng-template ngbNavContent>content 2</ng-template>
          </li>
          <li [ngbNavItem]="3" (shown)="onItemShownSpy(3)" (hidden)="onItemHiddenSpy(3)">
            <a ngbNavLink>link 2</a>
            <ng-template ngbNavContent>content 3</ng-template>
          </li>
        </ul>
        <div [ngbNavOutlet]="n"></div>
      `,
      host: {'[class.ngb-reduce-motion]': 'reduceMotion'}
    })
    class TestAnimationComponent {
      reduceMotion = false;
      onItemHiddenSpy = createSpy();
      onItemShownSpy = createSpy();
      onNavHiddenSpy = createSpy();
      onNavShownSpy = createSpy();
    }

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestAnimationComponent],
        imports: [NgbNavModule],
        providers: [{provide: NgbConfig, useClass: NgbConfigAnimation}]
      });
    });

    function expectContentState(pane: HTMLElement, classes: string[], noClasses: string[], opacity: string) {
      classes.forEach(c => expect(pane).toHaveCssClass(c));
      noClasses.forEach(c => expect(pane).not.toHaveCssClass(c));
      if (!isBrowser('ie')) {
        expect(window.getComputedStyle(pane).opacity).toBe(opacity);
      }
    }

    it(`should run simple fade in/out transition when switching navs (force-reduced-motion = true)`, () => {
      const fixture = TestBed.createComponent(TestAnimationComponent);
      const {onItemHiddenSpy, onItemShownSpy, onNavHiddenSpy, onNavShownSpy} = fixture.componentInstance;
      fixture.componentInstance.reduceMotion = true;
      fixture.detectChanges();

      // 1. checking links have good initial values (1 is active)
      const links = getLinks(fixture);
      expectLinks(fixture, [true, false, false]);
      expectContents(fixture, ['content 1']);
      expectContentState(getContent(fixture), ['fade', 'show'], [], '1');

      // 2. switching from 1 -> 2
      links[1].click();
      fixture.detectChanges();

      // 3. everything is updated synchronously
      expectLinks(fixture, [false, true, false]);
      expectContents(fixture, ['content 2']);
      expectContentState(getContent(fixture), ['fade', 'show'], [], '1');
      expect(onItemHiddenSpy.calls.allArgs()).toEqual([[1]]);
      expect(onNavHiddenSpy.calls.allArgs()).toEqual([[1]]);
      expect(onItemShownSpy.calls.allArgs()).toEqual([[2]]);
      expect(onNavShownSpy.calls.allArgs()).toEqual([[2]]);
    });

    it(`should run simple fade in/out transition when switching navs (force-reduced-motion = false)`, (done) => {
      const fixture = TestBed.createComponent(TestAnimationComponent);
      const {onItemHiddenSpy, onItemShownSpy, onNavHiddenSpy, onNavShownSpy} = fixture.componentInstance;
      fixture.componentInstance.reduceMotion = false;
      fixture.detectChanges();

      // TEST: 1 is active, switching 1 -> 2, catching nav (hidden), catching nav (shown)

      // 1. checking links have good initial values (1 is active)
      const links = getLinks(fixture);
      expectLinks(fixture, [true, false, false]);
      expectContents(fixture, ['content 1']);
      expectContentState(getContent(fixture), ['fade', 'show'], [], '1');

      onNavHiddenSpy.and.callFake(hiddenId => {
        // 5. (hidden) was fired on the nav
        fixture.detectChanges();
        expect(hiddenId).toBe(1);
        expectContents(fixture, ['content 2']);
        expectContentState(getContent(fixture), ['fade', 'show'], [], '0');

        onNavShownSpy.and.callFake(shownId => {
          // 6. (shown) was fired on the nav
          fixture.detectChanges();
          expect(shownId).toBe(2);
          expect(onItemHiddenSpy.calls.allArgs()).toEqual([[1]]);
          expect(onItemShownSpy.calls.allArgs()).toEqual([[2]]);
          expectContents(fixture, ['content 2']);
          expectContentState(getContent(fixture), ['fade', 'show'], [], '1');
          done();
        });
      });

      // 2. switching from 1 -> 2
      links[1].click();
      fixture.detectChanges();

      // 3. links are updated synchronously
      expectLinks(fixture, [false, true, false]);

      // 4. adding 2nd content, 1st still active
      expectContents(fixture, ['content 1', 'content 2'], 0);
      const[first, second] = getContents(fixture);
      expectContentState(first, ['fade'], ['show'], '1');
      expectContentState(second, ['fade'], ['show'], '0');
    });

    it(`should fade in to the new pane if switched after fading out has started already`, (done) => {
      const fixture = TestBed.createComponent(TestAnimationComponent);
      const {onItemHiddenSpy, onItemShownSpy, onNavHiddenSpy, onNavShownSpy} = fixture.componentInstance;
      fixture.componentInstance.reduceMotion = false;
      fixture.detectChanges();

      // TEST: 1 is active, switching 1 -> 2, switching 2 -> 3 while fading out 1, catching nav (shown)

      // 1. checking links have good initial values (1 is active)
      const links = getLinks(fixture);
      expectLinks(fixture, [true, false, false]);
      expectContents(fixture, ['content 1']);
      expectContentState(getContent(fixture), ['fade', 'show'], [], '1');

      onNavShownSpy.and.callFake(shownId => {
        // 8. (shown) should be fired only when switching 2 -> 3
        fixture.detectChanges();
        expect(shownId).toBe(3);
        expect(onNavHiddenSpy).toHaveBeenCalledWith(1);
        expect(onItemHiddenSpy).toHaveBeenCalledWith(1);
        expect(onItemShownSpy).toHaveBeenCalledWith(3);
        expectContents(fixture, ['content 3']);
        expectContentState(getContent(fixture), ['fade', 'show'], [], '1');
        done();
      });

      // 2. switching from 1 -> 2
      links[1].click();
      fixture.detectChanges();

      // 3. links are updated synchronously
      expectLinks(fixture, [false, true, false]);

      // 4. adding 2nd content, 1st still active
      expectContents(fixture, ['content 1', 'content 2'], 0);
      let [first, second] = getContents(fixture);
      expectContentState(first, ['fade'], ['show'], '1');
      expectContentState(second, ['fade'], ['show'], '0');

      // 5. switching from 2 -> 3 immediately
      links[2].click();
      fixture.detectChanges();

      // 6. links are updated synchronously
      expectLinks(fixture, [false, false, true]);

      // 7. removing 2nd, adding 3rd content, 1st still active
      expectContents(fixture, ['content 1', 'content 3'], 0);
      [first, second] = getContents(fixture);
      expectContentState(first, ['fade'], ['show'], '1');
      expectContentState(second, ['fade'], ['show'], '0');
    });

    it(`should reverse fade in if switched to a new pane after fading in has started already`, (done) => {
      const fixture = TestBed.createComponent(TestAnimationComponent);
      const {onItemHiddenSpy, onItemShownSpy, onNavHiddenSpy, onNavShownSpy} = fixture.componentInstance;
      fixture.componentInstance.reduceMotion = false;
      fixture.detectChanges();

      // TEST: 1 is active, switching 1 -> 2, switching 2 -> 3 while fading in 2, catching nav (shown)
      let first: HTMLElement;
      let second: HTMLElement;

      // 1. checking links have good initial values (1 is active)
      const links = getLinks(fixture);
      expectLinks(fixture, [true, false, false]);
      expectContents(fixture, ['content 1']);
      expectContentState(getContent(fixture), ['fade', 'show'], [], '1');

      onNavHiddenSpy.and.callFake(hiddenId => {
        // 5. (hidden) is fired 2 times, for 1 -> 2 them for 2 -> 3
        // we care only about the 1 -> 2
        if (hiddenId === 1) {
          fixture.detectChanges();
          expectContents(fixture, ['content 2']);
          expectContentState(getContent(fixture), ['fade', 'show'], [], '0');

          // 6. switching 2 -> 3
          links[2].click();
          fixture.detectChanges();

          // 7. links are updated synchronously
          expectLinks(fixture, [false, false, true]);

          // 8. adding 3rd content, 2nd still active (only starting fading in)
          expectContents(fixture, ['content 2', 'content 3'], 0);
          [first, second] = getContents(fixture);
          expectContentState(first, ['fade'], ['show'], '0');
          expectContentState(second, ['fade'], ['show'], '0');
        }
      });

      onNavShownSpy.and.callFake(shownId => {
        // 9. (shown) is fired only for 2 -> 3
        fixture.detectChanges();
        expect(shownId).toBe(3);
        expect(onNavHiddenSpy.calls.allArgs()).toEqual([[1], [2]]);
        expect(onItemHiddenSpy.calls.allArgs()).toEqual([[1], [2]]);
        expect(onItemShownSpy.calls.allArgs()).toEqual([[3]]);
        expectContents(fixture, ['content 3']);
        expectContentState(getContent(fixture), ['fade', 'show'], [], '1');
        done();
      });

      // 2. switching from 1 -> 2
      links[1].click();
      fixture.detectChanges();

      // 3. links are updated synchronously
      expectLinks(fixture, [false, true, false]);

      // 4. adding 2nd content, 1st still active
      expectContents(fixture, ['content 1', 'content 2'], 0);
      [first, second] = getContents(fixture);
      expectContentState(first, ['fade'], ['show'], '1');
      expectContentState(second, ['fade'], ['show'], '0');
    });
  });
}


@Component({selector: 'test-cmp', template: ''})
class TestComponent {
  activeId;
  disabled = true;
  items = [1, 2];
  orientation = 'horizontal';
  roles: 'tablist' | false = 'tablist';
  visible = false;
  onActiveIdChange = (id) => {};
  onNavChange = () => {};
  onItemHidden = () => {};
  onItemShown = () => {};
  onNavHidden = () => {};
  onNavShown = () => {};
  onNavChangePrevent = event => {
    if (isDefined(event.activeId)) {
      event.preventDefault();
    }
  }
}
