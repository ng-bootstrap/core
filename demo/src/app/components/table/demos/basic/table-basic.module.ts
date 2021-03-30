import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdTableBasic } from './table-basic';

@NgModule({
  imports: [BrowserModule, CommonModule, NgbModule],
  declarations: [NgbdTableBasic],
  exports: [NgbdTableBasic],
  bootstrap: [NgbdTableBasic]
})
export class NgbdTableBasicModule {}
