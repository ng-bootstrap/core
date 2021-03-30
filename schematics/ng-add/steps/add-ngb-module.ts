import {Rule, SchematicsException, Tree} from '@angular-devkit/schematics';
import {getAppModulePath} from '@schematics/angular/utility/ng-ast-utils';
import {addImportToModule} from '@schematics/angular/utility/ast-utils';
import {InsertChange} from '@schematics/angular/utility/change';
import * as ts from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';

import {Schema} from '../schema';
import {getProjectTargetOptions} from '../../utils/project';
import {getWorkspace} from '@schematics/angular/utility/workspace';
import * as messages from '../messages';


const NG_BOOTSTRAP_MODULE_NAME = 'NgbModule';
const NG_BOOTSTRAP_PACKAGE_NAME = '@ng-bootstrap/ng-bootstrap';

/**
 * Patches main application module by adding 'NgbModule' import
 */
export function addNgbModuleToAppModule(options: Schema): Rule {
  return async(host: Tree) => {
    const workspace = await getWorkspace(host);
    const projectName = options.project || (workspace.extensions.defaultProject as string);
    const project = workspace.projects.get(projectName);
    if (!project) {
      throw new SchematicsException(messages.noProject(projectName));
    }
    const buildOptions = getProjectTargetOptions(project, 'build');

    const modulePath = getAppModulePath(host, (buildOptions.main as string));

    const text = host.read(modulePath);
    if (text === null) {
      throw new SchematicsException(`File '${modulePath}' does not exist.`);
    }

    const source = ts.createSourceFile(modulePath, text.toString('utf-8'), ts.ScriptTarget.Latest, true);

    const changes = addImportToModule(source, modulePath, NG_BOOTSTRAP_MODULE_NAME, NG_BOOTSTRAP_PACKAGE_NAME);

    const recorder = host.beginUpdate(modulePath);
    for (const change of changes) {
      if (change instanceof InsertChange) {
        recorder.insertLeft(change.pos, change.toAdd);
      }
    }
    host.commitUpdate(recorder);
  };
}
