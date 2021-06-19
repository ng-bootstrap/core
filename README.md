# NG Bootstrap - Angular powered Bootstrap widgets

[![npm version](https://badge.fury.io/js/%40ng-bootstrap%2Fng-bootstrap.svg)](https://badge.fury.io/js/%40ng-bootstrap%2Fng-bootstrap)
[![Build Status](https://github.com/ng-bootstrap/ng-bootstrap/workflows/ci/badge.svg?branch=master)](https://github.com/ng-bootstrap/ng-bootstrap/actions)
[![codecov](https://codecov.io/gh/ng-bootstrap/ng-bootstrap/branch/master/graph/badge.svg)](https://codecov.io/gh/ng-bootstrap/ng-bootstrap)
[![devDependency Status](https://david-dm.org/ng-bootstrap/ng-bootstrap/dev-status.svg?branch=master)](https://david-dm.org/ng-bootstrap/ng-bootstrap#info=devDependencies)
[![Sauce Test Status](https://saucelabs.com/browser-matrix/pkozlowski.svg)](https://saucelabs.com/u/pkozlowski)

[Angular](https://angular.io/) widgets built from the ground up using only [Bootstrap 4](https://getbootstrap.com/) CSS with APIs designed for the Angular ecosystem.
No dependencies on 3rd party JavaScript.

Please check our [demo site](https://ng-bootstrap.github.io) and the list of
[issues](https://github.com/ng-bootstrap/ng-bootstrap/issues) to see all the things we are working on. Feel free to make comments there.


## Table of Contents

- [Demo](#demo)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Supported browsers](#supported-browsers)
- [Getting help](#getting-help)
- [You think you've found a bug?](#you-think-youve-found-a-bug)
- [Contributing to the project](#contributing-to-the-project)
- [Code of conduct](#code-of-conduct)

## Demo

Please check all components we have in action at https://ng-bootstrap.github.io

## Dependencies

The only two dependencies are [Angular](https://angular.io) and [Bootstrap 4](https://getbootstrap.com) CSS.
The supported versions are:

| ng-bootstrap | Angular | Bootstrap CSS |
| ------------ | ------- | ------------- |
| 1.x.x        | 5.0.2   | 4.0.0         |
| 2.x.x        | 6.0.0   | 4.0.0         |
| 3.x.x        | 6.1.0   | 4.0.0         |
| 4.x.x        | 7.0.0   | 4.0.0         |
| 5.x.x        | 8.0.0   | 4.3.1         |
| 6.x.x        | 9.0.0   | 4.4.1         |
| 7.x.x, 8.x.x | 10.0.0  | 4.5.0         |
| 9.0.0        | 11.0.0  | 4.5.0         |
| 10.0.0       | 12.0.0  | 4.5.0         |
| 11.0.0-beta.x| 11.0.0  | 5.0.0         |

## Installation

We strongly recommend using [Angular CLI](https://cli.angular.io) for setting up a new project. If you have an Angular &ge; 9 CLI project, you could simply use our schematics to add ng-bootstrap library to it. 

Just run the following:

```shell
ng add @ng-bootstrap/ng-bootstrap
```

It will install ng-bootstrap for the default application specified in your `angular.json`.
If you have multiple projects and you want to target a specific application, you could specify the `--project` option:

```shell
ng add @ng-bootstrap/ng-bootstrap --project myProject
```

If you prefer not to use schematics and install everything manually, please refer to the 
[manual installation instructions](https://ng-bootstrap.github.io/#/getting-started#installation) on our website. 

## Supported browsers

We support the same browsers and versions supported by both Bootstrap 4 and Angular, whichever is _more_ restrictive. See [Angular browser support](https://angular.io/guide/browser-support) and [Bootstrap browser support](https://getbootstrap.com/docs/4.5/getting-started/browsers-devices/#supported-browsers) for more details.

Our code is automatically tested on all supported browsers.


## Getting help

Please, do not open issues for the general support questions as we want to keep GitHub issues for bug reports and feature requests. You've got much better chances of getting your question answered on [StackOverflow](http://stackoverflow.com/questions/tagged/ng-bootstrap) where maintainers are looking at questions tagged with `ng-bootstrap`.

StackOverflow is a much better place to ask questions since:
* there are hundreds of people willing to help on StackOverflow
* questions and answers stay available for public viewing so your question / answer might help someone else
* SO voting system assures that the best answers are prominently visible.

To save your and our time we will be systematically closing all the issues that are requests for general support and redirecting people to StackOverflow.


## You think you've found a bug?

We want to fix it ASAP! But before fixing a bug we need to reproduce and confirm it.

We ask you to respect two things:
* fill the GitHub issue template by providing the bug description and appropriate versions of Angular, ng-bootstrap and TypeScript
* provide a use-case that fails with a **minimal reproduction scenario** using [StackBlitz](https://stackblitz.com) (you can start by forking one from our [demo page](https://ng-bootstrap.github.io/#/components))

A minimal reproduction scenario allows us to quickly confirm a bug (or point out a coding problem) as well as confirm that we are fixing the right problem.

Please note that **we will be insisting on a minimal reproduce scenario** in order to save maintainers time and ultimately be able to fix more bugs. We'll mark the issue as non-actionable without it and close if not heard from the reporter.

Interestingly, from our experience users often find coding problems themselves while preparing a minimal StackBlitz. We understand that sometimes it might be hard to extract essentials bits of code from a larger code-base but we really need to isolate the problem before we can fix it.


## Contributing to the project

Please check the [DEVELOPER.md](DEVELOPER.md) for documentation on running the project locally and [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.


## Code of conduct

Please take a moment and read our [Code of Conduct](CODE_OF_CONDUCT.md)
