import {NgModule} from '@angular/core';

import {NgbAccordionModule} from './accordion/accordion.module';
import {NgbAlertModule} from './alert/alert.module';
import {NgbButtonsModule} from './buttons/buttons.module';
import {NgbCarouselModule} from './carousel/carousel.module';
import {NgbCollapseModule} from './collapse/collapse.module';
import {NgbDatepickerModule} from './datepicker/datepicker.module';
import {NgbDropdownModule} from './dropdown/dropdown.module';
import {NgbModalModule} from './modal/modal.module';
import {NgbNavModule} from './nav/nav.module';
import {NgbPaginationModule} from './pagination/pagination.module';
import {NgbPopoverModule} from './popover/popover.module';
import {NgbProgressbarModule} from './progressbar/progressbar.module';
import {NgbRatingModule} from './rating/rating.module';
import {NgbTimepickerModule} from './timepicker/timepicker.module';
import {NgbToastModule} from './toast/toast.module';
import {NgbTooltipModule} from './tooltip/tooltip.module';
import {NgbTypeaheadModule} from './typeahead/typeahead.module';



export {
  NgbAccordion,
  NgbAccordionConfig,
  NgbAccordionModule,
  NgbPanel,
  NgbPanelChangeEvent,
  NgbPanelContent,
  NgbPanelHeader,
  NgbPanelHeaderContext,
  NgbPanelTitle,
  NgbPanelToggle
} from './accordion/accordion.module';
export {NgbAlert, NgbAlertConfig, NgbAlertModule} from './alert/alert.module';
export {NgbButtonLabel, NgbButtonsModule, NgbCheckBox, NgbRadio, NgbRadioGroup} from './buttons/buttons.module';
export {
  NgbCarousel,
  NgbCarouselConfig,
  NgbCarouselModule,
  NgbSlide,
  NgbSlideEvent,
  NgbSlideEventDirection,
  NgbSlideEventSource
} from './carousel/carousel.module';
export {NgbCollapse, NgbCollapseConfig, NgbCollapseModule} from './collapse/collapse.module';
export {
  NgbCalendar,
  NgbCalendarGregorian,
  NgbCalendarHebrew,
  NgbCalendarIslamicCivil,
  NgbCalendarIslamicUmalqura,
  NgbCalendarPersian,
  NgbCalendarBuddhist,
  NgbDate,
  NgbDateAdapter,
  NgbDateNativeAdapter,
  NgbDateNativeUTCAdapter,
  NgbDateParserFormatter,
  NgbDatepicker,
  NgbDatepickerConfig,
  NgbInputDatepickerConfig,
  NgbDatepickerContent,
  NgbDatepickerI18n,
  NgbDatepickerI18nDefault,
  NgbDatepickerI18nHebrew,
  NgbDatepickerKeyboardService,
  NgbDatepickerModule,
  NgbDatepickerMonth,
  NgbDatepickerNavigateEvent,
  NgbDatepickerState,
  NgbDateStruct,
  NgbInputDatepicker,
  NgbPeriod
} from './datepicker/datepicker.module';
export {
  NgbDropdown,
  NgbDropdownAnchor,
  NgbDropdownConfig,
  NgbDropdownItem,
  NgbDropdownMenu,
  NgbDropdownModule,
  NgbDropdownToggle,
  NgbNavbar
} from './dropdown/dropdown.module';
export {
  ModalDismissReasons,
  NgbActiveModal,
  NgbModal,
  NgbModalConfig,
  NgbModalModule,
  NgbModalOptions,
  NgbModalRef
} from './modal/modal.module';
export {
  NgbNavChangeEvent,
  NgbNavConfig,
  NgbNav,
  NgbNavContent,
  NgbNavContentContext,
  NgbNavItem,
  NgbNavLink,
  NgbNavModule,
  NgbNavOutlet,
  NgbNavPane
} from './nav/nav.module';
export {
  NgbPagination,
  NgbPaginationConfig,
  NgbPaginationEllipsis,
  NgbPaginationFirst,
  NgbPaginationLast,
  NgbPaginationModule,
  NgbPaginationNext,
  NgbPaginationNumber,
  NgbPaginationPrevious,
  NgbPaginationPages
} from './pagination/pagination.module';
export {NgbPopover, NgbPopoverConfig, NgbPopoverModule} from './popover/popover.module';
export {NgbProgressbar, NgbProgressbarConfig, NgbProgressbarModule} from './progressbar/progressbar.module';
export {NgbRating, NgbRatingConfig, NgbRatingModule} from './rating/rating.module';
export {
  NgbTimeAdapter,
  NgbTimepickerI18n,
  NgbTimepicker,
  NgbTimepickerConfig,
  NgbTimepickerModule,
  NgbTimeStruct
} from './timepicker/timepicker.module';
export {NgbToast, NgbToastConfig, NgbToastHeader, NgbToastModule} from './toast/toast.module';
export {NgbTooltip, NgbTooltipConfig, NgbTooltipModule} from './tooltip/tooltip.module';
export {
  NgbHighlight,
  NgbTypeahead,
  NgbTypeaheadConfig,
  NgbTypeaheadModule,
  NgbTypeaheadSelectItemEvent
} from './typeahead/typeahead.module';
export {Placement} from './util/positioning';

export {NgbConfig} from './ngb-config';


const NGB_MODULES = [
  NgbAccordionModule, NgbAlertModule, NgbButtonsModule, NgbCarouselModule, NgbCollapseModule, NgbDatepickerModule,
  NgbDropdownModule, NgbModalModule, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule,
  NgbRatingModule, NgbTimepickerModule, NgbToastModule, NgbTooltipModule, NgbTypeaheadModule
];

@NgModule({imports: NGB_MODULES, exports: NGB_MODULES})
export class NgbModule {
}
