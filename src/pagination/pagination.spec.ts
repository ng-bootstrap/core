import {TestBed, ComponentFixture, inject, fakeAsync, tick} from '@angular/core/testing';
import {createGenericTestComponent} from '../test/common';

import {Component} from '@angular/core';

import {NgbPaginationModule} from './pagination.module';
import {NgbPagination} from './pagination';
import {NgbPaginationConfig} from './pagination-config';

const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

function expectPages(nativeEl: HTMLElement, pagesDef: string[], ellipsis = '...'): void {
  const pages = nativeEl.querySelectorAll('li');

  expect(pages.length).toEqual(pagesDef.length);

  for (let i = 0; i < pagesDef.length; i++) {
    let pageDef = pagesDef[i];
    let classIndicator = pageDef.charAt(0);
    let textContent = normalizeText(pages[i].textContent);

    if (classIndicator === '+') {
      expect(pages[i]).toHaveCssClass('active');
      expect(pages[i]).not.toHaveCssClass('disabled');
      expect(pages[i].getAttribute('aria-current')).toBe('page');
      expect(textContent).toEqual(pageDef.substr(1) + ' (current)');
    } else if (classIndicator === '-') {
      expect(pages[i]).not.toHaveCssClass('active');
      expect(pages[i]).toHaveCssClass('disabled');
      expect(pages[i].getAttribute('aria-current')).toBeNull();
      expect(textContent).toEqual(pageDef.substr(1));
    } else if (classIndicator === 'c') {  // Custom Pages
      const inputPagination = pages[i].querySelector('input');
      textContent += ',' + inputPagination ?.value;
      expect(textContent).toEqual(pageDef.substr(1));
    } else {
      expect(pages[i]).not.toHaveCssClass('active');
      expect(pages[i]).not.toHaveCssClass('disabled');
      expect(pages[i].getAttribute('aria-current')).toBeNull();
      expect(textContent).toEqual(pageDef);
    }

    // ellipsis is always disabled
    if (textContent === ellipsis) {
      expect(pages[i]).not.toHaveCssClass('active');
      expect(pages[i]).toHaveCssClass('disabled');
      expect(pages[i].getAttribute('aria-current')).toBeNull();
      expect(pages[i].querySelector('a') !.getAttribute('tabindex')).toEqual('-1');
      expect(pages[i].querySelector('a') !.hasAttribute('aria-disabled')).toBeTruthy();
    }
  }
}

function getLink(nativeEl: HTMLElement, idx: number): HTMLAnchorElement {
  return <HTMLAnchorElement>nativeEl.querySelectorAll('li')[idx].querySelector('a');
}

function getList(nativeEl: HTMLElement) {
  return <HTMLUListElement>nativeEl.querySelector('ul');
}

function normalizeText(txt: string | null): string {
  return txt != null ? txt.trim().replace(/\s+/g, ' ') : '';
}

function expectSameValues(pagination: NgbPagination, config: NgbPaginationConfig) {
  expect(pagination.disabled).toBe(config.disabled);
  expect(pagination.boundaryLinks).toBe(config.boundaryLinks);
  expect(pagination.directionLinks).toBe(config.directionLinks);
  expect(pagination.ellipses).toBe(config.ellipses);
  expect(pagination.maxSize).toBe(config.maxSize);
  expect(pagination.pageSize).toBe(config.pageSize);
  expect(pagination.rotate).toBe(config.rotate);
  expect(pagination.size).toBe(config.size);
}

describe('ngb-pagination', () => {
  describe('business logic', () => {

    let pagination: NgbPagination;

    beforeEach(() => { pagination = new NgbPagination(new NgbPaginationConfig()); });

    it('should initialize inputs with default values', () => {
      const defaultConfig = new NgbPaginationConfig();
      expectSameValues(pagination, defaultConfig);
    });

    it('should calculate and update no of pages (default page size)', () => {
      pagination.collectionSize = 100;
      pagination.ngOnChanges(<any>null);
      expect(pagination.pages.length).toEqual(10);

      pagination.collectionSize = 200;
      pagination.ngOnChanges(<any>null);
      expect(pagination.pages.length).toEqual(20);
    });

    it('should calculate and update no of pages (custom page size)', () => {
      pagination.collectionSize = 100;
      pagination.pageSize = 20;
      pagination.ngOnChanges(<any>null);
      expect(pagination.pages.length).toEqual(5);

      pagination.collectionSize = 200;
      pagination.ngOnChanges(<any>null);
      expect(pagination.pages.length).toEqual(10);

      pagination.pageSize = 10;
      pagination.ngOnChanges(<any>null);
      expect(pagination.pages.length).toEqual(20);
    });

    it('should allow setting a page within a valid range (default page size)', () => {
      pagination.collectionSize = 100;
      pagination.page = 2;
      pagination.ngOnChanges(<any>null);
      expect(pagination.page).toEqual(2);
    });

    it('should auto-correct page no if outside of valid range (default page size)', () => {
      pagination.collectionSize = 100;
      pagination.page = 100;
      pagination.ngOnChanges(<any>null);
      expect(pagination.page).toEqual(10);

      pagination.page = -100;
      pagination.ngOnChanges(<any>null);
      expect(pagination.page).toEqual(1);

      pagination.page = 5;
      pagination.collectionSize = 10;
      pagination.ngOnChanges(<any>null);
      expect(pagination.page).toEqual(1);
    });

    it('should allow setting a page within a valid range (custom page size)', () => {
      pagination.collectionSize = 100;
      pagination.pageSize = 20;
      pagination.page = 2;
      pagination.ngOnChanges(<any>null);
      expect(pagination.page).toEqual(2);
    });

  });

  describe('UI logic', () => {

    beforeEach(
        () => { TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgbPaginationModule]}); });

    it('should render and respond to collectionSize change', () => {
      const html = '<ngb-pagination [collectionSize]="collectionSize" [page]="1"></ngb-pagination>';
      const fixture = createTestComponent(html);

      fixture.componentInstance.collectionSize = 30;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['-«', '+1', '2', '3', '»']);

      fixture.componentInstance.collectionSize = 40;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['-«', '+1', '2', '3', '4', '»']);
    });

    it('should render and respond to pageSize change', () => {
      const html =
          '<ngb-pagination [collectionSize]="collectionSize" [page]="1" [pageSize]="pageSize"></ngb-pagination>';
      const fixture = createTestComponent(html);

      fixture.componentInstance.collectionSize = 30;
      fixture.componentInstance.pageSize = 5;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['-«', '+1', '2', '3', '4', '5', '6', '»']);

      fixture.componentInstance.pageSize = 10;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['-«', '+1', '2', '3', '»']);
    });

    it('should render and respond to active page change', () => {
      const html = '<ngb-pagination [collectionSize]="collectionSize" [page]="page"></ngb-pagination>';
      const fixture = createTestComponent(html);

      fixture.componentInstance.collectionSize = 30;
      fixture.componentInstance.page = 2;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['«', '1', '+2', '3', '»']);

      fixture.componentInstance.page = 3;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['«', '1', '2', '+3', '-»']);
    });

    it('should update selected page model on page on click', () => {
      const html = '<ngb-pagination [collectionSize]="collectionSize" [page]="page"></ngb-pagination>';
      const fixture = createTestComponent(html);

      fixture.componentInstance.collectionSize = 30;
      fixture.componentInstance.page = 2;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['«', '1', '+2', '3', '»']);

      getLink(fixture.nativeElement, 1).click();
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['-«', '+1', '2', '3', '»']);


      getLink(fixture.nativeElement, 3).click();
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['«', '1', '2', '+3', '-»']);
    });

    it('should update selected page model on prev / next click', () => {
      const html =
          '<ngb-pagination [collectionSize]="collectionSize" [page]="page" [directionLinks]="directionLinks"></ngb-pagination>';
      const fixture = createTestComponent(html);

      fixture.componentInstance.collectionSize = 30;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['+1', '2', '3']);

      fixture.componentInstance.directionLinks = true;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['-«', '+1', '2', '3', '»']);

      getLink(fixture.nativeElement, 0).click();
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['-«', '+1', '2', '3', '»']);

      getLink(fixture.nativeElement, 4).click();
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['«', '1', '+2', '3', '»']);

      getLink(fixture.nativeElement, 4).click();
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['«', '1', '2', '+3', '-»']);

      getLink(fixture.nativeElement, 4).click();
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['«', '1', '2', '+3', '-»']);
    });

    it('should update selected page model on first / last click', () => {
      const html = `<ngb-pagination [collectionSize]="collectionSize" [page]="page" [maxSize]="maxSize"
              [boundaryLinks]="boundaryLinks"></ngb-pagination>`;
      const fixture = createTestComponent(html);

      fixture.componentInstance.collectionSize = 30;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['-«', '+1', '2', '3', '»']);

      fixture.componentInstance.boundaryLinks = true;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['-««', '-«', '+1', '2', '3', '»', '»»']);

      getLink(fixture.nativeElement, 0).click();
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['-««', '-«', '+1', '2', '3', '»', '»»']);

      getLink(fixture.nativeElement, 6).click();
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['««', '«', '1', '2', '+3', '-»', '-»»']);

      getLink(fixture.nativeElement, 3).click();
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['««', '«', '1', '+2', '3', '»', '»»']);

      getLink(fixture.nativeElement, 0).click();
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['-««', '-«', '+1', '2', '3', '»', '»»']);

      // maxSize < number of pages
      fixture.componentInstance.collectionSize = 70;
      fixture.componentInstance.maxSize = 3;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['-««', '-«', '+1', '2', '3', '-...', '7', '»', '»»']);

      getLink(fixture.nativeElement, 8).click();
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['««', '«', '1', '-...', '+7', '-»', '-»»']);

      getLink(fixture.nativeElement, 0).click();
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['-««', '-«', '+1', '2', '3', '-...', '7', '»', '»»']);
    });

    it('should update page when it becomes out of range', fakeAsync(() => {
         const html =
             '<ngb-pagination [collectionSize]="collectionSize" [(page)]="page" [size]="size"></ngb-pagination>';
         const fixture = createTestComponent(html);

         fixture.componentInstance.collectionSize = 30;
         fixture.detectChanges();
         expectPages(fixture.nativeElement, ['-«', '+1', '2', '3', '»']);

         getLink(fixture.nativeElement, 3).click();
         fixture.detectChanges();
         tick();
         expectPages(fixture.nativeElement, ['«', '1', '2', '+3', '-»']);
         expect(fixture.componentInstance.page).toBe(3);

         fixture.componentInstance.collectionSize = 20;
         fixture.detectChanges();
         tick();
         expectPages(fixture.nativeElement, ['«', '1', '+2', '-»']);
         expect(fixture.componentInstance.page).toBe(2);
       }));

    it('should render and respond to size change', () => {
      const html = '<ngb-pagination [collectionSize]="20" [page]="1" [size]="size"></ngb-pagination>';

      const fixture = createTestComponent(html);
      const listEl = getList(fixture.nativeElement);

      // default case
      expectPages(fixture.nativeElement, ['-«', '+1', '2', '»']);
      expect(listEl).toHaveCssClass('pagination');

      // large size
      fixture.componentInstance.size = 'lg';
      fixture.detectChanges();
      expect(listEl).toHaveCssClass('pagination');
      expect(listEl).toHaveCssClass('pagination-lg');

      // removing large size
      fixture.componentInstance.size = '';
      fixture.detectChanges();
      expect(listEl).toHaveCssClass('pagination');
      expect(listEl).not.toHaveCssClass('pagination-lg');

      // arbitrary string
      fixture.componentInstance.size = '123';
      fixture.detectChanges();
      expect(listEl).toHaveCssClass('pagination');
      expect(listEl).toHaveCssClass('pagination-123');
    });

    it('should render and respond to maxSize change correctly', () => {
      const html =
          '<ngb-pagination [collectionSize]="70" [page]="page" [maxSize]="maxSize" [ellipses]="ellipses"></ngb-pagination>';
      const fixture = createTestComponent(html);

      expectPages(fixture.nativeElement, ['-«', '+1', '2', '3', '4', '5', '6', '7', '»']);

      // disabling ellipsis
      fixture.componentInstance.ellipses = false;

      // limiting to 3 page numbers
      fixture.componentInstance.maxSize = 3;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['-«', '+1', '2', '3', '»']);

      fixture.componentInstance.page = 3;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['«', '1', '2', '+3', '»']);

      fixture.componentInstance.page = 4;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['«', '+4', '5', '6', '»']);

      fixture.componentInstance.page = 7;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['«', '+7', '-»']);

      // checking that maxSize > total pages works
      fixture.componentInstance.maxSize = 100;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['«', '1', '2', '3', '4', '5', '6', '+7', '-»']);
    });

    it('should render and rotate pages correctly', () => {
      const html = `<ngb-pagination [collectionSize]="70" [page]="page" [maxSize]="maxSize" [rotate]="rotate"
        [ellipses]="ellipses"></ngb-pagination>`;
      const fixture = createTestComponent(html);

      expectPages(fixture.nativeElement, ['-«', '+1', '2', '3', '4', '5', '6', '7', '»']);

      // disabling ellipsis
      fixture.componentInstance.ellipses = false;

      // limiting to 3 (odd) page numbers
      fixture.componentInstance.maxSize = 3;
      fixture.componentInstance.rotate = true;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['-«', '+1', '2', '3', '»']);

      fixture.componentInstance.page = 2;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['«', '1', '+2', '3', '»']);

      fixture.componentInstance.page = 3;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['«', '2', '+3', '4', '»']);

      fixture.componentInstance.page = 7;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['«', '5', '6', '+7', '-»']);

      // limiting to 4 (even) page numbers
      fixture.componentInstance.maxSize = 4;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['«', '4', '5', '6', '+7', '-»']);

      fixture.componentInstance.page = 5;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['«', '3', '4', '+5', '6', '»']);

      fixture.componentInstance.page = 3;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['«', '1', '2', '+3', '4', '»']);
    });

    it('should display ellipsis correctly', () => {
      const html = `<ngb-pagination [collectionSize]="70" [page]="page"
        [maxSize]="maxSize" [rotate]="rotate" [ellipses]="ellipses"></ngb-pagination>`;
      const fixture = createTestComponent(html);

      expectPages(fixture.nativeElement, ['-«', '+1', '2', '3', '4', '5', '6', '7', '»']);

      // limiting to 3 page numbers
      fixture.componentInstance.maxSize = 3;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['-«', '+1', '2', '3', '-...', '7', '»']);

      fixture.componentInstance.page = 4;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['«', '1', '-...', '+4', '5', '6', '7', '»']);

      fixture.componentInstance.page = 7;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['«', '1', '-...', '+7', '-»']);

      // enabling rotation
      fixture.componentInstance.rotate = true;
      fixture.componentInstance.page = 1;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['-«', '+1', '2', '3', '-...', '7', '»']);

      fixture.componentInstance.page = 2;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['«', '1', '+2', '3', '-...', '7', '»']);

      fixture.componentInstance.page = 3;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['«', '1', '2', '+3', '4', '-...', '7', '»']);

      fixture.componentInstance.page = 4;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['«', '1', '2', '3', '+4', '5', '6', '7', '»']);

      fixture.componentInstance.page = 5;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['«', '1', '-...', '4', '+5', '6', '7', '»']);

      fixture.componentInstance.page = 6;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['«', '1', '-...', '5', '+6', '7', '»']);

      fixture.componentInstance.page = 7;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['«', '1', '-...', '5', '6', '+7', '-»']);

      // no ellipsis when maxPage > total pages
      fixture.componentInstance.maxSize = 100;
      fixture.componentInstance.page = 5;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['«', '1', '2', '3', '4', '+5', '6', '7', '»']);
    });

    it('should use page number instead of ellipsis when ellipsis hides a single page', () => {
      const html = `<ngb-pagination [collectionSize]="120" [page]="page"
        [maxSize]="5" [rotate]="true" [ellipses]="true"></ngb-pagination>`;
      const fixture = createTestComponent(html);

      fixture.componentInstance.page = 1;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['-«', '+1', '2', '3', '4', '5', '-...', '12', '»']);

      fixture.componentInstance.page = 2;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['«', '1', '+2', '3', '4', '5', '-...', '12', '»']);

      fixture.componentInstance.page = 3;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['«', '1', '2', '+3', '4', '5', '-...', '12', '»']);

      fixture.componentInstance.page = 4;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['«', '1', '2', '3', '+4', '5', '6', '-...', '12', '»']);

      fixture.componentInstance.page = 5;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['«', '1', '2', '3', '4', '+5', '6', '7', '-...', '12', '»']);

      fixture.componentInstance.page = 6;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['«', '1', '-...', '4', '5', '+6', '7', '8', '-...', '12', '»']);

      fixture.componentInstance.page = 7;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['«', '1', '-...', '5', '6', '+7', '8', '9', '-...', '12', '»']);

      fixture.componentInstance.page = 8;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['«', '1', '-...', '6', '7', '+8', '9', '10', '11', '12', '»']);

      fixture.componentInstance.page = 9;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['«', '1', '-...', '7', '8', '+9', '10', '11', '12', '»']);

      fixture.componentInstance.page = 10;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['«', '1', '-...', '8', '9', '+10', '11', '12', '»']);

      fixture.componentInstance.page = 11;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['«', '1', '-...', '8', '9', '10', '+11', '12', '»']);

      fixture.componentInstance.page = 12;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['«', '1', '-...', '8', '9', '10', '11', '+12', '-»']);
    });

    it('should handle edge "maxSize" values', () => {
      const html = '<ngb-pagination [collectionSize]="50" [maxSize]="maxSize"></ngb-pagination>';
      const fixture = createTestComponent(html);

      fixture.componentInstance.maxSize = 2;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['-«', '+1', '2', '-...', '5', '»']);

      fixture.componentInstance.maxSize = 0;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['-«', '+1', '2', '3', '4', '5', '»']);

      fixture.componentInstance.maxSize = 100;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['-«', '+1', '2', '3', '4', '5', '»']);

      fixture.componentInstance.maxSize = NaN;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['-«', '+1', '2', '3', '4', '5', '»']);

      fixture.componentInstance.maxSize = <any>null;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['-«', '+1', '2', '3', '4', '5', '»']);
    });

    it('should handle edge "collectionSize" values', () => {
      const html = '<ngb-pagination [collectionSize]="collectionSize"></ngb-pagination>';
      const fixture = createTestComponent(html);

      fixture.componentInstance.collectionSize = 0;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['-«', '-»']);

      fixture.componentInstance.collectionSize = NaN;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['-«', '-»']);

      fixture.componentInstance.collectionSize = <any>null;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['-«', '-»']);
    });

    it('should handle edge "pageSize" values', () => {
      const html = '<ngb-pagination [collectionSize]="50" [pageSize]="pageSize"></ngb-pagination>';
      const fixture = createTestComponent(html);

      fixture.componentInstance.pageSize = 0;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['-«', '-»']);

      fixture.componentInstance.pageSize = NaN;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['-«', '-»']);

      fixture.componentInstance.pageSize = <any>null;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['-«', '-»']);
    });

    it('should handle edge "page" values', () => {
      const html = '<ngb-pagination [collectionSize]="20" [page]="page"></ngb-pagination>';
      const fixture = createTestComponent(html);

      fixture.componentInstance.page = 0;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['-«', '+1', '2', '»']);

      fixture.componentInstance.page = 2016;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['«', '1', '+2', '-»']);

      fixture.componentInstance.page = NaN;
      expectPages(fixture.nativeElement, ['«', '1', '+2', '-»']);

      fixture.componentInstance.page = <any>null;
      expectPages(fixture.nativeElement, ['«', '1', '+2', '-»']);
    });

    it('should not emit "pageChange" for incorrect input values', fakeAsync(() => {
         const html = `<ngb-pagination [collectionSize]="collectionSize" [pageSize]="pageSize" [maxSize]="maxSize"
        (pageChange)="onPageChange($event)"></ngb-pagination>`;
         const fixture = createTestComponent(html);
         tick();

         spyOn(fixture.componentInstance, 'onPageChange');

         fixture.componentInstance.collectionSize = NaN;
         fixture.detectChanges();
         tick();

         fixture.componentInstance.maxSize = NaN;
         fixture.detectChanges();
         tick();

         fixture.componentInstance.pageSize = NaN;
         fixture.detectChanges();
         tick();

         expect(fixture.componentInstance.onPageChange).not.toHaveBeenCalled();
       }));

    it('should not emit "pageChange" when collection size is not set', fakeAsync(() => {
         const html = `<ngb-pagination [page]="page" (pageChange)="onPageChange($event)"></ngb-pagination>`;
         const fixture = createTestComponent(html);
         tick();

         spyOn(fixture.componentInstance, 'onPageChange');

         fixture.componentInstance.page = 5;
         fixture.detectChanges();
         tick();

         expect(fixture.componentInstance.onPageChange).not.toHaveBeenCalled();
       }));

    it('should set classes correctly for disabled state', () => {
      const html = `<ngb-pagination [collectionSize]="collectionSize" [pageSize]="pageSize" [maxSize]="maxSize"
         [disabled]=true></ngb-pagination>`;
      const fixture = createTestComponent(html);

      const buttons = fixture.nativeElement.querySelectorAll('li');
      for (let i = 0; i < buttons.length; i++) {
        expect(buttons[i]).toHaveCssClass('disabled');
      }
    });

    it('should set tabindex for links correctly for disabled state', () => {
      const html = `<ngb-pagination [collectionSize]="collectionSize" [pageSize]="pageSize" [maxSize]="maxSize"
      [disabled]=true></ngb-pagination>`;
      const fixture = createTestComponent(html);

      const buttonLinks = fixture.nativeElement.querySelectorAll('li a');
      for (let i = 0; i < buttonLinks.length; i++) {
        expect(buttonLinks[i].getAttribute('tabindex')).toEqual('-1');
      }
    });

    it('should set aria-disabled for links correctly for disabled state', () => {
      const html = `<ngb-pagination [collectionSize]="collectionSize" [pageSize]="pageSize" [maxSize]="maxSize"
      [disabled]=true></ngb-pagination>`;
      const fixture = createTestComponent(html);

      const buttonLinks = fixture.nativeElement.querySelectorAll('li a');
      for (let i = 0; i < buttonLinks.length; i++) {
        expect(buttonLinks[i].getAttribute('aria-disabled')).toEqual('true');
      }
    });

  });

  describe('Customization', () => {

    beforeEach(
        () => { TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgbPaginationModule]}); });

    it('should allow overriding link templates', () => {
      const fixture = createTestComponent(`
        <ngb-pagination [collectionSize]="50" [page]="1" [boundaryLinks]="true" [ellipses]="true" [maxSize]="2">
          <ng-template ngbPaginationFirst>F</ng-template>
          <ng-template ngbPaginationLast>L</ng-template>
          <ng-template ngbPaginationPrevious>P</ng-template>
          <ng-template ngbPaginationNext>N</ng-template>
          <ng-template ngbPaginationEllipsis>E</ng-template>
          <ng-template ngbPaginationNumber let-page let-currentPage="currentPage">
            {{ page }}!
            <span *ngIf="page === currentPage" class="sr-only">(current)</span>
          </ng-template>
        </ngb-pagination>
      `);

      expectPages(fixture.nativeElement, ['-F', '-P', '+1!', '2!', '-E', '5!', 'N', 'L'], 'E');
    });

    it('should pass disabled value to custom link templates', () => {
      const fixture = createTestComponent(`
        <ngb-pagination [collectionSize]="30" [(page)]="page" [boundaryLinks]="true" [disabled]="disabled">
          <ng-template ngbPaginationFirst let-disabled="disabled">{{ disabled ? 'dF' : 'F' }}</ng-template>
          <ng-template ngbPaginationLast let-disabled="disabled">{{ disabled ? 'dL' : 'L' }}</ng-template>
          <ng-template ngbPaginationPrevious let-disabled="disabled">{{ disabled ? 'dP' : 'P' }}</ng-template>
          <ng-template ngbPaginationNext let-disabled="disabled">{{ disabled ? 'dN' : 'N' }}</ng-template>
          <ng-template ngbPaginationNumber let-page let-currentPage="currentPage" let-disabled="disabled">
            {{ disabled ? 'd'+page : page }}
            <span *ngIf="page === currentPage" class="sr-only">(current)</span>
          </ng-template>
        </ngb-pagination>
      `);

      expectPages(fixture.nativeElement, ['-dF', '-dP', '+1', '2', '3', 'N', 'L']);

      fixture.componentInstance.page = 3;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['F', 'P', '1', '2', '+3', '-dN', '-dL']);

      fixture.componentInstance.disabled = true;
      fixture.detectChanges();
      const firstPage = getLink(fixture.nativeElement, 2);
      expect(firstPage.parentElement).toHaveCssClass('disabled');
      expect(firstPage.textContent !.trim()).toBe('d1');
    });
  });

  describe('Custom Pages', () => {

    beforeEach(
        () => { TestBed.configureTestingModule({declarations: [TestPageComponent], imports: [NgbPaginationModule]}); });

    it('should render and respond to collectionSize change with customPages', () => {
      const fixture = TestBed.createComponent(TestPageComponent);

      fixture.componentInstance.collectionSize = 30;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['-«', 'cPagesof 3,1', '»']);

      fixture.componentInstance.collectionSize = 40;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['-«', 'cPagesof 4,1', '»']);
    });

    it('should render and respond to pageSize change with custom Pages', () => {
      const fixture = TestBed.createComponent(TestPageComponent);

      fixture.componentInstance.collectionSize = 30;
      fixture.componentInstance.pageSize = 5;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['-«', 'cPagesof 6,1', '»']);

      fixture.componentInstance.pageSize = 10;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['-«', 'cPagesof 3,1', '»']);
    });

    it('should render and respond to active page change with custom Pages', () => {
      const fixture = TestBed.createComponent(TestPageComponent);

      fixture.componentInstance.collectionSize = 30;
      fixture.componentInstance.page = 2;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['«', 'cPagesof 3,2', '»']);

      fixture.componentInstance.page = 3;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['«', 'cPagesof 3,3', '-»']);
    });

    it('should update selected page model on page on click with custom Pages', () => {
      const fixture = TestBed.createComponent(TestPageComponent);

      fixture.componentInstance.collectionSize = 30;
      fixture.componentInstance.page = 2;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['«', 'cPagesof 3,2', '»']);

      getLink(fixture.nativeElement, 0).click();
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['-«', 'cPagesof 3,1', '»']);

      getLink(fixture.nativeElement, 2).click();
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['«', 'cPagesof 3,2', '»']);
    });

    it('should pass disabled flag with custom Pages', () => {
      const fixture = TestBed.createComponent(TestPageComponent);

      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['-«', 'cPagesof 10,1', '»']);
      expect(fixture.nativeElement.querySelector('input').hasAttribute('disabled')).toBeFalsy();

      fixture.componentInstance.disabled = true;
      fixture.detectChanges();
      expectPages(fixture.nativeElement, ['-«', 'cPagesof 10,1', '-»']);
      expect(fixture.nativeElement.querySelector('input').hasAttribute('disabled')).toBeTruthy();
    });
  });

  describe('Custom config', () => {
    let config: NgbPaginationConfig;

    beforeEach(() => { TestBed.configureTestingModule({imports: [NgbPaginationModule]}); });

    beforeEach(inject([NgbPaginationConfig], (c: NgbPaginationConfig) => {
      config = c;
      config.boundaryLinks = true;
      config.directionLinks = false;
      config.ellipses = false;
      config.maxSize = 42;
      config.pageSize = 7;
      config.rotate = true;
      config.size = 'sm';
    }));

    it('should initialize inputs with provided config', () => {
      const fixture = TestBed.createComponent(NgbPagination);
      fixture.detectChanges();

      let pagination = fixture.componentInstance;
      expectSameValues(pagination, config);
    });
  });

  describe('Custom config as provider', () => {
    let config = new NgbPaginationConfig();
    config.disabled = true;
    config.boundaryLinks = true;
    config.directionLinks = false;
    config.ellipses = false;
    config.maxSize = 42;
    config.pageSize = 7;
    config.rotate = true;
    config.size = 'sm';

    beforeEach(() => {
      TestBed.configureTestingModule(
          {imports: [NgbPaginationModule], providers: [{provide: NgbPaginationConfig, useValue: config}]});
    });

    it('should initialize inputs with provided config as provider', () => {
      const fixture = TestBed.createComponent(NgbPagination);
      fixture.detectChanges();

      let pagination = fixture.componentInstance;
      expectSameValues(pagination, config);
    });
  });
});

@Component({selector: 'test-cmp', template: ''})
class TestComponent {
  disabled = false;
  pageSize = 10;
  collectionSize = 100;
  page = 1;
  boundaryLinks = false;
  directionLinks = false;
  size = '';
  maxSize = 0;
  ellipses = true;
  rotate = false;

  onPageChange = () => {};
}

@Component({
  selector: 'test-page-cmp',
  template:
      `<ngb-pagination [collectionSize]="collectionSize" [page]="page" [pageSize]="pageSize" [disabled]="disabled">
                <ng-template ngbPaginationPages let-page let-pages="pages" let-disabled="disabled">
                <li *ngIf="pages.length > 0">
                    <label>Pages</label>
                    <input
                        type="text"
                        inputmode="numeric"
                        pattern="[0-9]*"
                        [disabled]="disabled"
                        [value]="page"
                    />
                    <span>of {{pages.length}}</span>
                </li>
              </ng-template>
            </ngb-pagination>`
})
class TestPageComponent {
  pageSize = 10;
  collectionSize = 100;
  page = 1;
  disabled = false;
}
