import {
  AfterContentChecked,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  QueryList,
  TemplateRef,
  ViewChildren
} from '@angular/core';

import {isString} from '../util/util';

import {NgbAccordionConfig} from './accordion-config';

let nextId = 0;

/**
 * This directive should be used to wrap accordion panel titles that need to contain HTML markup or other directives.
 */
@Directive({selector: 'ng-template[ngbPanelTitle]'})
export class NgbPanelTitle {
  constructor(public templateRef: TemplateRef<any>) {}
}

/**
 * This directive must be used to wrap accordion panel content.
 */
@Directive({selector: 'ng-template[ngbPanelContent]'})
export class NgbPanelContent {
  constructor(public templateRef: TemplateRef<any>) {}
}

/**
 * The NgbPanel directive represents an individual panel with the title and collapsible
 * content
 */
@Directive({selector: 'ngb-panel'})
export class NgbPanel implements AfterContentChecked {
  /**
   *  A flag determining whether the panel is disabled or not.
   *  When disabled, the panel cannot be toggled.
   */
  @Input() disabled = false;

  /**
   *  An optional id for the panel. The id should be unique.
   *  If not provided, it will be auto-generated.
   */
  @Input() id = `ngb-panel-${nextId++}`;

  /**
   * A flag telling if the panel is currently open
   */
  isOpen = false;

  /**
   *  The title for the panel.
   */
  @Input() title: string;

  /**
   *  Accordion's types of panels to be applied per panel basis.
   *  Bootstrap recognizes the following types: "primary", "secondary", "success", "danger", "warning", "info", "light"
   * and "dark"
   */
  @Input() type: string;

  titleTpl: NgbPanelTitle | null;
  contentTpl: NgbPanelContent | null;

  @ContentChildren(NgbPanelTitle, {descendants: false}) titleTpls: QueryList<NgbPanelTitle>;
  @ContentChildren(NgbPanelContent, {descendants: false}) contentTpls: QueryList<NgbPanelContent>;

  ngAfterContentChecked() {
    // We are using @ContentChildren instead of @ContantChild as in the Angular version being used
    // only @ContentChildren allows us to specify the {descendants: false} option.
    // Without {descendants: false} we are hitting bugs described in:
    // https://github.com/ng-bootstrap/ng-bootstrap/issues/2240
    this.titleTpl = this.titleTpls.first;
    this.contentTpl = this.contentTpls.first;
  }
}

/**
 * The payload of the change event fired right before toggling an accordion panel
 */
export interface NgbPanelChangeEvent {
  /**
   * Id of the accordion panel that is toggled
   */
  panelId: string;

  /**
   * Whether the panel will be opened (true) or closed (false)
   */
  nextState: boolean;

  /**
   * Function that will prevent panel toggling if called
   */
  preventDefault: () => void;
}

@Directive({selector: '[role="heading"]'})
export class Heading {
  constructor(public element: ElementRef) {}
}

@Directive({selector: '[role="region"]'})
export class Region {
  constructor(public element: ElementRef) {}
}

/**
 * The NgbAccordion directive is a collection of panels.
 * It can assure that only one panel can be opened at a time.
 */
@Component({
  selector: 'ngb-accordion',
  exportAs: 'ngbAccordion',
  host: {'role': 'presentation', '[attr.aria-multiselectable]': '!closeOtherPanels'},
  template: `
    <ng-template ngFor let-panel [ngForOf]="panels">
      <div class="card">
        <div role="heading" id="{{panel.id}}-header"
          [class]="'card-header ' + (panel.type ? 'bg-'+panel.type: type ? 'bg-'+type : '')" [class.active]="panel.isOpen">
          <a href (click)="!!toggle(panel.id)" [class.text-muted]="panel.disabled" [attr.tabindex]="(panel.disabled ? '-1' : null)"
            [attr.aria-expanded]="panel.isOpen" [attr.aria-controls]="(panel.isOpen ? panel.id : null)"
            [attr.aria-disabled]="panel.disabled">
            {{panel.title}}<ng-template [ngTemplateOutlet]="panel.titleTpl?.templateRef"></ng-template>
          </a>
        </div>
        <div id="{{panel.id}}" role="region" [attr.aria-labelledby]="panel.id + '-header'"
             class="card-body collapse {{panel.isOpen ? 'show' : null}}" *ngIf="!destroyOnHide || panel.isOpen">
             <ng-template [ngTemplateOutlet]="panel.contentTpl?.templateRef"></ng-template>
        </div>
      </div>
    </ng-template>
  `
})
export class NgbAccordion implements AfterContentChecked {
  @ContentChildren(NgbPanel) panels: QueryList<NgbPanel>;

  @ViewChildren(Heading) headers: QueryList<Heading>;

  @ViewChildren(Region) regions: QueryList<Region>;

  /**
   * An array or comma separated strings of panel identifiers that should be opened
   */
  @Input() activeIds: string | string[] = [];

  /**
   *  Whether the other panels should be closed when a panel is opened
   */
  @Input('closeOthers') closeOtherPanels: boolean;

  /**
   * Whether the closed panels should be hidden without destroying them
   */
  @Input() destroyOnHide: boolean = true;

  /**
   *  Accordion's types of panels to be applied globally.
   *  Bootstrap recognizes the following types: "primary", "secondary", "success", "danger", "warning", "info", "light"
   * and "dark
   */
  @Input() type: string;

  /**
   * A panel change event fired right before the panel toggle happens. See NgbPanelChangeEvent for payload details
   */
  @Output() panelChange = new EventEmitter<NgbPanelChangeEvent>();

  constructor(config: NgbAccordionConfig, private elRef: ElementRef) {
    this.type = config.type;
    this.closeOtherPanels = config.closeOthers;
  }

  @HostListener('keydown', ['$event'])
  keydown(event: KeyboardEvent) {
    // Create the array of toggle elements for the accordion group
    const headers = this.headers.map((heading: Heading) => heading.element.nativeElement);
    const panels = this.regions.map((region: Region) => region.element.nativeElement);

    const target = (event.target as any).parentElement;
    const key = event.which.toString();
    // 33 = Page Up, 34 = Page Down
    const ctrlModifier = (event.ctrlKey && key.match(/33|34/));

    // Is this coming from an accordion header?
    if (target.classList.contains('card-header')) {
      // Up/ Down arrow and Control + Page Up/ Page Down keyboard operations
      // 38 = Up, 40 = Down
      if (key.match(/38|40/) || ctrlModifier) {
        const index = headers.indexOf(target);
        const direction = (key.match(/34|40/)) ? 1 : -1;
        const length = headers.length;
        const newIndex = (index + length + direction) % length;
        headers[newIndex].querySelector('a').focus();
        event.preventDefault();
      } else if (key.match(/35|36/)) {
        // 35 = End, 36 = Home keyboard operations
        switch (key) {
          // Go to first accordion
          case '36':
            headers[0].querySelector('a').focus();
            break;
          // Go to last accordion
          case '35':
            headers[headers.length - 1].querySelector('a').focus();
            break;
        }
        event.preventDefault();
      }
    } else if (ctrlModifier) {
      // Control + Page Up/ Page Down keyboard operations
      // Catches events that happen inside of panels
      panels.forEach(function(panel, index) {
        if (panel === target) {
          headers[index].querySelector('a').focus();
          event.preventDefault();
        }
      });
    }
  }

  /**
   * Programmatically toggle a panel with a given id.
   */
  toggle(panelId: string) {
    const panel = this.panels.find(p => p.id === panelId);

    if (panel && !panel.disabled) {
      let defaultPrevented = false;

      this.panelChange.emit(
          {panelId: panelId, nextState: !panel.isOpen, preventDefault: () => { defaultPrevented = true; }});

      if (!defaultPrevented) {
        panel.isOpen = !panel.isOpen;

        if (this.closeOtherPanels) {
          this._closeOthers(panelId);
        }
        this._updateActiveIds();
      }
    }
  }

  ngAfterContentChecked() {
    // active id updates
    if (isString(this.activeIds)) {
      this.activeIds = this.activeIds.split(/\s*,\s*/);
    }

    // update panels open states
    this.panels.forEach(panel => panel.isOpen = !panel.disabled && this.activeIds.indexOf(panel.id) > -1);

    // closeOthers updates
    if (this.activeIds.length > 1 && this.closeOtherPanels) {
      this._closeOthers(this.activeIds[0]);
      this._updateActiveIds();
    }
  }

  private _closeOthers(panelId: string) {
    this.panels.forEach(panel => {
      if (panel.id !== panelId) {
        panel.isOpen = false;
      }
    });
  }

  private _updateActiveIds() {
    this.activeIds = this.panels.filter(panel => panel.isOpen && !panel.disabled).map(panel => panel.id);
  }
}
