import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdButtonsCheckboxreactive } from './buttons-checkboxreactive';

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule, NgbModule],
  declarations: [NgbdButtonsCheckboxreactive],
  exports: [NgbdButtonsCheckboxreactive],
  bootstrap: [NgbdButtonsCheckboxreactive]
})
export class NgbdButtonsCheckboxReactiveModule {}
