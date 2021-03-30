import {ChangeDetectorRef, Directive, ElementRef, forwardRef, Input, OnDestroy, Renderer2} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

import {NgbButtonLabel} from './label';

let nextId = 0;

/**
 * Allows to easily create Bootstrap-style radio buttons.
 *
 * Integrates with forms, so the value of a checked button is bound to the underlying form control
 * either in a reactive or template-driven way.
 */
@Directive({
  selector: '[ngbRadioGroup]',
  host: {'role': 'radiogroup'},
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbRadioGroup), multi: true}]
})
export class NgbRadioGroup implements ControlValueAccessor {
  private _radios: Set<NgbRadio> = new Set<NgbRadio>();
  private _value = null;
  private _disabled: boolean;

  get disabled() { return this._disabled; }
  set disabled(isDisabled: boolean) { this.setDisabledState(isDisabled); }

  /**
   * Name of the radio group applied to radio input elements.
   *
   * Will be applied to all radio input elements inside the group,
   * unless [`NgbRadio`](#/components/buttons/api#NgbRadio)'s specify names themselves.
   *
   * If not provided, will be generated in the `ngb-radio-xx` format.
   */
  @Input() name = `ngb-radio-${nextId++}`;

  onChange = (_: any) => {};
  onTouched = () => {};

  onRadioChange(radio: NgbRadio) {
    this.writeValue(radio.value);
    this.onChange(radio.value);
  }

  onRadioValueUpdate() { this._updateRadiosValue(); }

  register(radio: NgbRadio) { this._radios.add(radio); }

  registerOnChange(fn: (value: any) => any): void { this.onChange = fn; }

  registerOnTouched(fn: () => any): void { this.onTouched = fn; }

  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
    this._updateRadiosDisabled();
  }

  unregister(radio: NgbRadio) { this._radios.delete(radio); }

  writeValue(value) {
    this._value = value;
    this._updateRadiosValue();
  }

  private _updateRadiosValue() { this._radios.forEach((radio) => radio.updateValue(this._value)); }
  private _updateRadiosDisabled() { this._radios.forEach((radio) => radio.updateDisabled()); }
}


/**
 * A directive that marks an input of type "radio" as a part of the
 * [`NgbRadioGroup`](#/components/buttons/api#NgbRadioGroup).
 */
@Directive({
  selector: '[ngbButton][type=radio]',
  host: {
    '[checked]': 'checked',
    '[disabled]': 'disabled',
    '[name]': 'nameAttr',
    '(change)': 'onChange()',
    '(focus)': 'focused = true',
    '(blur)': 'focused = false'
  }
})
export class NgbRadio implements OnDestroy {
  static ngAcceptInputType_disabled: boolean | '';

  private _checked: boolean;
  private _disabled: boolean;
  private _value: any = null;

  /**
   * The value for the 'name' property of the input element.
   *
   * All inputs of the radio group should have the same name. If not specified,
   * the name of the enclosing group is used.
   */
  @Input() name: string;

  /**
   * The form control value when current radio button is checked.
   */
  @Input('value')
  set value(value: any) {
    this._value = value;
    const stringValue = value ? value.toString() : '';
    this._renderer.setProperty(this._element.nativeElement, 'value', stringValue);
    this._group.onRadioValueUpdate();
  }

  /**
   * If `true`, current radio button will be disabled.
   */
  @Input('disabled')
  set disabled(isDisabled: boolean) {
    this._disabled = isDisabled !== false;
    this.updateDisabled();
  }

  set focused(isFocused: boolean) {
    if (this._label) {
      this._label.focused = isFocused;
    }
    if (!isFocused) {
      this._group.onTouched();
    }
  }

  get checked() { return this._checked; }

  get disabled() { return this._group.disabled || this._disabled; }

  get value() { return this._value; }

  get nameAttr() { return this.name || this._group.name; }

  constructor(
      private _group: NgbRadioGroup, private _label: NgbButtonLabel, private _renderer: Renderer2,
      private _element: ElementRef<HTMLInputElement>, private _cd: ChangeDetectorRef) {
    this._group.register(this);
    this.updateDisabled();
  }

  ngOnDestroy() { this._group.unregister(this); }

  onChange() { this._group.onRadioChange(this); }

  updateValue(value) {
    // label won't be updated, if it is inside the OnPush component when [ngModel] changes
    if (this.value !== value) {
      this._cd.markForCheck();
    }

    this._checked = this.value === value;
    this._label.active = this._checked;
  }

  updateDisabled() { this._label.disabled = this.disabled; }
}
