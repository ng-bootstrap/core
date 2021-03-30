import {Component} from '@angular/core';

@Component({
  template: `
    <h3>Dropdown click tests</h3>
    <form>
      <div class="form-group form-inline">
        <input type="text" class="form-control mr-1" style="width: 100px" placeholder="before" id="before"/>

        <div class="input-group">
          <div ngbDropdown class="d-inline-block mr-3">
            <button class="btn btn-outline-secondary" id="dropdown" ngbDropdownToggle>Choose one</button>
            <div ngbDropdownMenu aria-labelledby="dropdown">
              <a href ngbDropdownItem (keydown.enter)="enterKey = true" (click)="enterClick = true; $event.preventDefault()">Enter</a>
              <button ngbDropdownItem (keyup.space)="spaceKey = true" (click)="spaceClick = true">Space</button>
            </div>
          </div>
        </div>

        <span id="space-click" *ngIf="spaceClick" class="ml-3">SPACE-CLICK</span>
        <span id="enter-click" *ngIf="enterClick" class="ml-3">ENTER-CLICK</span>
        <span id="enter-key" *ngIf="enterKey" class="ml-3">ENTER-KEY</span>
        <span id="space-key" *ngIf="spaceKey" class="ml-3">SPACE-KEY</span>
      </div>
    </form>
  `
})
export class DropdownClickComponent {
  enterClick = false;
  spaceClick = false;
  enterKey = false;
  spaceKey = false;
}
