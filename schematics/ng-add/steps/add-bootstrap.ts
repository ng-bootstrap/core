import * as path from 'path';
import {Rule, SchematicContext, Tree, SchematicsException} from '@angular-devkit/schematics';

import {Schema} from '../schema';
import * as messages from '../messages';
import {getProjectStyleFile, getProjectTargetOptions} from '../../utils/project';
import {getWorkspace, updateWorkspace} from '@schematics/angular/utility/workspace';
import {workspaces, JsonArray} from '@angular-devkit/core';


const BOOTSTRAP_CSS_FILEPATH = 'node_modules/bootstrap/dist/css/bootstrap.min.css';
const SUPPORTED_BOOTSTRAP_STYLE_IMPORTS = {
  '.sass': `
/* Importing Bootstrap SCSS file. */
@import '~bootstrap/scss/bootstrap'
`,
  '.scss': `
/* Importing Bootstrap SCSS file. */
@import '~bootstrap/scss/bootstrap';
`
};

/**
 * Adding bootstrap either to 'styles.scss' or 'styles.sass'
 * If not possible, we're simply adding 'bootstrap.css' to the 'angular.json'
 */
export function addBootstrapStyles(options: Schema): Rule {
  return async(host: Tree, context: SchematicContext) => {
    const workspace = await getWorkspace(host);

    const projectName = options.project || workspace.extensions.defaultProject !.toString();
    const project = workspace.projects.get(projectName);
    if (!project) {
      throw new SchematicsException(messages.noProject(projectName));
    }

    const styleFilePath = getProjectStyleFile(project) || '';
    const styleFileExtension = path.extname(styleFilePath);
    const styleFilePatch = SUPPORTED_BOOTSTRAP_STYLE_IMPORTS[styleFileExtension];

    // found supported styles
    if (styleFilePatch) {
      return addBootstrapToStylesFile(styleFilePath, styleFilePatch);
    } else {
      // found some styles, but unsupported
      if (styleFileExtension !== '.css' && styleFileExtension !== '') {
        context.logger.warn(messages.unsupportedStyles(styleFilePath));
      }

      // just patching 'angular.json'
      return addBootstrapToAngularJson(workspace, project, host);
    }
  };
}

/**
 * Patches 'styles.scss' or 'styles.sass' to add Bootstrap snippet
 */
function addBootstrapToStylesFile(styleFilePath: string, styleFilePatch: string): Rule {
  return (host: Tree) => {
    const styleContent = host.read(styleFilePath) !.toString('utf-8');

    const recorder = host.beginUpdate(styleFilePath);
    recorder.insertRight(styleContent.length, styleFilePatch);

    host.commitUpdate(recorder);
  };
}

/**
 * Patches 'angular.json' to add 'bootstrap.css' styles
 */
function addBootstrapToAngularJson(
    workspace: workspaces.WorkspaceDefinition, project: workspaces.ProjectDefinition, host: Tree): Rule {
  const targetOptions = getProjectTargetOptions(project, 'build');
  const styles = (targetOptions.styles as JsonArray | undefined);
  if (!styles) {
    targetOptions.styles = [BOOTSTRAP_CSS_FILEPATH];
  } else {
    const existingStyles = styles.map((s) => typeof s === 'string' ? s : s !['input']);

    for (const[, stylePath] of existingStyles.entries()) {
      // If the given asset is already specified in the styles, we don't need to do anything.
      if (stylePath === BOOTSTRAP_CSS_FILEPATH) {
        return () => host;
      }
    }
    styles.unshift(BOOTSTRAP_CSS_FILEPATH);
  }

  return updateWorkspace(workspace);
}
