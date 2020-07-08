import {Positioning, positionElements} from './positioning';
import {TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';

describe('Positioning', () => {

  function createElement(
      height: number, width: number, marginTop: number, marginLeft: number, isAbsolute = false): HTMLElement {
    let el = document.createElement('div');
    if (isAbsolute) {
      el.style.position = 'absolute';
      el.style.top = '0';
      el.style.left = '0';
    }
    el.style.display = 'inline-block';
    el.style.height = height + 'px';
    el.style.width = width + 'px';
    el.style.marginTop = marginTop + 'px';
    el.style.marginLeft = marginLeft + 'px';

    return el;
  }

  function checkPosition(el: HTMLElement, top: number, left: number) {
    const transform = el.style.transform;
    expect(transform).toBe(`translate(${left}px, ${top}px)`);
  }

  let element, targetElement, positioning, documentMargin, bodyMargin;
  beforeAll(() => {
    positioning = new Positioning();
    documentMargin = document.documentElement.style.margin;
    bodyMargin = document.body.style.margin;

    document.documentElement.style.margin = '0';
    document.body.style.margin = '0';
  });

  afterAll(() => {
    document.documentElement.style.margin = documentMargin;
    document.body.style.margin = bodyMargin;
  });

  beforeEach(() => {
    TestBed.configureTestingModule({declarations: [TestComponent]});
    const fixture = TestBed.createComponent(TestComponent);

    element = fixture.nativeElement.querySelector('#element');
    targetElement = fixture.nativeElement.querySelector('#targetElement');
  });

  it('should calculate the element offset', () => {
    let position = positioning.offset(element);

    expect(position.height).toBe(200);
    expect(position.width).toBe(300);
    expect(position.top).toBe(100);
    expect(position.bottom).toBe(300);
    expect(position.left).toBe(150);
    expect(position.right).toBe(450);
  });

  it('should calculate the element offset when scrolled', () => {
    document.documentElement.scrollTop = 1000;
    document.documentElement.scrollLeft = 1000;

    let position = positioning.offset(element);

    expect(position.top).toBe(100);
    expect(position.bottom).toBe(300);
    expect(position.left).toBe(150);
    expect(position.right).toBe(450);

    document.documentElement.scrollTop = 0;
    document.documentElement.scrollLeft = 0;
  });

  it('should calculate the element position', () => {
    let position = positioning.position(element);

    expect(position.height).toBe(200);
    expect(position.width).toBe(300);
    expect(position.top).toBe(100);
    expect(position.bottom).toBe(300);
    expect(position.left).toBe(150);
    expect(position.right).toBe(450);
  });

  it('should calculate the element position when scrolled', () => {
    document.documentElement.scrollTop = 1000;
    document.documentElement.scrollLeft = 1000;

    let position = positioning.position(element);

    expect(position.top).toBe(100);
    expect(position.bottom).toBe(300);
    expect(position.left).toBe(150);
    expect(position.right).toBe(450);

    document.documentElement.scrollTop = 0;
    document.documentElement.scrollLeft = 0;
  });

  it('should calculate the element position on positioned ancestor', () => {
    let childElement = createElement(100, 150, 50, 75);

    element.style.position = 'relative';
    element.appendChild(childElement);

    let position = positioning.position(childElement);

    expect(position.top).toBe(50);
    expect(position.bottom).toBe(150);
    expect(position.left).toBe(75);
    expect(position.right).toBe(225);

    element.style.position = '';
    element.removeChild(childElement);
  });

  it('should position the element top-left', () => {

    let placement = positionElements(element, targetElement, 'top-left');

    expect(placement).toBe('top-left');
    checkPosition(targetElement, 40, 150);
  });

  it('should position the element top-center', () => {
    let placement = positionElements(element, targetElement, 'top');

    expect(placement).toBe('top');
    checkPosition(targetElement, 40, 250);
  });

  it('should position the element top-right', () => {
    let placement = positionElements(element, targetElement, 'top-right');

    expect(placement).toBe('top-right');
    checkPosition(targetElement, 40, 350);
  });

  it('should position the element bottom-left', () => {
    let placement = positionElements(element, targetElement, 'bottom-left');

    expect(placement).toBe('bottom-left');
    checkPosition(targetElement, 300, 150);
  });

  it('should position the element bottom-center', () => {
    let placement = positionElements(element, targetElement, 'bottom');

    expect(placement).toBe('bottom');
    checkPosition(targetElement, 300, 250);
  });

  it('should position the element bottom-right', () => {
    let placement = positionElements(element, targetElement, 'bottom-right');

    expect(placement).toBe('bottom-right');
    checkPosition(targetElement, 300, 350);
  });

  it('should position the element left-top', () => {
    let placement = positionElements(element, targetElement, 'left-top');

    expect(placement).toBe('left-top');
    checkPosition(targetElement, 100, 30);
  });

  it('should position the element left-center', () => {
    let placement = positionElements(element, targetElement, 'left');

    expect(placement).toBe('left');
    checkPosition(targetElement, 175, 30);
  });

  it('should position the element left-bottom', () => {
    let placement = positionElements(element, targetElement, 'left-bottom');

    expect(placement).toBe('left-bottom');
    checkPosition(targetElement, 250, 30);
  });

  it('should position the element right-top', () => {
    let placement = positionElements(element, targetElement, 'right-top');

    expect(placement).toBe('right-top');
    checkPosition(targetElement, 100, 450);
  });

  it('should position the element right-center', () => {
    let placement = positionElements(element, targetElement, 'right');

    expect(placement).toBe('right');
    checkPosition(targetElement, 175, 450);
  });

  it('should position the element right-bottom', () => {
    let placement = positionElements(element, targetElement, 'right-bottom');

    expect(placement).toBe('right-bottom');
    checkPosition(targetElement, 250, 450);
  });

});

@Component({
  template: `
    <div
      id="element"
      style="display: inline-block; height: 200px; width: 300px; margin-top: 100px; margin-left: 150px"
    ></div>
    <div
      id="targetElement"
      style="position:absolute;top:0;left:0; display: inline-block; height: 50px; width: 100px; margin-top: 10px; margin-left: 20px"
    ></div>
`
})
export class TestComponent {
}
