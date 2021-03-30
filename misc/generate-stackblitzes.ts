import * as ejs from 'ejs';
import * as fs from 'fs-extra';
import * as glob from 'glob';
import * as path from 'path';

import {parseDemo} from './parse-demo';


const stackblitzUrl = 'https://stackblitz.com/run';
const packageJson = fs.readJsonSync('package.json');

const versions = {
  ngBootstrap: packageJson.version,
  angular: getVersion('@angular/core'),
  typescript: getVersion('typescript'),
  rxjs: getVersion('rxjs'),
  zoneJs: getVersion('zone.js'),
  coreJs: getVersion('core-js'),
  bootstrap: getVersion('bootstrap'),
  prismjs: getVersion('prismjs')
};

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function fileContent(...parts: string[]) {
  return fs.readFileSync(path.join(...parts)).toString();
}

function getVersion(name) {
  const value = packageJson.dependencies[name] || packageJson.devDependencies[name];
  if (!value) {
    throw `couldn't find version for ${name} in package.json`;
  }
  return value;
}

/**
 * Generates StackBlitzes for all demos of all components and puts
 * resulting html files to the public folder of the demo application
 */

const indexFile = ejs.compile(fileContent('misc', 'stackblitzes-templates', 'index.html.ejs'));
const mainFile = ejs.compile(fileContent('misc', 'stackblitzes-templates', 'main.ts.ejs'));
const stackblitzFile = ejs.compile(fileContent('misc', 'stackblitzes-templates', 'stackblitz.html.ejs'));

const base = path.join('demo', 'src', 'public', 'stackblitzes');
const root = path.join('demo', 'src', 'app', 'components');

const initialData = {
  stackblitzUrl,
  versions,
  dependencies: JSON.stringify({
    '@angular/core': versions.angular,
    '@angular/common': versions.angular,
    '@angular/compiler': versions.angular,
    '@angular/platform-browser': versions.angular,
    '@angular/platform-browser-dynamic': versions.angular,
    '@angular/router': versions.angular,
    '@angular/forms': versions.angular,
    '@angular/localize': versions.angular,
    '@ng-bootstrap/ng-bootstrap': versions.ngBootstrap,
    'core-js': versions.coreJs,
    'rxjs': versions.rxjs,
    'zone.js': versions.zoneJs,
  }),
  tags: ['angular', 'bootstrap', 'ng-bootstrap'],
  styles: fileContent('demo', 'src', 'style', 'demos.css'),
  files: [
    {name: 'src/polyfills.ts', source: fileContent('misc', 'stackblitzes-templates', 'polyfills.ts')},
    {name: 'tsconfig.json', source: fileContent('misc', 'stackblitzes-templates', 'tsconfig.json')},
    {name: 'angular.json', source: fileContent('misc', 'stackblitzes-templates', 'angular.json')}
  ]
};

// removing folder
fs.ensureDirSync(base);
fs.emptyDirSync(base);

// Getting demo modules metadata
const modulesInfo = parseDemo(path.join(root, '**', 'demos', '*', '*.ts'));

// re-creating all stackblitzes
for (const demoModule of modulesInfo.keys()) {
  const demoFolder = path.normalize(path.dirname(demoModule));
  const demoFiles = glob.sync(path.join(demoFolder, '*'), {});
  const[, componentName, , demoName] = demoFolder.replace(root, '').split(path.sep);
  const modulePath = path.basename(demoModule, '.ts');
  const moduleInfo = modulesInfo.get(demoModule);

  const destinationFolder = path.join(base, componentName, demoName);

  const stackblitzData = {
    ...initialData,
    componentName,
    demoName,
    ...moduleInfo,
    modulePath: `./app/${modulePath}`,
    title: `ng-bootstrap - ${capitalize(componentName)} - ${capitalize(demoName)}`,
    tags: [...initialData.tags],
    files: [...initialData.files],
    openFile: `app/${moduleInfo.bootstrap.fileName}`
  };

  stackblitzData.tags.push(componentName);

  stackblitzData.files.push({name: 'src/index.html', source: indexFile(stackblitzData)});
  stackblitzData.files.push({name: 'src/main.ts', source: mainFile(stackblitzData)});
  for (const file of demoFiles) {
    const destFile = path.basename(file);
    stackblitzData.files.push({name: `src/app/${destFile}`, source: fs.readFileSync(file).toString()});
  }

  fs.ensureDirSync(destinationFolder);
  fs.writeFileSync(path.join(destinationFolder, 'stackblitz.html'), stackblitzFile(stackblitzData));
}

console.log(`generated ${modulesInfo.size} stackblitze(s) from demo sources.`);
