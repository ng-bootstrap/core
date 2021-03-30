import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NGB_CAROUSEL_DIRECTIVES} from './carousel';

export {NgbCarousel, NgbSlide, NgbSlideEvent, NgbSlideEventSource} from './carousel';
export {NgbSlideEventDirection} from './carousel-transition';
export {NgbCarouselConfig} from './carousel-config';

@NgModule({declarations: NGB_CAROUSEL_DIRECTIVES, exports: NGB_CAROUSEL_DIRECTIVES, imports: [CommonModule]})
export class NgbCarouselModule {
}
