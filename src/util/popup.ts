import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Injector,
  NgZone,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
  ViewRef
} from '@angular/core';

import {Observable, of} from 'rxjs';
import {mergeMap, take, tap} from 'rxjs/operators';

import {ngbRunTransition} from './transition/ngbTransition';

export class ContentRef {
  constructor(public nodes: any[], public viewRef?: ViewRef, public componentRef?: ComponentRef<any>) {}
}

export class PopupService<T> {
  private _windowRef: ComponentRef<T>| null = null;
  private _contentRef: ContentRef | null = null;

  constructor(
      private _type: any, private _injector: Injector, private _viewContainerRef: ViewContainerRef,
      private _renderer: Renderer2, private _ngZone: NgZone,
      private _componentFactoryResolver: ComponentFactoryResolver, private _applicationRef: ApplicationRef) {}

  open(content?: string | TemplateRef<any>, context?: any, animation = false):
      {windowRef: ComponentRef<T>, transition$: Observable<void>} {
    if (!this._windowRef) {
      this._contentRef = this._getContentRef(content, context);
      this._windowRef = this._viewContainerRef.createComponent(
          this._componentFactoryResolver.resolveComponentFactory<T>(this._type), this._viewContainerRef.length,
          this._injector, this._contentRef.nodes);
    }

    const {nativeElement} = this._windowRef.location;
    const onStable$ = this._ngZone.onStable.asObservable().pipe(take(1));
    const transition$ = onStable$.pipe(mergeMap(() => this._ngZone.run(() => {
      return ngbRunTransition(
          nativeElement, ({classList}) => classList.add('show'), {animation, runningTransition: 'continue'});
    })));

    return {windowRef: this._windowRef, transition$};
  }

  close(animation = false): Observable<void> {
    if (!this._windowRef) {
      return of(undefined);
    }

    return ngbRunTransition(
               this._windowRef.location.nativeElement, ({classList}) => classList.remove('show'),
               {animation, runningTransition: 'stop'})
        .pipe(tap(() => {
          if (this._windowRef) {
            // this is required because of the container='body' option
            this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._windowRef.hostView));
            this._windowRef = null;
          }
          if (this._contentRef?.viewRef) {
            this._applicationRef.detachView(this._contentRef.viewRef);
            this._contentRef.viewRef.destroy();
            this._contentRef = null;
          }
        }));
  }

  private _getContentRef(content?: string | TemplateRef<any>, context?: any): ContentRef {
    if (!content) {
      return new ContentRef([]);
    } else if (content instanceof TemplateRef) {
      const viewRef = content.createEmbeddedView(context);
      this._applicationRef.attachView(viewRef);
      return new ContentRef([viewRef.rootNodes], viewRef);
    } else {
      return new ContentRef([[this._renderer.createText(`${content}`)]]);
    }
  }
}
