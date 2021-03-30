import {copyFileSync, copySync, readJsonSync, writeJSONSync} from 'fs-extra';

const DEST = 'dist/ng-bootstrap';
const SCHEMATICS = `${DEST}/schematics`;

// 1. Copy static assets to 'dist/ng-bootstrap'
['LICENSE', 'README.md'].forEach(file => copyFileSync(file, `${DEST}/${file}`));

// 2. Copy built schematics to 'dist/ng-bootstrap'
copySync('schematics/dist', SCHEMATICS);
copyFileSync('schematics/collection.json', `${SCHEMATICS}/collection.json`);
copyFileSync('schematics/ng-add/schema.json', `${SCHEMATICS}/ng-add/schema.json`);

// 3. Patch version in the 'dist/package.json' with the one from 'package.json'
const {version} = readJsonSync(`package.json`, {encoding: 'utf-8'});
const packageJson = readJsonSync(`${DEST}/package.json`, {encoding: 'utf-8'});
packageJson.version = version;
writeJSONSync(`${DEST}/package.json`, packageJson, {spaces: 2, encoding: 'utf-8'});
