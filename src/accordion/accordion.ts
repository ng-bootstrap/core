import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  Host,
  Input,
  Optional,
  Output,
  QueryList,
  TemplateRef,
  ViewEncapsulation,
  NgZone,
} from '@angular/core';

import {isString} from '../util/util';

import {NgbAccordionConfig} from './accordion-config';
import {ngbRunTransition} from '../util/transition/ngbTransition';
import {ngbCollapsingTransition} from '../util/transition/ngbCollapseTransition';
import {take} from 'rxjs/operators';

let nextId = 0;

/**
 * The context for the [NgbPanelHeader](#/components/accordion/api#NgbPanelHeader) template
 *
 * @since 4.1.0
 */
export interface NgbPanelHeaderContext {
  /**
   * `True` if current panel is opened
   */
  opened: boolean;
}

/**
 * A directive that wraps an accordion panel header with any HTML markup and a toggling button
 * marked with [`NgbPanelToggle`](#/components/accordion/api#NgbPanelToggle).
 * See the [header customization demo](#/components/accordion/examples#header) for more details.
 *
 * You can also use [`NgbPanelTitle`](#/components/accordion/api#NgbPanelTitle) to customize only the panel title.
 *
 * @since 4.1.0
 */
@Directive({selector: 'ng-template[ngbPanelHeader]'})
export class NgbPanelHeader {
  constructor(public templateRef: TemplateRef<any>) {}
}

/**
 * A directive that wraps only the panel title with HTML markup inside.
 *
 * You can also use [`NgbPanelHeader`](#/components/accordion/api#NgbPanelHeader) to customize the full panel header.
 */
@Directive({selector: 'ng-template[ngbPanelTitle]'})
export class NgbPanelTitle {
  constructor(public templateRef: TemplateRef<any>) {}
}

/**
 * A directive that wraps the accordion panel content.
 */
@Directive({selector: 'ng-template[ngbPanelContent]'})
export class NgbPanelContent {
  constructor(public templateRef: TemplateRef<any>) {}
}

/**
 * A directive that wraps an individual accordion panel with title and collapsible content.
 */
@Directive({selector: 'ngb-panel'})
export class NgbPanel implements AfterContentChecked {
  /**
   *  If `true`, the panel is disabled an can't be toggled.
   */
  @Input() disabled = false;

  /**
   *  An optional id for the panel that must be unique on the page.
   *
   *  If not provided, it will be auto-generated in the `ngb-panel-xxx` format.
   */
  @Input() id = `ngb-panel-${nextId++}`;

  isOpen = false;

  /* A flag to specified that the transition panel classes have been initialized */
  initClassDone = false;

  /* A flag to specified if the panel is currently being animated, to ensure its presence in the dom */
  transitionRunning = false;

  /**
   *  The panel title.
   *
   *  You can alternatively use [`NgbPanelTitle`](#/components/accordion/api#NgbPanelTitle) to set panel title.
   */
  @Input() title: string;

  /**
   * Type of the current panel.
   *
   * Bootstrap provides styles for the following types: `'success'`, `'info'`, `'warning'`, `'danger'`, `'primary'`,
   * `'secondary'`, `'light'` and `'dark'`.
   */
  @Input() type: string;

  /**
   * An optional class applied to the accordion card element that wraps both panel title and content.
   *
   * @since 5.3.0
   */
  @Input() cardClass: string;

  /**
   * An event emitted when the panel is shown, after the transition. It has no payload.
   *
   * @since 8.0.0
   */
  @Output() shown = new EventEmitter<void>();

  /**
   * An event emitted when the panel is hidden, after the transition. It has no payload.
   *
   * @since 8.0.0
   */
  @Output() hidden = new EventEmitter<void>();


  titleTpl: NgbPanelTitle;
  headerTpl: NgbPanelHeader;
  contentTpl: NgbPanelContent;

  @ContentChildren(NgbPanelTitle, {descendants: false}) titleTpls: QueryList<NgbPanelTitle>;
  @ContentChildren(NgbPanelHeader, {descendants: false}) headerTpls: QueryList<NgbPanelHeader>;
  @ContentChildren(NgbPanelContent, {descendants: false}) contentTpls: QueryList<NgbPanelContent>;

  ngAfterContentChecked() {
    // We are using @ContentChildren instead of @ContentChild as in the Angular version being used
    // only @ContentChildren allows us to specify the {descendants: false} option.
    // Without {descendants: false} we are hitting bugs described in:
    // https://github.com/ng-bootstrap/ng-bootstrap/issues/2240
    this.titleTpl = this.titleTpls.first;
    this.headerTpl = this.headerTpls.first;
    this.contentTpl = this.contentTpls.first;
  }
}

/**
 * An event emitted right before toggling an accordion panel.
 */
export interface NgbPanelChangeEvent {
  /**
   * The id of the accordion panel being toggled.
   */
  panelId: string;

  /**
   * The next state of the panel.
   *
   * `true` if it will be opened, `false` if closed.
   */
  nextState: boolean;

  /**
   * Calling this function will prevent panel toggling.
   */
  preventDefault: () => void;
}

/**
 * Accordion is a collection of collapsible panels (bootstrap cards).
 *
 * It can ensure only one panel is opened at a time and allows to customize panel
 * headers.
 */
@Component({
  selector: 'ngb-accordion',
  exportAs: 'ngbAccordion',
  encapsulation: ViewEncapsulation.None,
  host: {'class': 'accordion', 'role': 'tablist', '[attr.aria-multiselectable]': '!closeOtherPanels'},
  template: `
    <ng-template #t ngbPanelHeader let-panel>
      <button class="btn btn-link" [ngbPanelToggle]="panel">
        {{panel.title}}<ng-template [ngTemplateOutlet]="panel.titleTpl?.templateRef"></ng-template>
      </button>
    </ng-template>
    <ng-template ngFor let-panel [ngForOf]="panels">
      <div [class]="'card ' + (panel.cardClass || '')">
        <div role="tab" id="{{panel.id}}-header" [class]="'card-header ' + (panel.type ? 'bg-'+panel.type: type ? 'bg-'+type : '')">
          <ng-template [ngTemplateOutlet]="panel.headerTpl?.templateRef || t"
                       [ngTemplateOutletContext]="{$implicit: panel, opened: panel.isOpen}"></ng-template>
        </div>
        <div id="{{panel.id}}" role="tabpanel" [attr.aria-labelledby]="panel.id + '-header'"
             *ngIf="!destroyOnHide || panel.isOpen || panel.transitionRunning">
          <div class="card-body">
               <ng-template [ngTemplateOutlet]="panel.contentTpl?.templateRef || null"></ng-template>
          </div>
        </div>
      </div>
    </ng-template>
  `
})
export class NgbAccordion implements AfterContentChecked {
  @ContentChildren(NgbPanel) panels: QueryList<NgbPanel>;

  /**
   * If `true`, accordion will be animated.
   *
   * @since 8.0.0
   */
  @Input() animation;

  /**
   * An array or comma separated strings of panel ids that should be opened **initially**.
   *
   * For subsequent changes use methods like `expand()`, `collapse()`, etc. and
   * the `(panelChange)` event.
   */
  @Input() activeIds: string | readonly string[] = [];

  /**
   *  If `true`, only one panel could be opened at a time.
   *
   *  Opening a new panel will close others.
   */
  @Input('closeOthers') closeOtherPanels: boolean;

  /**
   * If `true`, panel content will be detached from DOM and not simply hidden when the panel is collapsed.
   */
  @Input() destroyOnHide = true;

  /**
   * Type of panels.
   *
   * Bootstrap provides styles for the following types: `'success'`, `'info'`, `'warning'`, `'danger'`, `'primary'`,
   * `'secondary'`, `'light'` and `'dark'`.
   */
  @Input() type: string;

  /**
   * Event emitted right before the panel toggle happens.
   *
   * See [NgbPanelChangeEvent](#/components/accordion/api#NgbPanelChangeEvent) for payload details.
   */
  @Output() panelChange = new EventEmitter<NgbPanelChangeEvent>();

  /**
   * An event emitted when the expanding animation is finished on the panel. The payload is the panel id.
   *
   * @since 8.0.0
   */
  @Output() shown = new EventEmitter<string>();

  /**
   * An event emitted when the collapsing animation is finished on the panel, and before the panel element is removed.
   * The payload is the panel id.
   *
   * @since 8.0.0
   */
  @Output() hidden = new EventEmitter<string>();

  constructor(
      config: NgbAccordionConfig, private _element: ElementRef, private _ngZone: NgZone,
      private _changeDetector: ChangeDetectorRef) {
    this.animation = config.animation;
    this.type = config.type;
    this.closeOtherPanels = config.closeOthers;
  }

  /**
   * Checks if a panel with a given id is expanded.
   */
  isExpanded(panelId: string): boolean { return this.activeIds.indexOf(panelId) > -1; }

  /**
   * Expands a panel with a given id.
   *
   * Has no effect if the panel is already expanded or disabled.
   */
  expand(panelId: string): void { this._changeOpenState(this._findPanelById(panelId), true); }

  /**
   * Expands all panels, if `[closeOthers]` is `false`.
   *
   * If `[closeOthers]` is `true`, it will expand the first panel, unless there is already a panel opened.
   */
  expandAll(): void {
    if (this.closeOtherPanels) {
      if (this.activeIds.length === 0 && this.panels.length) {
        this._changeOpenState(this.panels.first, true);
      }
    } else {
      this.panels.forEach(panel => this._changeOpenState(panel, true));
    }
  }

  /**
   * Collapses a panel with the given id.
   *
   * Has no effect if the panel is already collapsed or disabled.
   */
  collapse(panelId: string) { this._changeOpenState(this._findPanelById(panelId), false); }

  /**
   * Collapses all opened panels.
   */
  collapseAll() {
    this.panels.forEach((panel) => { this._changeOpenState(panel, false); });
  }

  /**
   * Toggles a panel with the given id.
   *
   * Has no effect if the panel is disabled.
   */
  toggle(panelId: string) {
    const panel = this._findPanelById(panelId);
    if (panel) {
      this._changeOpenState(panel, !panel.isOpen);
    }
  }

  ngAfterContentChecked() {
    // active id updates
    if (isString(this.activeIds)) {
      this.activeIds = this.activeIds.split(/\s*,\s*/);
    }

    // update panels open states
    this.panels.forEach(panel => { panel.isOpen = !panel.disabled && this.activeIds.indexOf(panel.id) > -1; });

    // closeOthers updates
    if (this.activeIds.length > 1 && this.closeOtherPanels) {
      this._closeOthers(this.activeIds[0], false);
      this._updateActiveIds();
    }

    // Setup the initial classes here
    this._ngZone.onStable.pipe(take(1)).subscribe(() => {
      this.panels.forEach(panel => {
        const panelElement = this._getPanelElement(panel.id);
        if (panelElement) {
          if (!panel.initClassDone) {
            panel.initClassDone = true;
            ngbRunTransition(this._ngZone, panelElement, ngbCollapsingTransition, {
              animation: false,
              runningTransition: 'continue',
              context: {direction: panel.isOpen ? 'show' : 'hide'}
            });
          }
        } else {
          // Classes must be initialized next time it will be in the dom
          panel.initClassDone = false;
        }
      });
    });
  }

  private _changeOpenState(panel: NgbPanel | null, nextState: boolean) {
    if (panel != null && !panel.disabled && panel.isOpen !== nextState) {
      let defaultPrevented = false;

      this.panelChange.emit(
          {panelId: panel.id, nextState: nextState, preventDefault: () => { defaultPrevented = true; }});

      if (!defaultPrevented) {
        panel.isOpen = nextState;
        panel.transitionRunning = true;

        if (nextState && this.closeOtherPanels) {
          this._closeOthers(panel.id);
        }
        this._updateActiveIds();
        this._runTransitions(this.animation);
      }
    }
  }

  private _closeOthers(panelId: string, enableTransition = true) {
    this.panels.forEach(panel => {
      if (panel.id !== panelId && panel.isOpen) {
        panel.isOpen = false;
        panel.transitionRunning = enableTransition;
      }
    });
  }

  private _findPanelById(panelId: string): NgbPanel | null { return this.panels.find(p => p.id === panelId) || null; }

  private _updateActiveIds() {
    this.activeIds = this.panels.filter(panel => panel.isOpen && !panel.disabled).map(panel => panel.id);
  }

  private _runTransitions(animation: boolean) {
    // detectChanges is performed to ensure that all panels are in the dom (via transitionRunning = true)
    // before starting the animation
    this._changeDetector.detectChanges();

    this.panels.forEach(panel => {
      // When panel.transitionRunning is true, the transition needs to be started OR reversed,
      // The direction (show or hide) is choosen by each panel.isOpen state
      if (panel.transitionRunning) {
        const panelElement = this._getPanelElement(panel.id);
        ngbRunTransition(this._ngZone, panelElement !, ngbCollapsingTransition, {
          animation,
          runningTransition: 'stop',
          context: {direction: panel.isOpen ? 'show' : 'hide'}
        }).subscribe(() => {
          panel.transitionRunning = false;
          const {id} = panel;
          if (panel.isOpen) {
            panel.shown.emit();
            this.shown.emit(id);
          } else {
            panel.hidden.emit();
            this.hidden.emit(id);
          }
        });
      }
    });
  }

  private _getPanelElement(panelId: string): HTMLElement | null {
    return this._element.nativeElement.querySelector('#' + panelId);
  }
}

/**
 * A directive to put on a button that toggles panel opening and closing.
 *
 * To be used inside the [`NgbPanelHeader`](#/components/accordion/api#NgbPanelHeader)
 *
 * @since 4.1.0
 */
@Directive({
  selector: 'button[ngbPanelToggle]',
  host: {
    'type': 'button',
    '[disabled]': 'panel.disabled',
    '[class.collapsed]': '!panel.isOpen',
    '[attr.aria-expanded]': 'panel.isOpen',
    '[attr.aria-controls]': 'panel.id',
    '(click)': 'accordion.toggle(panel.id)'
  }
})
export class NgbPanelToggle {
  static ngAcceptInputType_ngbPanelToggle: NgbPanel | '';

  @Input()
  set ngbPanelToggle(panel: NgbPanel) {
    if (panel) {
      this.panel = panel;
    }
  }

  constructor(public accordion: NgbAccordion, @Optional() @Host() public panel: NgbPanel) {}
}
