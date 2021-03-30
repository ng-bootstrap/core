import {ChangeDetectorRef, Directive, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

import {NgbButtonLabel} from './label';

/**
 * Allows to easily create Bootstrap-style checkbox buttons.
 *
 * Integrates with forms, so the value of a checked button is bound to the underlying form control
 * either in a reactive or template-driven way.
 */
@Directive({
  selector: '[ngbButton][type=checkbox]',
  host: {
    '[checked]': 'checked',
    '[disabled]': 'disabled',
    '(change)': 'onInputChange($event)',
    '(focus)': 'focused = true',
    '(blur)': 'focused = false'
  },
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbCheckBox), multi: true}]
})
export class NgbCheckBox implements ControlValueAccessor {
  static ngAcceptInputType_disabled: boolean | '';

  checked;

  /**
   * If `true`, the checkbox button will be disabled
   */
  @Input() disabled = false;

  /**
   * The form control value when the checkbox is checked.
   */
  @Input() valueChecked = true;

  /**
   * The form control value when the checkbox is unchecked.
   */
  @Input() valueUnChecked = false;

  onChange = (_: any) => {};
  onTouched = () => {};

  set focused(isFocused: boolean) {
    this._label.focused = isFocused;
    if (!isFocused) {
      this.onTouched();
    }
  }

  constructor(private _label: NgbButtonLabel, private _cd: ChangeDetectorRef) {}

  onInputChange($event) {
    const modelToPropagate = $event.target.checked ? this.valueChecked : this.valueUnChecked;
    this.onChange(modelToPropagate);
    this.onTouched();
    this.writeValue(modelToPropagate);
  }

  registerOnChange(fn: (value: any) => any): void { this.onChange = fn; }

  registerOnTouched(fn: () => any): void { this.onTouched = fn; }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this._label.disabled = isDisabled;
  }

  writeValue(value) {
    this.checked = value === this.valueChecked;
    this._label.active = this.checked;

    // label won't be updated, if it is inside the OnPush component when [ngModel] changes
    this._cd.markForCheck();
  }
}
