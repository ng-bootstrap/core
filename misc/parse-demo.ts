import * as glob from 'glob';
import * as path from 'path';
import * as ts from 'typescript';

const BOOTSTRAP_REGEX = new RegExp(/bootstrap:[\s]*\[[\s]*(.*?)[\s,]*]/m);
const SELECTOR_REGEX = new RegExp(/selector:[\s]*['"`]([^'"`]*)['"`]/m);

export interface ComponentMetadata {
  className?: string;
  fileName: string;
  selector: string;
}

export interface DemoMetadata {
  bootstrap: ComponentMetadata;
  moduleClassName: string;
}

/**
 * For a given glob path extracts a map with module filenames as keys and as values:
 *  - class name of the demo module
 *  - the component selector of the `MyComponent` in `bootstrap: [MyComponent]`
 */
export function parseDemo(globPath: string): Map<string, DemoMetadata> {
  const components = new Map<string, ComponentMetadata>();
  const modules = new Map<string, DemoMetadata>();

  function processFile(sourceFile: ts.SourceFile) {
    parseNode(sourceFile);

    function parseNode(node: ts.Node) {
      switch (node.kind) {
        case ts.SyntaxKind.Decorator:
          const decorator = <ts.Decorator>node;

          if (decorator.parent && decorator.parent.kind === ts.SyntaxKind.ClassDeclaration) {
            const className = (<ts.ClassDeclaration>decorator.parent).name.getText(sourceFile);
            const textDecorator = decorator.getText(sourceFile);

            if (textDecorator.startsWith('@NgModule')) {
              const matches = BOOTSTRAP_REGEX.exec(textDecorator);
              if (matches) {
                modules.set(
                    sourceFile.fileName,
                    {moduleClassName: className, bootstrap: {selector: '', fileName: '', className: matches[1]}});
              } else {
                throw new Error(`Couldn't find any bootstrap components in ${className} in ${sourceFile.fileName}`);
              }
            }

            if (textDecorator.startsWith('@Component')) {
              const matches = SELECTOR_REGEX.exec(textDecorator);
              if (matches) {
                components.set(className, {selector: matches[1], fileName: path.basename(sourceFile.fileName)});
              }
            }
          }
      }

      ts.forEachChild(node, parseNode);
    }
  }

  // start
  const files = glob.sync(globPath);
  const program = ts.createProgram(files, {});
  program.getTypeChecker();
  files.forEach(file => processFile(program.getSourceFile(file)));

  // checks
  if (modules.size === 0) {
    throw new Error(`Couldn't find any NgModules in ${globPath}`);
  }

  // replacing temporary component types with their selectors
  modules.forEach(metadata => {
    const bootstrapComponent = metadata.bootstrap.className;
    const bootstrapMetadata = components.get(bootstrapComponent);
    if (!bootstrapMetadata) {
      throw new Error(`Couldn't get bootstrap component metadata for component ${bootstrapComponent}`);
    }
    metadata.bootstrap = bootstrapMetadata;
  });

  return modules;
}
