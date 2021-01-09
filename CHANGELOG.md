## [8.0.1](https://github.com/ng-bootstrap/ng-bootstrap/compare/8.0.0...8.0.1) (2021-01-05)


### Bug Fixes

* **nav:** correctly work with conditional nav items ([#3894](https://github.com/ng-bootstrap/ng-bootstrap/issues/3894)) ([1f466ed](https://github.com/ng-bootstrap/ng-bootstrap/commit/1f466edaa222812a15d233ab6a604ece68e3a58b)), closes [#3892](https://github.com/ng-bootstrap/ng-bootstrap/issues/3892)
* **popover,tooltip:** run transition inside angular zone ([#3909](https://github.com/ng-bootstrap/ng-bootstrap/issues/3909)) ([a2d3a44](https://github.com/ng-bootstrap/ng-bootstrap/commit/a2d3a449dbd3295c71683c72fdf24e01d5d9edb5)), closes [#3896](https://github.com/ng-bootstrap/ng-bootstrap/issues/3896)



# [8.0.0](https://github.com/ng-bootstrap/ng-bootstrap/compare/8.0.0-beta.1...8.0.0) (2020-11-06)

This is a major release introducing animations to all standard Bootstrap components inside ng-bootstrap. Please read the [animations documentation](https://ng-bootstrap.github.io/#/animations), you'll find some examples and how to opt-out if necessary.


### Bug Fixes

* **alert:** add .fade class only with animations on ([#3756](https://github.com/ng-bootstrap/ng-bootstrap/issues/3756)) ([5e941d7](https://github.com/ng-bootstrap/ng-bootstrap/commit/5e941d7262869581fa556899b7beaf73792cb55f))
* **animations:** duration should be computed after 'startFn' execution ([4efea05](https://github.com/ng-bootstrap/ng-bootstrap/commit/4efea05d1ebf4ab12829d9424908c2d2c00dfdc1))
* **animations:** ignore all inner transitions in 'ngbRunTransition' ([b50f4d9](https://github.com/ng-bootstrap/ng-bootstrap/commit/b50f4d92402838a0628b1970692a69c2525a8936))
* **animations:** pass transition context with animations disabled ([#3781](https://github.com/ng-bootstrap/ng-bootstrap/issues/3781)) ([0e2120e](https://github.com/ng-bootstrap/ng-bootstrap/commit/0e2120e4e42d0b1a5a111fdf0768f3c967970957))
* **animations:** startFn called when no animation ([a14c76d](https://github.com/ng-bootstrap/ng-bootstrap/commit/a14c76d2f13777d31c3df1e29d3b8d9e40065db5))
* **animations:** make collapsing transition work with SSR ([#3864](https://github.com/ng-bootstrap/ng-bootstrap/issues/3864)) ([e6c70c0](https://github.com/ng-bootstrap/ng-bootstrap/commit/e6c70c0234f979ebac2b6e881ff7b3b276a15f5f))
* **popover:** allow null and undefined as values for popover and title ([681c1e3](https://github.com/ng-bootstrap/ng-bootstrap/commit/681c1e32be93f3a87f9804aacfb03d7741337f4d)), closes [#3845](https://github.com/ng-bootstrap/ng-bootstrap/issues/3845)
* **tooltip:** allow null and undefined as values for tooltip ([b713e38](https://github.com/ng-bootstrap/ng-bootstrap/commit/b713e38f51a31d1b4b860f6812331f5b59117974)), closes [#3845](https://github.com/ng-bootstrap/ng-bootstrap/issues/3845)


### Features

* **accordion:** add animations ([#3766](https://github.com/ng-bootstrap/ng-bootstrap/issues/3766)) ([99de349](https://github.com/ng-bootstrap/ng-bootstrap/commit/99de34921f558e495d041e5e9d85b2f788d5e60f))
* **alert:** add animations ([ba7362e](https://github.com/ng-bootstrap/ng-bootstrap/commit/ba7362ead5ad30e7d81a54a4d331db81a10990b3))
* **alert:** change API due to the introduction of animations ([95f75cc](https://github.com/ng-bootstrap/ng-bootstrap/commit/95f75cc408e79911f315cd210a16e01d76e53a4d))
* **animations:** always run the start function in ngbRunTransition ([#3793](https://github.com/ng-bootstrap/ng-bootstrap/issues/3793)) ([99e7e8c](https://github.com/ng-bootstrap/ng-bootstrap/commit/99e7e8cc92f13602b524e99b1622ecdfdabf0463))
* **animations:** introduce 'endFn' returned by 'startFn' ([5ac913d](https://github.com/ng-bootstrap/ng-bootstrap/commit/5ac913d1d1fcdb45e8a74b6f94ff81f83db032f3))
* **animations:** introduce transition context ([12d753b](https://github.com/ng-bootstrap/ng-bootstrap/commit/12d753b2c69a0515b2c75320f5c4d475156a9568))
* **animations:** support 'runningTransaction: stop' ([2373de3](https://github.com/ng-bootstrap/ng-bootstrap/commit/2373de3a74e080cd551867c2421ea30990ec485d))
* **carousel:** accessibility ([#3773](https://github.com/ng-bootstrap/ng-bootstrap/issues/3773)) ([6830d55](https://github.com/ng-bootstrap/ng-bootstrap/commit/6830d555243ba7814dcacda266c3ebb044f82d37))
* **carousel:** add animations ([#3804](https://github.com/ng-bootstrap/ng-bootstrap/issues/3804)) ([61691d0](https://github.com/ng-bootstrap/ng-bootstrap/commit/61691d00bae0eae8c804daadeb26408a700c475f))
* **collapse:** add missing `NgbCollapseConfig` ([#3736](https://github.com/ng-bootstrap/ng-bootstrap/issues/3736)) ([8d5417a](https://github.com/ng-bootstrap/ng-bootstrap/commit/8d5417a65bfbe8e451e559e33978f06ab5e1c242))
* **collapse:** add animations ([9bffcab](https://github.com/ng-bootstrap/ng-bootstrap/commit/9bffcab9bd1fc83933f4f7b776c3ebef3f16ca12))
* **datepicker:** remove deprecated `(select)` output ([#3887](https://github.com/ng-bootstrap/ng-bootstrap/issues/3887)) ([0662d4d](https://github.com/ng-bootstrap/ng-bootstrap/commit/0662d4d57114fbd7665b9911f616a18c3e3b7bf7))
* **modal:** add animations ([86cbf06](https://github.com/ng-bootstrap/ng-bootstrap/commit/86cbf0695738ed55b6ce2771cf6943f1592eaf58))
* **modal:** add scale animation when static backdrop is clicked ([#3771](https://github.com/ng-bootstrap/ng-bootstrap/issues/3771)) ([2b1cc56](https://github.com/ng-bootstrap/ng-bootstrap/commit/2b1cc565dcfae0bfdc1a37e31423f207b6f602bf))
* **nav:** add animations ([d82a302](https://github.com/ng-bootstrap/ng-bootstrap/commit/d82a302da2912ca5739137728d292362491e65f5))
* **nav:** nav config animations ([262ac7d](https://github.com/ng-bootstrap/ng-bootstrap/commit/262ac7d2401b09b68e93067d6c0127f61b0ce101))
* **popover:** add animations ([b7f12e6](https://github.com/ng-bootstrap/ng-bootstrap/commit/b7f12e6479c6f7ae6d6d5f0289b4be3a59955ed9))
* **progressbar:** remove intermediate `div` element ([#3841](https://github.com/ng-bootstrap/ng-bootstrap/issues/3841)) ([89ec4fe](https://github.com/ng-bootstrap/ng-bootstrap/commit/89ec4fe59734b15f6a195e157fd6b10f46bf4890))
* **toast:** add animations ([f8df46c](https://github.com/ng-bootstrap/ng-bootstrap/commit/f8df46cf8de4ee6d5ccf188aaedab70a11a98ab7))
* **tooltip:** add animations ([cc55e6b](https://github.com/ng-bootstrap/ng-bootstrap/commit/cc55e6b2340033bb1ea43daa34140049dec2a046))
* add global `NgbConfig` ([#3715](https://github.com/ng-bootstrap/ng-bootstrap/issues/3715)) ([bf9b98d](https://github.com/ng-bootstrap/ng-bootstrap/commit/bf9b98d228fe10ed424a5d75b36c6043f4095143))


### BREAKING CHANGES

* Animations are enabled by default an all standard Bootstrap components. See [the documentation](https://ng-bootstrap.github.io/#/animations) for more details.
* [`NgbTabset`](https://ng-bootstrap.github.io/#/components/tabset) deprecated in `6.0.0` is now removed completely
* **alert:** closing API has changed due to the introduction of the imperative `.close()` method to trigger the 'fade out' animation

Before:

```
<ngb-alert (close)="..."></ngb-alert>
```

After:

```
// template -> output was renamed
<ngb-alert (closed)="..."></ngb-alert>

// component -> new method introduced for animations
alert.close();
```

The `closed` event is emitted after the 'fade out' animation is finished.
The 'fade out' animation can be triggered either by clicking on the alert's 'cross button' or calling `.close()` method.

* **datepicker:** `(select)` output  deprecated in `6.0.0` is now removed completely

Before:

```
<ngb-datepicker (select)="inDateSelect($event)"></ngb-datepicker>
```

After:

```
<ngb-datepicker (dateSelect)="onDateSelect($event)"></ngb-datepicker>
```
* **progressbar:** markup generated by `<ngb-progressbar>` was simplified, there is no more intermediate `<div>` element  

Before: 
```
<ngb-progressbar type="success">
  <div class="progress">
    <div role="progressbar"></div>
  </div>
</ngb-progressbar>
```

After:
```
<ngb-progressbar type="success" class="progress">
  <div role="progressbar"></div>
</ngb-progressbar>
```
* **toast:** events API has changed to stick with specs provided by Bootstrap

Before:

```
<ngb-toast (hide)="..."></ngb-toast>
```

After:

```
// template -> output was renamed
<ngb-toast (hidden)="..."></ngb-toast>
```

The `hidden` event is emitted after the 'fade out' animation is finished.


# [7.0.0](https://github.com/ng-bootstrap/ng-bootstrap/compare/6.2.0...7.0.0) (2020-07-09)

This major release officially adds Angular 10 support.

### Bug Fixes
* **schematics:** update schematics to use new workspace API ([#3802](https://github.com/ng-bootstrap/ng-bootstrap/pull/3802)) ([7c81d8d](https://github.com/ng-bootstrap/ng-bootstrap/commit/7c81d8d5aadbccc6878fc6055f632fcf9723e668)), closes [#3714](https://github.com/ng-bootstrap/ng-bootstrap/issues/3714)
* **dropdown:** remove aria-haspopup for accessibility ([#3339](https://github.com/ng-bootstrap/ng-bootstrap/issues/3339)) ([0c92e39](https://github.com/ng-bootstrap/ng-bootstrap/commit/0c92e3922019c9b278ac1ea411ed15129ce399e1)), closes [#3331](https://github.com/ng-bootstrap/ng-bootstrap/issues/3331)

### BREAKING CHANGES

* for ng-bootstrap `7.0.0` minimal required version
of Angular is `10.0.0`, and minimal required version of Bootstrap is `4.5.0`.


# [6.2.0](https://github.com/ng-bootstrap/ng-bootstrap/compare/6.1.0...6.2.0) (2020-07-08)


### Bug Fixes

* **dropdown:** close dropdown when focus leaves menu ([#3625](https://github.com/ng-bootstrap/ng-bootstrap/issues/3625)) ([dc7990f](https://github.com/ng-bootstrap/ng-bootstrap/commit/dc7990f3087d59272289f5673592af2d902b198e)), closes [#3140](https://github.com/ng-bootstrap/ng-bootstrap/issues/3140)
* **dropdown:** container body keyboard navigation ([#3791](https://github.com/ng-bootstrap/ng-bootstrap/issues/3791)) ([6e1610d](https://github.com/ng-bootstrap/ng-bootstrap/commit/6e1610d627fb1312e631d26145789632d345779f))
* **dropdown:** support closest for HTMLDocument in EdgeHTML ([#3786](https://github.com/ng-bootstrap/ng-bootstrap/issues/3786)) ([d11530a](https://github.com/ng-bootstrap/ng-bootstrap/commit/d11530a822590153a698d932a337519bd1f3b264)), closes [#3783](https://github.com/ng-bootstrap/ng-bootstrap/issues/3783)
* **progressbar:** use PercentPipe by default ([#3777](https://github.com/ng-bootstrap/ng-bootstrap/issues/3777)) ([ceb1985](https://github.com/ng-bootstrap/ng-bootstrap/commit/ceb1985fa13e4a3a3854d572c7910eb7cf325f5d)), closes [#3700](https://github.com/ng-bootstrap/ng-bootstrap/issues/3700)


### Features

* **modal:** get all the open modal instances using the NgbModal service ([#3650](https://github.com/ng-bootstrap/ng-bootstrap/issues/3650)) ([b45b39a](https://github.com/ng-bootstrap/ng-bootstrap/commit/b45b39a0b859652d399fdd1c650410b404108d77)), closes [#3627](https://github.com/ng-bootstrap/ng-bootstrap/issues/3627)



# [6.1.0](https://github.com/ng-bootstrap/ng-bootstrap/compare/6.0.3...6.1.0) (2020-04-22)

This release brings schematics to the `@ng-bootstrap/ng-bootstrap` package, so the library can be installed now with `ng add @ng-bootstrap/ng-bootstrap`. See [installation docs for more details](https://ng-bootstrap.github.io/#/getting-started#installation). 

### Features

* **modal:** add 'aria-describedby' for modal window ([#3695](https://github.com/ng-bootstrap/ng-bootstrap/issues/3695)) ([9a8e70d](https://github.com/ng-bootstrap/ng-bootstrap/commit/9a8e70de6ea2eab953d9a9f7012ff6a9815fd795)), closes [#3678](https://github.com/ng-bootstrap/ng-bootstrap/issues/3678)
* **nav:** keyboard support for switching between navs ([#3612](https://github.com/ng-bootstrap/ng-bootstrap/issues/3612)) ([8c91ba5](https://github.com/ng-bootstrap/ng-bootstrap/commit/8c91ba5a634dd1356b7126888de0acf2d5589483))
* **schematics:** add schematics to `@ng-bootstrap/ng-bootstrap` ([#3669](https://github.com/ng-bootstrap/ng-bootstrap/issues/3669)) ([464080b](https://github.com/ng-bootstrap/ng-bootstrap/commit/464080b3d48c2aad4c3f4a59ffd632cf3d6e731c))



## [6.0.3](https://github.com/ng-bootstrap/ng-bootstrap/compare/6.0.2...6.0.3) (2020-04-17)


### Bug Fixes

* **datepicker:** set min/max dates correctly with custom adapters ([#3686](https://github.com/ng-bootstrap/ng-bootstrap/issues/3686)) ([644f71f](https://github.com/ng-bootstrap/ng-bootstrap/commit/644f71f)), closes [#3598](https://github.com/ng-bootstrap/ng-bootstrap/issues/3598)



## [5.3.1](https://github.com/ng-bootstrap/ng-bootstrap/compare/5.3.0...5.3.1) (2020-04-17)


### Bug Fixes

* **datepicker:** set min/max dates correctly with custom adapters ([586672b](https://github.com/ng-bootstrap/ng-bootstrap/commit/586672b)), closes [#3598](https://github.com/ng-bootstrap/ng-bootstrap/issues/3598)



## [6.0.2](https://github.com/ng-bootstrap/ng-bootstrap/compare/6.0.1...6.0.2) (2020-03-23)


### Reverts

* **dropdown:** avoid adding vertical scrollbars ([#3644](https://github.com/ng-bootstrap/ng-bootstrap/issues/3644), [#3655](https://github.com/ng-bootstrap/ng-bootstrap/issues/3655)) ([822a5c1](https://github.com/ng-bootstrap/ng-bootstrap/commit/822a5c1ab951f81104d87253c031b049588f880f)), closes [#3653](https://github.com/ng-bootstrap/ng-bootstrap/issues/3653)



## [6.0.1](https://github.com/ng-bootstrap/ng-bootstrap/compare/6.0.0...6.0.1) (2020-03-20)

Mostly technical release that improves compatibility with 'strictTemplates' and 'strictNullChecks'

### Bug Fixes

* support 'strictTemplates' flag for public API ([#3623](https://github.com/ng-bootstrap/ng-bootstrap/issues/3623)) ([eef5422](https://github.com/ng-bootstrap/ng-bootstrap/commit/eef5422b7c3e616233e68ee90bc60f73b72c2331)), closes [#3619](https://github.com/ng-bootstrap/ng-bootstrap/issues/3619)
* improve compatibility with 'strictNullChecks' ([0b16754](https://github.com/ng-bootstrap/ng-bootstrap/commit/0b1675450b3b07b8f1eeb621872442743fdec5ba)), closes [#1544](https://github.com/ng-bootstrap/ng-bootstrap/issues/1544)
* **datepicker:** disabled datepicker should not be clickable/focusable ([51c940b](https://github.com/ng-bootstrap/ng-bootstrap/commit/51c940b1cffc2af35b6ddb43152ee04cf019620a)), closes [#3648](https://github.com/ng-bootstrap/ng-bootstrap/issues/3648)
* **dropdown:** avoid adding vertical scrollbars ([#3644](https://github.com/ng-bootstrap/ng-bootstrap/issues/3644)) ([05efeb7](https://github.com/ng-bootstrap/ng-bootstrap/commit/05efeb77077bb7faf6983fb03563272a5ce94b9d))



# [6.0.0](https://github.com/ng-bootstrap/ng-bootstrap/compare/6.0.0-rc.0...6.0.0) (2020-02-21)

This major release officially adds Angular 9 and ivy support. 

Due to changes in the framework, you might need to add the `@angular/localize` dependency. Check the [i18n documentation](https://angular.io/guide/i18n#setting-up-localization-with-the-angular-cli) and [this issue](https://github.com/ng-bootstrap/ng-bootstrap/issues/3537#issuecomment-586472803) for more info.

We're also deprecating `NgbTabset`, so it is not supported anymore. Please use [`NgbNav`](https://ng-bootstrap.github.io/#/components/nav/overview) instead as a more flexible alternative.


### Bug Fixes

* **datepicker:** change min/max date error message ([#3607](https://github.com/ng-bootstrap/ng-bootstrap/issues/3607)) ([501a1a0](https://github.com/ng-bootstrap/ng-bootstrap/commit/501a1a0106df28cbb185480b0522e597e0faf1b2)), closes [#2922](https://github.com/ng-bootstrap/ng-bootstrap/issues/2922)
* **popover:** make tooltip and popover work on the same element ([#3606](https://github.com/ng-bootstrap/ng-bootstrap/issues/3606)) ([0841abe](https://github.com/ng-bootstrap/ng-bootstrap/commit/0841abe24bd179bc53e0f6f48370f2dc02229e64)), closes [#3602](https://github.com/ng-bootstrap/ng-bootstrap/issues/3602)


### BREAKING CHANGES

* ng-bootstrap now has the dependency on `@angular/localize`
* **datepicker:** 'ngbDate' validator error messages were changed to be more explicit and aligned with Angular validators.

For example, for the following use-case 
```html
<ngb-datepicker [ngModel]="{year: 2019, month: 12, day: 31}" 
                [minDate]="{year: 2020, month: 1, day: 1}">                
</ngb-datepicker>
```
form control errors are:

Before

```
ngbDate: {
  requiredBefore: { year: 2020, month: 1, day: 1 }
}
```

After

```
ngbDate: {
  minDate: {
    minDate: { year: 2020, month: 1, day: 1 },
    actual: { year: 2019, month: 12, day: 31 }
}
```

Same change is applied for `requiredAfter` and `maxDate`.



# [6.0.0-rc.0](https://github.com/ng-bootstrap/ng-bootstrap/compare/5.3.0...6.0.0-rc.0) (2020-02-14)

This is a technical release aligning all dependencies, configurations and deliveries to Angular 9.
There are no changes in the library code.


# [5.3.0](https://github.com/ng-bootstrap/ng-bootstrap/compare/5.2.3...5.3.0) (2020-02-14)


### Bug Fixes

* **tooltip:** prevent autoclose with default triggers on iPadOS 13 ([#3593](https://github.com/ng-bootstrap/ng-bootstrap/issues/3593)) ([b8874ad](https://github.com/ng-bootstrap/ng-bootstrap/commit/b8874ad)), closes [#3591](https://github.com/ng-bootstrap/ng-bootstrap/issues/3591)


### Features

* **accordion:** add custom css class at the card level ([#3563](https://github.com/ng-bootstrap/ng-bootstrap/issues/3563)) ([8ea21bf](https://github.com/ng-bootstrap/ng-bootstrap/commit/8ea21bf)), closes [#2262](https://github.com/ng-bootstrap/ng-bootstrap/issues/2262)
* **datepicker:** allow customizing month layout ([3b82948](https://github.com/ng-bootstrap/ng-bootstrap/commit/3b82948))
* **modal:** pass an `HTMLElement` to modal container option ([#3585](https://github.com/ng-bootstrap/ng-bootstrap/issues/3585)) ([3c65b21](https://github.com/ng-bootstrap/ng-bootstrap/commit/3c65b21)), closes [#3584](https://github.com/ng-bootstrap/ng-bootstrap/issues/3584)



## [5.2.3](https://github.com/ng-bootstrap/ng-bootstrap/compare/5.2.2...5.2.3) (2020-02-13)


### Bug Fixes

* **rating:** ignore clicks on disabled rating ([#3574](https://github.com/ng-bootstrap/ng-bootstrap/issues/3574)) ([900a8db](https://github.com/ng-bootstrap/ng-bootstrap/commit/900a8db)), closes [#3465](https://github.com/ng-bootstrap/ng-bootstrap/issues/3465)
* **tooltip:** prevent autoclose with default triggers on Android ([#3587](https://github.com/ng-bootstrap/ng-bootstrap/issues/3587)) ([04d8552](https://github.com/ng-bootstrap/ng-bootstrap/commit/04d8552)), closes [#3582](https://github.com/ng-bootstrap/ng-bootstrap/issues/3582)



## [5.2.2](https://github.com/ng-bootstrap/ng-bootstrap/compare/5.2.1...5.2.2) (2020-02-10)


### Bug Fixes

* **datepicker:** handle clicks correctly inside the <label> ([#3562](https://github.com/ng-bootstrap/ng-bootstrap/issues/3562)) ([0f626e1](https://github.com/ng-bootstrap/ng-bootstrap/commit/0f626e1)), closes [#3557](https://github.com/ng-bootstrap/ng-bootstrap/issues/3557)
* **datepicker:** handle multiple input changes once ([#3565](https://github.com/ng-bootstrap/ng-bootstrap/issues/3565)) ([4ac0352](https://github.com/ng-bootstrap/ng-bootstrap/commit/4ac0352)), closes [#3545](https://github.com/ng-bootstrap/ng-bootstrap/issues/3545)
* **datepicker:** refine focus state checks ([#3549](https://github.com/ng-bootstrap/ng-bootstrap/issues/3549)) ([035d399](https://github.com/ng-bootstrap/ng-bootstrap/commit/035d399)), closes [#3494](https://github.com/ng-bootstrap/ng-bootstrap/issues/3494)
* **datepicker:** update minDate and maxDate dynamically ([#3507](https://github.com/ng-bootstrap/ng-bootstrap/issues/3507)) ([4f61496](https://github.com/ng-bootstrap/ng-bootstrap/commit/4f61496)), closes [#3506](https://github.com/ng-bootstrap/ng-bootstrap/issues/3506)
* **dropdown:** execute user (click) handlers on Enter and Space ([#3573](https://github.com/ng-bootstrap/ng-bootstrap/issues/3573)) ([f845951](https://github.com/ng-bootstrap/ng-bootstrap/commit/f845951)), closes [#3570](https://github.com/ng-bootstrap/ng-bootstrap/issues/3570)
* **nav:** allow having falsy values like 0 and 'false' for nav ids ([#3571](https://github.com/ng-bootstrap/ng-bootstrap/issues/3571)) ([686fbd5](https://github.com/ng-bootstrap/ng-bootstrap/commit/686fbd5)), closes [#3569](https://github.com/ng-bootstrap/ng-bootstrap/issues/3569)
* **nav:** don't emit (navChange) when activeId is not set initially ([#3567](https://github.com/ng-bootstrap/ng-bootstrap/issues/3567)) ([dd1c35d](https://github.com/ng-bootstrap/ng-bootstrap/commit/dd1c35d)), closes [#3564](https://github.com/ng-bootstrap/ng-bootstrap/issues/3564)



## [5.2.1](https://github.com/ng-bootstrap/ng-bootstrap/compare/5.2.0...5.2.1) (2020-01-22)


### Bug Fixes

* **nav:** allow importing 'NgbNavModule' independently ([#3554](https://github.com/ng-bootstrap/ng-bootstrap/issues/3554)) ([f808af3](https://github.com/ng-bootstrap/ng-bootstrap/commit/f808af3)), closes [#3553](https://github.com/ng-bootstrap/ng-bootstrap/issues/3553)



# [5.2.0](https://github.com/ng-bootstrap/ng-bootstrap/compare/5.1.5...5.2.0) (2020-01-21)

This release introduces a set of [`NgbNav` directives](https://ng-bootstrap.github.io/#/components/nav) to replace the `NgbTabset` component

### Bug Fixes

* **datepicker:** don't update public state on each CD ([e284110](https://github.com/ng-bootstrap/ng-bootstrap/commit/e284110))


### Features

* add `ViewEncapsulation.None` to the rest of components ([#3535](https://github.com/ng-bootstrap/ng-bootstrap/issues/3535)) ([5a5a8a7](https://github.com/ng-bootstrap/ng-bootstrap/commit/5a5a8a7)), closes [#3479](https://github.com/ng-bootstrap/ng-bootstrap/issues/3479)
* **accordion:** use readonly arrays for inputs ([#3426](https://github.com/ng-bootstrap/ng-bootstrap/issues/3426)) ([16249f4](https://github.com/ng-bootstrap/ng-bootstrap/commit/16249f4))
* **datepicker:** add 'currentYear' to the day template ([#3540](https://github.com/ng-bootstrap/ng-bootstrap/issues/3540)) ([bbd8b51](https://github.com/ng-bootstrap/ng-bootstrap/commit/bbd8b51)), closes [#2944](https://github.com/ng-bootstrap/ng-bootstrap/issues/2944)
* **datepicker:** add 'restoreFocus' input ([#3539](https://github.com/ng-bootstrap/ng-bootstrap/issues/3539)) ([31402a3](https://github.com/ng-bootstrap/ng-bootstrap/commit/31402a3)), closes [#3483](https://github.com/ng-bootstrap/ng-bootstrap/issues/3483)
* **datepicker:** export NgbDatepickerKeyboardService ([e5b3222](https://github.com/ng-bootstrap/ng-bootstrap/commit/e5b3222))
* **datepicker:** input datepicker global config ([a9ce83e](https://github.com/ng-bootstrap/ng-bootstrap/commit/a9ce83e)), closes [#3273](https://github.com/ng-bootstrap/ng-bootstrap/issues/3273)
* **datepicker:** introduce 'dateSelect' event to replace 'select' ([943295a](https://github.com/ng-bootstrap/ng-bootstrap/commit/943295a)), closes [#3444](https://github.com/ng-bootstrap/ng-bootstrap/issues/3444)
* **datepicker:** use readonly arrays for inputs ([#3424](https://github.com/ng-bootstrap/ng-bootstrap/issues/3424)) ([2c3f96a](https://github.com/ng-bootstrap/ng-bootstrap/commit/2c3f96a))
* **modal:** allow any string as modal size option ([24ea370](https://github.com/ng-bootstrap/ng-bootstrap/commit/24ea370)), closes [#3013](https://github.com/ng-bootstrap/ng-bootstrap/issues/3013)
* **nav:** initial nav implementation ([783d983](https://github.com/ng-bootstrap/ng-bootstrap/commit/783d983))
* **pagination:** add 'aria-current' attribute ([#3470](https://github.com/ng-bootstrap/ng-bootstrap/issues/3470)) ([c502341](https://github.com/ng-bootstrap/ng-bootstrap/commit/c502341))
* **pagination:** add 'aria-disabled' attribute ([#3471](https://github.com/ng-bootstrap/ng-bootstrap/issues/3471)) ([c0a2bda](https://github.com/ng-bootstrap/ng-bootstrap/commit/c0a2bda)), closes [#3470](https://github.com/ng-bootstrap/ng-bootstrap/issues/3470)
* **progressbar:** allow to specify progressbar text type ([#3394](https://github.com/ng-bootstrap/ng-bootstrap/issues/3394)) ([1057dbd](https://github.com/ng-bootstrap/ng-bootstrap/commit/1057dbd))
* **timepicker:** input filter to accept only numbers ([#3247](https://github.com/ng-bootstrap/ng-bootstrap/issues/3247)) ([25df51a](https://github.com/ng-bootstrap/ng-bootstrap/commit/25df51a)), closes [#2334](https://github.com/ng-bootstrap/ng-bootstrap/issues/2334)
* **typeahead:** use readonly arrays for inputs ([#3423](https://github.com/ng-bootstrap/ng-bootstrap/issues/3423)) ([36ce6fb](https://github.com/ng-bootstrap/ng-bootstrap/commit/36ce6fb))



## [5.1.5](https://github.com/ng-bootstrap/ng-bootstrap/compare/5.1.4...5.1.5) (2020-01-07)


### Bug Fixes

* **datepicker:** correct z-index of month/year selects ([#3473](https://github.com/ng-bootstrap/ng-bootstrap/issues/3473)) ([2de1be3](https://github.com/ng-bootstrap/ng-bootstrap/commit/2de1be3))
* **datepicker:** fix disappearing month/year select arrow icon in IE and Edge ([3b9307a](https://github.com/ng-bootstrap/ng-bootstrap/commit/3b9307a)), closes [#3526](https://github.com/ng-bootstrap/ng-bootstrap/issues/3526)
* **modal:** fix scrollbar compensation in some scaling situations ([#3498](https://github.com/ng-bootstrap/ng-bootstrap/issues/3498)) ([b235dbb](https://github.com/ng-bootstrap/ng-bootstrap/commit/b235dbb)), closes [#3448](https://github.com/ng-bootstrap/ng-bootstrap/issues/3448)
* **modal:** prevent modal from closing when using scrollbar ([#3531](https://github.com/ng-bootstrap/ng-bootstrap/issues/3531)) ([fb8bb11](https://github.com/ng-bootstrap/ng-bootstrap/commit/fb8bb11)), closes [#3518](https://github.com/ng-bootstrap/ng-bootstrap/issues/3518)
* **modal:** remove key/mouse handlers only when modal is destroyed ([#3532](https://github.com/ng-bootstrap/ng-bootstrap/issues/3532)) ([01d508a](https://github.com/ng-bootstrap/ng-bootstrap/commit/01d508a)), closes [#3515](https://github.com/ng-bootstrap/ng-bootstrap/issues/3515)
* **pagination:** don't focus links of disabled pagination ([#3468](https://github.com/ng-bootstrap/ng-bootstrap/issues/3468)) ([38da258](https://github.com/ng-bootstrap/ng-bootstrap/commit/38da258))


### Reverts

* fix(modal): add typing for `modalRef.componentInstance` ([#2815](https://github.com/ng-bootstrap/ng-bootstrap/issues/2815), [#3529](https://github.com/ng-bootstrap/ng-bootstrap/issues/3529)) ([3ba317c](https://github.com/ng-bootstrap/ng-bootstrap/commit/3ba317c)), closes [#3464](https://github.com/ng-bootstrap/ng-bootstrap/issues/3464)



## [5.1.4](https://github.com/ng-bootstrap/ng-bootstrap/compare/5.1.2...5.1.4) (2019-11-08)


### Bug Fixes

* **autoclose:** fix popup components auto closing in Safari 13 ([#3454](https://github.com/ng-bootstrap/ng-bootstrap/issues/3454)) ([c08e3b4](https://github.com/ng-bootstrap/ng-bootstrap/commit/c08e3b4)), closes [#3446](https://github.com/ng-bootstrap/ng-bootstrap/issues/3446) [#3437](https://github.com/ng-bootstrap/ng-bootstrap/issues/3437) [#3412](https://github.com/ng-bootstrap/ng-bootstrap/issues/3412) [#3192](https://github.com/ng-bootstrap/ng-bootstrap/issues/3192) [#3145](https://github.com/ng-bootstrap/ng-bootstrap/issues/3145) [#3024](https://github.com/ng-bootstrap/ng-bootstrap/issues/3024)
* **focustrap:** run focus trap event handlers outside Angular ([#3435](https://github.com/ng-bootstrap/ng-bootstrap/issues/3435)) ([d1752ac](https://github.com/ng-bootstrap/ng-bootstrap/commit/d1752ac))
* **modal:** don't close modal on ESC if file dialog is open ([#3455](https://github.com/ng-bootstrap/ng-bootstrap/issues/3455)) ([5977dcb](https://github.com/ng-bootstrap/ng-bootstrap/commit/5977dcb)), closes [#3439](https://github.com/ng-bootstrap/ng-bootstrap/issues/3439)
* **modal:** ignore accidental backdrop clicks ([cbf2b3c](https://github.com/ng-bootstrap/ng-bootstrap/commit/cbf2b3c)), closes [#3384](https://github.com/ng-bootstrap/ng-bootstrap/issues/3384) [#1950](https://github.com/ng-bootstrap/ng-bootstrap/issues/1950)
* **modal:** trap focus correctly with stacked modals ([#3422](https://github.com/ng-bootstrap/ng-bootstrap/issues/3422)) ([5610abe](https://github.com/ng-bootstrap/ng-bootstrap/commit/5610abe)), closes [#3392](https://github.com/ng-bootstrap/ng-bootstrap/issues/3392)
* **progressbar:** display progressbar correctly for invalid 'max' values ([#3400](https://github.com/ng-bootstrap/ng-bootstrap/issues/3400)) ([9a92667](https://github.com/ng-bootstrap/ng-bootstrap/commit/9a92667)), closes [#3386](https://github.com/ng-bootstrap/ng-bootstrap/issues/3386) [#3390](https://github.com/ng-bootstrap/ng-bootstrap/issues/3390)



## [5.1.3](https://github.com/ng-bootstrap/ng-bootstrap/compare/5.1.2...5.1.3) (2019-11-08)

Please use v5.1.4 instead



## [5.1.2](https://github.com/ng-bootstrap/ng-bootstrap/compare/5.1.1...5.1.2) (2019-10-25)


### Bug Fixes

* **checkbox:** remove autocomplete attribute ([#3377](https://github.com/ng-bootstrap/ng-bootstrap/issues/3377)) ([39fea1f](https://github.com/ng-bootstrap/ng-bootstrap/commit/39fea1f))
* **datepicker:** add role="row" in weekday header for a11y ([#3361](https://github.com/ng-bootstrap/ng-bootstrap/issues/3361)) ([b16a0ca](https://github.com/ng-bootstrap/ng-bootstrap/commit/b16a0ca))
* **datepicker:** add role="columnheader" in weekday header for a11y ([#3343](https://github.com/ng-bootstrap/ng-bootstrap/issues/3343)) ([8260198](https://github.com/ng-bootstrap/ng-bootstrap/commit/8260198))
* **datepicker:** keep day/month when adding/removing month/year in ngb-calendar ([#3355](https://github.com/ng-bootstrap/ng-bootstrap/issues/3355)) ([22a1cb6](https://github.com/ng-bootstrap/ng-bootstrap/commit/22a1cb6)), closes [#3398](https://github.com/ng-bootstrap/ng-bootstrap/issues/3398)
* **datepicker:** performance issues when huge min/max dates ([#3357](https://github.com/ng-bootstrap/ng-bootstrap/issues/3357)) ([22b4ca8](https://github.com/ng-bootstrap/ng-bootstrap/commit/22b4ca8)), closes [#3338](https://github.com/ng-bootstrap/ng-bootstrap/issues/3338)
* **datepicker:** place active day above its siblings ([#3314](https://github.com/ng-bootstrap/ng-bootstrap/issues/3314)) ([eb26beb](https://github.com/ng-bootstrap/ng-bootstrap/commit/eb26beb))
* **datepicker:** remove hardcoded bg-light ([#3351](https://github.com/ng-bootstrap/ng-bootstrap/issues/3351)) ([c7bc4d7](https://github.com/ng-bootstrap/ng-bootstrap/commit/c7bc4d7))
* **datepicker:** restore focus correctly after closing popup ([#3371](https://github.com/ng-bootstrap/ng-bootstrap/issues/3371)) ([d8812b9](https://github.com/ng-bootstrap/ng-bootstrap/commit/d8812b9)), closes [#3317](https://github.com/ng-bootstrap/ng-bootstrap/issues/3317)
* **datepicker:** retain focus on prev/next month navigation links ([#3381](https://github.com/ng-bootstrap/ng-bootstrap/issues/3381)) ([7a584ad](https://github.com/ng-bootstrap/ng-bootstrap/commit/7a584ad)), closes [#2780](https://github.com/ng-bootstrap/ng-bootstrap/issues/2780)
* **dropdown:** export `NgbNavbar` correctly ([#3432](https://github.com/ng-bootstrap/ng-bootstrap/issues/3432)) ([693bcb6](https://github.com/ng-bootstrap/ng-bootstrap/commit/693bcb6))
* **modal:** add missing fields to `NgbModalConfig` ([#3406](https://github.com/ng-bootstrap/ng-bootstrap/issues/3406)) ([7324083](https://github.com/ng-bootstrap/ng-bootstrap/commit/7324083))
* **modal:** add typing for `modalRef.componentInstance` ([#2815](https://github.com/ng-bootstrap/ng-bootstrap/issues/2815)) ([f450a7c](https://github.com/ng-bootstrap/ng-bootstrap/commit/f450a7c)), closes [#2479](https://github.com/ng-bootstrap/ng-bootstrap/issues/2479)
* **modal:** do no crash when accessing `componentInstance` ([#3367](https://github.com/ng-bootstrap/ng-bootstrap/issues/3367)) ([c60a012](https://github.com/ng-bootstrap/ng-bootstrap/commit/c60a012)), closes [#3366](https://github.com/ng-bootstrap/ng-bootstrap/issues/3366)
* **modal:** don't close popup on ESC when closing nested components ([#3384](https://github.com/ng-bootstrap/ng-bootstrap/issues/3384)) ([75f0966](https://github.com/ng-bootstrap/ng-bootstrap/commit/75f0966)), closes [#3358](https://github.com/ng-bootstrap/ng-bootstrap/issues/3358)
* **pagination:** don't hide single page number with ellipsis ([#3419](https://github.com/ng-bootstrap/ng-bootstrap/issues/3419)) ([410f6ea](https://github.com/ng-bootstrap/ng-bootstrap/commit/410f6ea)), closes [#1235](https://github.com/ng-bootstrap/ng-bootstrap/issues/1235)
* **popover:** propagate 'popoverClass' change correctly ([#3420](https://github.com/ng-bootstrap/ng-bootstrap/issues/3420)) ([51bfc72](https://github.com/ng-bootstrap/ng-bootstrap/commit/51bfc72))
* **tooltip:** propagate 'tooltipClass' change correctly ([48bdf62](https://github.com/ng-bootstrap/ng-bootstrap/commit/48bdf62)), closes [#3335](https://github.com/ng-bootstrap/ng-bootstrap/issues/3335)
* **typeahead:** clear the model on input change when editable=false ([#3267](https://github.com/ng-bootstrap/ng-bootstrap/issues/3267)) ([176be06](https://github.com/ng-bootstrap/ng-bootstrap/commit/176be06)), closes [#3262](https://github.com/ng-bootstrap/ng-bootstrap/issues/3262)



## [4.2.2](https://github.com/ng-bootstrap/ng-bootstrap/compare/4.2.1...4.2.2) (2019-09-03)


### Bug Fixes

* **tabset:** remove aria-expanded and use aria-selected instead ([d67bea2](https://github.com/ng-bootstrap/ng-bootstrap/commit/d67bea2)), closes [#3292](https://github.com/ng-bootstrap/ng-bootstrap/issues/3292)


## [5.1.1](https://github.com/ng-bootstrap/ng-bootstrap/compare/5.1.0...5.1.1) (2019-09-03)

This is an _internal_ release with no user-facing updates/fixes.

# [5.1.0](https://github.com/ng-bootstrap/ng-bootstrap/compare/5.0.0...5.1.0) (2019-07-17)


### Features

* **carousel:** stay paused after calling pause() until cycle() is called ([#3225](https://github.com/ng-bootstrap/ng-bootstrap/issues/3225)) ([2602154](https://github.com/ng-bootstrap/ng-bootstrap/commit/2602154)), closes [#3188](https://github.com/ng-bootstrap/ng-bootstrap/issues/3188)

  In order for the user to also have more control, we also introduce 2 new properties on [NgbSlideEvent](https://ng-bootstrap.github.io/#/components/carousel/api#NgbSlideEvent):

  + The "_source_" property allowing to know what triggered the event: "_timer_", "_arrowLeft_", "_arrowRight_" or "_indicator_".
  + The "_paused_" boolean status.

### Bug Fixes

* **datepicker:** ease the styling of datepicker ([#3248](https://github.com/ng-bootstrap/ng-bootstrap/issues/3248)) ([dd86266](https://github.com/ng-bootstrap/ng-bootstrap/commit/dd86266)), closes [#3244](https://github.com/ng-bootstrap/ng-bootstrap/issues/3244)
* **datepicker:** NgbCalendarIslamicUmalqura.fromGregorian with date in the afternoon ([#3256](https://github.com/ng-bootstrap/ng-bootstrap/issues/3256)) ([cc29290](https://github.com/ng-bootstrap/ng-bootstrap/commit/cc29290)), closes [#3237](https://github.com/ng-bootstrap/ng-bootstrap/issues/3237)
* **demo:** direct link to specific carousel sample not working ([#3272](https://github.com/ng-bootstrap/ng-bootstrap/issues/3272)) ([a6d73d6](https://github.com/ng-bootstrap/ng-bootstrap/commit/a6d73d6))
* **dropdown:** allow template directive on the menu ([#3263](https://github.com/ng-bootstrap/ng-bootstrap/issues/3263)) ([8f73899](https://github.com/ng-bootstrap/ng-bootstrap/commit/8f73899))
* **dropdown:** remove x-placement when display is static ([#3270](https://github.com/ng-bootstrap/ng-bootstrap/issues/3270)) ([c6ad5b7](https://github.com/ng-bootstrap/ng-bootstrap/commit/c6ad5b7))
* **modal:** cmpt based content was not scrollable ([#3286](https://github.com/ng-bootstrap/ng-bootstrap/issues/3286)) ([ffbb4fd](https://github.com/ng-bootstrap/ng-bootstrap/commit/ffbb4fd)), closes [#3281](https://github.com/ng-bootstrap/ng-bootstrap/issues/3281)
* **popover:** apply arrow styles to direct descendant ([#3288](https://github.com/ng-bootstrap/ng-bootstrap/issues/3288)) ([0b3ad65](https://github.com/ng-bootstrap/ng-bootstrap/commit/0b3ad65))
* **stackblitz:** fixed version for prismjs ([#3282](https://github.com/ng-bootstrap/ng-bootstrap/issues/3282)) ([db72c7a](https://github.com/ng-bootstrap/ng-bootstrap/commit/db72c7a))
* **tabset:** remove aria-expanded and use aria-selected instead ([#3292](https://github.com/ng-bootstrap/ng-bootstrap/issues/3292)) ([5b6cc69](https://github.com/ng-bootstrap/ng-bootstrap/commit/5b6cc69))
* **toast:** proper handling of `autohide` toggling ([#3283](https://github.com/ng-bootstrap/ng-bootstrap/issues/3283)) ([ffcdad4](https://github.com/ng-bootstrap/ng-bootstrap/commit/ffcdad4)), closes [#3280](https://github.com/ng-bootstrap/ng-bootstrap/issues/3280)

# [5.0.0](https://github.com/ng-bootstrap/ng-bootstrap/compare/5.0.0-rc.1...5.0.0) (2019-07-09)

This major release is compatible with Angular ^8.0.0. We would like to emphasis that **it is not yet** fully compatible with Ivy renderer.

### BREAKING CHANGES

* for ng-bootstrap `5.0.0` minimal required version
of Angular is `8.0.0`, and minimal required version of Bootstrap is `4.3.1`.

# [5.0.0-rc.1](https://github.com/ng-bootstrap/ng-bootstrap/compare/5.0.0-rc.0...5.0.0-rc.1) (2019-06-28)

This release requires Angular version ^8.0.0, Bootstrap ^4.3.1 and is **not yet** Ivy compatible.

### Bug Fixes

* **toast:** export NgbToastModule publicly ([#3259](https://github.com/ng-bootstrap/ng-bootstrap/issues/3259)) ([0d69682](https://github.com/ng-bootstrap/ng-bootstrap/commit/0d69682)), closes [#3258](https://github.com/ng-bootstrap/ng-bootstrap/issues/3258)


### Features

* **timepicker:** use Angular locale data for AM and PM ([#2830](https://github.com/ng-bootstrap/ng-bootstrap/issues/2830)) ([3ce8a4c](https://github.com/ng-bootstrap/ng-bootstrap/commit/3ce8a4c))



# [5.0.0-rc.0](https://github.com/ng-bootstrap/ng-bootstrap/compare/4.2.1...5.0.0-rc.0) (2019-06-24)

This release requires Angular version `^8.0.0`, Bootstrap `^4.3.1` and is **not yet** Ivy compatible.

### Bug Fixes

* **all widgets:** specify 'static' for ViewChild and ContentChild queries ([b3010ab](https://github.com/ng-bootstrap/ng-bootstrap/commit/b3010ab))
* **demo:** missing `Object.values()` polyfill for IE. ([#3249](https://github.com/ng-bootstrap/ng-bootstrap/issues/3249)) ([0eff381](https://github.com/ng-bootstrap/ng-bootstrap/commit/0eff381))
* **toast:** adds `static: true` for Angular 8 query compatibility ([#3250](https://github.com/ng-bootstrap/ng-bootstrap/issues/3250)) ([e682ee3](https://github.com/ng-bootstrap/ng-bootstrap/commit/e682ee3))


### Code Refactoring

* removes `.forRoot()` from all modules ([#3231](https://github.com/ng-bootstrap/ng-bootstrap/issues/3231)) ([83f79cf](https://github.com/ng-bootstrap/ng-bootstrap/commit/83f79cf)), closes [#3015](https://github.com/ng-bootstrap/ng-bootstrap/issues/3015)

### Features

* **modal:** add scrollable option ([#2909](https://github.com/ng-bootstrap/ng-bootstrap/issues/2909)) ([74fb795](https://github.com/ng-bootstrap/ng-bootstrap/commit/74fb795))
* **modal:** Add xl size for modal ([#3239](https://github.com/ng-bootstrap/ng-bootstrap/issues/3239)) ([998f358](https://github.com/ng-bootstrap/ng-bootstrap/commit/998f358)), closes [#2943](https://github.com/ng-bootstrap/ng-bootstrap/issues/2943)
* **toast:** Toast implementation ([#3103](https://github.com/ng-bootstrap/ng-bootstrap/issues/3103)) ([bd1e9fb](https://github.com/ng-bootstrap/ng-bootstrap/commit/bd1e9fb))


### BREAKING CHANGES

* for ng-bootstrap `5.0.0-rc.0` minimal required version
of Angular is `8.0.0`, and minimal required version of Bootstrap is `4.3.1`.
* Importing any ng-bootstrap module via `.forRoot()` has now been completely removed.
The only supported way is the one documented in the [getting started](https://ng-bootstrap.github.io/#/getting-started#installation) page.

```typescript
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  ...
  imports: [NgbModule, ...],
  ...
})
export class YourAppModule {
}
```



## [4.2.1](https://github.com/ng-bootstrap/ng-bootstrap/compare/4.2.0...4.2.1) (2019-06-03)


### Reverts

* **datepicker:** expose validators minDate, maxDate, invalidDate ([#3126](https://github.com/ng-bootstrap/ng-bootstrap/issues/3126)) ([509bba3](https://github.com/ng-bootstrap/ng-bootstrap/commit/509bba3)), closes [#3215](https://github.com/ng-bootstrap/ng-bootstrap/issues/3215)



# [4.2.0](https://github.com/ng-bootstrap/ng-bootstrap/compare/4.1.3...4.2.0) (2019-05-29)


### Bug Fixes

* **positioning:** put the popup in a separate layer ([#3206](https://github.com/ng-bootstrap/ng-bootstrap/issues/3206)) ([2bbaaee](https://github.com/ng-bootstrap/ng-bootstrap/commit/2bbaaee))


### Features

* **datepicker:** add 'closed' event fired after datepicker window was closed ([#3055](https://github.com/ng-bootstrap/ng-bootstrap/issues/3055)) ([e31895e](https://github.com/ng-bootstrap/ng-bootstrap/commit/e31895e))
* **datepicker:** add new 'positionTarget' input ([#3119](https://github.com/ng-bootstrap/ng-bootstrap/issues/3119)) ([42cef4f](https://github.com/ng-bootstrap/ng-bootstrap/commit/42cef4f))
* **datepicker:** expose validators minDate, maxDate, invalidDate ([#3126](https://github.com/ng-bootstrap/ng-bootstrap/issues/3126)) ([509bba3](https://github.com/ng-bootstrap/ng-bootstrap/commit/509bba3))
* **dropdown:** new 'display' input and navbar management ([#3098](https://github.com/ng-bootstrap/ng-bootstrap/issues/3098)) ([a07dbff](https://github.com/ng-bootstrap/ng-bootstrap/commit/a07dbff)), closes [#3030](https://github.com/ng-bootstrap/ng-bootstrap/issues/3030)
* **highlight:** highlight array of terms instead of just one term ([#3154](https://github.com/ng-bootstrap/ng-bootstrap/issues/3154)) ([ec8a129](https://github.com/ng-bootstrap/ng-bootstrap/commit/ec8a129)), closes [#2698](https://github.com/ng-bootstrap/ng-bootstrap/issues/2698)



## [4.1.3](https://github.com/ng-bootstrap/ng-bootstrap/compare/4.1.2...4.1.3) (2019-05-13)


### Bug Fixes

* **alert:** project content before the closing button ([#3176](https://github.com/ng-bootstrap/ng-bootstrap/issues/3176)) ([3e1dba9](https://github.com/ng-bootstrap/ng-bootstrap/commit/3e1dba9)), closes [#3171](https://github.com/ng-bootstrap/ng-bootstrap/issues/3171)
* **datepicker:** 'startDate' change was preventing arrow navigation ([#3179](https://github.com/ng-bootstrap/ng-bootstrap/issues/3179)) ([8bb6ddd](https://github.com/ng-bootstrap/ng-bootstrap/commit/8bb6ddd)), closes [#3178](https://github.com/ng-bootstrap/ng-bootstrap/issues/3178)
* **datepicker:** don't change month content if navigation is prevented ([#3173](https://github.com/ng-bootstrap/ng-bootstrap/issues/3173)) ([c41da80](https://github.com/ng-bootstrap/ng-bootstrap/commit/c41da80))
* **dropdown:** close dropdown menu on Enter / Space ([#3180](https://github.com/ng-bootstrap/ng-bootstrap/issues/3180)) ([5163d03](https://github.com/ng-bootstrap/ng-bootstrap/commit/5163d03)), closes [#3142](https://github.com/ng-bootstrap/ng-bootstrap/issues/3142)
* **dropdown:** close dropdown only on dropdown elements click ([fa8e45f](https://github.com/ng-bootstrap/ng-bootstrap/commit/fa8e45f)), closes [#3063](https://github.com/ng-bootstrap/ng-bootstrap/issues/3063) [#3143](https://github.com/ng-bootstrap/ng-bootstrap/issues/3143)
* **timepicker:** fix tab navigation & handling keyboard arrows ([#2053](https://github.com/ng-bootstrap/ng-bootstrap/issues/2053)) ([7efa35c](https://github.com/ng-bootstrap/ng-bootstrap/commit/7efa35c)), closes [#1836](https://github.com/ng-bootstrap/ng-bootstrap/issues/1836)



## [4.1.2](https://github.com/ng-bootstrap/ng-bootstrap/compare/4.1.1...4.1.2) (2019-04-30)


### Bug Fixes

* **datepicker:** access view child from ngAfterViewInit ([#3152](https://github.com/ng-bootstrap/ng-bootstrap/issues/3152)) ([0e54eef](https://github.com/ng-bootstrap/ng-bootstrap/commit/0e54eef)), closes [#3150](https://github.com/ng-bootstrap/ng-bootstrap/issues/3150)
* **datepicker:** export NgbDatepickerNavigateEvent correctly ([#3161](https://github.com/ng-bootstrap/ng-bootstrap/issues/3161)) ([e287a74](https://github.com/ng-bootstrap/ng-bootstrap/commit/e287a74)), closes [#3160](https://github.com/ng-bootstrap/ng-bootstrap/issues/3160)
* **datepicker:** z-index set when appended to body ([00ee594](https://github.com/ng-bootstrap/ng-bootstrap/commit/00ee594)), closes [#3133](https://github.com/ng-bootstrap/ng-bootstrap/issues/3133)
* **dropdown:** don't fail on keypress if there are no ngbDropdownItems ([b4b0222](https://github.com/ng-bootstrap/ng-bootstrap/commit/b4b0222)), closes [#3117](https://github.com/ng-bootstrap/ng-bootstrap/issues/3117)
* **dropdown:** z-index set when appended to body ([#3157](https://github.com/ng-bootstrap/ng-bootstrap/issues/3157)) ([ec73fc2](https://github.com/ng-bootstrap/ng-bootstrap/commit/ec73fc2))
* **popover:** open popover correctly from lifecycle hooks ([b3f8010](https://github.com/ng-bootstrap/ng-bootstrap/commit/b3f8010))
* **tooltip:** open tooltip correctly from lifecycle hooks ([80beb3a](https://github.com/ng-bootstrap/ng-bootstrap/commit/80beb3a)), closes [#3130](https://github.com/ng-bootstrap/ng-bootstrap/issues/3130)



## [4.1.1](https://github.com/ng-bootstrap/ng-bootstrap/compare/4.1.0...4.1.1) (2019-04-01)


### Bug Fixes

* **autoclose:** take into account inside 'touch' events on iOS ([#3089](https://github.com/ng-bootstrap/ng-bootstrap/issues/3089)) ([9e13e7f](https://github.com/ng-bootstrap/ng-bootstrap/commit/9e13e7f)), closes [#3079](https://github.com/ng-bootstrap/ng-bootstrap/issues/3079)
* **buttons:** set radio buttons role to 'radiogroup' ([#3085](https://github.com/ng-bootstrap/ng-bootstrap/issues/3085)) ([21df9a6](https://github.com/ng-bootstrap/ng-bootstrap/commit/21df9a6)), closes [#3084](https://github.com/ng-bootstrap/ng-bootstrap/issues/3084)
* **datepicker:** export Gregorian calendar ([#3064](https://github.com/ng-bootstrap/ng-bootstrap/issues/3064)) ([ee1d723](https://github.com/ng-bootstrap/ng-bootstrap/commit/ee1d723)), closes [#3054](https://github.com/ng-bootstrap/ng-bootstrap/issues/3054)
* **dropdown:** apply multiple positions correctly ([#3058](https://github.com/ng-bootstrap/ng-bootstrap/issues/3058)) ([e9f7b9e](https://github.com/ng-bootstrap/ng-bootstrap/commit/e9f7b9e)), closes [#3056](https://github.com/ng-bootstrap/ng-bootstrap/issues/3056)
* **dropdown:** fix keyboard navigation with 'body' container ([fee06f1](https://github.com/ng-bootstrap/ng-bootstrap/commit/fee06f1)), closes [#3066](https://github.com/ng-bootstrap/ng-bootstrap/issues/3066)
* **positioning:** round translated positions ([#3074](https://github.com/ng-bootstrap/ng-bootstrap/issues/3074)) ([5444d13](https://github.com/ng-bootstrap/ng-bootstrap/commit/5444d13))



# [4.1.0](https://github.com/ng-bootstrap/ng-bootstrap/compare/4.0.5...4.1.0) (2019-03-05)


### Features

* **accordion:** allow any content in the accordion card header ([8ea4d81](https://github.com/ng-bootstrap/ng-bootstrap/commit/8ea4d81)), closes [#717](https://github.com/ng-bootstrap/ng-bootstrap/issues/717)
* **datepicker:** make 'navigate' event cancellable ([#3044](https://github.com/ng-bootstrap/ng-bootstrap/issues/3044)) ([dce63ef](https://github.com/ng-bootstrap/ng-bootstrap/commit/dce63ef)), closes [#2913](https://github.com/ng-bootstrap/ng-bootstrap/issues/2913)
* **datepicker:** mark today's date with a custom class ([#2940](https://github.com/ng-bootstrap/ng-bootstrap/issues/2940)) ([6029304](https://github.com/ng-bootstrap/ng-bootstrap/commit/6029304)), closes [#1470](https://github.com/ng-bootstrap/ng-bootstrap/issues/1470)
* **dropdown:** add keyboard navigation support ([#2683](https://github.com/ng-bootstrap/ng-bootstrap/issues/2683)) ([6608487](https://github.com/ng-bootstrap/ng-bootstrap/commit/6608487))
* **dropdown:** allow attaching to body ([#2823](https://github.com/ng-bootstrap/ng-bootstrap/issues/2823)) ([3f65ac8](https://github.com/ng-bootstrap/ng-bootstrap/commit/3f65ac8)), closes [#1012](https://github.com/ng-bootstrap/ng-bootstrap/issues/1012)
* **pagination:** allow customizing pagination links ([a889d09](https://github.com/ng-bootstrap/ng-bootstrap/commit/a889d09)), closes [#899](https://github.com/ng-bootstrap/ng-bootstrap/issues/899)
* **popover:** add openDelay and closeDelay ([4975529](https://github.com/ng-bootstrap/ng-bootstrap/commit/4975529))
* **positioning:** accept placement values with a space separated string ([#3034](https://github.com/ng-bootstrap/ng-bootstrap/issues/3034)) ([28ce374](https://github.com/ng-bootstrap/ng-bootstrap/commit/28ce374))
* **positioning:** position tooltip and popover automatically ([#3019](https://github.com/ng-bootstrap/ng-bootstrap/issues/3019)) ([aeb39aa](https://github.com/ng-bootstrap/ng-bootstrap/commit/aeb39aa))
* **timepicker:** use arrow keys to increment/decrement values ([#2912](https://github.com/ng-bootstrap/ng-bootstrap/issues/2912)) ([6ca79a5](https://github.com/ng-bootstrap/ng-bootstrap/commit/6ca79a5)), closes [#459](https://github.com/ng-bootstrap/ng-bootstrap/issues/459)
* **tooltip:** add openDelay and closeDelay ([1b8abae](https://github.com/ng-bootstrap/ng-bootstrap/commit/1b8abae)), closes [#1052](https://github.com/ng-bootstrap/ng-bootstrap/issues/1052)
* **tooltip:** trigger with "focus" by default to enhance a11y ([#3028](https://github.com/ng-bootstrap/ng-bootstrap/issues/3028)) ([be84733](https://github.com/ng-bootstrap/ng-bootstrap/commit/be84733)), closes [#3022](https://github.com/ng-bootstrap/ng-bootstrap/issues/3022)



<a name="4.0.5"></a>
## [4.0.5](https://github.com/ng-bootstrap/ng-bootstrap/compare/4.0.4...4.0.5) (2019-03-05)


### Bug Fixes

* **positioning:** wrong placement class applies in some cases ([#3042](https://github.com/ng-bootstrap/ng-bootstrap/issues/3042)) ([5fdc3fa](https://github.com/ng-bootstrap/ng-bootstrap/commit/5fdc3fa)), closes [#3040](https://github.com/ng-bootstrap/ng-bootstrap/issues/3040)



<a name="4.0.4"></a>
## [4.0.4](https://github.com/ng-bootstrap/ng-bootstrap/compare/4.0.3...4.0.4) (2019-02-21)


### Bug Fixes

* **autoclose:** fix browser detection for SSR ([#3027](https://github.com/ng-bootstrap/ng-bootstrap/issues/3027)) ([5536368](https://github.com/ng-bootstrap/ng-bootstrap/commit/5536368)), closes [#3025](https://github.com/ng-bootstrap/ng-bootstrap/issues/3025)
* **positioning:** use first placement as the fallback ([#3017](https://github.com/ng-bootstrap/ng-bootstrap/issues/3017)) ([967e949](https://github.com/ng-bootstrap/ng-bootstrap/commit/967e949))



<a name="4.0.3"></a>
## [4.0.3](https://github.com/ng-bootstrap/ng-bootstrap/compare/4.0.2...4.0.3) (2019-02-12)


### Bug Fixes

* add missing exports ([932d7f6](https://github.com/ng-bootstrap/ng-bootstrap/commit/932d7f6)), closes [#2997](https://github.com/ng-bootstrap/ng-bootstrap/issues/2997)
* **autoclose:** fix popup automatic closing on touch on iOS ([#3004](https://github.com/ng-bootstrap/ng-bootstrap/issues/3004)) ([bc489ec](https://github.com/ng-bootstrap/ng-bootstrap/commit/bc489ec)), closes [#2995](https://github.com/ng-bootstrap/ng-bootstrap/issues/2995)
* **buttons:** display correct NgModel value inside OnPush component ([#3000](https://github.com/ng-bootstrap/ng-bootstrap/issues/3000)) ([083fb0f](https://github.com/ng-bootstrap/ng-bootstrap/commit/083fb0f)), closes [#2980](https://github.com/ng-bootstrap/ng-bootstrap/issues/2980)
* **popover:** arrow is correctly centered ([a613fa9](https://github.com/ng-bootstrap/ng-bootstrap/commit/a613fa9)), closes [#3006](https://github.com/ng-bootstrap/ng-bootstrap/issues/3006) [#2089](https://github.com/ng-bootstrap/ng-bootstrap/issues/2089) [#2234](https://github.com/ng-bootstrap/ng-bootstrap/issues/2234)
* **positioning:** use CSS translate for positioning ([64d5716](https://github.com/ng-bootstrap/ng-bootstrap/commit/64d5716)), closes [#2972](https://github.com/ng-bootstrap/ng-bootstrap/issues/2972) [#2470](https://github.com/ng-bootstrap/ng-bootstrap/issues/2470) [#2924](https://github.com/ng-bootstrap/ng-bootstrap/issues/2924) [#2069](https://github.com/ng-bootstrap/ng-bootstrap/issues/2069) [#2914](https://github.com/ng-bootstrap/ng-bootstrap/issues/2914) [#2775](https://github.com/ng-bootstrap/ng-bootstrap/issues/2775) [#2346](https://github.com/ng-bootstrap/ng-bootstrap/issues/2346)
* **timepicker:** display correct NgModel value inside OnPush component ([#3001](https://github.com/ng-bootstrap/ng-bootstrap/issues/3001)) ([0e9b291](https://github.com/ng-bootstrap/ng-bootstrap/commit/0e9b291)), closes [#2992](https://github.com/ng-bootstrap/ng-bootstrap/issues/2992)



<a name="4.0.2"></a>
## [4.0.2](https://github.com/ng-bootstrap/ng-bootstrap/compare/4.0.1...4.0.2) (2019-01-28)


### Bug Fixes

* **accordion:** remove 'h5' from the card header ([88af5c8](https://github.com/ng-bootstrap/ng-bootstrap/commit/88af5c8)), closes [#2915](https://github.com/ng-bootstrap/ng-bootstrap/issues/2915)
* **autoclose:** use mouseup asynchronously instead of click ([0c91b05](https://github.com/ng-bootstrap/ng-bootstrap/commit/0c91b05)), closes [#2711](https://github.com/ng-bootstrap/ng-bootstrap/issues/2711)
* **autoclose:** using each dropdown component inside OnPush component ([1b7614c](https://github.com/ng-bootstrap/ng-bootstrap/commit/1b7614c))
* **datepicker:** fix 'outsideDays' clicks for multiple months ([c37a803](https://github.com/ng-bootstrap/ng-bootstrap/commit/c37a803)), closes [#2879](https://github.com/ng-bootstrap/ng-bootstrap/issues/2879)
* **datepicker:** update model correctly with updateOn: 'blur' ([#2982](https://github.com/ng-bootstrap/ng-bootstrap/issues/2982)) ([eddf188](https://github.com/ng-bootstrap/ng-bootstrap/commit/eddf188)), closes [#2976](https://github.com/ng-bootstrap/ng-bootstrap/issues/2976)
* **modal:** add missing 'aria-modal' and 'aria-hidden' attributes ([eee0afb](https://github.com/ng-bootstrap/ng-bootstrap/commit/eee0afb)), closes [#2575](https://github.com/ng-bootstrap/ng-bootstrap/issues/2575) [#2965](https://github.com/ng-bootstrap/ng-bootstrap/issues/2965)
* **timepicker:** handle setting hour/minute/second step to 'undefined' ([34baece](https://github.com/ng-bootstrap/ng-bootstrap/commit/34baece)), closes [#2851](https://github.com/ng-bootstrap/ng-bootstrap/issues/2851) [#2903](https://github.com/ng-bootstrap/ng-bootstrap/issues/2903)
* **timepicker:** use ViewEncapsulation.None forgotten in 4.0.0 ([1d01940](https://github.com/ng-bootstrap/ng-bootstrap/commit/1d01940)), closes [#2932](https://github.com/ng-bootstrap/ng-bootstrap/issues/2932)



<a name="4.0.1"></a>
## [4.0.1](https://github.com/ng-bootstrap/ng-bootstrap/compare/4.0.0...4.0.1) (2018-12-17)


### Bug Fixes

* **carousel:** do change detection when slides change ([a944d5d](https://github.com/ng-bootstrap/ng-bootstrap/commit/a944d5d)), closes [#2908](https://github.com/ng-bootstrap/ng-bootstrap/issues/2908) [#2900](https://github.com/ng-bootstrap/ng-bootstrap/issues/2900)
* **datepicker:** focus handling performance regression ([1d9a84e](https://github.com/ng-bootstrap/ng-bootstrap/commit/1d9a84e))
* **datepicker:** visual focus on arrows for ie ([#2818](https://github.com/ng-bootstrap/ng-bootstrap/issues/2818)) ([b20355e](https://github.com/ng-bootstrap/ng-bootstrap/commit/b20355e))
* **focustrap:** discarding tabindex='-1' when finding element ([#2888](https://github.com/ng-bootstrap/ng-bootstrap/issues/2888)) ([db7347b](https://github.com/ng-bootstrap/ng-bootstrap/commit/db7347b)), closes [#2884](https://github.com/ng-bootstrap/ng-bootstrap/issues/2884)
* **rating:** don't hijack Tab key navigation ([4b05da1](https://github.com/ng-bootstrap/ng-bootstrap/commit/4b05da1)), closes [#2473](https://github.com/ng-bootstrap/ng-bootstrap/issues/2473) [#2895](https://github.com/ng-bootstrap/ng-bootstrap/issues/2895)
* **typeahead:** input value properly reset when hint/ngModel are used together ([8d5397c](https://github.com/ng-bootstrap/ng-bootstrap/commit/8d5397c)), closes [#2816](https://github.com/ng-bootstrap/ng-bootstrap/issues/2816) [#2850](https://github.com/ng-bootstrap/ng-bootstrap/issues/2850)
* **typeahead:** prevent dropdown to be reopened after an item selection ([e0fe9f5](https://github.com/ng-bootstrap/ng-bootstrap/commit/e0fe9f5)), closes [#2854](https://github.com/ng-bootstrap/ng-bootstrap/issues/2854) [#2869](https://github.com/ng-bootstrap/ng-bootstrap/issues/2869)



<a name="4.0.0"></a>
# [4.0.0](https://github.com/ng-bootstrap/ng-bootstrap/compare/3.3.1...4.0.0) (2018-10-26)

This release is fully compatible with Angular ^7.0.0.
All widgets have view encapsulation set to NONE now and this should help with custom themes / CSS overrides.

### Bug Fixes

* **datepicker:** display correct Hebrew numerals for numbers 11-19 ([5a5c6da](https://github.com/ng-bootstrap/ng-bootstrap/commit/5a5c6da))
* **datepicker:** focus correct day when opening popup ([838693a](https://github.com/ng-bootstrap/ng-bootstrap/commit/838693a)), closes [#2136](https://github.com/ng-bootstrap/ng-bootstrap/issues/2136) [#2796](https://github.com/ng-bootstrap/ng-bootstrap/issues/2796)
* **datepicker:** use longer weekday format in Hebrew ([107ea44](https://github.com/ng-bootstrap/ng-bootstrap/commit/107ea44))


### Features

* **datepicker:** add Gregorian conversion methods to Hebrew calendar ([565cfda](https://github.com/ng-bootstrap/ng-bootstrap/commit/565cfda))
* switch viewEncapsulation to NONE for all widgets ([a25d5d2](https://github.com/ng-bootstrap/ng-bootstrap/commit/a25d5d2)), closes [#1875](https://github.com/ng-bootstrap/ng-bootstrap/issues/1875) [#2564](https://github.com/ng-bootstrap/ng-bootstrap/issues/2564) [#2784](https://github.com/ng-bootstrap/ng-bootstrap/issues/2784)



<a name="3.3.1"></a>
## [3.3.1](https://github.com/ng-bootstrap/ng-bootstrap/compare/3.0.0...3.3.1) (2018-10-19)


### Bug Fixes

* **carousel:** change slides on prev/next/select API calls with OnPush ([99049e7](https://github.com/ng-bootstrap/ng-bootstrap/commit/99049e7)), closes [#2776](https://github.com/ng-bootstrap/ng-bootstrap/issues/2776) [#2766](https://github.com/ng-bootstrap/ng-bootstrap/issues/2766)
* **modal:** modal won't refocus last focused element ([ce7e626](https://github.com/ng-bootstrap/ng-bootstrap/commit/ce7e626)), closes [#2779](https://github.com/ng-bootstrap/ng-bootstrap/issues/2779) [#2798](https://github.com/ng-bootstrap/ng-bootstrap/issues/2798)
* **modal:** focus stays trapped with Shift+Tab ([67651be](https://github.com/ng-bootstrap/ng-bootstrap/commit/67651be)), closes [#2807](https://github.com/ng-bootstrap/ng-bootstrap/issues/2807) [#2718](https://github.com/ng-bootstrap/ng-bootstrap/issues/2718)
* **typeahead:** bring focus back to input on item click ([2b3c898](https://github.com/ng-bootstrap/ng-bootstrap/commit/2b3c898)), closes [#2805](https://github.com/ng-bootstrap/ng-bootstrap/issues/2805) [#2792](https://github.com/ng-bootstrap/ng-bootstrap/issues/2792)



<a name="3.3.0"></a>
# [3.3.0](https://github.com/ng-bootstrap/ng-bootstrap/compare/3.2.2...3.3.0) (2018-10-05)


### Bug Fixes

* **accordion:** don't submit HTML form when toggling panels ([c585124](https://github.com/ng-bootstrap/ng-bootstrap/commit/c585124)), closes [#2760](https://github.com/ng-bootstrap/ng-bootstrap/issues/2760) [#2762](https://github.com/ng-bootstrap/ng-bootstrap/issues/2762)
* **carousel:** don't crash if there are no slides ([#2748](https://github.com/ng-bootstrap/ng-bootstrap/issues/2748)) ([cf6c541](https://github.com/ng-bootstrap/ng-bootstrap/commit/cf6c541)), closes [#2746](https://github.com/ng-bootstrap/ng-bootstrap/issues/2746)
* update templates for TS 3.1 compatibility ([59f90ae](https://github.com/ng-bootstrap/ng-bootstrap/commit/59f90ae)), closes [#2755](https://github.com/ng-bootstrap/ng-bootstrap/issues/2755) [#2763](https://github.com/ng-bootstrap/ng-bootstrap/issues/2763)


### Features

* **datepicker:** add $implicit property for day template context ([a00273d](https://github.com/ng-bootstrap/ng-bootstrap/commit/a00273d)), closes [#2729](https://github.com/ng-bootstrap/ng-bootstrap/issues/2729)
* **datepicker:** add footerTemplate property ([c380272](https://github.com/ng-bootstrap/ng-bootstrap/commit/c380272)), closes [#1197](https://github.com/ng-bootstrap/ng-bootstrap/issues/1197) [#2739](https://github.com/ng-bootstrap/ng-bootstrap/issues/2739)
* **datepicker:** allow to pass user data to the day template context ([d83a5c5](https://github.com/ng-bootstrap/ng-bootstrap/commit/d83a5c5)), closes [#2716](https://github.com/ng-bootstrap/ng-bootstrap/issues/2716)
* **modal:** add [ngbAutofocus] option ([#2737](https://github.com/ng-bootstrap/ng-bootstrap/issues/2737)) ([10fd5e4](https://github.com/ng-bootstrap/ng-bootstrap/commit/10fd5e4)), closes [#938](https://github.com/ng-bootstrap/ng-bootstrap/issues/938) [#2718](https://github.com/ng-bootstrap/ng-bootstrap/issues/2718) [#2728](https://github.com/ng-bootstrap/ng-bootstrap/issues/2728)
* **modal:** allow checking if there are open modals ([#2740](https://github.com/ng-bootstrap/ng-bootstrap/issues/2740)) ([7402ef3](https://github.com/ng-bootstrap/ng-bootstrap/commit/7402ef3)), closes [#1600](https://github.com/ng-bootstrap/ng-bootstrap/issues/1600)



<a name="3.2.2"></a>
## [3.2.2](https://github.com/ng-bootstrap/ng-bootstrap/compare/3.2.1...3.2.2) (2018-09-21)


### Bug Fixes

* **datepicker:** fix 'util' import and use 'isInteger' ([#2738](https://github.com/ng-bootstrap/ng-bootstrap/issues/2738)) ([e3fa911](https://github.com/ng-bootstrap/ng-bootstrap/commit/e3fa911))
* **datepicker:** avoid updating the model twice (on input and on change) ([b44c6d7](https://github.com/ng-bootstrap/ng-bootstrap/commit/b44c6d7)), closes [#2642](https://github.com/ng-bootstrap/ng-bootstrap/issues/2642) [#2684](https://github.com/ng-bootstrap/ng-bootstrap/issues/2684)
* **datepicker:** convert years 0-99 correctly with native adapters ([#2732](https://github.com/ng-bootstrap/ng-bootstrap/issues/2732)) ([8ed7ce5](https://github.com/ng-bootstrap/ng-bootstrap/commit/8ed7ce5)), closes [#2731](https://github.com/ng-bootstrap/ng-bootstrap/issues/2731)
* **datepicker:** don't close on Escape if autoClose is false ([83b49c2](https://github.com/ng-bootstrap/ng-bootstrap/commit/83b49c2)), closes [#2704](https://github.com/ng-bootstrap/ng-bootstrap/issues/2704) [#2713](https://github.com/ng-bootstrap/ng-bootstrap/issues/2713)
* **datepicker:** mark year 0 as invalid in Gregorian calendar ([#2733](https://github.com/ng-bootstrap/ng-bootstrap/issues/2733)) ([dd788a0](https://github.com/ng-bootstrap/ng-bootstrap/commit/dd788a0)), closes [#2721](https://github.com/ng-bootstrap/ng-bootstrap/issues/2721)
* **datepicker:** no longer trigger onChange when the value is equivalent ([f8977be](https://github.com/ng-bootstrap/ng-bootstrap/commit/f8977be)), closes [#2668](https://github.com/ng-bootstrap/ng-bootstrap/issues/2668)
* **popover:** unregister event listener functions only if present ([#2699](https://github.com/ng-bootstrap/ng-bootstrap/issues/2699)) ([5dd4e1e](https://github.com/ng-bootstrap/ng-bootstrap/commit/5dd4e1e)), closes [#2688](https://github.com/ng-bootstrap/ng-bootstrap/issues/2688)
* **timepicker:** match chevron width and height ([2d6a586](https://github.com/ng-bootstrap/ng-bootstrap/commit/2d6a586)), closes [#2663](https://github.com/ng-bootstrap/ng-bootstrap/issues/2663) [#2674](https://github.com/ng-bootstrap/ng-bootstrap/issues/2674)



<a name="3.2.1"></a>
## [3.2.1](https://github.com/ng-bootstrap/ng-bootstrap/compare/3.2.0...3.2.1) (2018-09-21)

WARNING! The 3.2.1 release is broken (incorrect import of the util package) and should not be used. Please use 3.2.2 instead.

### Bug Fixes

* **datepicker:** avoid updating the model twice (on input and on change) ([b44c6d7](https://github.com/ng-bootstrap/ng-bootstrap/commit/b44c6d7)), closes [#2642](https://github.com/ng-bootstrap/ng-bootstrap/issues/2642) [#2684](https://github.com/ng-bootstrap/ng-bootstrap/issues/2684)
* **datepicker:** convert years 0-99 correctly with native adapters ([#2732](https://github.com/ng-bootstrap/ng-bootstrap/issues/2732)) ([8ed7ce5](https://github.com/ng-bootstrap/ng-bootstrap/commit/8ed7ce5)), closes [#2731](https://github.com/ng-bootstrap/ng-bootstrap/issues/2731)
* **datepicker:** don't close on Escape if autoClose is false ([83b49c2](https://github.com/ng-bootstrap/ng-bootstrap/commit/83b49c2)), closes [#2704](https://github.com/ng-bootstrap/ng-bootstrap/issues/2704) [#2713](https://github.com/ng-bootstrap/ng-bootstrap/issues/2713)
* **datepicker:** mark year 0 as invalid in Gregorian calendar ([#2733](https://github.com/ng-bootstrap/ng-bootstrap/issues/2733)) ([dd788a0](https://github.com/ng-bootstrap/ng-bootstrap/commit/dd788a0)), closes [#2721](https://github.com/ng-bootstrap/ng-bootstrap/issues/2721)
* **datepicker:** no longer trigger onChange when the value is equivalent ([f8977be](https://github.com/ng-bootstrap/ng-bootstrap/commit/f8977be)), closes [#2668](https://github.com/ng-bootstrap/ng-bootstrap/issues/2668)
* **popover:** unregister event listener functions only if present ([#2699](https://github.com/ng-bootstrap/ng-bootstrap/issues/2699)) ([5dd4e1e](https://github.com/ng-bootstrap/ng-bootstrap/commit/5dd4e1e)), closes [#2688](https://github.com/ng-bootstrap/ng-bootstrap/issues/2688)
* **timepicker:** match chevron width and height ([2d6a586](https://github.com/ng-bootstrap/ng-bootstrap/commit/2d6a586)), closes [#2663](https://github.com/ng-bootstrap/ng-bootstrap/issues/2663) [#2674](https://github.com/ng-bootstrap/ng-bootstrap/issues/2674)



<a name="3.2.0"></a>
# [3.2.0](https://github.com/ng-bootstrap/ng-bootstrap/compare/3.1.0...3.2.0) (2018-08-30)


### Bug Fixes

* **popover:** don't show header if title is empty ([f1ec90b](https://github.com/ng-bootstrap/ng-bootstrap/commit/f1ec90b)), closes [#2653](https://github.com/ng-bootstrap/ng-bootstrap/issues/2653) [#2661](https://github.com/ng-bootstrap/ng-bootstrap/issues/2661)
* **radio:** properly set disabled state on labels ([9b19171](https://github.com/ng-bootstrap/ng-bootstrap/commit/9b19171)), closes [#2635](https://github.com/ng-bootstrap/ng-bootstrap/issues/2635) [#2639](https://github.com/ng-bootstrap/ng-bootstrap/issues/2639)


### Features

* **datepicker:** add aria-labels and titles for navigation select elements ([dcdb5fc](https://github.com/ng-bootstrap/ng-bootstrap/commit/dcdb5fc)), closes [#2636](https://github.com/ng-bootstrap/ng-bootstrap/issues/2636) [#2543](https://github.com/ng-bootstrap/ng-bootstrap/issues/2543)
* **datepicker:** add hebrew i18n ([2d68122](https://github.com/ng-bootstrap/ng-bootstrap/commit/2d68122)), closes [#2606](https://github.com/ng-bootstrap/ng-bootstrap/issues/2606)
* **datepicker:** Hebrew calendar support ([8404994](https://github.com/ng-bootstrap/ng-bootstrap/commit/8404994))
* **datepicker:** Add NgbDateNativeUTCAdapter ([f847791](https://github.com/ng-bootstrap/ng-bootstrap/commit/f847791)), closes [#2631](https://github.com/ng-bootstrap/ng-bootstrap/issues/2631) [#2659](https://github.com/ng-bootstrap/ng-bootstrap/issues/2659)
* **modal:** add implicit context for template based modals ([6e4f9e7](https://github.com/ng-bootstrap/ng-bootstrap/commit/6e4f9e7)), closes [#2669](https://github.com/ng-bootstrap/ng-bootstrap/issues/2669)
* **modal:** add support for stacked modals ([2409572](https://github.com/ng-bootstrap/ng-bootstrap/commit/2409572)), closes [#2640](https://github.com/ng-bootstrap/ng-bootstrap/issues/2640) [#643](https://github.com/ng-bootstrap/ng-bootstrap/issues/643)
* **tooltip:** ability to add custom CSS classes to tooltip window ([709d6b6](https://github.com/ng-bootstrap/ng-bootstrap/commit/709d6b6)), closes [#2625](https://github.com/ng-bootstrap/ng-bootstrap/issues/2625) [#1349](https://github.com/ng-bootstrap/ng-bootstrap/issues/1349)



<a name="3.1.0"></a>
# [3.1.0](https://github.com/ng-bootstrap/ng-bootstrap/compare/3.0.0...3.1.0) (2018-08-24)


### Bug Fixes

* **timepicker:** avoid unnecessary CSS class mutation in the DOM ([47e91ba](https://github.com/ng-bootstrap/ng-bootstrap/commit/47e91ba)), closes [#2582](https://github.com/ng-bootstrap/ng-bootstrap/issues/2582) [#2617](https://github.com/ng-bootstrap/ng-bootstrap/issues/2617)
* provide overrideable services at the root level ([#2627](https://github.com/ng-bootstrap/ng-bootstrap/issues/2627)) ([88e5e98](https://github.com/ng-bootstrap/ng-bootstrap/commit/88e5e98)), closes [#2618](https://github.com/ng-bootstrap/ng-bootstrap/issues/2618)


### Features

* **accordion:** add expand / collapse methods ([e64f2ff](https://github.com/ng-bootstrap/ng-bootstrap/commit/e64f2ff)), closes [#1970](https://github.com/ng-bootstrap/ng-bootstrap/issues/1970) [#1978](https://github.com/ng-bootstrap/ng-bootstrap/issues/1978) [#2595](https://github.com/ng-bootstrap/ng-bootstrap/issues/2595)
* **modal:** add global config for modals ([3d8c08a](https://github.com/ng-bootstrap/ng-bootstrap/commit/3d8c08a)), closes [#2487](https://github.com/ng-bootstrap/ng-bootstrap/issues/2487) [#2573](https://github.com/ng-bootstrap/ng-bootstrap/issues/2573)
* **modal:** add new dismissAll method ([daf6645](https://github.com/ng-bootstrap/ng-bootstrap/commit/daf6645)), closes [#1963](https://github.com/ng-bootstrap/ng-bootstrap/issues/1963) [#2633](https://github.com/ng-bootstrap/ng-bootstrap/issues/2633)
* **popover:** allow templates as popover title ([340c9b3](https://github.com/ng-bootstrap/ng-bootstrap/commit/340c9b3)), closes [#1221](https://github.com/ng-bootstrap/ng-bootstrap/issues/1221) [#2621](https://github.com/ng-bootstrap/ng-bootstrap/issues/2621)



<a name="3.0.0"></a>
# [3.0.0](https://github.com/ng-bootstrap/ng-bootstrap/compare/3.0.0-beta.1...3.0.0) (2018-08-13)

ng-bootstrap 3.0.0 requires Angular version `^6.1.0` and is delivered in Angular Package Format (APF) v6.0 (https://goo.gl/jB3GVv) using @angular/cli 6.

### Bug Fixes

* **accordion:** correct "collapsed" CSS class usage ([25b5bee](https://github.com/ng-bootstrap/ng-bootstrap/commit/25b5bee)), closes [#2553](https://github.com/ng-bootstrap/ng-bootstrap/issues/2553) [#2555](https://github.com/ng-bootstrap/ng-bootstrap/issues/2555)
* **accordion:** the markup should follow the bootstrap one ([8ddc363](https://github.com/ng-bootstrap/ng-bootstrap/commit/8ddc363)), closes [#2511](https://github.com/ng-bootstrap/ng-bootstrap/issues/2511)
* **carousel:** make it work inside the 'OnPush' components ([827dfcb](https://github.com/ng-bootstrap/ng-bootstrap/commit/827dfcb)), closes [#2597](https://github.com/ng-bootstrap/ng-bootstrap/issues/2597) [#2599](https://github.com/ng-bootstrap/ng-bootstrap/issues/2599)
* **datepicker:** correctly override year numerals for multiple months ([#2596](https://github.com/ng-bootstrap/ng-bootstrap/issues/2596)) ([bc540e9](https://github.com/ng-bootstrap/ng-bootstrap/commit/bc540e9))
* **demo:** missing / in bootstrap href link ([42b1470](https://github.com/ng-bootstrap/ng-bootstrap/commit/42b1470)), closes [#2584](https://github.com/ng-bootstrap/ng-bootstrap/issues/2584) [#2586](https://github.com/ng-bootstrap/ng-bootstrap/issues/2586)
* **dropdown:** close dropdown correctly inside the OnPush component ([a2dea82](https://github.com/ng-bootstrap/ng-bootstrap/commit/a2dea82)), closes [#2561](https://github.com/ng-bootstrap/ng-bootstrap/issues/2561) [#2559](https://github.com/ng-bootstrap/ng-bootstrap/issues/2559)
* **dropdown:** remove global document click listener ([d80204c](https://github.com/ng-bootstrap/ng-bootstrap/commit/d80204c)), closes [#900](https://github.com/ng-bootstrap/ng-bootstrap/issues/900) [#2518](https://github.com/ng-bootstrap/ng-bootstrap/issues/2518)
* **modal:** adjust modal background to avoid shifting ([2871316](https://github.com/ng-bootstrap/ng-bootstrap/commit/2871316)), closes [#641](https://github.com/ng-bootstrap/ng-bootstrap/issues/641) [#2508](https://github.com/ng-bootstrap/ng-bootstrap/issues/2508)
* **modal:** use correct ComponentFactoryResolver ([8d72f37](https://github.com/ng-bootstrap/ng-bootstrap/commit/8d72f37)), closes [#2588](https://github.com/ng-bootstrap/ng-bootstrap/issues/2588)
* **typeahead:** don't fail when user returns falsy results ([de613ae](https://github.com/ng-bootstrap/ng-bootstrap/commit/de613ae)), closes [#2530](https://github.com/ng-bootstrap/ng-bootstrap/issues/2530) [#2550](https://github.com/ng-bootstrap/ng-bootstrap/issues/2550)


### Chores

* bump minimal required version of Angular to 6.1 ([335598c](https://github.com/ng-bootstrap/ng-bootstrap/commit/335598c)), closes [#2548](https://github.com/ng-bootstrap/ng-bootstrap/issues/2548)


### Code Refactoring

* **alert:** remove intermediate 'div' element ([c9c463d](https://github.com/ng-bootstrap/ng-bootstrap/commit/c9c463d)), closes [#2544](https://github.com/ng-bootstrap/ng-bootstrap/issues/2544) [#2552](https://github.com/ng-bootstrap/ng-bootstrap/issues/2552)


### Features

* **datepicker:** allow overriding day, week number and year numerals ([91c04e9](https://github.com/ng-bootstrap/ng-bootstrap/commit/91c04e9)), closes [#2593](https://github.com/ng-bootstrap/ng-bootstrap/issues/2593)
* **datepicker:** close popup on outside click ([347f0ff](https://github.com/ng-bootstrap/ng-bootstrap/commit/347f0ff)), closes [#2558](https://github.com/ng-bootstrap/ng-bootstrap/issues/2558)
* **datepicker:** initial version of Jalali calendar ([e465fa6](https://github.com/ng-bootstrap/ng-bootstrap/commit/e465fa6))
* **datepicker:** make 'NgbDate' part of a public API ([122f93f](https://github.com/ng-bootstrap/ng-bootstrap/commit/122f93f)), closes [#2540](https://github.com/ng-bootstrap/ng-bootstrap/issues/2540)
* **popover:** autoclose ([6e2340d](https://github.com/ng-bootstrap/ng-bootstrap/commit/6e2340d)), closes [#933](https://github.com/ng-bootstrap/ng-bootstrap/issues/933) [#2554](https://github.com/ng-bootstrap/ng-bootstrap/issues/2554)
* **tabset:** allow arbitrary nav type ([#2592](https://github.com/ng-bootstrap/ng-bootstrap/issues/2592)) ([1e68401](https://github.com/ng-bootstrap/ng-bootstrap/commit/1e68401)), closes [#1661](https://github.com/ng-bootstrap/ng-bootstrap/issues/1661)
* **tooltip:** autoclose ([fa765a8](https://github.com/ng-bootstrap/ng-bootstrap/commit/fa765a8)), closes [#2571](https://github.com/ng-bootstrap/ng-bootstrap/issues/2571)


### BREAKING CHANGES

* for ng-bootstrap 3.0.0 minimal required version of Angular is 6.1.0
* The library is now delivered in Angular Package Format (APF) v6.0 (https://goo.gl/jB3GVv) using @angular/cli 6.

One notable change is that delivered UMD bundle is now located in 'bundles/ng-bootstrap.umd.js' instead of 'bundles/ng-bootstrap.js'.

Also ES5 code is now delivered as a flat version by default, so 'module' in the 'package.json' is now pointing to 'fesm5/ng-bootstrap.js' and not 'index.js'.
You can still find all the ES5 code in the 'esm5' folder if necessary.

Please examine the contents of the delivered package, if you have a custom build configuration.
* **alert:** markup generated by `<ngb-alert>` was simplified, there is no more intermediate `<div>` element

Before:
```
<ngb-alert>
  <div role="alert" class="alert alert-warning">
    Hello there
  </div>
</ngb-alert>
```

After:
```
<ngb-alert role="alert" class="alert alert-warning">
  Hello there
</ngb-alert>
```




<a name="2.2.2"></a>
## [2.2.2](https://github.com/ng-bootstrap/ng-bootstrap/compare/2.2.1...2.2.2) (2018-08-03)


### Bug Fixes

* **dropdown:** close dropdown correctly inside the OnPush component ([75060ca](https://github.com/ng-bootstrap/ng-bootstrap/commit/75060ca)), closes [#2561](https://github.com/ng-bootstrap/ng-bootstrap/issues/2561) [#2559](https://github.com/ng-bootstrap/ng-bootstrap/issues/2559)



<a name="2.2.1"></a>
## [2.2.1](https://github.com/ng-bootstrap/ng-bootstrap/compare/2.2.0...2.2.1) (2018-07-27)


### Bug Fixes

* **dropdown:** close on escape from anywhere ([c26732f](https://github.com/ng-bootstrap/ng-bootstrap/commit/c26732f)), closes [#1741](https://github.com/ng-bootstrap/ng-bootstrap/issues/1741) [#2051](https://github.com/ng-bootstrap/ng-bootstrap/issues/2051)
* **dropdown:** remove global document click listener ([bd95f1f](https://github.com/ng-bootstrap/ng-bootstrap/commit/bd95f1f)), closes [#900](https://github.com/ng-bootstrap/ng-bootstrap/issues/900) [#2518](https://github.com/ng-bootstrap/ng-bootstrap/issues/2518) [#2871316695d8d2da5a8b0144c0a69de17e480019](https://github.com/ng-bootstrap/ng-bootstrap/issues/2871316695d8d2da5a8b0144c0a69de17e480019)
* **modal:** adjust modal background to avoid shifting ([efe01f1](https://github.com/ng-bootstrap/ng-bootstrap/commit/efe01f1)), closes [#641](https://github.com/ng-bootstrap/ng-bootstrap/issues/641) [#2508](https://github.com/ng-bootstrap/ng-bootstrap/issues/2508)
* **progressbar:** add missing i18n id specifier ([becb208](https://github.com/ng-bootstrap/ng-bootstrap/commit/becb208)), closes [#2493](https://github.com/ng-bootstrap/ng-bootstrap/issues/2493)
* **typeahead:** don't fail when user returns falsy results ([39a58a3](https://github.com/ng-bootstrap/ng-bootstrap/commit/39a58a3)), closes [#2530](https://github.com/ng-bootstrap/ng-bootstrap/issues/2530) [#2550](https://github.com/ng-bootstrap/ng-bootstrap/issues/2550)



<a name="3.0.0-beta.1"></a>
# [3.0.0-beta.1](https://github.com/ng-bootstrap/ng-bootstrap/compare/2.2.0...3.0.0-beta.1) (2018-07-06)


### Bug Fixes

* **dropdown:** close on escape from anywhere ([2495570](https://github.com/ng-bootstrap/ng-bootstrap/commit/2495570)), closes [#1741](https://github.com/ng-bootstrap/ng-bootstrap/issues/1741) [#2051](https://github.com/ng-bootstrap/ng-bootstrap/issues/2051)
* **progressbar:** add missing i18n id specifier ([69956fe](https://github.com/ng-bootstrap/ng-bootstrap/commit/69956fe)), closes [#2493](https://github.com/ng-bootstrap/ng-bootstrap/issues/2493)


### Features

* **datepicker:** close popup on outside click ([a9ab409](https://github.com/ng-bootstrap/ng-bootstrap/commit/a9ab409)), closes [#783](https://github.com/ng-bootstrap/ng-bootstrap/issues/783) [#2440](https://github.com/ng-bootstrap/ng-bootstrap/issues/2440)


### BREAKING CHANGES

* The library is now delivered in Angular Package Format (APF) v6.0 (https://goo.gl/jB3GVv) using @angular/cli 6.

One notable change is that delivered UMD bundle is now located in 'bundles/ng-bootstrap.umd.js' instead of 'bundles/ng-bootstrap.js'.

Also ES5 code is now delivered as a flat version by default, so 'module' in the 'package.json' is now pointing to 'fesm5/ng-bootstrap.js' and not 'index.js'.
You can still find all the ES5 code in the 'esm5' folder if necessary.

Please examine the contents of the delivered package, if you have a custom build configuration.


* **datepicker:** datepicker popup will now close on outside click by default.

Because of this datepicker will NOT open with `(click)="d.open()"` and `(click)="d.toggle()"`
unless you mark the element with click handler with `[ngbDatepickerToggle]="d"`

BEFORE:
```html
<input ngbDatepicker #d="ngbDatepicker" />
<button (click)="d.toggle()">...</button>
<button (click)="d.open()">...</button>
```

AFTER:
```html
<input ngbDatepicker #d="ngbDatepicker" />
<button [ngbDatepickerToggle]="d" (click)="d.toggle()">...</button>
<button [ngbDatepickerToggle]="d" (click)="d.open()">...</button>
```

Also note that `[autoClose]` input now accepts additional 'inside' and 'outside' values.



<a name="2.2.0"></a>
# [2.2.0](https://github.com/ng-bootstrap/ng-bootstrap/compare/2.1.2...2.2.0) (2018-06-29)


### Bug Fixes

* **accordion:** update generated markup to Bootstrap HTML / CSS ([9b2b0bc](https://github.com/ng-bootstrap/ng-bootstrap/commit/9b2b0bc)), closes [#2368](https://github.com/ng-bootstrap/ng-bootstrap/issues/2368)


### Features

* **carousel:** add flags controlling display of navigation arrows and indicators ([ec4e939](https://github.com/ng-bootstrap/ng-bootstrap/commit/ec4e939)), closes [#2274](https://github.com/ng-bootstrap/ng-bootstrap/issues/2274) [#2275](https://github.com/ng-bootstrap/ng-bootstrap/issues/2275)
* **carousel:** add input to control pause on mouseover ([8d54cac](https://github.com/ng-bootstrap/ng-bootstrap/commit/8d54cac)), closes [#1163](https://github.com/ng-bootstrap/ng-bootstrap/issues/1163) [#2436](https://github.com/ng-bootstrap/ng-bootstrap/issues/2436)
* **modal:** aria-labelledby attribute for modal window ([3cc6fa7](https://github.com/ng-bootstrap/ng-bootstrap/commit/3cc6fa7)), closes [#1477](https://github.com/ng-bootstrap/ng-bootstrap/issues/1477) [#2049](https://github.com/ng-bootstrap/ng-bootstrap/issues/2049)
* **popover:** ability to add custom CSS classes to popover window ([483bd05](https://github.com/ng-bootstrap/ng-bootstrap/commit/483bd05)), closes [#1441](https://github.com/ng-bootstrap/ng-bootstrap/issues/1441) [#2310](https://github.com/ng-bootstrap/ng-bootstrap/issues/2310)
* **timepicker:** add custom time adapter support ([7eaa7e7](https://github.com/ng-bootstrap/ng-bootstrap/commit/7eaa7e7)), closes [#545](https://github.com/ng-bootstrap/ng-bootstrap/issues/545) [#2347](https://github.com/ng-bootstrap/ng-bootstrap/issues/2347)



<a name="2.1.2"></a>
## [2.1.2](https://github.com/ng-bootstrap/ng-bootstrap/compare/2.1.1...2.1.2) (2018-06-22)


### Bug Fixes

* **datepicker:** fix ExpressionChangedAfterItHasBeenCheckedError when switching between months ([b47f981](https://github.com/ng-bootstrap/ng-bootstrap/commit/b47f981)), closes [#2408](https://github.com/ng-bootstrap/ng-bootstrap/issues/2408) [#2462](https://github.com/ng-bootstrap/ng-bootstrap/issues/2462)
* **timepicker:** fix placeholder width issues on iOS ([e65d5cf](https://github.com/ng-bootstrap/ng-bootstrap/commit/e65d5cf)), closes [#2460](https://github.com/ng-bootstrap/ng-bootstrap/issues/2460)



<a name="2.1.1"></a>
## [2.1.1](https://github.com/ng-bootstrap/ng-bootstrap/compare/2.1.0...2.1.1) (2018-06-15)


### Bug Fixes

* **datepicker:** properly display month select box when 'displayMonths' > 1 ([18acd62](https://github.com/ng-bootstrap/ng-bootstrap/commit/18acd62)), closes [#2377](https://github.com/ng-bootstrap/ng-bootstrap/issues/2377) [#2452](https://github.com/ng-bootstrap/ng-bootstrap/issues/2452)
* **live:** use a single DOM element for Live Announcer ([31968ad](https://github.com/ng-bootstrap/ng-bootstrap/commit/31968ad)), closes [#2458](https://github.com/ng-bootstrap/ng-bootstrap/issues/2458)
* **positioning:** add missing primary position checks ([54168ea](https://github.com/ng-bootstrap/ng-bootstrap/commit/54168ea))
* **positioning:** add secondary positions to auto conversion ([7208006](https://github.com/ng-bootstrap/ng-bootstrap/commit/7208006)), closes [#1899](https://github.com/ng-bootstrap/ng-bootstrap/issues/1899)



<a name="2.1.0"></a>
# [2.1.0](https://github.com/ng-bootstrap/ng-bootstrap/compare/2.0.0...2.1.0) (2018-06-08)


### Bug Fixes

* **datepicker:** display 'outsideDays' correctly for multiple months ([26b8f3b](https://github.com/ng-bootstrap/ng-bootstrap/commit/26b8f3b)), closes [#2421](https://github.com/ng-bootstrap/ng-bootstrap/issues/2421) [#2035](https://github.com/ng-bootstrap/ng-bootstrap/issues/2035)
* **datepicker:** fix month/year select boxes widths in IE10 ([f266b7f](https://github.com/ng-bootstrap/ng-bootstrap/commit/f266b7f)), closes [#2414](https://github.com/ng-bootstrap/ng-bootstrap/issues/2414)
* use correct rxjs imports for focus trap ([2315c8c](https://github.com/ng-bootstrap/ng-bootstrap/commit/2315c8c)), closes [#2439](https://github.com/ng-bootstrap/ng-bootstrap/issues/2439)
* **datepicker:** fix select width with bootstrap 4.1 ([342b640](https://github.com/ng-bootstrap/ng-bootstrap/commit/342b640)), closes [#2443](https://github.com/ng-bootstrap/ng-bootstrap/issues/2443)
* **datepicker:** prevent focustrap to restore focus on destroy ([dcd7111](https://github.com/ng-bootstrap/ng-bootstrap/commit/dcd7111)), closes [#2372](https://github.com/ng-bootstrap/ng-bootstrap/issues/2372) [#2392](https://github.com/ng-bootstrap/ng-bootstrap/issues/2392)
* **datepicker:** simplify CSS and navigation styles ([d349edb](https://github.com/ng-bootstrap/ng-bootstrap/commit/d349edb)), closes [#2401](https://github.com/ng-bootstrap/ng-bootstrap/issues/2401) [#2402](https://github.com/ng-bootstrap/ng-bootstrap/issues/2402)
* **datepicker:** simplify focus trap with observables ([25c1394](https://github.com/ng-bootstrap/ng-bootstrap/commit/25c1394)), closes [#2419](https://github.com/ng-bootstrap/ng-bootstrap/issues/2419) [#2406](https://github.com/ng-bootstrap/ng-bootstrap/issues/2406) [#2390](https://github.com/ng-bootstrap/ng-bootstrap/issues/2390) [#2372](https://github.com/ng-bootstrap/ng-bootstrap/issues/2372)
* **typeahead:** use custom input formatter with falsy values ([b73f350](https://github.com/ng-bootstrap/ng-bootstrap/commit/b73f350)), closes [#2389](https://github.com/ng-bootstrap/ng-bootstrap/issues/2389) [#2399](https://github.com/ng-bootstrap/ng-bootstrap/issues/2399)


### Features

* add support for i18n of static text in component templates ([65c232d](https://github.com/ng-bootstrap/ng-bootstrap/commit/65c232d)), closes [#2314](https://github.com/ng-bootstrap/ng-bootstrap/issues/2314) [#2317](https://github.com/ng-bootstrap/ng-bootstrap/issues/2317)
* **datepicker:** add aria attributes for navigation ([cd01d32](https://github.com/ng-bootstrap/ng-bootstrap/commit/cd01d32)), closes [#2345](https://github.com/ng-bootstrap/ng-bootstrap/issues/2345)
* **datepicker:** add native js date adapter ([cd14b96](https://github.com/ng-bootstrap/ng-bootstrap/commit/cd14b96)), closes [#2305](https://github.com/ng-bootstrap/ng-bootstrap/issues/2305)
* **datepicker:** close datepicker popup on ESC from anywhere ([2666d8b](https://github.com/ng-bootstrap/ng-bootstrap/commit/2666d8b)), closes [#2432](https://github.com/ng-bootstrap/ng-bootstrap/issues/2432)
* **modal:** focus is now trapped inside any opened modal ([cf48325](https://github.com/ng-bootstrap/ng-bootstrap/commit/cf48325)), closes [#642](https://github.com/ng-bootstrap/ng-bootstrap/issues/642) [#2441](https://github.com/ng-bootstrap/ng-bootstrap/issues/2441)
* **modal:** support for promises in beforeDismiss hook ([cca789f](https://github.com/ng-bootstrap/ng-bootstrap/commit/cca789f)), closes [#2340](https://github.com/ng-bootstrap/ng-bootstrap/issues/2340)
* **typeahead:** add input reflecting the 'autocomplete' attribute ([3a7ca58](https://github.com/ng-bootstrap/ng-bootstrap/commit/3a7ca58)), closes [#2194](https://github.com/ng-bootstrap/ng-bootstrap/issues/2194) [#2366](https://github.com/ng-bootstrap/ng-bootstrap/issues/2366)



<a name="2.0.0"></a>
# [2.0.0](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.1.1...2.0.0) (2018-05-04)

This is a major release of ng-bootstrap. It is fully compatible with Angular / RxJS 6.x.
Please pay attention to the breaking changes section when upgrading.

### Bug Fixes

* **accordion:** add 'accordion' css class ([d014d0e](https://github.com/ng-bootstrap/ng-bootstrap/commit/d014d0e)), closes [#2304](https://github.com/ng-bootstrap/ng-bootstrap/issues/2304)
* **accordion:** remove active class from open panel titles ([f804649](https://github.com/ng-bootstrap/ng-bootstrap/commit/f804649)), closes [#2307](https://github.com/ng-bootstrap/ng-bootstrap/issues/2307) [#2221](https://github.com/ng-bootstrap/ng-bootstrap/issues/2221)
* **datepicker:** allow weekday and week number css to be overridden ([57bf8f8](https://github.com/ng-bootstrap/ng-bootstrap/commit/57bf8f8)), closes [#2296](https://github.com/ng-bootstrap/ng-bootstrap/issues/2296)
* **dropdown:** correct dropup position with Bootstrap 4.1 ([91c166d](https://github.com/ng-bootstrap/ng-bootstrap/commit/91c166d)), closes [#2297](https://github.com/ng-bootstrap/ng-bootstrap/issues/2297) [#2313](https://github.com/ng-bootstrap/ng-bootstrap/issues/2313)
* **modal:** don't use deprecated 'ReflectiveInjector' ([0f8055f](https://github.com/ng-bootstrap/ng-bootstrap/commit/0f8055f)), closes [#2285](https://github.com/ng-bootstrap/ng-bootstrap/issues/2285)
* **typeahead:** reset active index when results change ([46a4b3b](https://github.com/ng-bootstrap/ng-bootstrap/commit/46a4b3b)), closes [#2303](https://github.com/ng-bootstrap/ng-bootstrap/issues/2303) [#2312](https://github.com/ng-bootstrap/ng-bootstrap/issues/2312)


### Features

* focustrap standalone service ([6961cb3](https://github.com/ng-bootstrap/ng-bootstrap/commit/6961cb3)), closes [#2322](https://github.com/ng-bootstrap/ng-bootstrap/issues/2322)
* **datepicker:** add 'aria-label' attribute for days ([d52059b](https://github.com/ng-bootstrap/ng-bootstrap/commit/d52059b)), closes [#2319](https://github.com/ng-bootstrap/ng-bootstrap/issues/2319)
* **datepicker:** allow focusing calendar days and navigation separately ([2daf038](https://github.com/ng-bootstrap/ng-bootstrap/commit/2daf038)), closes [#1716](https://github.com/ng-bootstrap/ng-bootstrap/issues/1716) [#2270](https://github.com/ng-bootstrap/ng-bootstrap/issues/2270)
* **datepicker:** focustrap for datepicker in popup ([e7179cd](https://github.com/ng-bootstrap/ng-bootstrap/commit/e7179cd)), closes [#2332](https://github.com/ng-bootstrap/ng-bootstrap/issues/2332)
* **datepicker:** use the angular locale API ([7959a15](https://github.com/ng-bootstrap/ng-bootstrap/commit/7959a15)), closes [#2065](https://github.com/ng-bootstrap/ng-bootstrap/issues/2065) [#2066](https://github.com/ng-bootstrap/ng-bootstrap/issues/2066)
* **popover:** conditional popover ([9de58e6](https://github.com/ng-bootstrap/ng-bootstrap/commit/9de58e6)), closes [#2188](https://github.com/ng-bootstrap/ng-bootstrap/issues/2188) [#2217](https://github.com/ng-bootstrap/ng-bootstrap/issues/2217)
* **typeahead:** accessibility, options summary status message ([f65b8a4](https://github.com/ng-bootstrap/ng-bootstrap/commit/f65b8a4)), closes [#2197](https://github.com/ng-bootstrap/ng-bootstrap/issues/2197) [#1945](https://github.com/ng-bootstrap/ng-bootstrap/issues/1945)


### BREAKING CHANGES

* **datepicker:** if you're using a custom `NgbDatepickerI18n` implementation, you'll have to implement an additional method: `getDayAriaLabel(date: NgbDateStruct): string`. It returns the string that will be set for the `aria-label` attribute for each displayed day. If you're not using the custom service, the `aria-label` will default to the value returned by the angular `DatePipe` with `'fullDate'` format.
* **accordion:** The "active" CSS class is no longer added to headers of an active panel.
This change assures that markup used by ng-bootstrap is in-line with the
markup described in:
https://getbootstrap.com/docs/4.0/components/collapse/#accordion-example
* **popover:** Popovers with an empty title and content are considered disabled and won't open by default.
* **datepicker:** The datepicker is no longer focusable as a whole component. Instead, the focus is allowed on each element inside the datepicker (navigation buttons, select boxes, focusable day) in the natural order. The datepicker `.focus()` method will now only focus one day and not the whole component.
* **datepicker:** if your application provides a LOCALE_ID other than
the default en-US, registers the locale data for this locale, and
doesn't use a custom NgbDatepickerI18n, then the days and months
of the datepicker won't be displayed in English anymore, but in the
language of the provided locale.



<a name="1.1.1"></a>
## [1.1.1](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.1.0...1.1.1) (2018-04-06)


### Bug Fixes

* **datepicker:** emit 'selectEvent' when datepicker model changes ([4a0ec89](https://github.com/ng-bootstrap/ng-bootstrap/commit/4a0ec89)), closes [#2278](https://github.com/ng-bootstrap/ng-bootstrap/issues/2278) [#2281](https://github.com/ng-bootstrap/ng-bootstrap/issues/2281)



<a name="1.1.0"></a>
# [1.1.0](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.4...1.1.0) (2018-03-30)


### Bug Fixes

* **accordion:** don't crash for panels with no content ([da96dec](https://github.com/ng-bootstrap/ng-bootstrap/commit/da96dec)), closes [#2250](https://github.com/ng-bootstrap/ng-bootstrap/issues/2250) [#2251](https://github.com/ng-bootstrap/ng-bootstrap/issues/2251)
* **pagination:** emit page change only when collection size is set ([51a2a29](https://github.com/ng-bootstrap/ng-bootstrap/commit/51a2a29)), closes [#1841](https://github.com/ng-bootstrap/ng-bootstrap/issues/1841) [#2257](https://github.com/ng-bootstrap/ng-bootstrap/issues/2257)
* **tabset:** don't crash for tabs with no content ([3b3c979](https://github.com/ng-bootstrap/ng-bootstrap/commit/3b3c979)), closes [#2252](https://github.com/ng-bootstrap/ng-bootstrap/issues/2252)


### Features

* **datepicker:** ability to prevent popup from closing automatically ([7201af3](https://github.com/ng-bootstrap/ng-bootstrap/commit/7201af3)), closes [#1984](https://github.com/ng-bootstrap/ng-bootstrap/issues/1984) [#2192](https://github.com/ng-bootstrap/ng-bootstrap/issues/2192)
* **datepicker:** add 'dateSelect' output for date selection listening ([acad88a](https://github.com/ng-bootstrap/ng-bootstrap/commit/acad88a)), closes [#2181](https://github.com/ng-bootstrap/ng-bootstrap/issues/2181) [#2254](https://github.com/ng-bootstrap/ng-bootstrap/issues/2254)
* **dropdown:** allow using any event to toggle dropdowns ([25e0d39](https://github.com/ng-bootstrap/ng-bootstrap/commit/25e0d39)), closes [#1115](https://github.com/ng-bootstrap/ng-bootstrap/issues/1115) [#1926](https://github.com/ng-bootstrap/ng-bootstrap/issues/1926) [#2082](https://github.com/ng-bootstrap/ng-bootstrap/issues/2082)
* **modal:** add 'backdropClass' option ([5ffaabc](https://github.com/ng-bootstrap/ng-bootstrap/commit/5ffaabc)), closes [#2166](https://github.com/ng-bootstrap/ng-bootstrap/issues/2166) [#2248](https://github.com/ng-bootstrap/ng-bootstrap/issues/2248)
* **modal:** add vertically centered option ([00e79c4](https://github.com/ng-bootstrap/ng-bootstrap/commit/00e79c4)), closes [#1124](https://github.com/ng-bootstrap/ng-bootstrap/issues/1124) [#2074](https://github.com/ng-bootstrap/ng-bootstrap/issues/2074)
* **popover:** introduce disabled flag ([234bab3](https://github.com/ng-bootstrap/ng-bootstrap/commit/234bab3)), closes [#2188](https://github.com/ng-bootstrap/ng-bootstrap/issues/2188) [#2229](https://github.com/ng-bootstrap/ng-bootstrap/issues/2229)
* **tooltip:** introduce disabled flag ([e05a99f](https://github.com/ng-bootstrap/ng-bootstrap/commit/e05a99f)), closes [#2253](https://github.com/ng-bootstrap/ng-bootstrap/issues/2253)



<a name="1.0.4"></a>
## [1.0.4](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.3...1.0.4) (2018-03-23)

This release contains the same code as 1.0.3 but we need to push another version due to npm errors while publishing 1.0.3


<a name="1.0.3"></a>
## [1.0.3](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.2...1.0.3) (2018-03-23)


### Bug Fixes

* **accordion:** properly determine titles when using nested accordions ([171a70d](https://github.com/ng-bootstrap/ng-bootstrap/commit/171a70d)), closes [#2240](https://github.com/ng-bootstrap/ng-bootstrap/issues/2240) [#2247](https://github.com/ng-bootstrap/ng-bootstrap/issues/2247)
* **tabset:** properly determine titles when using nested tabsets ([4a2f65a](https://github.com/ng-bootstrap/ng-bootstrap/commit/4a2f65a)), closes [#2249](https://github.com/ng-bootstrap/ng-bootstrap/issues/2249)



<a name="1.0.2"></a>
## [1.0.2](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.1...1.0.2) (2018-03-19)


### Bug Fixes

* **accordion:** restore 'type' input behaviour for styling panels ([9b62d75](https://github.com/ng-bootstrap/ng-bootstrap/commit/9b62d75)), closes [#1897](https://github.com/ng-bootstrap/ng-bootstrap/issues/1897) [#2227](https://github.com/ng-bootstrap/ng-bootstrap/issues/2227)
* **datepicker:** add class "show" to visible datepicker dropdown ([6938e4b](https://github.com/ng-bootstrap/ng-bootstrap/commit/6938e4b)), closes [#2088](https://github.com/ng-bootstrap/ng-bootstrap/issues/2088) [#2013](https://github.com/ng-bootstrap/ng-bootstrap/issues/2013)
* **datepicker:** optional min/max dates for infinite navigation ([3a1a341](https://github.com/ng-bootstrap/ng-bootstrap/commit/3a1a341)), closes [#1732](https://github.com/ng-bootstrap/ng-bootstrap/issues/1732) [#2219](https://github.com/ng-bootstrap/ng-bootstrap/issues/2219)
* **demo:** avoid removing DOM elements in decimal rating demo ([40a8281](https://github.com/ng-bootstrap/ng-bootstrap/commit/40a8281)), closes [#2178](https://github.com/ng-bootstrap/ng-bootstrap/issues/2178) [#2225](https://github.com/ng-bootstrap/ng-bootstrap/issues/2225)
* **modal:** don't use inline styles ([5f14b4e](https://github.com/ng-bootstrap/ng-bootstrap/commit/5f14b4e)), closes [#2085](https://github.com/ng-bootstrap/ng-bootstrap/issues/2085) [#2223](https://github.com/ng-bootstrap/ng-bootstrap/issues/2223)
* **typeahead:** fix SSR (universal) rendering ([2c5a354](https://github.com/ng-bootstrap/ng-bootstrap/commit/2c5a354)), closes [#2190](https://github.com/ng-bootstrap/ng-bootstrap/issues/2190) [#2139](https://github.com/ng-bootstrap/ng-bootstrap/issues/2139) [#2224](https://github.com/ng-bootstrap/ng-bootstrap/issues/2224)


<a name="1.0.1"></a>
## [1.0.1](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.0...1.0.1) (2018-03-09)


### Bug Fixes

* **modal:** support server rendering with lazy loading ([02f6f7a](https://github.com/ng-bootstrap/ng-bootstrap/commit/02f6f7a)), closes [#1968](https://github.com/ng-bootstrap/ng-bootstrap/issues/1968) [#2180](https://github.com/ng-bootstrap/ng-bootstrap/issues/2180)
* **timepicker:** Add CSS for IE10 flexbox ([7c0d6d7](https://github.com/ng-bootstrap/ng-bootstrap/commit/7c0d6d7)), closes [#2163](https://github.com/ng-bootstrap/ng-bootstrap/issues/2163) [#2167](https://github.com/ng-bootstrap/ng-bootstrap/issues/2167)
* **tooltip:** unregister event listener functions only if present ([b9ad060](https://github.com/ng-bootstrap/ng-bootstrap/commit/b9ad060)), closes [#2199](https://github.com/ng-bootstrap/ng-bootstrap/issues/2199) [#2205](https://github.com/ng-bootstrap/ng-bootstrap/issues/2205)
* **typeahead:** don't show hint if there is no active option ([5d20d1f](https://github.com/ng-bootstrap/ng-bootstrap/commit/5d20d1f)), closes [#2185](https://github.com/ng-bootstrap/ng-bootstrap/issues/2185) [#2198](https://github.com/ng-bootstrap/ng-bootstrap/issues/2198)



<a name="1.0.0"></a>
# [1.0.0](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.0-beta.9...1.0.0) (2018-01-26)

This is the first, stable release of ng-bootstrap!

### Bug Fixes

* **datepicker:** disable back navigation arrow ([384b2e8](https://github.com/ng-bootstrap/ng-bootstrap/commit/384b2e8)), closes [#2093](https://github.com/ng-bootstrap/ng-bootstrap/issues/2093) [#2110](https://github.com/ng-bootstrap/ng-bootstrap/issues/2110)
* **datepicker:** fix datepicker display in IE10 ([1cfaef0](https://github.com/ng-bootstrap/ng-bootstrap/commit/1cfaef0)), closes [#2094](https://github.com/ng-bootstrap/ng-bootstrap/issues/2094) [#2121](https://github.com/ng-bootstrap/ng-bootstrap/issues/2121)


<a name="1.0.0-beta.9"></a>
# [1.0.0-beta.9](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.0-beta.8...1.0.0-beta.9) (2018-01-05)

This release bumps up minimal Bootstrap CSS dependency to 4.0.0-beta.3.


### Bug Fixes

* **tooltip:** fix arrow positioning in Bootstrap beta.3 ([de56f10](https://github.com/ng-bootstrap/ng-bootstrap/commit/de56f10)), closes [#2067](https://github.com/ng-bootstrap/ng-bootstrap/issues/2067)



<a name="1.0.0-beta.8"></a>
# [1.0.0-beta.8](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.0-beta.7...1.0.0-beta.8) (2017-12-15)


### Bug Fixes

* **carousel:** use only public methods in template ([da31c3e](https://github.com/ng-bootstrap/ng-bootstrap/commit/da31c3e)), closes [#2038](https://github.com/ng-bootstrap/ng-bootstrap/issues/2038) [#2040](https://github.com/ng-bootstrap/ng-bootstrap/issues/2040)
* **datepicker:** support `NgbDateAdapter` in `NgbInputDatepicker` ([0e325ca](https://github.com/ng-bootstrap/ng-bootstrap/commit/0e325ca)), closes [#2002](https://github.com/ng-bootstrap/ng-bootstrap/issues/2002) [#2003](https://github.com/ng-bootstrap/ng-bootstrap/issues/2003)
* **pagination:** remove internal annotation ([f1137aa](https://github.com/ng-bootstrap/ng-bootstrap/commit/f1137aa)), closes [#2038](https://github.com/ng-bootstrap/ng-bootstrap/issues/2038) [#2041](https://github.com/ng-bootstrap/ng-bootstrap/issues/2041)
* **positioning:** fix positioning with the width constraint ([0df398c](https://github.com/ng-bootstrap/ng-bootstrap/commit/0df398c)), closes [#1876](https://github.com/ng-bootstrap/ng-bootstrap/issues/1876) [#1902](https://github.com/ng-bootstrap/ng-bootstrap/issues/1902)


### Features

* **datepicker:** simplify css handling of the navigation system ([9a27911](https://github.com/ng-bootstrap/ng-bootstrap/commit/9a27911)), closes [#1614](https://github.com/ng-bootstrap/ng-bootstrap/issues/1614)
* **typeahead:** allow search on focus and click ([96d073d](https://github.com/ng-bootstrap/ng-bootstrap/commit/96d073d)), closes [#698](https://github.com/ng-bootstrap/ng-bootstrap/issues/698) [#1990](https://github.com/ng-bootstrap/ng-bootstrap/issues/1990)



<a name="1.0.0-beta.7"></a>
# [1.0.0-beta.7](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.0-beta.6...1.0.0-beta.7) (2017-12-08)


This release bumps up minimal Angular dependency to 5.0.2.


<a name="1.0.0-beta.6"></a>
# [1.0.0-beta.6](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.0-beta.5...1.0.0-beta.6) (2017-12-01)

This release depends on Bootstrap beta.2 CSS.

### Bug Fixes

* **accordion:** hide panel when destroyOnHide set to false ([9e2df7f](https://github.com/ng-bootstrap/ng-bootstrap/commit/9e2df7f)), closes [#1915](https://github.com/ng-bootstrap/ng-bootstrap/issues/1915)
* **buttons:** mark the form control of a ngbRadioGroup as touched ([9dde9c2](https://github.com/ng-bootstrap/ng-bootstrap/commit/9dde9c2)), closes [#1987](https://github.com/ng-bootstrap/ng-bootstrap/issues/1987) [#1988](https://github.com/ng-bootstrap/ng-bootstrap/issues/1988)
* **datepicker:** close date picker after selecting the same date ([ea796de](https://github.com/ng-bootstrap/ng-bootstrap/commit/ea796de)), closes [#1783](https://github.com/ng-bootstrap/ng-bootstrap/issues/1783)
* **datepicker:** date selection regression for non-visible dates ([8e0ddb4](https://github.com/ng-bootstrap/ng-bootstrap/commit/8e0ddb4)), closes [#1974](https://github.com/ng-bootstrap/ng-bootstrap/issues/1974)
* **datepicker:** popup disabled state ([a05727e](https://github.com/ng-bootstrap/ng-bootstrap/commit/a05727e))
* **datepicker:** remove border from 'btn-link' style ([c6121b3](https://github.com/ng-bootstrap/ng-bootstrap/commit/c6121b3)), closes [#1900](https://github.com/ng-bootstrap/ng-bootstrap/issues/1900) [#1851](https://github.com/ng-bootstrap/ng-bootstrap/issues/1851)
* **datepicker:** use class btn with btn-link ([3648f46](https://github.com/ng-bootstrap/ng-bootstrap/commit/3648f46))
* **dropdown:** add "dropdown" class for placements other than "top" ([ed88f72](https://github.com/ng-bootstrap/ng-bootstrap/commit/ed88f72)), closes [#1847](https://github.com/ng-bootstrap/ng-bootstrap/issues/1847) [#1852](https://github.com/ng-bootstrap/ng-bootstrap/issues/1852)
* **dropdown:** adjust for better compatibility with universal ([9ad8f43](https://github.com/ng-bootstrap/ng-bootstrap/commit/9ad8f43)), closes [#1883](https://github.com/ng-bootstrap/ng-bootstrap/issues/1883)
* **popover:** added margin to arrow placement ([2506ae4](https://github.com/ng-bootstrap/ng-bootstrap/commit/2506ae4)), closes [#1845](https://github.com/ng-bootstrap/ng-bootstrap/issues/1845) [#1855](https://github.com/ng-bootstrap/ng-bootstrap/issues/1855)
* **timepicker:** remove border from 'btn-link' style ([3f9b909](https://github.com/ng-bootstrap/ng-bootstrap/commit/3f9b909)), closes [#1851](https://github.com/ng-bootstrap/ng-bootstrap/issues/1851) [#1901](https://github.com/ng-bootstrap/ng-bootstrap/issues/1901)
* **timepicker:** use class btn with btn-link ([e6a93e0](https://github.com/ng-bootstrap/ng-bootstrap/commit/e6a93e0))
* **typeahead:** don't close dropdown on typeahead input click ([fa9c080](https://github.com/ng-bootstrap/ng-bootstrap/commit/fa9c080)), closes [#1853](https://github.com/ng-bootstrap/ng-bootstrap/issues/1853) [#1989](https://github.com/ng-bootstrap/ng-bootstrap/issues/1989)


### Features

* **datepicker:** add Islamic Umalqura calendar ([22a7210](https://github.com/ng-bootstrap/ng-bootstrap/commit/22a7210))
* **datepicker:** add support for the container option ([6c7a31b](https://github.com/ng-bootstrap/ng-bootstrap/commit/6c7a31b)), closes [#1380](https://github.com/ng-bootstrap/ng-bootstrap/issues/1380) [#1857](https://github.com/ng-bootstrap/ng-bootstrap/issues/1857)
* **datepicker:** allow user to define his own date structure ([a406e52](https://github.com/ng-bootstrap/ng-bootstrap/commit/a406e52)), closes [#1753](https://github.com/ng-bootstrap/ng-bootstrap/issues/1753)
* **progressbar:** allow changing progressbar height ([b329be9](https://github.com/ng-bootstrap/ng-bootstrap/commit/b329be9)), closes [#1904](https://github.com/ng-bootstrap/ng-bootstrap/issues/1904) [#1908](https://github.com/ng-bootstrap/ng-bootstrap/issues/1908)
* **rating:** add 'index' variable in template ([2ed3632](https://github.com/ng-bootstrap/ng-bootstrap/commit/2ed3632)), closes [#1922](https://github.com/ng-bootstrap/ng-bootstrap/issues/1922) [#1931](https://github.com/ng-bootstrap/ng-bootstrap/issues/1931)
* **typeahead:** add exportAs property for ngbTypeahead ([c318045](https://github.com/ng-bootstrap/ng-bootstrap/commit/c318045)), closes [#1559](https://github.com/ng-bootstrap/ng-bootstrap/issues/1559)



<a name="1.0.0-beta.5"></a>
# [1.0.0-beta.5](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.0-beta.4...1.0.0-beta.5) (2017-09-14)


### Bug Fixes

* **modal:** remove unnecessary Injectable annotation ([0bf798d](https://github.com/ng-bootstrap/ng-bootstrap/commit/0bf798d)), closes [#1832](https://github.com/ng-bootstrap/ng-bootstrap/issues/1832) [#1833](https://github.com/ng-bootstrap/ng-bootstrap/issues/1833)



<a name="1.0.0-beta.4"></a>
# [1.0.0-beta.4](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.0-beta.3...1.0.0-beta.4) (2017-09-07)

Lot's of positioning updates in this release. Now you can use more positioning options and auto-positioning for
all widgets that open popups.

### Bug Fixes

* **positioning:** check for secondary available placements ([0f92c80](https://github.com/ng-bootstrap/ng-bootstrap/commit/0f92c80)), closes [#1819](https://github.com/ng-bootstrap/ng-bootstrap/issues/1819)


### Features

* add support for "auto" placement and multi-placement ([b73023a](https://github.com/ng-bootstrap/ng-bootstrap/commit/b73023a)), closes [#992](https://github.com/ng-bootstrap/ng-bootstrap/issues/992) [#1782](https://github.com/ng-bootstrap/ng-bootstrap/issues/1782)
* support more positioning options for tooltips and popovers ([4f1e518](https://github.com/ng-bootstrap/ng-bootstrap/commit/4f1e518)), closes [#857](https://github.com/ng-bootstrap/ng-bootstrap/issues/857) [#1772](https://github.com/ng-bootstrap/ng-bootstrap/issues/1772)
* **datepicker:** add support for placement "auto" ([d8bee8e](https://github.com/ng-bootstrap/ng-bootstrap/commit/d8bee8e)), closes [#1257](https://github.com/ng-bootstrap/ng-bootstrap/issues/1257) [#1820](https://github.com/ng-bootstrap/ng-bootstrap/issues/1820)
* **dropdown:** auto and array support in placement ([6123780](https://github.com/ng-bootstrap/ng-bootstrap/commit/6123780)), closes [#1171](https://github.com/ng-bootstrap/ng-bootstrap/issues/1171) [#1814](https://github.com/ng-bootstrap/ng-bootstrap/issues/1814)
* **modal:** add 'beforeDismiss' option ([a758eae](https://github.com/ng-bootstrap/ng-bootstrap/commit/a758eae)), closes [#1598](https://github.com/ng-bootstrap/ng-bootstrap/issues/1598) [#1799](https://github.com/ng-bootstrap/ng-bootstrap/issues/1799)
* **typeahead:** added support for placement ([a053819](https://github.com/ng-bootstrap/ng-bootstrap/commit/a053819)), closes [#1767](https://github.com/ng-bootstrap/ng-bootstrap/issues/1767) [#1821](https://github.com/ng-bootstrap/ng-bootstrap/issues/1821)



<a name="1.0.0-beta.3"></a>
# [1.0.0-beta.3](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.0-beta.2...1.0.0-beta.3) (2017-08-30)


### Bug Fixes

* restore compatibility with Angular 5.x ([f92f1e5](https://github.com/ng-bootstrap/ng-bootstrap/commit/f92f1e5)), closes [#1791](https://github.com/ng-bootstrap/ng-bootstrap/issues/1791) [#1792](https://github.com/ng-bootstrap/ng-bootstrap/issues/1792)



<a name="1.0.0-beta.2"></a>
# [1.0.0-beta.2](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.0-beta.1...1.0.0-beta.2) (2017-08-23)


### Bug Fixes

* **accordion:** align with Bootstrap 4.beta markup ([e32fb24](https://github.com/ng-bootstrap/ng-bootstrap/commit/e32fb24)), closes [#1050](https://github.com/ng-bootstrap/ng-bootstrap/issues/1050) [#1332](https://github.com/ng-bootstrap/ng-bootstrap/issues/1332)
* **dropdown:** correct TS typings ([9447f5d](https://github.com/ng-bootstrap/ng-bootstrap/commit/9447f5d)), closes [#1754](https://github.com/ng-bootstrap/ng-bootstrap/issues/1754)
* **dropdown:** restore support for dropups ([c7a16a5](https://github.com/ng-bootstrap/ng-bootstrap/commit/c7a16a5)), closes [#1747](https://github.com/ng-bootstrap/ng-bootstrap/issues/1747) [#1752](https://github.com/ng-bootstrap/ng-bootstrap/issues/1752)


### Features

* **accordion:** support nodes preservation ([f6cf01b](https://github.com/ng-bootstrap/ng-bootstrap/commit/f6cf01b)), closes [#1370](https://github.com/ng-bootstrap/ng-bootstrap/issues/1370)
* **tabset:** add nav justification and orientation ([73ba757](https://github.com/ng-bootstrap/ng-bootstrap/commit/73ba757)), closes [#1472](https://github.com/ng-bootstrap/ng-bootstrap/issues/1472) [#1239](https://github.com/ng-bootstrap/ng-bootstrap/issues/1239)


### BREAKING CHANGES

* **dropdown:** The `up` input is no longer supported by you can use more flexible
`placement` setting now.

Before:

```html
<div ngbDropdown [up]="true">
```

After:

```html
<div ngbDropdown placement="top-right">
```



<a name="1.0.0-beta.1"></a>
# [1.0.0-beta.1](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.0-alpha.31...1.0.0-beta.1) (2017-08-11)

ng-bootstrap goes BETA (and requires Bootstrap CSS 4.0.0-beta now)!

### Bug Fixes

* **dropdown:** update for Bootstrap4.beta ([877c696](https://github.com/ng-bootstrap/ng-bootstrap/commit/877c696)), closes [#1745](https://github.com/ng-bootstrap/ng-bootstrap/issues/1745)
* **popover:** account for margins when positioning popovers ([5a7df43](https://github.com/ng-bootstrap/ng-bootstrap/commit/5a7df43))


### Features

* **buttons:** allow vertical radio buttons ([a38257d](https://github.com/ng-bootstrap/ng-bootstrap/commit/a38257d)), closes [#1231](https://github.com/ng-bootstrap/ng-bootstrap/issues/1231) [#1238](https://github.com/ng-bootstrap/ng-bootstrap/issues/1238) [#1733](https://github.com/ng-bootstrap/ng-bootstrap/issues/1733)
* **dropdown:** distinguish inside and outside clicks for autoClose ([bb975af](https://github.com/ng-bootstrap/ng-bootstrap/commit/bb975af)), closes [#1022](https://github.com/ng-bootstrap/ng-bootstrap/issues/1022)


### BREAKING CHANGES

* ng-bootstrap now requires Bootstrap CSS 4.0.0-beta
* **buttons:** The `btn-group` CSS class needs to added explicitly for radio buttons.

Before:

```
<div ngbRadioGroup ...>
  ...
</div>
```

After:

```
<div class="btn-group" ngbRadioGroup ...>
  ...
</div>
```
* **dropdown:** Dropdown menu now requires usage of the new `ngbDropdownMenu` directive.

Before:

```html
<div ngbDropdown>
  <button ngbDropdownToggle>Toggle dropdown</button>
  <div class="dropdown-menu">
    <a class="dropdown-item">Action</a>
  </div>
</div>
```

After (notice **ngbDropdownMenu**):

```html
<div ngbDropdown>
  <button ngbDropdownToggle>Toggle dropdown</button>
  <div ngbDropdownMenu>
    <a class="dropdown-item">Action</a>
  </div>
</div>
```



<a name="1.0.0-alpha.31"></a>
# [1.0.0-alpha.31](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.0-alpha.30...1.0.0-alpha.31) (2017-08-11)

This is the last alpha release of ng-bootstrap. Next stop - beta!

### Bug Fixes

* **typeahead:** resubscribe for value changes on blur, esc, enter ([47797d3](https://github.com/ng-bootstrap/ng-bootstrap/commit/47797d3)), closes [#723](https://github.com/ng-bootstrap/ng-bootstrap/issues/723) [#1244](https://github.com/ng-bootstrap/ng-bootstrap/issues/1244)


### Features

* **typeahead:** add support for the 'container' input ([bc3fd61](https://github.com/ng-bootstrap/ng-bootstrap/commit/bc3fd61)), closes [#1105](https://github.com/ng-bootstrap/ng-bootstrap/issues/1105) [#1731](https://github.com/ng-bootstrap/ng-bootstrap/issues/1731)



<a name="1.0.0-alpha.30"></a>
# [1.0.0-alpha.30](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.0-alpha.29...1.0.0-alpha.30) (2017-08-03)


### Bug Fixes

* **buttons:** set name on radio inputs to fix keyboard navigation ([3bfd82d](https://github.com/ng-bootstrap/ng-bootstrap/commit/3bfd82d)), closes [#1704](https://github.com/ng-bootstrap/ng-bootstrap/issues/1704) [#1706](https://github.com/ng-bootstrap/ng-bootstrap/issues/1706)
* **carousel:** restart timer when interval changed ([ae4e3e9](https://github.com/ng-bootstrap/ng-bootstrap/commit/ae4e3e9)), closes [#1690](https://github.com/ng-bootstrap/ng-bootstrap/issues/1690) [#1702](https://github.com/ng-bootstrap/ng-bootstrap/issues/1702)
* **datepicker:** focus datepicker after opening it inside the popup ([0dbe0cb](https://github.com/ng-bootstrap/ng-bootstrap/commit/0dbe0cb)), closes [#1708](https://github.com/ng-bootstrap/ng-bootstrap/issues/1708) [#1717](https://github.com/ng-bootstrap/ng-bootstrap/issues/1717)
* **datepicker:** propagate model and validation state on 'input' event ([38b8ffa](https://github.com/ng-bootstrap/ng-bootstrap/commit/38b8ffa)), closes [#1225](https://github.com/ng-bootstrap/ng-bootstrap/issues/1225) [#1605](https://github.com/ng-bootstrap/ng-bootstrap/issues/1605)
* **datepicker:** retain manually entered values even if invalid ([4bd81c3](https://github.com/ng-bootstrap/ng-bootstrap/commit/4bd81c3)), closes [#1710](https://github.com/ng-bootstrap/ng-bootstrap/issues/1710) [#1725](https://github.com/ng-bootstrap/ng-bootstrap/issues/1725)


### Features

* **modal:** add injector option ([0829b30](https://github.com/ng-bootstrap/ng-bootstrap/commit/0829b30)), closes [#1686](https://github.com/ng-bootstrap/ng-bootstrap/issues/1686) [#1685](https://github.com/ng-bootstrap/ng-bootstrap/issues/1685)



<a name="1.0.0-alpha.29"></a>
# [1.0.0-alpha.29](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.0-alpha.28...1.0.0-alpha.29) (2017-07-25)


### Bug Fixes

* **buttons:** make buttons selectors more specific ([f9bc76e](https://github.com/ng-bootstrap/ng-bootstrap/commit/f9bc76e)), closes [#1125](https://github.com/ng-bootstrap/ng-bootstrap/issues/1125) [#1678](https://github.com/ng-bootstrap/ng-bootstrap/issues/1678)
* **modal:** don't try to focus non-focusable elements ([0c03671](https://github.com/ng-bootstrap/ng-bootstrap/commit/0c03671)), closes [#1627](https://github.com/ng-bootstrap/ng-bootstrap/issues/1627) [#1691](https://github.com/ng-bootstrap/ng-bootstrap/issues/1691)
* **timepicker:** account for CD before model write (meridian case) ([ffd86bc](https://github.com/ng-bootstrap/ng-bootstrap/commit/ffd86bc)), closes [#1696](https://github.com/ng-bootstrap/ng-bootstrap/issues/1696) [#1699](https://github.com/ng-bootstrap/ng-bootstrap/issues/1699)
* **timepicker:** switch to PM when hour > 12 ([5cbb429](https://github.com/ng-bootstrap/ng-bootstrap/commit/5cbb429)), closes [#1680](https://github.com/ng-bootstrap/ng-bootstrap/issues/1680) [#1684](https://github.com/ng-bootstrap/ng-bootstrap/issues/1684)


### Features

* **buttons:** add support for checkbox buttons ([b433e7b](https://github.com/ng-bootstrap/ng-bootstrap/commit/b433e7b)), closes [#890](https://github.com/ng-bootstrap/ng-bootstrap/issues/890) [#1688](https://github.com/ng-bootstrap/ng-bootstrap/issues/1688)


### BREAKING CHANGES

* **buttons:** The `NgbButtonsModule` changed location (path) and content. This path
might need adjusting for people importing individual modules.
Before: `import {NgbButtonsModule} from './buttons/radio.module'`
After:  `import {NgbButtonsModule} from './buttons/buttons.module'`

The `NgbButtonsModule` now contains both checkbox and radio buttons.
* **buttons:** Selectors for radio buttons related directives were changed and now both label
and input require ng-bootstrap specific attributes as selectors.

Before:

```
<div [(ngModel)]="model" ngbRadioGroup>
  <label class="btn">
    <input type="radio" name="radio" [value]="values[0]"/> {{ values[0] }}
  </label>
  <label class="btn">
    <input type="radio" name="radio" [value]="values[1]"/> {{ values[1] }}
  </label>
</div>
```

After:

```
<div [(ngModel)]="model" ngbRadioGroup>
  <label ngbButtonLabel>
    <input ngbButton type="radio" name="radio" [value]="values[0]"/> {{ values[0] }}
  </label>
  <label ngbButtonLabel>
    <input ngbButton type="radio" name="radio" [value]="values[1]"/> {{ values[1] }}
  </label>
</div>
```

Notice new `ngbButtonLabel` and `ngbButton` attributes that act as new selectors.



<a name="1.0.0-alpha.28"></a>
# [1.0.0-alpha.28](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.0-alpha.27...1.0.0-alpha.28) (2017-07-11)


### Bug Fixes

* **datepicker:** use noon instead of midnight for date conversion ([2fdd8f1](https://github.com/ng-bootstrap/ng-bootstrap/commit/2fdd8f1)), closes [#1615](https://github.com/ng-bootstrap/ng-bootstrap/issues/1615) [#1676](https://github.com/ng-bootstrap/ng-bootstrap/issues/1676)
* **timepicker:** respect meridian setting when entering hours ([62c5ae3](https://github.com/ng-bootstrap/ng-bootstrap/commit/62c5ae3)), closes [#1631](https://github.com/ng-bootstrap/ng-bootstrap/issues/1631) [#1636](https://github.com/ng-bootstrap/ng-bootstrap/issues/1636)
* **typeahead:** avoid unnecessary re-creation of DOM nodes ([0c19153](https://github.com/ng-bootstrap/ng-bootstrap/commit/0c19153)), closes [#1659](https://github.com/ng-bootstrap/ng-bootstrap/issues/1659) [#1674](https://github.com/ng-bootstrap/ng-bootstrap/issues/1674)


### Features

* **datepicker:** add keyboard navigation ([bd94215](https://github.com/ng-bootstrap/ng-bootstrap/commit/bd94215))


### BREAKING CHANGES

* **datepicker:** component uses `ChangeDetectionStrategy.OnPush` now for most of the internal implementation.
Things like the dynamic internationalization or calendar change might not work anymore as these are injected services. Any internal changes in these services in runtime will not trigger datepicker re-rendering.



<a name="1.0.0-alpha.27"></a>
# [1.0.0-alpha.27](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.0-alpha.26...1.0.0-alpha.27) (2017-06-30)


### Bug Fixes

* support closure-compiler in the library ([5cfd9e4](https://github.com/ng-bootstrap/ng-bootstrap/commit/5cfd9e4))
* **datepicker:** consider empty string inputs as valid ([95d1668](https://github.com/ng-bootstrap/ng-bootstrap/commit/95d1668)), closes [#1588](https://github.com/ng-bootstrap/ng-bootstrap/issues/1588) [#1637](https://github.com/ng-bootstrap/ng-bootstrap/issues/1637)
* **popover:** popover not positioned properly ([85fadb8](https://github.com/ng-bootstrap/ng-bootstrap/commit/85fadb8)), closes [#1649](https://github.com/ng-bootstrap/ng-bootstrap/issues/1649)
* **positioning:** top-right, right-bottom, bottom-right, left-bottom ([4689b4b](https://github.com/ng-bootstrap/ng-bootstrap/commit/4689b4b)), closes [#1561](https://github.com/ng-bootstrap/ng-bootstrap/issues/1561)
* **tooltip:** properly position tooltips close to container edges ([4a221c1](https://github.com/ng-bootstrap/ng-bootstrap/commit/4a221c1)), closes [#1263](https://github.com/ng-bootstrap/ng-bootstrap/issues/1263) [#1371](https://github.com/ng-bootstrap/ng-bootstrap/issues/1371) [#1643](https://github.com/ng-bootstrap/ng-bootstrap/issues/1643)


### Features

* **carousel:** add event on carousel slide with direction info ([5d79c00](https://github.com/ng-bootstrap/ng-bootstrap/commit/5d79c00)), closes [#1356](https://github.com/ng-bootstrap/ng-bootstrap/issues/1356) [#1406](https://github.com/ng-bootstrap/ng-bootstrap/issues/1406)
* **datepicker:** allow positioning of datepicker popup ([3e22a63](https://github.com/ng-bootstrap/ng-bootstrap/commit/3e22a63)), closes [#1082](https://github.com/ng-bootstrap/ng-bootstrap/issues/1082) [#1570](https://github.com/ng-bootstrap/ng-bootstrap/issues/1570)
* **typeahead:** export the NgbHighlight component ([a89cc97](https://github.com/ng-bootstrap/ng-bootstrap/commit/a89cc97)), closes [#1553](https://github.com/ng-bootstrap/ng-bootstrap/issues/1553) [#1555](https://github.com/ng-bootstrap/ng-bootstrap/issues/1555)



<a name="1.0.0-alpha.26"></a>
# [1.0.0-alpha.26](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.0-alpha.25...1.0.0-alpha.26) (2017-05-16)


### Bug Fixes

* **datepicker:** prevent memory leak caused by ngZone subscription ([c0c093b](https://github.com/ng-bootstrap/ng-bootstrap/commit/c0c093b)), closes [#1534](https://github.com/ng-bootstrap/ng-bootstrap/issues/1534)
* **rating:** properly propagate control's touched state ([53aa678](https://github.com/ng-bootstrap/ng-bootstrap/commit/53aa678)), closes [#1514](https://github.com/ng-bootstrap/ng-bootstrap/issues/1514) [#1532](https://github.com/ng-bootstrap/ng-bootstrap/issues/1532)


### Features

* **rating:** allow set rating to 0 on click ([e3100e5](https://github.com/ng-bootstrap/ng-bootstrap/commit/e3100e5)), closes [#1284](https://github.com/ng-bootstrap/ng-bootstrap/issues/1284) [#1515](https://github.com/ng-bootstrap/ng-bootstrap/issues/1515)



<a name="1.0.0-alpha.25"></a>
# [1.0.0-alpha.25](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.0-alpha.24...1.0.0-alpha.25) (2017-04-25)


### Features

* bump up Angular dependency to 4.0.3 ([26bc8df](https://github.com/ng-bootstrap/ng-bootstrap/commit/26bc8df)), closes [#1337](https://github.com/ng-bootstrap/ng-bootstrap/issues/1337) [#1415](https://github.com/ng-bootstrap/ng-bootstrap/issues/1415) [#1433](https://github.com/ng-bootstrap/ng-bootstrap/issues/1433) [#1439](https://github.com/ng-bootstrap/ng-bootstrap/issues/1439) [#1512](https://github.com/ng-bootstrap/ng-bootstrap/issues/1512)


### BREAKING CHANGES

* ng-bootstrap requires a minimal version of Angular 4.0.3



<a name="1.0.0-alpha.24"></a>
# [1.0.0-alpha.24](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.0-alpha.23...1.0.0-alpha.24) (2017-04-22)


### Bug Fixes

* **buttons:** add `role="group"` to radio group ([c847a92](https://github.com/ng-bootstrap/ng-bootstrap/commit/c847a92)), closes [#1503](https://github.com/ng-bootstrap/ng-bootstrap/issues/1503)
* **collapse:** remove aria-expanded from target ([a24b283](https://github.com/ng-bootstrap/ng-bootstrap/commit/a24b283)), closes [#1492](https://github.com/ng-bootstrap/ng-bootstrap/issues/1492)


### Features

* **rating:** set aria-disabled="true" when readonly ([c89f2c4](https://github.com/ng-bootstrap/ng-bootstrap/commit/c89f2c4)), closes [#1489](https://github.com/ng-bootstrap/ng-bootstrap/issues/1489)
* **timepicker:** replace table layout with flexbox ([b94a126](https://github.com/ng-bootstrap/ng-bootstrap/commit/b94a126)), closes [#1498](https://github.com/ng-bootstrap/ng-bootstrap/issues/1498)



<a name="1.0.0-alpha.23"></a>
# [1.0.0-alpha.23](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.0-alpha.22...1.0.0-alpha.23) (2017-04-12)


### Bug Fixes

* **accordion:** disabled links are announced and focusable ([e836798](https://github.com/ng-bootstrap/ng-bootstrap/commit/e836798)), closes [#1443](https://github.com/ng-bootstrap/ng-bootstrap/issues/1443)
* **accordion:** remove aria-controls when panel is not in DOM ([44acc44](https://github.com/ng-bootstrap/ng-bootstrap/commit/44acc44)), closes [#1482](https://github.com/ng-bootstrap/ng-bootstrap/issues/1482)
* **accordion:** remove unneeded aria-selected ([92ae3fd](https://github.com/ng-bootstrap/ng-bootstrap/commit/92ae3fd)), closes [#1159](https://github.com/ng-bootstrap/ng-bootstrap/issues/1159) [#1438](https://github.com/ng-bootstrap/ng-bootstrap/issues/1438)
* **carousel:** remove inappropriate role="listbox" from carousel ([39e1df5](https://github.com/ng-bootstrap/ng-bootstrap/commit/39e1df5)), closes [#1484](https://github.com/ng-bootstrap/ng-bootstrap/issues/1484)
* **datepicker:** add stricter checks on dates validity ([184f45a](https://github.com/ng-bootstrap/ng-bootstrap/commit/184f45a)), closes [#1230](https://github.com/ng-bootstrap/ng-bootstrap/issues/1230) [#1442](https://github.com/ng-bootstrap/ng-bootstrap/issues/1442)
* **pagination:** remove duplicate accessibility labels ([4960533](https://github.com/ng-bootstrap/ng-bootstrap/commit/4960533)), closes [#1429](https://github.com/ng-bootstrap/ng-bootstrap/issues/1429)
* **rating:** correct aria attribute setting ([4575573](https://github.com/ng-bootstrap/ng-bootstrap/commit/4575573)), closes [#1479](https://github.com/ng-bootstrap/ng-bootstrap/issues/1479)
* **rating:** properly support disabled control state ([a29da45](https://github.com/ng-bootstrap/ng-bootstrap/commit/a29da45)), closes [#1432](https://github.com/ng-bootstrap/ng-bootstrap/issues/1432) [#1435](https://github.com/ng-bootstrap/ng-bootstrap/issues/1435)
* **tabs:** prevent focus of disabled tabs ([7d1dd97](https://github.com/ng-bootstrap/ng-bootstrap/commit/7d1dd97)), closes [#1430](https://github.com/ng-bootstrap/ng-bootstrap/issues/1430)
* **tabs:** remove aria-controls when content is destroyed ([a2a8a74](https://github.com/ng-bootstrap/ng-bootstrap/commit/a2a8a74)), closes [#1485](https://github.com/ng-bootstrap/ng-bootstrap/issues/1485)
* **tabset:** remove unneeded tabpanel role on container ([5005384](https://github.com/ng-bootstrap/ng-bootstrap/commit/5005384)), closes [#1409](https://github.com/ng-bootstrap/ng-bootstrap/issues/1409)
* **timepicker:** improve accessibility ([b2942d3](https://github.com/ng-bootstrap/ng-bootstrap/commit/b2942d3)), closes [#1480](https://github.com/ng-bootstrap/ng-bootstrap/issues/1480)
* **timepicker:** scale chevrons when size option is used ([493d0b3](https://github.com/ng-bootstrap/ng-bootstrap/commit/493d0b3)), closes [#1300](https://github.com/ng-bootstrap/ng-bootstrap/issues/1300) [#1405](https://github.com/ng-bootstrap/ng-bootstrap/issues/1405)
* **typeahead:** fix ARIA attributes ([ba4f48f](https://github.com/ng-bootstrap/ng-bootstrap/commit/ba4f48f)), closes [#1454](https://github.com/ng-bootstrap/ng-bootstrap/issues/1454) [#1454](https://github.com/ng-bootstrap/ng-bootstrap/issues/1454)


### Features

* **datepicker:** add validation ([4cbea99](https://github.com/ng-bootstrap/ng-bootstrap/commit/4cbea99)), closes [#1222](https://github.com/ng-bootstrap/ng-bootstrap/issues/1222) [#1434](https://github.com/ng-bootstrap/ng-bootstrap/issues/1434)
* **pagination:** improve accessibility ([424c38f](https://github.com/ng-bootstrap/ng-bootstrap/commit/424c38f)), closes [#1294](https://github.com/ng-bootstrap/ng-bootstrap/issues/1294)
* **popover:** add aria-describedby to popover triggering element ([92e4804](https://github.com/ng-bootstrap/ng-bootstrap/commit/92e4804)), closes [#1412](https://github.com/ng-bootstrap/ng-bootstrap/issues/1412)
* **tooltip:** add aria-describedby to tooltip triggering element ([0883635](https://github.com/ng-bootstrap/ng-bootstrap/commit/0883635)), closes [#1386](https://github.com/ng-bootstrap/ng-bootstrap/issues/1386)
* **typeahead:** add accessibility support ([e1fa7a4](https://github.com/ng-bootstrap/ng-bootstrap/commit/e1fa7a4)), closes [#1321](https://github.com/ng-bootstrap/ng-bootstrap/issues/1321)


### BREAKING CHANGES

* **datepicker:** Datepickers in popups are much stricter about valid dates
now and won't try to auto-correct invalid dates any more.
For example 2017-99-99 was considered valid previously and
auto-corrected. This is not the case any more. Please check
control's validity to detect invalid dates entered by users.
* **datepicker:** Invalid dates entered by a user into datepicker input are
propagated to the model as-is. This is required to properly
support validation and is in-line with behaviour of all the
built-in Angular validators. From now on you need to check
control's validity to determine if the entered date is valid
or not.



<a name="1.0.0-alpha.22"></a>
# [1.0.0-alpha.22](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.0-alpha.21...1.0.0-alpha.22) (2017-03-24)

This is a small release that contains peerDependencies adjustments needed to support Angular 4.x. This library
was tested with the latest Angular and now fully supports both 4.x and 2.x.

### Bug Fixes

* **datepicker:** handle collapsed days/weeks properly ([4f54bfa](https://github.com/ng-bootstrap/ng-bootstrap/commit/4f54bfa)), closes [#1377](https://github.com/ng-bootstrap/ng-bootstrap/issues/1377) [#1383](https://github.com/ng-bootstrap/ng-bootstrap/issues/1383)



<a name="1.0.0-alpha.21"></a>
# [1.0.0-alpha.21](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.0-alpha.20...1.0.0-alpha.21) (2017-03-15)


### Bug Fixes

* **datepicker:** allow datepicker calendar override ([2792768](https://github.com/ng-bootstrap/ng-bootstrap/commit/2792768)), closes [#1366](https://github.com/ng-bootstrap/ng-bootstrap/issues/1366)
* **datepicker:** protect against invalid inputs ([eaf2de1](https://github.com/ng-bootstrap/ng-bootstrap/commit/eaf2de1)), closes [#1308](https://github.com/ng-bootstrap/ng-bootstrap/issues/1308) [#1364](https://github.com/ng-bootstrap/ng-bootstrap/issues/1364)
* **rating:** don't fire change event on init ([815cc20](https://github.com/ng-bootstrap/ng-bootstrap/commit/815cc20)), closes [#1282](https://github.com/ng-bootstrap/ng-bootstrap/issues/1282) [#1306](https://github.com/ng-bootstrap/ng-bootstrap/issues/1306) [#1357](https://github.com/ng-bootstrap/ng-bootstrap/issues/1357)


### Features

* **datepicker:** initial version of Hijri calendar ([1cf0c02](https://github.com/ng-bootstrap/ng-bootstrap/commit/1cf0c02))
* **model:** introduce the 'container' option ([743db91](https://github.com/ng-bootstrap/ng-bootstrap/commit/743db91)), closes [#1018](https://github.com/ng-bootstrap/ng-bootstrap/issues/1018) [#1264](https://github.com/ng-bootstrap/ng-bootstrap/issues/1264) [#1373](https://github.com/ng-bootstrap/ng-bootstrap/issues/1373)
* **tabset:** improve accessibility ([d7722ad](https://github.com/ng-bootstrap/ng-bootstrap/commit/d7722ad)), closes [#1327](https://github.com/ng-bootstrap/ng-bootstrap/issues/1327)
* **tabset:** support nodes preservation ([79dd101](https://github.com/ng-bootstrap/ng-bootstrap/commit/79dd101)), closes [#1161](https://github.com/ng-bootstrap/ng-bootstrap/issues/1161) [#1369](https://github.com/ng-bootstrap/ng-bootstrap/issues/1369)


### BREAKING CHANGES

* model: The `ngbModalContainer` directive is no longer needed and was
removed from this project. Just remove any references to the
`<template ngbModalContainer></template>` from your projects.



<a name="1.0.0-alpha.20"></a>
# [1.0.0-alpha.20](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.0-alpha.19...1.0.0-alpha.20) (2017-02-02)


### Bug Fixes

* **alert:** add missing alert-dismissible CSS class ([e2691b9](https://github.com/ng-bootstrap/ng-bootstrap/commit/e2691b9)), closes [#1267](https://github.com/ng-bootstrap/ng-bootstrap/issues/1267) [#1270](https://github.com/ng-bootstrap/ng-bootstrap/issues/1270)
* **datepicker:** mark dates without a day as invalid ([c57f913](https://github.com/ng-bootstrap/ng-bootstrap/commit/c57f913)), closes [#1278](https://github.com/ng-bootstrap/ng-bootstrap/issues/1278) [#1279](https://github.com/ng-bootstrap/ng-bootstrap/issues/1279)
* **datepicker:** navigation arrows not responding on Firefox when navigation=="arrows" ([e2410f9](https://github.com/ng-bootstrap/ng-bootstrap/commit/e2410f9)), closes [#1254](https://github.com/ng-bootstrap/ng-bootstrap/issues/1254)
* **timepicker:** correct input alligements ([9649ab2](https://github.com/ng-bootstrap/ng-bootstrap/commit/9649ab2)), closes [#1280](https://github.com/ng-bootstrap/ng-bootstrap/issues/1280)
* **typeahead:** don't modify Observable prototype ([ae6abb7](https://github.com/ng-bootstrap/ng-bootstrap/commit/ae6abb7)), closes [#1242](https://github.com/ng-bootstrap/ng-bootstrap/issues/1242) [#1256](https://github.com/ng-bootstrap/ng-bootstrap/issues/1256)


### Features

* **progressbar:** add possibility to specify progressbars content ([8e03090](https://github.com/ng-bootstrap/ng-bootstrap/commit/8e03090)), closes [#1251](https://github.com/ng-bootstrap/ng-bootstrap/issues/1251) [#1259](https://github.com/ng-bootstrap/ng-bootstrap/issues/1259)
* **progressbar:** show current value of progressbar ([83e01de](https://github.com/ng-bootstrap/ng-bootstrap/commit/83e01de)), closes [#1251](https://github.com/ng-bootstrap/ng-bootstrap/issues/1251) [#1269](https://github.com/ng-bootstrap/ng-bootstrap/issues/1269)
* **timepicker:** add input and meridian button sizing ([89c1e6b](https://github.com/ng-bootstrap/ng-bootstrap/commit/89c1e6b)), closes [#1094](https://github.com/ng-bootstrap/ng-bootstrap/issues/1094) [#1258](https://github.com/ng-bootstrap/ng-bootstrap/issues/1258)



<a name="1.0.0-alpha.19"></a>
# [1.0.0-alpha.19](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.0-alpha.18...1.0.0-alpha.19) (2017-01-25)

This release comes with many improvements to the datepicker: better layout as well as look & feel.
We are also bumping up minimal Angular version to 2.3.1 - this is required so we can provide better APIs for modal.

### Chores

* update angular version ([43b8e2b](https://github.com/ng-bootstrap/ng-bootstrap/commit/43b8e2b))

### Bug Fixes

* **datepicker:** account for undefined values in ngOnChanges ([8803847](https://github.com/ng-bootstrap/ng-bootstrap/commit/8803847)), closes [#1202](https://github.com/ng-bootstrap/ng-bootstrap/issues/1202) [#1229](https://github.com/ng-bootstrap/ng-bootstrap/issues/1229)
* **dropdown:** do not close dropdown on right button click ([b6bb9e9](https://github.com/ng-bootstrap/ng-bootstrap/commit/b6bb9e9)), closes [#1211](https://github.com/ng-bootstrap/ng-bootstrap/issues/1211)
* **pagination:** fix unnecessary ellipsis between sibling page numbers ([b607652](https://github.com/ng-bootstrap/ng-bootstrap/commit/b607652)), closes [#1166](https://github.com/ng-bootstrap/ng-bootstrap/issues/1166) [#1232](https://github.com/ng-bootstrap/ng-bootstrap/issues/1232) [#1233](https://github.com/ng-bootstrap/ng-bootstrap/issues/1233)

### Features

* **datepicker:** add full month name versions to i18n ([106fa82](https://github.com/ng-bootstrap/ng-bootstrap/commit/106fa82)), closes [#1217](https://github.com/ng-bootstrap/ng-bootstrap/issues/1217)
* **datepicker:** improve default look and feel ([d88c8b7](https://github.com/ng-bootstrap/ng-bootstrap/commit/d88c8b7)), closes [#706](https://github.com/ng-bootstrap/ng-bootstrap/issues/706) [#1061](https://github.com/ng-bootstrap/ng-bootstrap/issues/1061) [#1205](https://github.com/ng-bootstrap/ng-bootstrap/issues/1205)
* **tabset:** add an option for tabs horizontal alignment ([00114f3](https://github.com/ng-bootstrap/ng-bootstrap/commit/00114f3)), closes [#1210](https://github.com/ng-bootstrap/ng-bootstrap/issues/1210)


### BREAKING CHANGES

* minimal angular version was updated to 2.3.1.
Angular@^2.3.1 will have to be used as a peer dependency from now on.

* datepicker: `NgbDatepickerI18n` methods were renamed:

`getWeekdayName` to `getWeekdayShortName`
`getMonthName` to `getMonthShortName`

* datepicker: switched to flex layout instead of table-based (drop IE9 support) and prefixed datepicker-related css classes with `ngb-dp-`



<a name="1.0.0-alpha.18"></a>
# [1.0.0-alpha.18](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.0-alpha.17...1.0.0-alpha.18) (2017-01-09)

This release adds full compatibility with Bootstrap CSS version 4.0.0-alpha.6!

### Chores

* upgrade documentation to bootstrap-4.0.0-alpha.6 ([4499927](https://github.com/ng-bootstrap/ng-bootstrap/commit/4499927)), closes [#1192](https://github.com/ng-bootstrap/ng-bootstrap/issues/1192)


### Features

* **carousel:** upgrade carousel to v4-alpha.6 ([e9f539a](https://github.com/ng-bootstrap/ng-bootstrap/commit/e9f539a)), closes [#1190](https://github.com/ng-bootstrap/ng-bootstrap/issues/1190)
* **collapse:** upgrade collapse to v4-alpha.6 ([6cda8b3](https://github.com/ng-bootstrap/ng-bootstrap/commit/6cda8b3)), closes [#1183](https://github.com/ng-bootstrap/ng-bootstrap/issues/1183)
* **datepicker:** upgrade datepicker to v4-alpha.6 ([b60e2d7](https://github.com/ng-bootstrap/ng-bootstrap/commit/b60e2d7)), closes [#1187](https://github.com/ng-bootstrap/ng-bootstrap/issues/1187)
* **dropdown:** upgrade to 4.0.0-alpha.6 ([d8bfe37](https://github.com/ng-bootstrap/ng-bootstrap/commit/d8bfe37)), closes [#1180](https://github.com/ng-bootstrap/ng-bootstrap/issues/1180) [#1182](https://github.com/ng-bootstrap/ng-bootstrap/issues/1182)
* **modal:** upgrade modal to v4-alpha.6 ([7ab022b](https://github.com/ng-bootstrap/ng-bootstrap/commit/7ab022b)), closes [#1185](https://github.com/ng-bootstrap/ng-bootstrap/issues/1185)
* **popover:** upgrade popover to v4-alpha.6 ([60fd5d9](https://github.com/ng-bootstrap/ng-bootstrap/commit/60fd5d9)), closes [#1189](https://github.com/ng-bootstrap/ng-bootstrap/issues/1189)
* **timepicker:** upgrade timepicker to v4-alpha.6 ([4288e22](https://github.com/ng-bootstrap/ng-bootstrap/commit/4288e22)), closes [#1186](https://github.com/ng-bootstrap/ng-bootstrap/issues/1186)
* **tooltip:** upgrade tooltip to v4-alpha.6 ([0000aa3](https://github.com/ng-bootstrap/ng-bootstrap/commit/0000aa3)), closes [#1188](https://github.com/ng-bootstrap/ng-bootstrap/issues/1188)


### BREAKING CHANGES

* This version is compatible with bootstrap-4.0.0-alpha.6, and is not backward-compatible with previous versions of bootstrap. If you choose to upgrade to this version of ng-bootstrap, you will thus also have to migrate to bootstrap-4.0.0-alpha.6.



<a name="1.0.0-alpha.17"></a>
# [1.0.0-alpha.17](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.0-alpha.16...1.0.0-alpha.17) (2017-01-09)

This is a very small release that restores TypeScript 1.8 compatibility.
Additionally it and fixes plunks to work with Bootstrap version 4.0.0-alpha.5
(this is in preparation for full support of Bootstrap 4.0.0-alpha.6)

### Bug Fixes

* **buttons:** restore TS 1.8 compatibility ([8cd6c62](https://github.com/ng-bootstrap/ng-bootstrap/commit/8cd6c62)), closes [#1175](https://github.com/ng-bootstrap/ng-bootstrap/issues/1175) [#1176](https://github.com/ng-bootstrap/ng-bootstrap/issues/1176)



<a name="1.0.0-alpha.16"></a>
# [1.0.0-alpha.16](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.0-alpha.15...1.0.0-alpha.16) (2017-01-02)


### Bug Fixes

* **buttons:** properly manage disabled state of group interactions ([e24f4c6](https://github.com/ng-bootstrap/ng-bootstrap/commit/e24f4c6)), closes [#1143](https://github.com/ng-bootstrap/ng-bootstrap/issues/1143) [#1148](https://github.com/ng-bootstrap/ng-bootstrap/issues/1148)


### Features

* export all directives ([4554855](https://github.com/ng-bootstrap/ng-bootstrap/commit/4554855)), closes [#779](https://github.com/ng-bootstrap/ng-bootstrap/issues/779) [#1154](https://github.com/ng-bootstrap/ng-bootstrap/issues/1154)
* **pagination:** add disabled state support ([2827e50](https://github.com/ng-bootstrap/ng-bootstrap/commit/2827e50)), closes [#1153](https://github.com/ng-bootstrap/ng-bootstrap/issues/1153) [#1155](https://github.com/ng-bootstrap/ng-bootstrap/issues/1155)
* **popover:** pass context to popup open method ([87d569b](https://github.com/ng-bootstrap/ng-bootstrap/commit/87d569b)), closes [#1145](https://github.com/ng-bootstrap/ng-bootstrap/issues/1145)



<a name="1.0.0-alpha.15"></a>
# [1.0.0-alpha.15](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.0-alpha.14...1.0.0-alpha.15) (2016-12-15)


### Bug Fixes

* **buttons:** properly handle disabled property on a button level ([cc88ed2](https://github.com/ng-bootstrap/ng-bootstrap/commit/cc88ed2)), closes [#1088](https://github.com/ng-bootstrap/ng-bootstrap/issues/1088) [#1089](https://github.com/ng-bootstrap/ng-bootstrap/issues/1089) [#1095](https://github.com/ng-bootstrap/ng-bootstrap/issues/1095) [#1141](https://github.com/ng-bootstrap/ng-bootstrap/issues/1141)
* **datepicker:** protect against invalid min, max and start dates ([186c0e1](https://github.com/ng-bootstrap/ng-bootstrap/commit/186c0e1)), closes [#1062](https://github.com/ng-bootstrap/ng-bootstrap/issues/1062) [#1092](https://github.com/ng-bootstrap/ng-bootstrap/issues/1092)
* **datepicker:** use `td` in arrows navigation ([6b8827a](https://github.com/ng-bootstrap/ng-bootstrap/commit/6b8827a)), closes [#1086](https://github.com/ng-bootstrap/ng-bootstrap/issues/1086)
* **pagination:** prevent focus of disabled selectors ([733fc54](https://github.com/ng-bootstrap/ng-bootstrap/commit/733fc54)), closes [#1108](https://github.com/ng-bootstrap/ng-bootstrap/issues/1108) [#1114](https://github.com/ng-bootstrap/ng-bootstrap/issues/1114) [#1114](https://github.com/ng-bootstrap/ng-bootstrap/issues/1114)


### Features

* **accordion:** add aria-selected ([d1abd37](https://github.com/ng-bootstrap/ng-bootstrap/commit/d1abd37)), closes [#1109](https://github.com/ng-bootstrap/ng-bootstrap/issues/1109)
* **rating:** enable form integration ([c090a5a](https://github.com/ng-bootstrap/ng-bootstrap/commit/c090a5a)), closes [#1087](https://github.com/ng-bootstrap/ng-bootstrap/issues/1087) [#1097](https://github.com/ng-bootstrap/ng-bootstrap/issues/1097)
* **tabs:** add aria ([97f116f](https://github.com/ng-bootstrap/ng-bootstrap/commit/97f116f)), closes [#1118](https://github.com/ng-bootstrap/ng-bootstrap/issues/1118) [#1120](https://github.com/ng-bootstrap/ng-bootstrap/issues/1120)


### BREAKING CHANGES

* rating: event emitter behind the 'rateChange' output emits asynchronously now



<a name="1.0.0-alpha.14"></a>
# [1.0.0-alpha.14](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.0-alpha.13...1.0.0-alpha.14) (2016-11-25)


### Bug Fixes

* **datepicker:** navigation restrictions work with min- and maxDate ([a12c559](https://github.com/ng-bootstrap/ng-bootstrap/commit/a12c559)), closes [#1057](https://github.com/ng-bootstrap/ng-bootstrap/issues/1057) [#1077](https://github.com/ng-bootstrap/ng-bootstrap/issues/1077)
* **demo:** upgrade webpack and loaders ([994deda](https://github.com/ng-bootstrap/ng-bootstrap/commit/994deda)), closes [#1047](https://github.com/ng-bootstrap/ng-bootstrap/issues/1047) [#1048](https://github.com/ng-bootstrap/ng-bootstrap/issues/1048)
* **modal:** stricter interpretation of backdrop clicks ([3af8329](https://github.com/ng-bootstrap/ng-bootstrap/commit/3af8329)), closes [#1040](https://github.com/ng-bootstrap/ng-bootstrap/issues/1040) [#1042](https://github.com/ng-bootstrap/ng-bootstrap/issues/1042) [#1067](https://github.com/ng-bootstrap/ng-bootstrap/issues/1067)
* **progressbar:** progress stays striped when type changes ([e3af043](https://github.com/ng-bootstrap/ng-bootstrap/commit/e3af043)), closes [#1035](https://github.com/ng-bootstrap/ng-bootstrap/issues/1035) [#1038](https://github.com/ng-bootstrap/ng-bootstrap/issues/1038)
* **rating:** restore update on click functionality ([a64a8a0](https://github.com/ng-bootstrap/ng-bootstrap/commit/a64a8a0)), closes [#1072](https://github.com/ng-bootstrap/ng-bootstrap/issues/1072) [#1074](https://github.com/ng-bootstrap/ng-bootstrap/issues/1074)
* **timepicker:** display 12 PM/AM when meridian is true ([91ca518](https://github.com/ng-bootstrap/ng-bootstrap/commit/91ca518)), closes [#1031](https://github.com/ng-bootstrap/ng-bootstrap/issues/1031) [#1033](https://github.com/ng-bootstrap/ng-bootstrap/issues/1033)
* **typeahead:** clear model on user input when editable=false ([cfbc24a](https://github.com/ng-bootstrap/ng-bootstrap/commit/cfbc24a)), closes [#829](https://github.com/ng-bootstrap/ng-bootstrap/issues/829) [#1083](https://github.com/ng-bootstrap/ng-bootstrap/issues/1083)


### Features

* **accordion:** add aria attributes ([ed5d4ca](https://github.com/ng-bootstrap/ng-bootstrap/commit/ed5d4ca)), closes [#1070](https://github.com/ng-bootstrap/ng-bootstrap/issues/1070)
* **typeahead:** do not trap keydown enter event ([1702df9](https://github.com/ng-bootstrap/ng-bootstrap/commit/1702df9)), closes [#958](https://github.com/ng-bootstrap/ng-bootstrap/issues/958) [#877](https://github.com/ng-bootstrap/ng-bootstrap/issues/877) [#980](https://github.com/ng-bootstrap/ng-bootstrap/issues/980) [#1032](https://github.com/ng-bootstrap/ng-bootstrap/issues/1032) [#1032](https://github.com/ng-bootstrap/ng-bootstrap/issues/1032)



<a name="1.0.0-alpha.13"></a>
# [1.0.0-alpha.13](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.0-alpha.12...1.0.0-alpha.13) (2016-11-11)

This is a very small release that fixes a problem in the generated Typescript definition files (#1027).

### Bug Fixes

* don't add references to core-js in d.ts files ([d18b103](https://github.com/ng-bootstrap/ng-bootstrap/commit/d18b103)), closes [#1027](https://github.com/ng-bootstrap/ng-bootstrap/issues/1027) [#1028](https://github.com/ng-bootstrap/ng-bootstrap/issues/1028)



<a name="1.0.0-alpha.12"></a>
# [1.0.0-alpha.12](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.0-alpha.11...1.0.0-alpha.12) (2016-11-10)


### Bug Fixes

* **carousel:** enable key auto-repeat ([fb6294d](https://github.com/ng-bootstrap/ng-bootstrap/commit/fb6294d)), closes [#1025](https://github.com/ng-bootstrap/ng-bootstrap/issues/1025)
* **modal:** don't stop propagation of click events from content ([6a2c074](https://github.com/ng-bootstrap/ng-bootstrap/commit/6a2c074)), closes [#1011](https://github.com/ng-bootstrap/ng-bootstrap/issues/1011) [#1013](https://github.com/ng-bootstrap/ng-bootstrap/issues/1013)
* **typeahead:** properly respect focusFirst option ([282a089](https://github.com/ng-bootstrap/ng-bootstrap/commit/282a089)), closes [#876](https://github.com/ng-bootstrap/ng-bootstrap/issues/876) [#1021](https://github.com/ng-bootstrap/ng-bootstrap/issues/1021)


### Features

* **datepicker:** add navigation notification with 'navigate' output ([1639626](https://github.com/ng-bootstrap/ng-bootstrap/commit/1639626)), closes [#986](https://github.com/ng-bootstrap/ng-bootstrap/issues/986) [#1002](https://github.com/ng-bootstrap/ng-bootstrap/issues/1002)
* **rating:** add keyboard support ([da0b6a0](https://github.com/ng-bootstrap/ng-bootstrap/commit/da0b6a0)), closes [#1015](https://github.com/ng-bootstrap/ng-bootstrap/issues/1015)



<a name="1.0.0-alpha.11"></a>
# [1.0.0-alpha.11](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.0-alpha.10...1.0.0-alpha.11) (2016-11-03)


### Bug Fixes

* **modal:** restore backdrop: false functionality ([0e2f386](https://github.com/ng-bootstrap/ng-bootstrap/commit/0e2f386)), closes [#989](https://github.com/ng-bootstrap/ng-bootstrap/issues/989) [#990](https://github.com/ng-bootstrap/ng-bootstrap/issues/990)
* **modal:** use Injector of NgbModal for component content ([5172884](https://github.com/ng-bootstrap/ng-bootstrap/commit/5172884)), closes [#982](https://github.com/ng-bootstrap/ng-bootstrap/issues/982) [#983](https://github.com/ng-bootstrap/ng-bootstrap/issues/983)
* **pagination:** better protect against invalid inputs ([a6ec937](https://github.com/ng-bootstrap/ng-bootstrap/commit/a6ec937)), closes [#898](https://github.com/ng-bootstrap/ng-bootstrap/issues/898) [#979](https://github.com/ng-bootstrap/ng-bootstrap/issues/979)
* **rating:** restore compatibility with TypeScript 1.8 ([951e538](https://github.com/ng-bootstrap/ng-bootstrap/commit/951e538)), closes [#995](https://github.com/ng-bootstrap/ng-bootstrap/issues/995) [#996](https://github.com/ng-bootstrap/ng-bootstrap/issues/996)


### Features

* **datepicker:** ability to display several months ([a65cc30](https://github.com/ng-bootstrap/ng-bootstrap/commit/a65cc30)), closes [#977](https://github.com/ng-bootstrap/ng-bootstrap/issues/977)


### BREAKING CHANGES

* datepicker: datepicker navigation now must be hidden with `navigation='none'`and not `[showNavigation]='false'` as previously



<a name="1.0.0-alpha.10"></a>
# [1.0.0-alpha.10](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.0-alpha.9...1.0.0-alpha.10) (2016-10-28)

### Bug Fixes

* restore AoT compatibility with 2.1.x ([991c880](https://github.com/ng-bootstrap/ng-bootstrap/commit/991c880)), closes [#953](https://github.com/ng-bootstrap/ng-bootstrap/issues/953) [#973](https://github.com/ng-bootstrap/ng-bootstrap/issues/973)
* restore TypeScript 1.8 compatibility ([e077ccc](https://github.com/ng-bootstrap/ng-bootstrap/commit/e077ccc)), closes [#940](https://github.com/ng-bootstrap/ng-bootstrap/issues/940) [#941](https://github.com/ng-bootstrap/ng-bootstrap/issues/941)
* **accordion:** remove unnecessary tabindex usage ([a240bea](https://github.com/ng-bootstrap/ng-bootstrap/commit/a240bea)), closes [#942](https://github.com/ng-bootstrap/ng-bootstrap/issues/942) [#943](https://github.com/ng-bootstrap/ng-bootstrap/issues/943)
* **modal:** make it easier to use components from lazy-loaded modules ([2fb72d8](https://github.com/ng-bootstrap/ng-bootstrap/commit/2fb72d8)), closes [#947](https://github.com/ng-bootstrap/ng-bootstrap/issues/947) [#974](https://github.com/ng-bootstrap/ng-bootstrap/issues/974)
* **rating:** improves rating accessibility ([9b5f999](https://github.com/ng-bootstrap/ng-bootstrap/commit/9b5f999)), closes [#962](https://github.com/ng-bootstrap/ng-bootstrap/issues/962)

<a name="1.0.0-alpha.9"></a>
# [1.0.0-alpha.9](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.0-alpha.8...1.0.0-alpha.9) (2016-10-21)


### Bug Fixes

* restore TypeScript 1.8 compatibility ([1259d37](https://github.com/ng-bootstrap/ng-bootstrap/commit/1259d37)), closes [#904](https://github.com/ng-bootstrap/ng-bootstrap/issues/904) [#911](https://github.com/ng-bootstrap/ng-bootstrap/issues/911)
* **buttons:** properly handle focus on radio buttons ([23d412b](https://github.com/ng-bootstrap/ng-bootstrap/commit/23d412b)), closes [#913](https://github.com/ng-bootstrap/ng-bootstrap/issues/913)
* **datepicker:** propagate "touched" property ([deadb67](https://github.com/ng-bootstrap/ng-bootstrap/commit/deadb67)), closes [#918](https://github.com/ng-bootstrap/ng-bootstrap/issues/918) [#924](https://github.com/ng-bootstrap/ng-bootstrap/issues/924)
* **popover:** properly destroy popovers using container option ([19bb887](https://github.com/ng-bootstrap/ng-bootstrap/commit/19bb887)), closes [#931](https://github.com/ng-bootstrap/ng-bootstrap/issues/931)
* **timepicker:** properly display chevrons in Safari on iOS ([cbfa23b](https://github.com/ng-bootstrap/ng-bootstrap/commit/cbfa23b)), closes [#908](https://github.com/ng-bootstrap/ng-bootstrap/issues/908) [#909](https://github.com/ng-bootstrap/ng-bootstrap/issues/909)
* **timepicker:** properly display chevrons in older IEs ([54cd30b](https://github.com/ng-bootstrap/ng-bootstrap/commit/54cd30b)), closes [#935](https://github.com/ng-bootstrap/ng-bootstrap/issues/935)
* **tooltip:** properly destroy tooltips using container option ([94a4d5c](https://github.com/ng-bootstrap/ng-bootstrap/commit/94a4d5c)), closes [#910](https://github.com/ng-bootstrap/ng-bootstrap/issues/910) [#912](https://github.com/ng-bootstrap/ng-bootstrap/issues/912)


### Features

* **datepicker:** can easily hide days outside of current month ([a92c0e7](https://github.com/ng-bootstrap/ng-bootstrap/commit/a92c0e7)), closes [#937](https://github.com/ng-bootstrap/ng-bootstrap/issues/937)
* **modal:** allow interactions with components passed as content ([cc4ffb0](https://github.com/ng-bootstrap/ng-bootstrap/commit/cc4ffb0)), closes [#861](https://github.com/ng-bootstrap/ng-bootstrap/issues/861) [#903](https://github.com/ng-bootstrap/ng-bootstrap/issues/903)
* **modals:** stack modals in opening order ([20ad457](https://github.com/ng-bootstrap/ng-bootstrap/commit/20ad457)), closes [#902](https://github.com/ng-bootstrap/ng-bootstrap/issues/902) [#901](https://github.com/ng-bootstrap/ng-bootstrap/issues/901)



<a name="1.0.0-alpha.8"></a>
# [1.0.0-alpha.8](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.0-alpha.7...1.0.0-alpha.8) (2016-10-14)


### Bug Fixes

* **build:** properly reference rxjs from the UMD bundle ([53115da](https://github.com/ng-bootstrap/ng-bootstrap/commit/53115da)), closes [#884](https://github.com/ng-bootstrap/ng-bootstrap/issues/884)
* **modal:** don't error on dismiss without result handler ([21de54c](https://github.com/ng-bootstrap/ng-bootstrap/commit/21de54c)), closes [#880](https://github.com/ng-bootstrap/ng-bootstrap/issues/880) [#885](https://github.com/ng-bootstrap/ng-bootstrap/issues/885)
* **pagination:** emits pageChange when collection size changes ([84d555c](https://github.com/ng-bootstrap/ng-bootstrap/commit/84d555c)), closes [#800](https://github.com/ng-bootstrap/ng-bootstrap/issues/800) [#868](https://github.com/ng-bootstrap/ng-bootstrap/issues/868)
* **radio:** don't shadow checked attribute when not using buttons ([de7d0e4](https://github.com/ng-bootstrap/ng-bootstrap/commit/de7d0e4)), closes [#840](https://github.com/ng-bootstrap/ng-bootstrap/issues/840) [#874](https://github.com/ng-bootstrap/ng-bootstrap/issues/874)


### Features

* **popover:** add support for the 'container' option ([d1a22c0](https://github.com/ng-bootstrap/ng-bootstrap/commit/d1a22c0)), closes [#852](https://github.com/ng-bootstrap/ng-bootstrap/issues/852) [#853](https://github.com/ng-bootstrap/ng-bootstrap/issues/853)
* **tooltip:** add support for the 'container' option ([b8230e5](https://github.com/ng-bootstrap/ng-bootstrap/commit/b8230e5)), closes [#621](https://github.com/ng-bootstrap/ng-bootstrap/issues/621) [#871](https://github.com/ng-bootstrap/ng-bootstrap/issues/871)
* **typeahead:** add support for the focusFirst option ([e86277f](https://github.com/ng-bootstrap/ng-bootstrap/commit/e86277f)), closes [#748](https://github.com/ng-bootstrap/ng-bootstrap/issues/748) [#856](https://github.com/ng-bootstrap/ng-bootstrap/issues/856)



<a name="1.0.0-alpha.7"></a>
# [1.0.0-alpha.7](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.0-alpha.6...1.0.0-alpha.7) (2016-10-10)

This release restores full AoT compatibility and has proper support for lazy-loaded `NgbModule`. On top of this we are
shipping a lot of new features and bug fixes - details below.

### Bug Fixes

* restore full AoT compatibility ([2101a89](https://github.com/ng-bootstrap/ng-bootstrap/commit/2101a89)), closes [#796](https://github.com/ng-bootstrap/ng-bootstrap/issues/796) [#854](https://github.com/ng-bootstrap/ng-bootstrap/issues/854)
* **buttons:** use disabled state from a control ([d9495db](https://github.com/ng-bootstrap/ng-bootstrap/commit/d9495db)), closes [#805](https://github.com/ng-bootstrap/ng-bootstrap/issues/805) [#828](https://github.com/ng-bootstrap/ng-bootstrap/issues/828)
* **datepicker:** replace not-allowed cursor with default one ([807c7e7](https://github.com/ng-bootstrap/ng-bootstrap/commit/807c7e7)), closes [#850](https://github.com/ng-bootstrap/ng-bootstrap/issues/850)
* **datepicker:** use ISO 8601 for month and weekday numbers ([#797](https://github.com/ng-bootstrap/ng-bootstrap/issues/797)) ([a173e40](https://github.com/ng-bootstrap/ng-bootstrap/commit/a173e40)), closes [#728](https://github.com/ng-bootstrap/ng-bootstrap/issues/728)
* **dropdown:** properly close dropdown on child elements click ([fdf8d4b](https://github.com/ng-bootstrap/ng-bootstrap/commit/fdf8d4b)), closes [#803](https://github.com/ng-bootstrap/ng-bootstrap/issues/803) [#810](https://github.com/ng-bootstrap/ng-bootstrap/issues/810)
* **modal:** support modals in lazy loaded modules ([#799](https://github.com/ng-bootstrap/ng-bootstrap/issues/799)) ([eca26cd](https://github.com/ng-bootstrap/ng-bootstrap/commit/eca26cd)), closes [#784](https://github.com/ng-bootstrap/ng-bootstrap/issues/784)
* **modal:** properly destroy content views ([3cdb0ff](https://github.com/ng-bootstrap/ng-bootstrap/commit/3cdb0ff)), closes [#806](https://github.com/ng-bootstrap/ng-bootstrap/issues/806) [#826](https://github.com/ng-bootstrap/ng-bootstrap/issues/826)
* **popover:** properly cleanup content passed as TemplateRef ([8246541](https://github.com/ng-bootstrap/ng-bootstrap/commit/8246541)), closes [#827](https://github.com/ng-bootstrap/ng-bootstrap/issues/827) [#830](https://github.com/ng-bootstrap/ng-bootstrap/issues/830)
* **rating:** replace not-allowed cursor with default one ([e888d67](https://github.com/ng-bootstrap/ng-bootstrap/commit/e888d67)), closes [#851](https://github.com/ng-bootstrap/ng-bootstrap/issues/851)

### Features

* **carousel:** add support to turn off interval ([c5625e8](https://github.com/ng-bootstrap/ng-bootstrap/commit/c5625e8)), closes [#804](https://github.com/ng-bootstrap/ng-bootstrap/issues/804)
* **datepicker:** infer startDate from model value ([4fc52c1](https://github.com/ng-bootstrap/ng-bootstrap/commit/4fc52c1)), closes [#843](https://github.com/ng-bootstrap/ng-bootstrap/issues/843) [#844](https://github.com/ng-bootstrap/ng-bootstrap/issues/844)
* **datepicker:** pass current month value to 'markDisabled' callback ([afe6342](https://github.com/ng-bootstrap/ng-bootstrap/commit/afe6342)), closes [#849](https://github.com/ng-bootstrap/ng-bootstrap/issues/849)
* **modal:** add support for custom windowClass on modals ([ff132d7](https://github.com/ng-bootstrap/ng-bootstrap/commit/ff132d7)), closes [#818](https://github.com/ng-bootstrap/ng-bootstrap/issues/818) [#845](https://github.com/ng-bootstrap/ng-bootstrap/issues/845)
* **modal:** allow components as content ([ecdd3a0](https://github.com/ng-bootstrap/ng-bootstrap/commit/ecdd3a0)), closes [#680](https://github.com/ng-bootstrap/ng-bootstrap/issues/680) [#727](https://github.com/ng-bootstrap/ng-bootstrap/issues/727) [#846](https://github.com/ng-bootstrap/ng-bootstrap/issues/846)
* **popover:** add isOpen() and shown/hidden events ([3bbf512](https://github.com/ng-bootstrap/ng-bootstrap/commit/3bbf512)), closes [#841](https://github.com/ng-bootstrap/ng-bootstrap/issues/841)
* **rating:** allow custom star templates ([29c44cd](https://github.com/ng-bootstrap/ng-bootstrap/commit/29c44cd)), closes [#815](https://github.com/ng-bootstrap/ng-bootstrap/issues/815)
* **rating:** allow decimal numbers as rating values ([964d8cf](https://github.com/ng-bootstrap/ng-bootstrap/commit/964d8cf)), closes [#817](https://github.com/ng-bootstrap/ng-bootstrap/issues/817)
* **tooltip:** add isOpen() and show/hide events ([91c6054](https://github.com/ng-bootstrap/ng-bootstrap/commit/91c6054)), closes [#842](https://github.com/ng-bootstrap/ng-bootstrap/issues/842)


### BREAKING CHANGES

* The `NgbModule` module must now import using the forRoot() static method. Check the updated [installation instructions](https://github.com/ng-bootstrap/ng-bootstrap#installation) for more details.
* datepicker: now datepicker uses ISO 8601 for month and weekday numbers with default calendar

Before:

`0=Jan; 1=Feb; ... 11=Dec`

`0=Sun; 1=Mon; ... 6=Sat`

After:

`1=Jan; 2=Feb; ... 12=Dec`

`1=Mon; 2=Tue; ... 7=Sun`



<a name="1.0.0-alpha.6"></a>
# [1.0.0-alpha.6](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.0-alpha.5...1.0.0-alpha.6) (2016-09-23)


### Bug Fixes

* **accordion:** rename change event to avoid conflicts ([21eb610](https://github.com/ng-bootstrap/ng-bootstrap/commit/21eb610)), closes [#751](https://github.com/ng-bootstrap/ng-bootstrap/issues/751) [#756](https://github.com/ng-bootstrap/ng-bootstrap/issues/756)
* **dropdown:** support autoClose when several dropdowns exist ([e2e7c1b](https://github.com/ng-bootstrap/ng-bootstrap/commit/e2e7c1b)), closes [#687](https://github.com/ng-bootstrap/ng-bootstrap/issues/687) [#785](https://github.com/ng-bootstrap/ng-bootstrap/issues/785)
* **popover:** avoid shadowing of the native title property ([2577efd](https://github.com/ng-bootstrap/ng-bootstrap/commit/2577efd)), closes [#736](https://github.com/ng-bootstrap/ng-bootstrap/issues/736) [#757](https://github.com/ng-bootstrap/ng-bootstrap/issues/757)
* **popover:** properly handle components using OnPush strategy ([40bde5e](https://github.com/ng-bootstrap/ng-bootstrap/commit/40bde5e)), closes [#781](https://github.com/ng-bootstrap/ng-bootstrap/issues/781)
* **tabset:** rename change event to avoid conflicts with native ones ([9d2754f](https://github.com/ng-bootstrap/ng-bootstrap/commit/9d2754f)), closes [#741](https://github.com/ng-bootstrap/ng-bootstrap/issues/741) [#747](https://github.com/ng-bootstrap/ng-bootstrap/issues/747)
* **tooltip:** hide, or avoid opening the tooltip if its value is falsy ([31a035b](https://github.com/ng-bootstrap/ng-bootstrap/commit/31a035b)), closes [#737](https://github.com/ng-bootstrap/ng-bootstrap/issues/737) [#745](https://github.com/ng-bootstrap/ng-bootstrap/issues/745)
* **tooltip:** properly handle components using OnPush strategy ([667833c](https://github.com/ng-bootstrap/ng-bootstrap/commit/667833c)), closes [#772](https://github.com/ng-bootstrap/ng-bootstrap/issues/772) [#777](https://github.com/ng-bootstrap/ng-bootstrap/issues/777)
* **typeahead:** properly handle components using OnPush strategy ([a2ba68a](https://github.com/ng-bootstrap/ng-bootstrap/commit/a2ba68a)), closes [#775](https://github.com/ng-bootstrap/ng-bootstrap/issues/775)


### Features

* **alert:** remove self-closing alert component ([79e393d](https://github.com/ng-bootstrap/ng-bootstrap/commit/79e393d)), closes [#758](https://github.com/ng-bootstrap/ng-bootstrap/issues/758)
* **datepicker:** allow parsing and formatting dates in a custom way ([401fcfa](https://github.com/ng-bootstrap/ng-bootstrap/commit/401fcfa)), closes [#755](https://github.com/ng-bootstrap/ng-bootstrap/issues/755)
* **typeahead:** add support for the "editable" option ([cb91905](https://github.com/ng-bootstrap/ng-bootstrap/commit/cb91905)), closes [#788](https://github.com/ng-bootstrap/ng-bootstrap/issues/788) [#789](https://github.com/ng-bootstrap/ng-bootstrap/issues/789)


### BREAKING CHANGES

* alert: the `NgbSelfClosingAlert` component has been removed.
Check the self-closing alert demo to know how to achieve the same thing with `NgbAlert`.
* accordion: the `change` event on the accordion level was renamed to `panelChange`.

Before:

`<ngb-accordion (change)="...">`

After:

`<ngb-accordion (panelChange)="...">`

* popover: the title property of the popover directive was renamed to popoverTitle.

Before:

`<div ngbPopover="..." title="...">`

After:

`<div ngbPopover="..." popoverTitle="...">`

* tabset: the `change` event on the tabset level was renamed to `tabChange`.

Before:

`<ngb-tabset (change)="...">`

After:

`<ngb-tabset (tabChange)="...">`



<a name="1.0.0-alpha.5"></a>
# [1.0.0-alpha.5](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.0-alpha.4...1.0.0-alpha.5) (2016-09-15)

This release brings support for datepicker in popups - we believe that there is a solid widget here!
Alpha.5 changes content of npm package to enable AoT compilation with tree-shaking.
There are also small features and bug fixes for the existing widgets - see the details below.


### Bug Fixes

* **popover:** properly re-position popovers ([a729ba9](https://github.com/ng-bootstrap/ng-bootstrap/commit/a729ba9)), closes [#710](https://github.com/ng-bootstrap/ng-bootstrap/issues/710)
* **tooltip:** properly re-position tooltips ([6748a78](https://github.com/ng-bootstrap/ng-bootstrap/commit/6748a78)), closes [#709](https://github.com/ng-bootstrap/ng-bootstrap/issues/709)
* **typeahead:** properly re-position typeahead window ([2f59666](https://github.com/ng-bootstrap/ng-bootstrap/commit/2f59666)), closes [#707](https://github.com/ng-bootstrap/ng-bootstrap/issues/707) [#714](https://github.com/ng-bootstrap/ng-bootstrap/issues/714)
* **typeahead:** properly support disabled inputs ([bf61640](https://github.com/ng-bootstrap/ng-bootstrap/commit/bf61640)), closes [#703](https://github.com/ng-bootstrap/ng-bootstrap/issues/703)


### Features

* **datepicker:** add support for datepickers in popups ([390935b](https://github.com/ng-bootstrap/ng-bootstrap/commit/390935b)), closes [#715](https://github.com/ng-bootstrap/ng-bootstrap/issues/715)
* **datepicker:** add background color when hovering day ([bc89510](https://github.com/ng-bootstrap/ng-bootstrap/commit/bc89510)), closes [#713](https://github.com/ng-bootstrap/ng-bootstrap/issues/713)
* **datepicker:** add support for disabled datepicker ([64ec99c](https://github.com/ng-bootstrap/ng-bootstrap/commit/64ec99c)), closes [#702](https://github.com/ng-bootstrap/ng-bootstrap/issues/702)
* **timepicker:** propagate second as 0 if seconds not displayed ([c1c68b0](https://github.com/ng-bootstrap/ng-bootstrap/commit/c1c68b0)), closes [#711](https://github.com/ng-bootstrap/ng-bootstrap/issues/711)
* **typeahead:** add config service to provide default values ([237b4d5](https://github.com/ng-bootstrap/ng-bootstrap/commit/237b4d5)), closes [#518](https://github.com/ng-bootstrap/ng-bootstrap/issues/518) [#697](https://github.com/ng-bootstrap/ng-bootstrap/issues/697)
* **typeahead:** allow veto of an item selection ([e793944](https://github.com/ng-bootstrap/ng-bootstrap/commit/e793944)), closes [#699](https://github.com/ng-bootstrap/ng-bootstrap/issues/699) [#733](https://github.com/ng-bootstrap/ng-bootstrap/issues/733)


### BREAKING CHANGES

* typeahead: payload of the typeahead's `selectItem` event was changed - now it is
an object implementing the `NgbTypeaheadSelectItemEvent`. You can easily migrate your existing
code by changing:

`<input [ngbTypeahead]="find" (selectItem)="onSelect($event)"/>`

to

`<input [ngbTypeahead]="find" (selectItem)="onSelect($event.item)"/>`

* build: npm package: code in ESM (ES6 Modules) format is now published at the default location in the npm package with `package.json`'s `main` entry pointing to an UMD bundle (primarily for node and webpack 1 users).

If you are using SystemJS, you should adjust your configuration to point to the UMD bundle.



<a name="1.0.0-alpha.4"></a>
# [1.0.0-alpha.4](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.0-alpha.3...1.0.0-alpha.4) (2016-09-07)

This release brings a new component - datepicker! Additionally all widgets now support global config through an injectable service.
There are also small features and bug fixes for the existing widgets - see the details below.

### Bug Fixes

* **dropdown:** don't emit duplicate change events ([2e529e3](https://github.com/ng-bootstrap/ng-bootstrap/commit/2e529e3)), closes [#694](https://github.com/ng-bootstrap/ng-bootstrap/issues/694) [#695](https://github.com/ng-bootstrap/ng-bootstrap/issues/695)
* **timepicker:** spinners don't submit form anymore ([f131990](https://github.com/ng-bootstrap/ng-bootstrap/commit/f131990)), closes [#690](https://github.com/ng-bootstrap/ng-bootstrap/issues/690) [#691](https://github.com/ng-bootstrap/ng-bootstrap/issues/691)
* **typeahead:** navigation buttons don't submit form anymore ([79f4597](https://github.com/ng-bootstrap/ng-bootstrap/commit/79f4597)), closes [#693](https://github.com/ng-bootstrap/ng-bootstrap/issues/693)


### Features

* **accordion:** add config service to provide default values ([1c290a2](https://github.com/ng-bootstrap/ng-bootstrap/commit/1c290a2)), closes [#655](https://github.com/ng-bootstrap/ng-bootstrap/issues/655)
* **alert:** add config service to provide default values ([e666c61](https://github.com/ng-bootstrap/ng-bootstrap/commit/e666c61)), closes [#661](https://github.com/ng-bootstrap/ng-bootstrap/issues/661)
* **alert:** self-closing alerts are non-dismissible by default ([720c409](https://github.com/ng-bootstrap/ng-bootstrap/commit/720c409)), closes [#660](https://github.com/ng-bootstrap/ng-bootstrap/issues/660) [#676](https://github.com/ng-bootstrap/ng-bootstrap/issues/676)
* **carousel:** add config service to provide default values ([99d4386](https://github.com/ng-bootstrap/ng-bootstrap/commit/99d4386)), closes [#664](https://github.com/ng-bootstrap/ng-bootstrap/issues/664)
* **datepicker:** add config service to provide default values ([42002d9](https://github.com/ng-bootstrap/ng-bootstrap/commit/42002d9)), closes [#677](https://github.com/ng-bootstrap/ng-bootstrap/issues/677)
* **datepicker:** initial version of datepicker component ([#618](https://github.com/ng-bootstrap/ng-bootstrap/issues/618)) ([9e8c5c0](https://github.com/ng-bootstrap/ng-bootstrap/commit/9e8c5c0)), closes [#20](https://github.com/ng-bootstrap/ng-bootstrap/issues/20)
* **dropdown:** add config service to provide default values ([e97d260](https://github.com/ng-bootstrap/ng-bootstrap/commit/e97d260)), closes [#688](https://github.com/ng-bootstrap/ng-bootstrap/issues/688)
* **dropdown:** add support for dropup ([56b8dc5](https://github.com/ng-bootstrap/ng-bootstrap/commit/56b8dc5)), closes [#667](https://github.com/ng-bootstrap/ng-bootstrap/issues/667)
* **pagination:** add config service to provide default values ([#665](https://github.com/ng-bootstrap/ng-bootstrap/issues/665)) ([9405e0e](https://github.com/ng-bootstrap/ng-bootstrap/commit/9405e0e))
* **popover:** add config service to provide default values ([a58588c](https://github.com/ng-bootstrap/ng-bootstrap/commit/a58588c)), closes [#686](https://github.com/ng-bootstrap/ng-bootstrap/issues/686)
* **progressbar:** add config service to provide default values ([f32f8c8](https://github.com/ng-bootstrap/ng-bootstrap/commit/f32f8c8))
* **rating:** add config service to provide default values ([8b7047d](https://github.com/ng-bootstrap/ng-bootstrap/commit/8b7047d)), closes [#671](https://github.com/ng-bootstrap/ng-bootstrap/issues/671)
* **tabset:** add config service to provide default values ([609cbde](https://github.com/ng-bootstrap/ng-bootstrap/commit/609cbde)), closes [#673](https://github.com/ng-bootstrap/ng-bootstrap/issues/673)
* **timepicker:** add config service to provide default values ([ca40f27](https://github.com/ng-bootstrap/ng-bootstrap/commit/ca40f27)), closes [#674](https://github.com/ng-bootstrap/ng-bootstrap/issues/674)
* **tooltip:** add config service to provide default values ([7107caf](https://github.com/ng-bootstrap/ng-bootstrap/commit/7107caf)), closes [#678](https://github.com/ng-bootstrap/ng-bootstrap/issues/678)
* **typeahead:** add support for the showHint option ([5a0226d](https://github.com/ng-bootstrap/ng-bootstrap/commit/5a0226d)), closes [#639](https://github.com/ng-bootstrap/ng-bootstrap/issues/639) [#640](https://github.com/ng-bootstrap/ng-bootstrap/issues/640)



<a name="1.0.0-alpha.3"></a>
# [1.0.0-alpha.3](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.0-alpha.2...1.0.0-alpha.3) (2016-08-30)

This release adds support for the modal service. Cross-browser compatibility was reviewed and improved. We now support all the browsers supported by Angular 2 and Bootstrap, including IE9.
There are also small features and bug fixes for the existing widgets - see the details below.

### Bug Fixes

* **typeahead:** cleans up subscription on component destroy ([5dcecae](https://github.com/ng-bootstrap/ng-bootstrap/commit/5dcecae)), closes [#620](https://github.com/ng-bootstrap/ng-bootstrap/issues/620)
* fix the error emitted by TS due to missing generic type ([976ff34](https://github.com/ng-bootstrap/ng-bootstrap/commit/976ff34)), closes [#622](https://github.com/ng-bootstrap/ng-bootstrap/issues/622)

### Features

* support IE9 ([5514a97](https://github.com/ng-bootstrap/ng-bootstrap/commit/5514a97)), closes [#604](https://github.com/ng-bootstrap/ng-bootstrap/issues/604)
* **modal:** add initial version of the modal service ([3ef99c5](https://github.com/ng-bootstrap/ng-bootstrap/commit/3ef99c5)), closes [#3](https://github.com/ng-bootstrap/ng-bootstrap/issues/3)
* **typeahead:** add support for the 'select' output ([c0dd7b7](https://github.com/ng-bootstrap/ng-bootstrap/commit/c0dd7b7)), closes [#606](https://github.com/ng-bootstrap/ng-bootstrap/issues/606) [#610](https://github.com/ng-bootstrap/ng-bootstrap/issues/610)



<a name="1.0.0-alpha.2"></a>
# [1.0.0-alpha.2](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.0-alpha.1...1.0.0-alpha.2) (2016-08-10)

This release makes the code compatible with Angular 2.0.0-rc.5.
There are also small features and bug fixes for the existing widgets - see the details below.

### Bug Fixes

* **buttons:** don't interfere with 'active' class ([af4de2a](https://github.com/ng-bootstrap/ng-bootstrap/commit/af4de2a)), closes [#557](https://github.com/ng-bootstrap/ng-bootstrap/issues/557) [#559](https://github.com/ng-bootstrap/ng-bootstrap/issues/559)
* **progressbar:** reorder 'value' and 'max' attribute bindings for IE ([30e20f5](https://github.com/ng-bootstrap/ng-bootstrap/commit/30e20f5)), closes [#543](https://github.com/ng-bootstrap/ng-bootstrap/issues/543) [#544](https://github.com/ng-bootstrap/ng-bootstrap/issues/544)
* **timepicker:** format input values on blur ([d9ac911](https://github.com/ng-bootstrap/ng-bootstrap/commit/d9ac911)), closes [#511](https://github.com/ng-bootstrap/ng-bootstrap/issues/511) [#517](https://github.com/ng-bootstrap/ng-bootstrap/issues/517)
* **timepicker:** propagate only valid model values ([8c4144a](https://github.com/ng-bootstrap/ng-bootstrap/commit/8c4144a)), closes [#513](https://github.com/ng-bootstrap/ng-bootstrap/issues/513) [#516](https://github.com/ng-bootstrap/ng-bootstrap/issues/516)
* **typeahead:** resolves window items excessive rendering ([862fbc5](https://github.com/ng-bootstrap/ng-bootstrap/commit/862fbc5)), closes [#526](https://github.com/ng-bootstrap/ng-bootstrap/issues/526)
* **typeahead:** specify any type for formatters argument ([86c3644](https://github.com/ng-bootstrap/ng-bootstrap/commit/86c3644)), closes [#553](https://github.com/ng-bootstrap/ng-bootstrap/issues/553) [#554](https://github.com/ng-bootstrap/ng-bootstrap/issues/554)
* don't accept string as boolean input ([190b7ec](https://github.com/ng-bootstrap/ng-bootstrap/commit/190b7ec)), closes [#552](https://github.com/ng-bootstrap/ng-bootstrap/issues/552)
* don't accept string as number input ([f49fb08](https://github.com/ng-bootstrap/ng-bootstrap/commit/f49fb08)), closes [#560](https://github.com/ng-bootstrap/ng-bootstrap/issues/560)

### Features

* **timepicker:** allow hiding the spinners ([dc4962d](https://github.com/ng-bootstrap/ng-bootstrap/commit/dc4962d)), closes [#510](https://github.com/ng-bootstrap/ng-bootstrap/issues/510) [#519](https://github.com/ng-bootstrap/ng-bootstrap/issues/519)
* **typeahead:** set autocomplete, autocapitalize and autocorrect off ([46024c3](https://github.com/ng-bootstrap/ng-bootstrap/commit/46024c3)), closes [#520](https://github.com/ng-bootstrap/ng-bootstrap/issues/520) [#525](https://github.com/ng-bootstrap/ng-bootstrap/issues/525)


### BREAKING CHANGES

* number inputs in pagination could previously be set as strings. The values passed were transformed to numbers if necessary and rounded to integers. This is not supported anymore. All number inputs should now consistently be set as number, using the syntax `[attr]="value"` (for example: `<ngb-pagination [pageSize]="20" ...></ngb-pagination>` instead of `<ngb-pagination pageSize="20" ...></ngb-pagination>`), and rounding is not applied anymore.
* boolean inputs in progressbar and pagination could be set by just adding the attribute
(for example: `<ngb-progressbar striped></ngb-progressbar>`). This is not supported anymore.
All boolean inputs must now consistently be set using the syntax `[attr]="value"`
(for example: `<ngb-progressbar [striped]="true"></ngb-progressbar>`).
* you need to use `@NgModule`s to setup your application. Check https://ng-bootstrap.github.io/#/getting-started for more details.



<a name="1.0.0-alpha.1"></a>
# [1.0.0-alpha.1](https://github.com/ng-bootstrap/ng-bootstrap/compare/1.0.0-alpha.0...1.0.0-alpha.1) (2016-07-29)

This release adds support for 2 new directives ([timepicker](https://ng-bootstrap.github.io/#/components/timepicker) and [typeahead](https://ng-bootstrap.github.io/#/components/typeahead)) and updates Bootstrap support to 4.0.0-alpha.3.
There are also small features and bug fixes for the existing widgets - see the details below.

### Bug Fixes

* **dropdown:** use button elements instead of links ([aeeee01](https://github.com/ng-bootstrap/ng-bootstrap/commit/aeeee01)), closes [#490](https://github.com/ng-bootstrap/ng-bootstrap/issues/490)
* **pagination:** display proper cursor on each page ([dca96fd](https://github.com/ng-bootstrap/ng-bootstrap/commit/dca96fd)), closes [#492](https://github.com/ng-bootstrap/ng-bootstrap/issues/492)
* **progressbar:** don't add bogus CSS classes ([56ea4c5](https://github.com/ng-bootstrap/ng-bootstrap/commit/56ea4c5)), closes [#496](https://github.com/ng-bootstrap/ng-bootstrap/issues/496)
* **rating:** set cursor on stars of rating component ([#411](https://github.com/ng-bootstrap/ng-bootstrap/issues/411)) ([bcba259](https://github.com/ng-bootstrap/ng-bootstrap/commit/bcba259))


### Features

* **accordion:** add panels type option ([b5ad117](https://github.com/ng-bootstrap/ng-bootstrap/commit/b5ad117)), closes [#420](https://github.com/ng-bootstrap/ng-bootstrap/issues/420) [#431](https://github.com/ng-bootstrap/ng-bootstrap/issues/431)
* **timepicker:** add timepicker widget
* **typeahead:** add typeahead widget

### BREAKING CHANGES

* **accordion:** accordion implementation was overhauled to use cards instead of deprecated panels. Refer to the API docs and [demo page](https://ng-bootstrap.github.io/#/components/accordion) for more details.
* **pager:** support for the pager widget was removed as the result of its removal from Bootstrap's CSS.


<a name="1.0.0-alpha.0"></a>
# [1.0.0-alpha.0](https://github.com/ng-bootstrap/ng-bootstrap/compare/9f8f37b...1.0.0-alpha.0) (2016-07-08)

### Features

Initial release with the following directives:

* accordion
* alert
* buttons
* carousel
* collapse
* dropdown
* pager
* pagination
* popover
* progressbar
* rating
* tabset
* tooltip
