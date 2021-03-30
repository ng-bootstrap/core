import {TestBed, ComponentFixture} from '@angular/core/testing';
import {createGenericTestComponent} from '../test/common';

import {Component} from '@angular/core';

import {NgbHighlight} from './highlight';
import {NgbTypeaheadModule} from './typeahead.module';

const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

/**
 * Get generated innerHtml without HTML comments and Angular debug attributes
 */
function highlightHtml(fixture) {
  const elms = fixture.nativeElement.children[0].childNodes;
  let elm;
  let result = '';
  let nodeName;

  for (let i = 0; i < elms.length; i++) {
    elm = elms[i];

    if (elm.nodeType === Node.ELEMENT_NODE) {
      nodeName = elm.nodeName.toLowerCase();
      result += `<${nodeName} class="${elm.className}">${elm.textContent}</${nodeName}>`;
    } else if (elm.nodeType === Node.TEXT_NODE) {
      result += elm.wholeText;
    }
  }

  return result;
}

describe('ngb-highlight', () => {

  beforeEach(() => {
    TestBed.overrideModule(NgbTypeaheadModule, {set: {exports: [NgbHighlight]}});
    TestBed.configureTestingModule({declarations: [TestComponent], imports: [NgbTypeaheadModule]});
  });

  it('should render highlighted text when there is one match', () => {
    const fixture = createTestComponent('<ngb-highlight result="foo bar baz" term="bar"></ngb-highlight>');

    expect(highlightHtml(fixture)).toBe('foo <span class="ngb-highlight">bar</span> baz');
  });

  it('should render highlighted text when there are multiple matches', () => {
    const fixture = createTestComponent('<ngb-highlight result="foo bar baz bar foo" term="bar"></ngb-highlight>');

    expect(highlightHtml(fixture))
        .toBe('foo <span class="ngb-highlight">bar</span> baz <span class="ngb-highlight">bar</span> foo');
  });

  it('should render highlighted text when there is a match at the beginning', () => {
    const fixture = createTestComponent('<ngb-highlight result="bar baz" term="bar"></ngb-highlight>');

    expect(highlightHtml(fixture)).toBe('<span class="ngb-highlight">bar</span> baz');
  });

  it('should render highlighted text when there is a match at the end', () => {
    const fixture = createTestComponent('<ngb-highlight result="bar baz" term="baz"></ngb-highlight>');

    expect(highlightHtml(fixture)).toBe('bar <span class="ngb-highlight">baz</span>');
  });

  it('should render highlighted text when there is a case-insensitive match', () => {
    const fixture = createTestComponent('<ngb-highlight result="foo bAR baz" term="bar"></ngb-highlight>');

    expect(highlightHtml(fixture)).toBe('foo <span class="ngb-highlight">bAR</span> baz');
  });

  it('should render highlighted text with special characters', () => {
    const fixture = createTestComponent('<ngb-highlight result="foo (bAR baz" term="(BAR"></ngb-highlight>');

    expect(highlightHtml(fixture)).toBe('foo <span class="ngb-highlight">(bAR</span> baz');
  });

  it('should render highlighted text for stringified non-string args', () => {
    const fixture = createTestComponent('<ngb-highlight [result]="123" term="2"></ngb-highlight>');
    fixture.detectChanges();
    expect(highlightHtml(fixture)).toBe('1<span class="ngb-highlight">2</span>3');
  });

  it('should behave reasonably for blank result', () => {
    const fixture = createTestComponent('<ngb-highlight [result]="null" term="2"></ngb-highlight>');

    expect(highlightHtml(fixture)).toBe('');
  });

  it('should not convert null result to string', () => {
    const fixture = createTestComponent('<ngb-highlight [result]="null" term="null"></ngb-highlight>');

    expect(highlightHtml(fixture)).toBe('');
  });

  it('should properly detect matches in 0 result', () => {
    const fixture = createTestComponent('<ngb-highlight [result]="0" term="0"></ngb-highlight>');

    expect(highlightHtml(fixture)).toBe(`<span class="ngb-highlight">0</span>`);
  });

  it('should not highlight anything for blank term', () => {
    const fixture = createTestComponent('<ngb-highlight result="1null23" [term]="null"></ngb-highlight>');

    expect(highlightHtml(fixture)).toBe('1null23');
  });

  it('should not highlight anything for blank term', () => {
    const fixture = createTestComponent(`<ngb-highlight result="123" [term]="''"></ngb-highlight>`);

    expect(highlightHtml(fixture)).toBe('123');
  });

  it('should properly highlight zeros', () => {
    const fixture = createTestComponent(`<ngb-highlight result="0123" [term]="0"></ngb-highlight>`);

    expect(highlightHtml(fixture)).toBe('<span class="ngb-highlight">0</span>123');
  });

  it('should support custom highlight class', () => {
    const fixture = createTestComponent('<ngb-highlight result="123" [term]="2" highlightClass="my"></ngb-highlight>');

    expect(highlightHtml(fixture)).toBe('1<span class="my">2</span>3');
  });

  it('should highlight when term contains array with 1 item', () => {
    const fixture = createTestComponent(`<ngb-highlight result="foo bar baz" [term]="['bar']"></ngb-highlight>`);

    expect(highlightHtml(fixture)).toBe('foo <span class="ngb-highlight">bar</span> baz');
  });

  it('should highlight when term contains array with several items', () => {
    const fixture = createTestComponent(`<ngb-highlight result="foo bar baz" [term]="['foo', 'baz']"></ngb-highlight>`);

    expect(highlightHtml(fixture))
        .toBe('<span class="ngb-highlight">foo</span> bar <span class="ngb-highlight">baz</span>');
  });

  it('should highlight when term contains array with several items and the terms in text stand together', () => {
    const fixture = createTestComponent(`<ngb-highlight result="foobar baz" [term]="['foo', 'bar']"></ngb-highlight>`);

    expect(highlightHtml(fixture))
        .toBe('<span class="ngb-highlight">foo</span><span class="ngb-highlight">bar</span> baz');
  });

  it('should not fail when term contains null element', () => {
    const fixture = createTestComponent(`<ngb-highlight result="foo bar baz" [term]="[null, 'bar']"></ngb-highlight>`);

    expect(highlightHtml(fixture)).toBe('foo <span class="ngb-highlight">bar</span> baz');
  });

  it('should highlight when term contains mix of strings and numbers', () => {
    const fixture =
        createTestComponent(`<ngb-highlight [result]="1123456789" [term]="[123, 345, '678']"></ngb-highlight>`);

    expect(highlightHtml(fixture))
        .toBe('1<span class="ngb-highlight">123</span>45<span class="ngb-highlight">678</span>9');
  });

  if (typeof String.prototype.normalize !== 'undefined') {
    it('should highlight without sensitivity to accents in terms or result when accentSensitive is false ' +
           'and String.prototype.normalize is defined',
       () => {
         const fixture = createTestComponent(
             `<ngb-highlight [result]="'Il fait beau en été. Moins à Noël.'" ` +
             `[term]="['eté', 'a', 'noel']" [accentSensitive]="false"></ngb-highlight>`);

         expect(highlightHtml(fixture))
             .toBe(
                 'Il f<span class="ngb-highlight">a</span>it be<span class="ngb-highlight">a</span>u en ' +
                 '<span class="ngb-highlight">été</span>. Moins <span class="ngb-highlight">à</span> ' +
                 '<span class="ngb-highlight">Noël</span>.');
       });
  } else {
    it('should highlight with sensitivity to accents in terms or result when accentSensitive is false ' +
           'and String.prototype.normalize is undefined',
       () => {
         const fixture = createTestComponent(
             `<ngb-highlight [result]="'Il fait beau en été. Moins à Noël.'" ` +
             `[term]="['eté', 'a', 'noel']" [accentSensitive]="false"></ngb-highlight>`);

         expect(highlightHtml(fixture))
             .toBe(
                 'Il f<span class="ngb-highlight">a</span>it be<span class="ngb-highlight">a</span>u en été. Moins à Noël.');
       });
  }

  it('should highlight with sensitivity to accents in terms or result when accentSensitive is true', () => {
    const fixture = createTestComponent(
        `<ngb-highlight [result]="'Il fait beau en été. Moins à Noël.'" ` +
        `[term]="['eté', 'a', 'noel']"></ngb-highlight>`);

    expect(highlightHtml(fixture))
        .toBe(
            'Il f<span class="ngb-highlight">a</span>it be<span class="ngb-highlight">a</span>u en été. Moins à Noël.');
  });
});


@Component({selector: 'test-cmp', template: ''})
class TestComponent {
}
