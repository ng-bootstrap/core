import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  Input,
  QueryList,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {distinctUntilChanged, skip, startWith, takeUntil} from 'rxjs/operators';

import {ngbNavFadeInNoReflowTransition, ngbNavFadeInTransition, ngbNavFadeOutTransition} from './nav-transition';
import {ngbRunTransition, NgbTransitionOptions} from '../util/transition/ngbTransition';
import {NgbNav, NgbNavItem} from './nav';

@Directive({
  selector: '[ngbNavPane]',
  host: {
    '[id]': 'item.panelDomId',
    'class': 'tab-pane',
    '[class.fade]': 'nav.animation',
    '[attr.role]': 'role ? role : nav.roles ? "tabpanel" : undefined',
    '[attr.aria-labelledby]': 'item.domId'
  }
})
export class NgbNavPane {
  @Input() item: NgbNavItem;
  @Input() nav: NgbNav;
  @Input() role: string;

  constructor(public elRef: ElementRef<HTMLElement>) {}
}

/**
 * The outlet where currently active nav content will be displayed.
 *
 * @since 5.2.0
 */
@Component({
  selector: '[ngbNavOutlet]',
  host: {'[class.tab-content]': 'true'},
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template ngFor let-item [ngForOf]="nav.items">
      <div ngbNavPane *ngIf="item.isPanelInDom() || isPanelTransitioning(item)" [item]="item" [nav]="nav" [role]="paneRole">
        <ng-template [ngTemplateOutlet]="item.contentTpl?.templateRef || null"
                     [ngTemplateOutletContext]="{$implicit: item.active || isPanelTransitioning(item)}"></ng-template>
      </div>
    </ng-template>
  `
})
export class NgbNavOutlet implements AfterViewInit {
  private _activePane: NgbNavPane | null = null;

  @ViewChildren(NgbNavPane) private _panes: QueryList<NgbNavPane>;

  /**
   * A role to set on the nav pane
   */
  @Input() paneRole;

  /**
   * Reference to the `NgbNav`
   */
  @Input('ngbNavOutlet') nav: NgbNav;

  constructor(private _cd: ChangeDetectorRef) {}

  isPanelTransitioning(item: NgbNavItem) { return this._activePane ?.item === item; }

  ngAfterViewInit() {
    // initial display
    this._updateActivePane();

    // this will be emitted for all 3 types of nav changes: .select(), [activeId] or (click)
    this.nav.navItemChange$
      .pipe(takeUntil(this.nav.destroy$), startWith(this._activePane ?.item || null), distinctUntilChanged(), skip(1))
      .subscribe(nextItem => {
      const options: NgbTransitionOptions<undefined> = {animation: this.nav.animation, runningTransition: 'stop'};

      // next panel we're switching to will only appear in DOM after the change detection is done
      // and `this._panes` will be updated
      this._cd.detectChanges();

      // fading out
      if (this._activePane) {
        ngbRunTransition(this._activePane.elRef.nativeElement, ngbNavFadeOutTransition, options).subscribe(() => {
          const activeItem = this._activePane ?.item;
          this._activePane = this._getPaneForItem(nextItem);

          // mark for check when transition finishes as outlet or parent containers might be OnPush
          // without this the panes that have "faded out" will stay in DOM
          this._cd.markForCheck();

          // fading in
          if (this._activePane) {
            const fadeInTransition = this.nav.animation ? ngbNavFadeInTransition : ngbNavFadeInNoReflowTransition;
            ngbRunTransition(this._activePane.elRef.nativeElement, fadeInTransition, options).subscribe(() => {
              if (nextItem) {
                nextItem.shown.emit();
                this.nav.shown.emit(nextItem.id);
              }
            });
          }

          if (activeItem) {
            activeItem.hidden.emit();
            this.nav.hidden.emit(activeItem.id);
          }
        });
      } else {
        this._updateActivePane();
      }
      });
  }

  private _updateActivePane() {
    this._activePane = this._getActivePane();
    this._activePane ?.elRef.nativeElement.classList.add('show');
    this._activePane ?.elRef.nativeElement.classList.add('active');
  }

  private _getPaneForItem(item: NgbNavItem | null) {
    return this._panes && this._panes.find(pane => pane.item === item) || null;
  }

  private _getActivePane(): NgbNavPane | null {
    return this._panes && this._panes.find(pane => pane.item.active) || null;
  }
}
