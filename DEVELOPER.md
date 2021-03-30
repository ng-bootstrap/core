# Building and Testing ng-bootstrap

This document describes how to set up your development environment to build and test ng-bootstrap.
It also explains the basic mechanics of using `git`, `node` and `yarn`.

- [Prerequisite Software](#prerequisite-software)
- [Getting the Sources](#getting-the-sources)
- [Installing Dependencies](#installing-dependencies)
- [Project Structure](#project-structure)
- [Useful commands](#useful-commands)
- [Formatting](#clang-format)
- [Commit Messages](#commit-messages)

See the [contribution guidelines](https://github.com/ng-bootstrap/ng-bootstrap/blob/master/CONTRIBUTING.md)
if you'd like to contribute to ng-bootstrap.

## Prerequisite Software

Before you can build and test ng-bootstrap, you must install and configure the
following products on your development machine:

- [Git](http://git-scm.com) and/or the **GitHub app** (for [Mac](http://mac.github.com) or
  [Windows](http://windows.github.com)); [GitHub's Guide to Installing
  Git](https://help.github.com/articles/set-up-git) is a good source of information.

- [Node.js](https://nodejs.org), (version `>=12.10.0`) which is used to run tests, and generate distributable files. Depending on your system, you can install Node either from
  source or as a pre-packaged bundle.

- We use [Yarn](https://yarnpkg.com) (version `>=1.15.2`) to manage dependencies. Please, see installation instructions on their site.

- We use [Chrome](https://www.google.com/chrome/) to run our tests.

- We use [Commit Lint](https://commitlint.js.org) with [Husky](https://github.com/typicode/husky) to make sure our commit messages are following [some common rules](#commit-messages).

## Getting the Sources

Fork and clone the ng-bootstrap repository:

1. Login to your GitHub account or create one by following the instructions given
   [here](https://github.com/signup/free).
2. [Fork](http://help.github.com/forking) the [main ng-bootstrap
   repository](https://github.com/ng-bootstrap/ng-bootstrap).
3. Clone your fork of the ng-bootstrap's ng-bootstrap repository and define an `upstream` remote pointing back to
   the ng-bootstrap's ng-bootstrap repository that you forked in the first place.

```bash
# Clone your GitHub repository:
git clone git@github.com:<github username>/ng-bootstrap.git ng-bootstrap

# Go to the ng-bootstrap directory:
cd ng-bootstrap

# Add the main ng-bootstrap repository as an upstream remote to your repository:
git remote add upstream https://github.com/ng-bootstrap/ng-bootstrap.git
```

## Installing Dependencies

Next, install the JavaScript modules needed to build and test ng-bootstrap:

```bash
# Install ng-bootstrap project dependencies (package.json)
yarn
```

## Project Structure

We use [`@angular/cli`](https://cli.angular.io) to build both ng-bootstrap library and demo site. There are several Angular CLI projects inside the checked out code:

- `/src` - the `ng-bootstrap` library itself
- `/demo` - the demo site application deployed at [https://ng-bootstrap.github.io](https://ng-bootstrap.github.io)
- `/e2e-app` - an application used to run e2e tests for the library
- `/ssr-app/src` - a simple one-paged application for Server Side Rendering tests
- `/test-app` - a minimal CLI application that references `ng-bootstrap` sources for issue reproduction/debugging purposes

## Useful Commands

The most useful commands are:

#### `yarn demo`

Serves the demo site locally in dev mode at [http://localhost:4200/](http://localhost:4200/). You can optionally add `--prod` argument to serve demo in production mode or `--aot` to serve demo in dev mode, but with AOT

#### `yarn build`

Builds both library and demo site in production mode. The library will be built in Angular Package format in `dist` folder. The demo site will be built in `demo/dist` folder.

#### `yarn tdd`

Runs unit tests for the library in watch mode without any additional checks

**Note**: If you want to only run a single test you can alter the test you wish to run by changing
`it` to `fit` or `describe` to `fdescribe`. This will only run that individual test and make it
much easier to debug. `xit` and `xdescribe` can also be useful to exclude a test and a group of
tests respectively.

#### `yarn test`

Checks formatting, linting and runs all unit tests for the library with coverage

#### `yarn e2e`

Runs all protractor tests for the library in production mode. We use them to check focus handling, browser styles, layout, etc.
(For debugging/development it is also possible to separately serve the e2e test application with `yarn e2e-app:serve` and run protractor with `yarn ngb:e2e-noserve`)

#### `yarn ssr`

Builds, runs and e2e tests a simple server-side rendered application with all ng-bootstrap components

#### `yarn ci`

Runs exactly the same suite of actions as the CI server, so you might want to do it before opening a PR

#### `yarn check-format`

Checks that your source code is properly formatted without running anything else (see next section)

You can inspect `package.json` scripts section for a full list of commands available.

## Formatting with <a name="clang-format">clang-format</a>

We use [clang-format](http://clang.llvm.org/docs/ClangFormat.html) to automatically enforce code
style for our TypeScript code. This allows us to focus our code reviews more on the content, and
less on style nit-picking. It also lets us encode our style guide in the `.clang-format` file in the
repository, allowing many tools and editors to share our settings.

To check the formatting of your code, run

```bash
yarn check-format
```

Your life will be easier if you include the formatter in your standard workflow. Otherwise, you'll
likely forget to check the formatting, and waste time waiting for a build on GitHub that fails due
to some whitespace difference.

- Install clang-format with `npm install -g clang-format`.
- Use `clang-format -i [file name]` to format a file (or multiple).
  Note that `clang-format` tries to load a `clang-format` node module close to the sources being
  formatted, or from the `$CWD`, and only then uses the globally installed one - so the version used
  should automatically match the one required by the project.
  Use `clang-format -version` in case you get confused.
- Use `yarn check-format` to check if your code is `clang-format` clean. This also gives
  you a command line to format your code.
- `clang-format` also includes a git hook, run `git clang-format` to format all files you
  touched.
- You can run this as a **git pre-commit hook** to automatically format your delta regions when you
  commit a change. In the ng-bootstrap repo, run

```shell
    $ echo -e '#!/bin/sh\nexec git clang-format' > .git/hooks/pre-commit
    $ chmod u+x !$
```

- **WebStorm** can run clang-format on the current file.
  1. Under Preferences, open Tools > External Tools.
  1. Plus icon to Create Tool
  1. Fill in the form:
  - Name: clang-format
  - Description: Format
  - Synchronize files after execution: checked
  - Open console: not checked
  - Show in: Editor menu
  - Program: [path to clang-format, try `$ echo $(npm config get prefix)/bin/clang-format`]
  - Parameters: `-i -style=file $FilePath$`
  - Working directory: `$ProjectFileDir$`
- `clang-format` integrations are also available for many popular editors (`vim`, `emacs`,
  `Sublime Text`, etc.).

## Commit messages

#### Pre-requisites

For Conventional Commit Messages to be working with [CommitLint](https://commitlint.js.org/) you have to make sure everything is installed properly:

- You have a fresh install, you just cloned the repository following the steps described in this readme?
  **you should be fine**.

- Your project folder is a long standing one, cloned a long time ago?
  - Make sure to remove any previous `commit-msg` or `prepare-commit-msg` hooks you might have inside `.git/hooks` directory.
  - Install manually [Husky](https://github.com/typicode/husky) by executing this command:
    ```bash
    > npx husky install
    ```

In both cases you can validate your local installation by trying to commit something. (guides available [here](https://commitlint.js.org/#/guides-local-setup))

#### Commit types and scopes 

We maintain dynamic custom scopes for the project. Valid scopes correspond to the name of our widgets: `alert`, `accordion`, etc.

Examples:
- `feat(datepicker): ...` &rarr; a new feature for the datepicker 
- `fix(datepicker): ...` &rarr; a bug fix for the datepicker
- `test(datepicker): ... ` &rarr; an update to one of the datepicker unit or e2e tests
- `docs(datepicker): ...` &rarr; a datepicker documentation update
- `refactor(datepicker): ... ` &rarr; an internal datepicker refactoring without public functionality changes
- `demo(datepicker): ... ` &rarr; an update to one of the datepicker demos
- `demo: ...` &rarr; any change for the demo site
- `build: ...` &rarr; any change for the utility scripts, configurations, dependencies, etc.
- `ci: ...` &rarr; any change for CI related configuration
- `revert: ...` &rarr; revert an older commit

Anything else won't pass commitlint validation.
