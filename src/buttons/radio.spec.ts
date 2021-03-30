import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators} from '@angular/forms';
import {By} from '@angular/platform-browser';

import {createGenericTestComponent} from '../test/common';
import {NgbButtonsModule} from './buttons.module';

const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

function expectRadios(element: HTMLElement, states: number[]) {
  const labels = element.querySelectorAll('label');
  expect(labels.length).toEqual(states.length);

  for (let i = 0; i < states.length; i++) {
    let state = states[i];

    if (state === 1) {
      expect(labels[i]).toHaveCssClass('active');
    } else if (state === 0) {
      expect(labels[i]).not.toHaveCssClass('active');
    }
  }
}

function expectNameOnAllInputs(element: HTMLElement, name: string) {
  const inputs = element.querySelectorAll('input');
  for (let i = 0; i < inputs.length; i++) {
    expect(inputs[i].getAttribute('name')).toBe(name);
  }
}

function getGroupElement(nativeEl: HTMLElement): HTMLDivElement {
  return <HTMLDivElement>nativeEl.querySelector('div[ngbRadioGroup]');
}

function getInput(nativeEl: HTMLElement, idx: number): HTMLInputElement {
  return <HTMLInputElement>nativeEl.querySelectorAll('input')[idx];
}

function getLabel(nativeEl: HTMLElement, idx: number): HTMLElement {
  return <HTMLElement>nativeEl.querySelectorAll('label')[idx];
}

describe('ngbRadioGroup', () => {
  const defaultHtml = `<div [(ngModel)]="model" ngbRadioGroup>
      <label ngbButtonLabel>
        <input ngbButton type="radio" name="radio" [value]="values[0]"/> {{ values[0] }}
      </label>
      <label ngbButtonLabel>
        <input ngbButton type="radio" name="radio" [value]="values[1]"/> {{ values[1] }}
      </label>
    </div>`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, TestComponentOnPush],
      imports: [NgbButtonsModule, FormsModule, ReactiveFormsModule]
    });
    TestBed.overrideComponent(TestComponent, {set: {template: defaultHtml}});
    TestBed.overrideComponent(TestComponentOnPush, {set: {template: defaultHtml}});
  });

  it('toggles radio inputs based on model changes', fakeAsync(() => {
       const fixture = TestBed.createComponent(TestComponent);

       let values = fixture.componentInstance.values;

       // checking initial values
       fixture.detectChanges();
       expectRadios(fixture.nativeElement, [0, 0]);
       expect(getInput(fixture.nativeElement, 0).value).toEqual(values[0]);
       expect(getInput(fixture.nativeElement, 1).value).toEqual(values[1]);

       // checking null
       fixture.componentInstance.model = null;
       fixture.detectChanges();
       tick();
       fixture.detectChanges();
       expectRadios(fixture.nativeElement, [0, 0]);

       // checking first radio
       fixture.componentInstance.model = values[0];
       fixture.detectChanges();
       tick();
       fixture.detectChanges();
       expectRadios(fixture.nativeElement, [1, 0]);

       // checking second radio
       fixture.componentInstance.model = values[1];
       fixture.detectChanges();
       tick();
       fixture.detectChanges();
       expectRadios(fixture.nativeElement, [0, 1]);

       // checking non-matching value
       fixture.componentInstance.model = values[3];
       fixture.detectChanges();
       tick();
       fixture.detectChanges();
       expectRadios(fixture.nativeElement, [0, 0]);
     }));

  it('updates model based on radio input clicks', () => {
    const fixture = TestBed.createComponent(TestComponent);

    fixture.detectChanges();
    expectRadios(fixture.nativeElement, [0, 0]);

    // clicking first radio
    getInput(fixture.nativeElement, 0).click();
    fixture.detectChanges();
    expectRadios(fixture.nativeElement, [1, 0]);
    expect(fixture.componentInstance.model).toBe('one');

    // clicking second radio
    getInput(fixture.nativeElement, 1).click();
    fixture.detectChanges();
    expectRadios(fixture.nativeElement, [0, 1]);
    expect(fixture.componentInstance.model).toBe('two');
  });

  it('can be used with objects as values', fakeAsync(() => {
       const fixture = TestBed.createComponent(TestComponent);

       let [one, two] = [{one: 'one'}, {two: 'two'}];

       fixture.componentInstance.values[0] = one;
       fixture.componentInstance.values[1] = two;

       // checking initial values
       fixture.detectChanges();
       expectRadios(fixture.nativeElement, [0, 0]);
       expect(getInput(fixture.nativeElement, 0).value).toEqual({}.toString());
       expect(getInput(fixture.nativeElement, 1).value).toEqual({}.toString());

       // checking model -> radio input
       fixture.componentInstance.model = one;
       fixture.detectChanges();
       tick();
       fixture.detectChanges();
       expectRadios(fixture.nativeElement, [1, 0]);

       // checking radio click -> model
       getInput(fixture.nativeElement, 1).click();
       fixture.detectChanges();
       expectRadios(fixture.nativeElement, [0, 1]);
       expect(fixture.componentInstance.model).toBe(two);
     }));

  it('updates radio input values dynamically', fakeAsync(() => {
       const fixture = TestBed.createComponent(TestComponent);

       let values = fixture.componentInstance.values;

       // checking first radio
       fixture.componentInstance.model = values[0];
       fixture.detectChanges();
       tick();
       fixture.detectChanges();
       expectRadios(fixture.nativeElement, [1, 0]);
       expect(fixture.componentInstance.model).toEqual(values[0]);

       // updating first radio value -> expecting none selected
       let initialValue = values[0];
       values[0] = 'ten';
       fixture.detectChanges();
       expectRadios(fixture.nativeElement, [0, 0]);
       expect(getInput(fixture.nativeElement, 0).value).toEqual('ten');
       expect(fixture.componentInstance.model).toEqual(initialValue);

       // updating values back -> expecting initial state
       values[0] = initialValue;
       fixture.detectChanges();
       expectRadios(fixture.nativeElement, [1, 0]);
       expect(getInput(fixture.nativeElement, 0).value).toEqual(values[0]);
       expect(fixture.componentInstance.model).toEqual(values[0]);
     }));

  it('can be used with ngFor', fakeAsync(() => {
       const forHtml = `<div [(ngModel)]="model" ngbRadioGroup>
          <label *ngFor="let v of values" ngbButtonLabel>
            <input ngbButton type="radio" name="radio" [value]="v"/> {{ v }}
          </label>
        </div>`;

       const fixture = createTestComponent(forHtml);
       let values = fixture.componentInstance.values;

       expectRadios(fixture.nativeElement, [0, 0, 0]);

       fixture.componentInstance.model = values[1];
       fixture.detectChanges();
       tick();
       fixture.detectChanges();
       expectRadios(fixture.nativeElement, [0, 1, 0]);
     }));

  it('cleans up the model when radio inputs are added / removed', fakeAsync(() => {
       const ifHtml = `<div [(ngModel)]="model" ngbRadioGroup>
        <label ngbButtonLabel>
          <input ngbButton type="radio" name="radio" [value]="values[0]"/> {{ values[0] }}
        </label>
        <label *ngIf="shown" ngbButtonLabel>
          <input ngbButton type="radio" name="radio" [value]="values[1]"/> {{ values[1] }}
        </label>
      </div>`;
       const fixture = createTestComponent(ifHtml);

       let values = fixture.componentInstance.values;

       // hiding/showing non-selected radio -> expecting initial model value
       expectRadios(fixture.nativeElement, [0, 0]);

       fixture.componentInstance.shown = false;
       fixture.detectChanges();
       expectRadios(fixture.nativeElement, [0]);
       expect(fixture.componentInstance.model).toBeUndefined();

       fixture.componentInstance.shown = true;
       fixture.detectChanges();
       expectRadios(fixture.nativeElement, [0, 0]);
       expect(fixture.componentInstance.model).toBeUndefined();

       // hiding/showing selected radio -> expecting model to unchange, but none selected
       fixture.componentInstance.model = values[1];
       fixture.detectChanges();
       tick();
       fixture.detectChanges();
       expectRadios(fixture.nativeElement, [0, 1]);

       fixture.componentInstance.shown = false;
       fixture.detectChanges();
       expectRadios(fixture.nativeElement, [0]);
       expect(fixture.componentInstance.model).toEqual(values[1]);

       fixture.componentInstance.shown = true;
       fixture.detectChanges();
       expectRadios(fixture.nativeElement, [0, 1]);
       expect(fixture.componentInstance.model).toEqual(values[1]);
     }));

  it('should work with template-driven form validation', fakeAsync(() => {
       const html = `
        <form>
          <div ngbRadioGroup [(ngModel)]="model" name="control" required>
            <label ngbButtonLabel>
              <input ngbButton type="radio" value="foo"/>
            </label>
          </div>
        </form>`;

       const fixture = createTestComponent(html);
       tick();
       fixture.detectChanges();
       expect(getGroupElement(fixture.nativeElement)).toHaveCssClass('ng-invalid');
       expect(getGroupElement(fixture.nativeElement)).not.toHaveCssClass('ng-valid');

       getInput(fixture.nativeElement, 0).click();
       fixture.detectChanges();
       expect(getGroupElement(fixture.nativeElement)).toHaveCssClass('ng-valid');
       expect(getGroupElement(fixture.nativeElement)).not.toHaveCssClass('ng-invalid');
     }));

  it('should work with model-driven form validation', () => {
    const html = `
        <form [formGroup]="form">
          <div ngbRadioGroup formControlName="control">
            <label ngbButtonLabel>
              <input ngbButton type="radio" value="foo"/>
            </label>
          </div>
        </form>`;

    const fixture = createTestComponent(html);

    expect(getGroupElement(fixture.nativeElement)).toHaveCssClass('ng-invalid');
    expect(getGroupElement(fixture.nativeElement)).not.toHaveCssClass('ng-valid');

    getInput(fixture.nativeElement, 0).click();
    fixture.detectChanges();
    expect(getGroupElement(fixture.nativeElement)).toHaveCssClass('ng-valid');
    expect(getGroupElement(fixture.nativeElement)).not.toHaveCssClass('ng-invalid');
  });

  it('should disable label and input when it is disabled using reactive forms', () => {
    const html = `
      <form [formGroup]="disabledForm">
        <div ngbRadioGroup formControlName="control">
          <label ngbButtonLabel>
            <input ngbButton type="radio" value="foo"/>
          </label>
        </div>
      </form>`;

    const fixture = createTestComponent(html);

    expect(getLabel(fixture.nativeElement, 0)).toHaveCssClass('disabled');
    expect(getInput(fixture.nativeElement, 0).hasAttribute('disabled')).toBeTruthy();

    fixture.componentInstance.disabledControl.enable();
    fixture.detectChanges();
    expect(getLabel(fixture.nativeElement, 0)).not.toHaveCssClass('disabled');
    expect(getInput(fixture.nativeElement, 0).hasAttribute('disabled')).toBeFalsy();
  });

  it('should disable label and input when added dynamically in reactive forms', () => {
    const forHtml = `
      <form [formGroup]="disabledForm">
        <div ngbRadioGroup formControlName="control">
          <label ngbButtonLabel *ngIf="shown">
            <input ngbButton type="radio" name="radio" [value]="'one'"/> One
          </label>
        </div>
      </form>
    `;

    const fixture = createTestComponent(forHtml);
    fixture.componentInstance.shown = false;
    fixture.componentInstance.disabledForm.disable();
    fixture.detectChanges();

    fixture.componentInstance.shown = true;
    fixture.detectChanges();
    expect(getLabel(fixture.nativeElement, 0)).toHaveCssClass('disabled');
    expect(getInput(fixture.nativeElement, 0).hasAttribute('disabled')).toBeTruthy();
  });

  it('should disable label and input when it is disabled using template-driven forms', fakeAsync(() => {
       const html = `
      <form>
        <div ngbRadioGroup [(ngModel)]="model" name="control" [disabled]="disabled">
          <label ngbButtonLabel>
            <input ngbButton type="radio" value="foo"/>
          </label>
        </div>
      </form>`;

       const fixture = createTestComponent(html);
       tick();
       fixture.detectChanges();
       expect(getLabel(fixture.nativeElement, 0)).toHaveCssClass('disabled');
       expect(getInput(fixture.nativeElement, 0).hasAttribute('disabled')).toBeTruthy();

       fixture.componentInstance.disabled = false;
       fixture.detectChanges();
       tick();
       fixture.detectChanges();
       expect(getLabel(fixture.nativeElement, 0)).not.toHaveCssClass('disabled');
       expect(getInput(fixture.nativeElement, 0).hasAttribute('disabled')).toBeFalsy();
     }));

  it('should disable individual label and input using template-driven forms', () => {
    const html = `
      <form>
        <div ngbRadioGroup [(ngModel)]="model" name="control">
          <label ngbButtonLabel>
            <input ngbButton type="radio" value="foo" [disabled]="disabled"/>
          </label>
        </div>
      </form>`;

    const fixture = createTestComponent(html);
    fixture.componentInstance.disabled = true;
    fixture.detectChanges();
    expect(getLabel(fixture.nativeElement, 0)).toHaveCssClass('disabled');
    expect(getInput(fixture.nativeElement, 0).hasAttribute('disabled')).toBeTruthy();

    fixture.componentInstance.disabled = false;
    fixture.detectChanges();
    expect(getLabel(fixture.nativeElement, 0)).not.toHaveCssClass('disabled');
    expect(getInput(fixture.nativeElement, 0).hasAttribute('disabled')).toBeFalsy();
  });

  it('disable all radio buttons when group is disabled regardless of button disabled state', fakeAsync(() => {
       const html = `
      <form>
        <div ngbRadioGroup [(ngModel)]="model" name="control" [disabled]="groupDisabled">
          <label ngbButtonLabel>
            <input ngbButton type="radio" value="foo" [disabled]="disabled"/>
          </label>
        </div>
      </form>`;

       const fixture = createTestComponent(html);
       expect(getLabel(fixture.nativeElement, 0)).toHaveCssClass('disabled');
       expect(getInput(fixture.nativeElement, 0).hasAttribute('disabled')).toBeTruthy();

       fixture.componentInstance.disabled = false;
       tick();
       fixture.detectChanges();
       expect(getLabel(fixture.nativeElement, 0)).toHaveCssClass('disabled');
       expect(getInput(fixture.nativeElement, 0).hasAttribute('disabled')).toBeTruthy();
     }));

  it('button stays disabled when group is enabled', fakeAsync(() => {
       const html = `
      <form>
        <div ngbRadioGroup [(ngModel)]="model" name="control" [disabled]="groupDisabled">
          <label ngbButtonLabel>
            <input ngbButton type="radio" value="foo" [disabled]="disabled"/>
          </label>
        </div>
      </form>`;

       const fixture = createTestComponent(html);
       expect(getLabel(fixture.nativeElement, 0)).toHaveCssClass('disabled');
       expect(getInput(fixture.nativeElement, 0).hasAttribute('disabled')).toBeTruthy();

       fixture.componentInstance.groupDisabled = false;
       tick();
       fixture.detectChanges();
       expect(getLabel(fixture.nativeElement, 0)).toHaveCssClass('disabled');
       expect(getInput(fixture.nativeElement, 0).hasAttribute('disabled')).toBeTruthy();
     }));


  it('should add / remove "focus" class on labels', () => {
    const fixture = createTestComponent(`
      <div [(ngModel)]="model" ngbRadioGroup>
        <label ngbButtonLabel>
          <input ngbButton type="radio" name="radio" [value]="values[0]"/> {{ values[0] }}
        </label>
        <label ngbButtonLabel>
          <input ngbButton type="radio" name="radio" [value]="values[1]"/> {{ values[1] }}
        </label>
      </div>
    `);
    fixture.detectChanges();

    const inputDebugEls = fixture.debugElement.queryAll(By.css('Input'));

    inputDebugEls[0].triggerEventHandler('focus', {});
    fixture.detectChanges();
    expect(inputDebugEls[0].nativeElement.parentNode).toHaveCssClass('focus');
    expect(inputDebugEls[1].nativeElement.parentNode).not.toHaveCssClass('focus');

    inputDebugEls[0].triggerEventHandler('blur', {});
    inputDebugEls[1].triggerEventHandler('focus', {});
    fixture.detectChanges();
    expect(inputDebugEls[0].nativeElement.parentNode).not.toHaveCssClass('focus');
    expect(inputDebugEls[1].nativeElement.parentNode).toHaveCssClass('focus');
  });

  it('should mark form control as touched when label loses focus', () => {
    const fixture = createTestComponent(`
      <div [(ngModel)]="model" ngbRadioGroup>
        <label ngbButtonLabel>
          <input ngbButton type="radio" name="radio" [value]="values[0]"/> {{ values[0] }}
        </label>
        <label ngbButtonLabel>
          <input ngbButton type="radio" name="radio" [value]="values[1]"/> {{ values[1] }}
        </label>
      </div>
    `);
    fixture.detectChanges();

    const inputDebugEls = fixture.debugElement.queryAll(By.css('Input'));
    const ngModel = fixture.debugElement.query(By.directive(NgModel)).injector.get(NgModel);

    inputDebugEls[0].triggerEventHandler('focus', {});
    fixture.detectChanges();
    expect(ngModel.touched).toBe(false);

    inputDebugEls[0].triggerEventHandler('blur', {});
    fixture.detectChanges();
    expect(ngModel.touched).toBe(true);
  });

  it('should generate input names automatically if no name specified anywhere', () => {
    const fixture = createTestComponent(`
      <div [(ngModel)]="model" ngbRadioGroup>
        <label ngbButtonLabel>
          <input ngbButton type="radio" [value]="values[0]"/> {{ values[0] }}
        </label>
        <label ngbButtonLabel>
          <input ngbButton type="radio" [value]="values[1]"/> {{ values[1] }}
        </label>
      </div>
    `);
    fixture.detectChanges();

    const inputs = fixture.nativeElement.querySelectorAll('input');
    const distinctNames = new Set();
    for (let i = 0; i < inputs.length; i++) {
      distinctNames.add(inputs[i].getAttribute('name'));
    }
    expect(distinctNames.size).toBe(1);
    expect(distinctNames.values().next().value).toMatch(/ngb-radio-\d+/);
  });

  it('should set input names from group name if inputs don\'t have a name', () => {
    const fixture = createTestComponent(`
      <div [(ngModel)]="model" ngbRadioGroup name="foo">
        <label ngbButtonLabel>
          <input ngbButton type="radio" [value]="values[0]"/> {{ values[0] }}
        </label>
        <label ngbButtonLabel>
          <input ngbButton type="radio" [value]="values[1]"/> {{ values[1] }}
        </label>
      </div>
    `);
    fixture.detectChanges();

    expectNameOnAllInputs(fixture.nativeElement, 'foo');
  });

  it('should honor the input names if specified', () => {
    const fixture = createTestComponent(`
      <div [(ngModel)]="model" ngbRadioGroup name="foo">
        <label ngbButtonLabel>
          <input ngbButton name="bar" type="radio" [value]="values[0]"/> {{ values[0] }}
        </label>
        <label ngbButtonLabel>
          <input ngbButton [name]="'bar'" type="radio" [value]="values[1]"/> {{ values[1] }}
        </label>
      </div>
    `);
    fixture.detectChanges();

    expectNameOnAllInputs(fixture.nativeElement, 'bar');
  });

  describe('accessibility', () => {
    it('should have "group" role', () => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      expect(getGroupElement(fixture.nativeElement).getAttribute('role')).toBe('radiogroup');
    });
  });

  describe('on push', () => {
    it('should set initial model value', fakeAsync(() => {
         const fixture = TestBed.createComponent(TestComponentOnPush);
         const {values} = fixture.componentInstance;

         fixture.detectChanges();
         tick();
         fixture.detectChanges();
         expect(getInput(fixture.nativeElement, 0).value).toEqual(values[0]);
         expect(getInput(fixture.nativeElement, 1).value).toEqual(values[1]);
         expectRadios(fixture.nativeElement, [1, 0]);
       }));
  });
});

@Component({selector: 'test-cmp', template: ''})
class TestComponent {
  form = new FormGroup({control: new FormControl('', Validators.required)});
  disabledControl = new FormControl({value: '', disabled: true});
  disabledForm = new FormGroup({control: this.disabledControl});

  model;
  values: any = ['one', 'two', 'three'];
  shown = true;
  disabled = true;
  groupDisabled = true;
  checked: any;
}

@Component({selector: 'test-cmp-on-push', template: '', changeDetection: ChangeDetectionStrategy.OnPush})
class TestComponentOnPush {
  model = 'one';
  values = ['one', 'two', 'three'];
}
