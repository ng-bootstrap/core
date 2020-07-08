import {
  ChangeDetectorRef,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  NgZone,
  AfterContentInit,
  OnDestroy,
  Output,
  QueryList,
  Renderer2,
  SimpleChanges,
  Optional
} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {fromEvent, Subject, Subscription} from 'rxjs';
import {take} from 'rxjs/operators';

import {Placement, PlacementArray, positionElements} from '../util/positioning';
import {ngbAutoClose} from '../util/autoclose';
import {Key} from '../util/key';

import {NgbDropdownConfig} from './dropdown-config';

@Directive({selector: '.navbar'})
export class NgbNavbar {
}

/**
 * A directive you should put on a dropdown item to enable keyboard navigation.
 * Arrow keys will move focus between items marked with this directive.
 *
 * @since 4.1.0
 */
@Directive({selector: '[ngbDropdownItem]', host: {'class': 'dropdown-item', '[class.disabled]': 'disabled'}})
export class NgbDropdownItem {
  static ngAcceptInputType_disabled: boolean | '';

  private _disabled = false;

  @Input()
  set disabled(value: boolean) {
    this._disabled = <any>value === '' || value === true;  // accept an empty attribute as true
  }

  get disabled(): boolean { return this._disabled; }

  constructor(public elementRef: ElementRef<HTMLElement>) {}
}

/**
 * A directive that wraps dropdown menu content and dropdown items.
 */
@Directive({
  selector: '[ngbDropdownMenu]',
  host: {
    '[class.dropdown-menu]': 'true',
    '[class.show]': 'dropdown.isOpen()',
    '[attr.x-placement]': 'placement',
    '(keydown.ArrowUp)': 'dropdown.onKeyDown($event)',
    '(keydown.ArrowDown)': 'dropdown.onKeyDown($event)',
    '(keydown.Home)': 'dropdown.onKeyDown($event)',
    '(keydown.End)': 'dropdown.onKeyDown($event)',
    '(keydown.Enter)': 'dropdown.onKeyDown($event)',
    '(keydown.Space)': 'dropdown.onKeyDown($event)',
    '(keydown.Tab)': 'dropdown.onKeyDown($event)',
    '(keydown.Shift.Tab)': 'dropdown.onKeyDown($event)'
  }
})
export class NgbDropdownMenu {
  placement: Placement | null = 'bottom';
  isOpen = false;

  @ContentChildren(NgbDropdownItem) menuItems: QueryList<NgbDropdownItem>;

  constructor(@Inject(forwardRef(() => NgbDropdown)) public dropdown) {}
}

/**
 * A directive to mark an element to which dropdown menu will be anchored.
 *
 * This is a simple version of the `NgbDropdownToggle` directive.
 * It plays the same role, but doesn't listen to click events to toggle dropdown menu thus enabling support
 * for events other than click.
 *
 * @since 1.1.0
 */
@Directive({
  selector: '[ngbDropdownAnchor]',
  host: {'class': 'dropdown-toggle', 'aria-haspopup': 'true', '[attr.aria-expanded]': 'dropdown.isOpen()'}
})
export class NgbDropdownAnchor {
  anchorEl;

  constructor(@Inject(forwardRef(() => NgbDropdown)) public dropdown, private _elementRef: ElementRef<HTMLElement>) {
    this.anchorEl = _elementRef.nativeElement;
  }

  getNativeElement() { return this._elementRef.nativeElement; }
}

/**
 * A directive to mark an element that will toggle dropdown via the `click` event.
 *
 * You can also use `NgbDropdownAnchor` as an alternative.
 */
@Directive({
  selector: '[ngbDropdownToggle]',
  host: {
    'class': 'dropdown-toggle',
    'aria-haspopup': 'true',
    '[attr.aria-expanded]': 'dropdown.isOpen()',
    '(click)': 'dropdown.toggle()',
    '(keydown.ArrowUp)': 'dropdown.onKeyDown($event)',
    '(keydown.ArrowDown)': 'dropdown.onKeyDown($event)',
    '(keydown.Home)': 'dropdown.onKeyDown($event)',
    '(keydown.End)': 'dropdown.onKeyDown($event)',
    '(keydown.Tab)': 'dropdown.onKeyDown($event)',
    '(keydown.Shift.Tab)': 'dropdown.onKeyDown($event)'
  },
  providers: [{provide: NgbDropdownAnchor, useExisting: forwardRef(() => NgbDropdownToggle)}]
})
export class NgbDropdownToggle extends NgbDropdownAnchor {
  constructor(@Inject(forwardRef(() => NgbDropdown)) dropdown, elementRef: ElementRef<HTMLElement>) {
    super(dropdown, elementRef);
  }
}

/**
 * A directive that provides contextual overlays for displaying lists of links and more.
 */
@Directive({selector: '[ngbDropdown]', exportAs: 'ngbDropdown', host: {'[class.show]': 'isOpen()'}})
export class NgbDropdown implements AfterContentInit, OnDestroy {
  static ngAcceptInputType_autoClose: boolean | string;
  static ngAcceptInputType_display: string;
  private _closed$ = new Subject<void>();
  private _zoneSubscription: Subscription;
  private _bodyContainer: HTMLElement | null = null;

  @ContentChild(NgbDropdownMenu, {static: false}) private _menu: NgbDropdownMenu;
  @ContentChild(NgbDropdownMenu, {read: ElementRef, static: false}) private _menuElement: ElementRef;
  @ContentChild(NgbDropdownAnchor, {static: false}) private _anchor: NgbDropdownAnchor;

  /**
   * Indicates whether the dropdown should be closed when clicking one of dropdown items or pressing ESC.
   *
   * * `true` - the dropdown will close on both outside and inside (menu) clicks.
   * * `false` - the dropdown can only be closed manually via `close()` or `toggle()` methods.
   * * `"inside"` - the dropdown will close on inside menu clicks, but not outside clicks.
   * * `"outside"` - the dropdown will close only on the outside clicks and not on menu clicks.
   */
  @Input() autoClose: boolean | 'outside' | 'inside';

  /**
   * Defines whether or not the dropdown menu is opened initially.
   */
  @Input('open') _open = false;

  /**
   * The preferred placement of the dropdown.
   *
   * Possible values are `"top"`, `"top-left"`, `"top-right"`, `"bottom"`, `"bottom-left"`,
   * `"bottom-right"`, `"left"`, `"left-top"`, `"left-bottom"`, `"right"`, `"right-top"`,
   * `"right-bottom"`
   *
   * Accepts an array of strings or a string with space separated possible values.
   *
   * The default order of preference is `"bottom-left bottom-right top-left top-right"`
   *
   * Please see the [positioning overview](#/positioning) for more details.
   */
  @Input() placement: PlacementArray;

  /**
  * A selector specifying the element the dropdown should be appended to.
  * Currently only supports "body".
  *
  * @since 4.1.0
  */
  @Input() container: null | 'body';

  /**
   * Enable or disable the dynamic positioning. The default value is dynamic unless the dropdown is used
   * inside a Bootstrap navbar. If you need custom placement for a dropdown in a navbar, set it to
   * dynamic explicitly. See the [positioning of dropdown](#/positioning#dropdown)
   * and the [navbar demo](/#/components/dropdown/examples#navbar) for more details.
   *
   * @since 4.2.0
   */
  @Input() display: 'dynamic' | 'static';

  /**
   * An event fired when the dropdown is opened or closed.
   *
   * The event payload is a `boolean`:
   * * `true` - the dropdown was opened
   * * `false` - the dropdown was closed
   */
  @Output() openChange = new EventEmitter<boolean>();

  constructor(
      private _changeDetector: ChangeDetectorRef, config: NgbDropdownConfig, @Inject(DOCUMENT) private _document: any,
      private _ngZone: NgZone, private _elementRef: ElementRef<HTMLElement>, private _renderer: Renderer2,
      @Optional() ngbNavbar: NgbNavbar) {
    this.placement = config.placement;
    this.container = config.container;
    this.autoClose = config.autoClose;

    this.display = ngbNavbar ? 'static' : 'dynamic';

    this._zoneSubscription = _ngZone.onStable.subscribe(() => { this._positionMenu(); });
  }

  ngAfterContentInit() {
    this._ngZone.onStable.pipe(take(1)).subscribe(() => {
      this._applyPlacementClasses();
      if (this._open) {
        this._setCloseHandlers();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.container && this._open) {
      this._applyContainer(this.container);
    }

    if (changes.placement && !changes.placement.isFirstChange) {
      this._applyPlacementClasses();
    }
  }

  /**
   * Checks if the dropdown menu is open.
   */
  isOpen(): boolean { return this._open; }

  /**
   * Opens the dropdown menu.
   */
  open(): void {
    if (!this._open) {
      this._open = true;
      this._applyContainer(this.container);
      this.openChange.emit(true);
      this._setCloseHandlers();
    }
  }

  private _setCloseHandlers() {
    const anchor = this._anchor;
    ngbAutoClose(
        this._ngZone, this._document, this.autoClose, () => this.close(), this._closed$,
        this._menu ? [this._menuElement.nativeElement] : [], anchor ? [anchor.getNativeElement()] : [],
        '.dropdown-item,.dropdown-divider');
  }

  /**
   * Closes the dropdown menu.
   */
  close(): void {
    if (this._open) {
      this._open = false;
      this._resetContainer();
      this._closed$.next();
      this.openChange.emit(false);
      this._changeDetector.markForCheck();
    }
  }

  /**
   * Toggles the dropdown menu.
   */
  toggle(): void {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  ngOnDestroy() {
    this._resetContainer();

    this._closed$.next();
    this._zoneSubscription.unsubscribe();
  }

  onKeyDown(event: KeyboardEvent) {
    // tslint:disable-next-line:deprecation
    const key = event.which;
    const itemElements = this._getMenuElements();

    let position = -1;
    let itemElement: HTMLElement | null = null;
    const isEventFromToggle = this._isEventFromToggle(event);

    if (!isEventFromToggle && itemElements.length) {
      itemElements.forEach((item, index) => {
        if (item.contains(event.target as HTMLElement)) {
          itemElement = item;
        }
        if (item === this._document.activeElement) {
          position = index;
        }
      });
    }

    // closing on Enter / Space
    if (key === Key.Space || key === Key.Enter) {
      if (itemElement && (this.autoClose === true || this.autoClose === 'inside')) {
        // Item is either a button or a link, so click will be triggered by the browser on Enter or Space.
        // So we have to register a one-time click handler that will fire after any user defined click handlers
        // to close the dropdown
        fromEvent(itemElement, 'click').pipe(take(1)).subscribe(() => this.close());
      }
      return;
    }

    if (key === Key.Tab) {
      if (event.target && this.isOpen() && this.autoClose) {
        if (this.container === 'body' && this._anchor.anchorEl === event.target && !event.shiftKey) {
          itemElements[0].focus();
          event.preventDefault();
        } else if (this.container === 'body' && event.shiftKey && position === 0) {
          this._anchor.anchorEl.focus();
          event.preventDefault();
        } else {
          fromEvent(event.target as HTMLElement, 'focusout')
              .pipe(take(1))
              .subscribe((e) => this._onFocusOut(e as FocusEvent));
        }
      }
      return;
    }

    // opening / navigating
    if (isEventFromToggle || itemElement) {
      this.open();

      if (itemElements.length) {
        switch (key) {
          case Key.ArrowDown:
            position = Math.min(position + 1, itemElements.length - 1);
            break;
          case Key.ArrowUp:
            if (this._isDropup() && position === -1) {
              position = itemElements.length - 1;
              break;
            }
            position = Math.max(position - 1, 0);
            break;
          case Key.Home:
            position = 0;
            break;
          case Key.End:
            position = itemElements.length - 1;
            break;
        }
        itemElements[position].focus();
      }
      event.preventDefault();
    }
  }

  private _onFocusOut(event: FocusEvent) {
    let prevFocusedElement = event.relatedTarget as HTMLElement;
    if (this.container === 'body') {
      if (!this._menuElement.nativeElement.contains(prevFocusedElement)) {
        this.close();
      }
    } else {
      if (!this._elementRef.nativeElement.contains(prevFocusedElement)) {
        this.close();
      }
    }
  }

  private _isDropup(): boolean { return this._elementRef.nativeElement.classList.contains('dropup'); }

  private _isEventFromToggle(event: KeyboardEvent) {
    return this._anchor.getNativeElement().contains(event.target as HTMLElement);
  }

  private _getMenuElements(): HTMLElement[] {
    const menu = this._menu;
    if (menu == null) {
      return [];
    }
    return menu.menuItems.filter(item => !item.disabled).map(item => item.elementRef.nativeElement);
  }

  private _positionMenu() {
    const menu = this._menu;
    if (this.isOpen() && menu) {
      this._applyPlacementClasses(
          this.display === 'dynamic' ?
              positionElements(
                  this._anchor.anchorEl, this._bodyContainer || this._menuElement.nativeElement, this.placement,
                  this.container === 'body', undefined, this._closed$) :
              this._getFirstPlacement(this.placement));
    }
  }

  private _getFirstPlacement(placement: PlacementArray): Placement {
    return Array.isArray(placement) ? placement[0] : placement.split(' ')[0] as Placement;
  }

  private _resetContainer() {
    const renderer = this._renderer;
    const menuElement = this._menuElement;
    if (menuElement) {
      const dropdownElement = this._elementRef.nativeElement;
      const dropdownMenuElement = menuElement.nativeElement;

      renderer.appendChild(dropdownElement, dropdownMenuElement);
      renderer.removeStyle(dropdownMenuElement, 'position');
      renderer.removeStyle(dropdownMenuElement, 'transform');
    }
    if (this._bodyContainer) {
      renderer.removeChild(this._document.body, this._bodyContainer);
      this._bodyContainer = null;
    }
  }

  private _applyContainer(container: null | 'body' = null) {
    this._resetContainer();
    if (container === 'body') {
      const renderer = this._renderer;
      const dropdownMenuElement = this._menuElement.nativeElement;
      const bodyContainer = this._bodyContainer = this._bodyContainer || renderer.createElement('div');

      // Override some styles to have the positionning working
      renderer.setStyle(bodyContainer, 'position', 'absolute');
      renderer.setStyle(dropdownMenuElement, 'position', 'static');
      renderer.setStyle(bodyContainer, 'z-index', '1050');

      renderer.appendChild(bodyContainer, dropdownMenuElement);
      renderer.appendChild(this._document.body, bodyContainer);
    }
  }

  private _applyPlacementClasses(placement?: Placement | null) {
    const menu = this._menu;
    if (menu) {
      if (!placement) {
        placement = this._getFirstPlacement(this.placement);
      }

      const renderer = this._renderer;
      const dropdownElement = this._elementRef.nativeElement;

      // remove the current placement classes
      renderer.removeClass(dropdownElement, 'dropup');
      renderer.removeClass(dropdownElement, 'dropdown');
      menu.placement = this.display === 'static' ? null : placement;

      /*
      * apply the new placement
      * in case of top use up-arrow or down-arrow otherwise
      */
      const dropdownClass = placement.search('^top') !== -1 ? 'dropup' : 'dropdown';
      renderer.addClass(dropdownElement, dropdownClass);

      const bodyContainer = this._bodyContainer;
      if (bodyContainer) {
        renderer.removeClass(bodyContainer, 'dropup');
        renderer.removeClass(bodyContainer, 'dropdown');
        renderer.addClass(bodyContainer, dropdownClass);
      }
    }
  }
}
