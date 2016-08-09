# NG Bootstrap - [Angular 2](http://angular.io/) directives specific to [Bootstrap 4](http://v4-alpha.getbootstrap.com/)

[![npm version](https://badge.fury.io/js/%40ng-bootstrap%2Fng-bootstrap.svg)](https://badge.fury.io/js/%40ng-bootstrap%2Fng-bootstrap)
[![Build Status](https://travis-ci.org/ng-bootstrap/ng-bootstrap.svg?branch=master)](https://travis-ci.org/ng-bootstrap/ng-bootstrap)
[![devDependency Status](https://david-dm.org/ng-bootstrap/ng-bootstrap/dev-status.svg?branch=master)](https://david-dm.org/ng-bootstrap/ng-bootstrap#info=devDependencies)
[![Issue Stats](http://issuestats.com/github/ng-bootstrap/ng-bootstrap/badge/pr)](http://issuestats.com/github/ng-bootstrap/ng-bootstrap)
[![Issue Stats](http://issuestats.com/github/ng-bootstrap/ng-bootstrap/badge/issue)](http://issuestats.com/github/ng-bootstrap/ng-bootstrap)

Welcome to the Angular 2 version of the [Angular UI Bootstrap](https://github.com/angular-ui/bootstrap) library.
This library is being built from scratch by the [ui-bootstrap team](https://github.com/angular-ui/bootstrap).
We are using TypeScript and targeting the Bootstrap 4 CSS framework.

As with Bootstrap 4 and Angular 2, this library is a work in progress. Please check out our list of
[issues](https://github.com/ng-bootstrap/ng-bootstrap/issues) to see all the things we are implementing.
Feel free to make comments there.

## Demo

Check all the directives in action at https://ng-bootstrap.github.io

## Dependencies
* [Angular 2](https://angular.io) (tested with 2.0-rc.4)
* [Bootstrap 4](https://v4-alpha.getbootstrap.com) (tested with 4.0 alpha V3)

## Installation
After installing the above dependencies, install `ng-bootstrap` via:
```
npm install --save @ng-bootstrap/ng-bootstrap
```
Once Installed, directives may be imported in several different ways:
For all the directives (if you simply intend on using everything):
```
import {NGB_DIRECTIVES} from '@ng-bootstrap/ng-bootstrap';
```
Or, for specific component directives (using Alert as an example):
```
import {NGB_ALERT_DIRECTIVES} from '@ng-bootstrap/ng-bootstrap';
```
Once imported, add your chosen directives on your component's `directives` array property:
```
directives: [
  ...,
  NGB_DIRECTIVES,
  ...
]
```
Certain directives need to be precompiled in order to be used. This is done via your component's `precompiled` array
property. The following components require precompilation:
```
precompile: [
  ...,
  NGB_PRECOMPILE,
  ...
]
```
We recommend putting these in the top level component of your application. So ultimately, you
should wind up having something that looks like this:
```
import {Component} from '@angular/core';
import {NGB_DIRECTIVES, NGB_PRECOMPILE} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app',
  directives: [ NGB_DIRECTIVES ],
  precompile: [ NGB_PRECOMPILE ],
  templateUrl: './app.html',
})
export class App {
    ...
}
```
## Supported browsers

We support the same browsers and versions supported by both Bootstrap 4 and Angular 2, whichever is _more_ restrictive.
See [this](https://github.com/angular/angular/blob/master/README.md) for up-to-date Angular 2 browser support.

* Chrome (45+)
* Firefox (40+)
* IE (9+) (but see [Bootstrap 4's notes](http://v4-alpha.getbootstrap.com/getting-started/browsers-devices/#internet-explorer-9) on IE9)
* Edge (20+)
* Safari (7+)

## Contributing to the project

We are always looking for the quality contributions! Please check the [CONTRIBUTING.md](CONTRIBUTING.md) doc for contribution guidelines.

## Getting Help

Please, do not open issues for the general support questions as we want to keep GitHub issues for bug reports and feature requests. You've got much better chances of getting your question answered on [StackOverflow](http://stackoverflow.com/questions/tagged/ng-bootstrap) where maintainers are looking at questions tagged with `ng-bootstrap`.

StackOverflow is a much better place to ask questions since:
* there are hundreds of people willing to help on StackOverflow
* questions and answers stay available for public viewing so your question / answer might help someone else
* SO voting system assures that the best answers are prominently visible.

To save your and our time we will be systematically closing all the issues that are requests for general support and redirecting people to StackOverflow.

## You think you've found a bug?

Oh, we are ashamed and want to fix it ASAP! But before fixing a bug we need to reproduce and confirm it. In order to reproduce bugs we will systematically ask you to provide a _minimal_ reproduction scenario using http://plnkr.co. Having a live, reproducible scenario gives us wealth of important information without going back & forth to you with additional questions like:
* version of AngularJS used
* version of this library that you are using
* 3rd-party libraries used, if any
* and most importantly - a use-case that fails

A minimal reproduce scenario using http://plnkr.co/ allows us to quickly confirm a bug (or point out coding problem) as well as confirm that we are fixing the right problem.

We will be insisting on a minimal reproduce scenario in order to save maintainers time and ultimately be able to fix more bugs. Interestingly, from our experience users often find coding problems themselves while preparing a minimal plunk. We understand that sometimes it might be hard to extract essentials bits of code from a larger code-base but we really need to isolate the problem before we can fix it.

Unfortunately we are not able to investigate / fix bugs without a minimal reproduce scenario using http://plnkr.co, so if we don't hear back from you we are going to close an issue that don't have enough info to be reproduced.

## Code of Conduct

Please take a moment and read our [Code of Conduct](CODE_OF_CONDUCT.md)
