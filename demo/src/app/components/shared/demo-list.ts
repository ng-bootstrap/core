import {Injectable} from '@angular/core';

export interface NgbdDemoConfig {
  id?: string;
  title: string;
  code?: string;
  markup?: string;
  type: any;
  files?: Array<{[name: string]: string}>;
  showCode?: boolean;
}

export interface NgbdDemoListConfig { [demo: string]: NgbdDemoConfig; }

export interface NgbdDemoOverviewConfig { [anchor: string]: string; }

@Injectable({providedIn: 'root'})
export class NgbdDemoList {
  private _demos: {[widget: string]: NgbdDemoListConfig} = {};

  private _overviews: {[widget: string]: NgbdDemoOverviewConfig} = {};


  register(widget: string, list: NgbdDemoListConfig, overview?: NgbdDemoOverviewConfig) {
    this._demos[widget] = list;
    if (overview) {
      this._overviews[widget] = overview;
    }
  }

  getDemos(widget: string) { return this._demos[widget]; }

  getOverviewSections(widget: string) {
    const overview = this._overviews[widget];
    const sections = {};
    if (overview) {
      Object.keys(overview).forEach(fragment => { sections[fragment] = {fragment, title: overview[fragment]}; });
    }
    return sections;
  }
}
