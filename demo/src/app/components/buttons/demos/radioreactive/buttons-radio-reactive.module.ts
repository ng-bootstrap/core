import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdButtonsRadioreactive } from './buttons-radioreactive';

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule, NgbModule],
  declarations: [NgbdButtonsRadioreactive],
  exports: [NgbdButtonsRadioreactive],
  bootstrap: [NgbdButtonsRadioreactive]
})
export class NgbdButtonsRadioReactiveModule {}
