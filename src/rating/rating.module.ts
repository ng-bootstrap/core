import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgbRating} from './rating';

export {NgbRating} from './rating';
export {NgbRatingConfig} from './rating-config';

@NgModule({declarations: [NgbRating], exports: [NgbRating], imports: [CommonModule]})
export class NgbRatingModule {
}
