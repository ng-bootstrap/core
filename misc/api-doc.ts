// tslint:disable:no-bitwise
import {
  createProgram,
  displayPartsToString,
  getCombinedModifierFlags,
  ModifierFlags,
  Program,
  SyntaxKind,
  TypeChecker
} from 'typescript';

import * as marked from 'marked';

function displayPartsToHtml(displayParts: any): string {
  return marked(displayPartsToString(displayParts), {gfm: true}).trim();
}

function getNamesCompareFn(name = 'name') {
  return (a, b) => a[name].localeCompare(b[name]);
}

const ANGULAR_LIFECYCLE_METHODS = [
  'ngOnInit', 'ngOnChanges', 'ngDoCheck', 'ngOnDestroy', 'ngAfterContentInit', 'ngAfterContentChecked',
  'ngAfterViewInit', 'ngAfterViewChecked', 'writeValue', 'registerOnChange', 'registerOnTouched', 'setDisabledState'
];

function hasNoJSDoc(member, typeChecker) {
  if (!member.symbol) {
    return true;
  }

  const jsDoc = displayPartsToHtml(member.symbol.getDocumentationComment(typeChecker));
  return jsDoc.trim().length === 0;
}

function isInternalMember(member) {
  if (member.jsDoc && member.jsDoc.length > 0) {
    for (let i = 0; i < member.jsDoc.length; i++) {
      if (member.jsDoc[i].tags && member.jsDoc[i].tags.length > 0) {
        for (let j = 0; j < member.jsDoc[i].tags.length; j++) {
          if (member.jsDoc[i].tags[j].tagName.text === 'internal') {
            return true;
          }
        }
      }
    }
  }

  return false;
}

function isAngularLifecycleHook(methodName) {
  return ANGULAR_LIFECYCLE_METHODS.includes(methodName);
}

function isPrivate(member) {
  return (getCombinedModifierFlags(member) & ModifierFlags.Private) !== 0;
}

function isPrivateOrInternal(member, typeChecker) {
  return isPrivate(member) || hasNoJSDoc(member, typeChecker) || isInternalMember(member);
}

function getJsDocTags(symbol) {
  // clang-format off
  return !symbol ? {}
    : symbol.getJsDocTags()
      .filter(el => ['deprecated', 'since'].includes(el.name))
      .reduce(
        (obj, el) => {
          const[version, ...rest] = el.text.split(' ');
          obj[el.name] = {version, description: rest.join(' ').trim()};
          return obj;
        }, {}
      );
  // clang-format on
}

function getTypeParameter(program, declaration) {
  // getting type of 'Class <T = number>'
  const type = program.getTypeChecker().getTypeAtLocation(declaration);

  // checking if '<...>' part is present
  if (type.typeParameters) {
    // getting 'T' parameter from declaration
    const parameter = type.typeParameters[0].symbol;
    let parameterString = parameter.getName();

    // checking if there is a default type value (ex. '= number')
    const defaultType = program.getTypeChecker().getTypeAtLocation(parameter.getDeclarations()[0].default);

    // default type can be 'unknown', 'error', base type (ex. 'number') or another symbol
    if (defaultType && !['error', 'unknown'].includes(defaultType.intrinsicName)) {
      parameterString +=
          defaultType.intrinsicName ? ` = ${defaultType.intrinsicName}` : ` = ${defaultType.symbol.getName()}`;
    }
    return parameterString;
  } else {
    return undefined;
  }
}

class APIDocVisitor {
  private readonly program: Program;
  private readonly typeChecker: TypeChecker;

  constructor(fileNames: string[]) {
    this.program = createProgram(fileNames, {lib: ['lib.es6.d.ts']});
    this.typeChecker = this.program.getTypeChecker();
  }

  visitSourceFile(fileName: string) {
    const sourceFile = this.program.getSourceFile(fileName);

    if (!sourceFile) {
      throw new Error(`File doesn't exist: ${fileName}.`);
    }

    return sourceFile.statements.reduce((directivesSoFar, statement) => {
      if (statement.kind === SyntaxKind.ClassDeclaration) {
        return directivesSoFar.concat(this.visitClassDeclaration(fileName, statement));
      } else if (statement.kind === SyntaxKind.InterfaceDeclaration) {
        return directivesSoFar.concat(this.visitInterfaceDeclaration(fileName, statement));
      }

      return directivesSoFar;
    }, []);
  }

  visitInterfaceDeclaration(fileName, interfaceDeclaration) {
    const symbol = this.typeChecker.getSymbolAtLocation(interfaceDeclaration.name);
    const description = displayPartsToHtml(symbol.getDocumentationComment(this.typeChecker));
    const {deprecated, since} = getJsDocTags(symbol);
    const className = interfaceDeclaration.name.text;
    const typeParameter = getTypeParameter(this.program, interfaceDeclaration.name);
    const members = this.visitMembers(interfaceDeclaration.members);

    return [{
      fileName,
      className,
      description,
      deprecated,
      since,
      typeParameter,
      type: 'Interface',
      methods: members.methods,
      properties: members.properties
    }];
  }

  visitClassDeclaration(fileName, classDeclaration) {
    const symbol = this.typeChecker.getSymbolAtLocation(classDeclaration.name);
    const description = displayPartsToHtml(symbol.getDocumentationComment(this.typeChecker));
    const {deprecated, since} = getJsDocTags(symbol);
    const className = classDeclaration.name.text;
    const typeParameter = getTypeParameter(this.program, classDeclaration.name);
    const decorators = classDeclaration.decorators;
    let directiveInfo;
    let members;

    // If there is no top documentation comment, consider it private, we skip it.
    if (!description) {
      return [];
    }

    if (decorators) {
      for (let i = 0; i < decorators.length; i++) {
        if (this.isDirectiveDecorator(decorators[i])) {
          directiveInfo = this.visitDirectiveDecorator(decorators[i]);
          members = this.visitMembers(classDeclaration.members);

          return [{
            fileName,
            className,
            description,
            deprecated,
            since,
            typeParameter,
            type: directiveInfo.type,
            selector: directiveInfo.selector,
            exportAs: directiveInfo.exportAs,
            inputs: members.inputs,
            outputs: members.outputs,
            properties: members.properties,
            methods: members.methods
          }];
        } else if (this.isServiceDecorator(decorators[i])) {
          members = this.visitMembers(classDeclaration.members);

          return [{
            fileName,
            className,
            description,
            deprecated,
            since,
            typeParameter,
            type: 'Service',
            methods: members.methods,
            properties: members.properties
          }];
        }
      }
    } else if (description) {
      members = this.visitMembers(classDeclaration.members);

      return [{
        fileName,
        className,
        description,
        deprecated,
        since,
        type: 'Class',
        methods: members.methods,
        properties: members.properties
      }];
    }

    // a class that is not a directive or a service, not documented for now
    return [];
  }

  visitDirectiveDecorator(decorator) {
    let selector;
    let exportAs;
    const properties = decorator.expression.arguments[0].properties;
    const type = decorator.expression.expression.text;

    for (let i = 0; i < properties.length; i++) {
      if (properties[i].name.text === 'selector') {
        // TODO: this will only work if selector is initialized as a string literal
        selector = properties[i].initializer.text;
      }
      if (properties[i].name.text === 'exportAs') {
        // TODO: this will only work if selector is initialized as a string literal
        exportAs = properties[i].initializer.text;
      }
    }

    return {selector, exportAs, type};
  }

  visitMembers(members) {
    const inputs = [];
    const outputs = [];
    const methods = [];
    const properties = [];
    let inputDecorator, outDecorator;

    for (let i = 0; i < members.length; i++) {
      inputDecorator = this.getDecoratorOfType(members[i], 'Input');
      outDecorator = this.getDecoratorOfType(members[i], 'Output');
      const {deprecated, since} = getJsDocTags(members[i].symbol);
      const releaseInfo = {deprecated, since};

      if (inputDecorator) {
        inputs.push(Object.assign(this.visitInput(members[i], inputDecorator), releaseInfo));

      } else if (outDecorator) {
        outputs.push(Object.assign(this.visitOutput(members[i], outDecorator), releaseInfo));

      } else if (
          (members[i].kind === SyntaxKind.MethodDeclaration || members[i].kind === SyntaxKind.MethodSignature) &&
          !isAngularLifecycleHook(members[i].name.text) && !isPrivateOrInternal(members[i], this.typeChecker)) {
        methods.push(Object.assign(this.visitMethodDeclaration(members[i]), releaseInfo));
      } else if (
          (members[i].kind === SyntaxKind.PropertyDeclaration || members[i].kind === SyntaxKind.PropertySignature ||
           members[i].kind === SyntaxKind.GetAccessor) &&
          !isPrivate(members[i]) && !isInternalMember(members[i])) {
        properties.push(Object.assign(this.visitProperty(members[i]), releaseInfo));
      }
    }

    inputs.sort(getNamesCompareFn());
    outputs.sort(getNamesCompareFn());
    properties.sort(getNamesCompareFn());

    return {inputs, outputs, methods, properties};
  }

  visitMethodDeclaration(method) {
    return {
      name: method.name.text,
      description: displayPartsToHtml(method.symbol.getDocumentationComment(this.typeChecker)),
      args: method.parameters ? method.parameters.map((prop) => this.visitArgument(prop)) : [],
      returnType: this.visitType(method.type)
    };
  }

  visitArgument(arg) { return {name: arg.name.text, type: this.visitType(arg)}; }

  visitInput(property, inDecorator) {
    const inArgs = inDecorator.expression.arguments;
    return {
      name: inArgs.length ? inArgs[0].text : property.name.text,
      defaultValue: property.initializer ? this.stringifyDefaultValue(property.initializer) : undefined,
      type: this.visitType(property),
      description: displayPartsToHtml(property.symbol.getDocumentationComment(this.typeChecker))
    };
  }

  stringifyDefaultValue(node) {
    if (node.text) {
      return node.text;
    } else if (node.kind === SyntaxKind.FalseKeyword) {
      return 'false';
    } else if (node.kind === SyntaxKind.TrueKeyword) {
      return 'true';
    }
  }

  visitOutput(property, outDecorator) {
    const outArgs = outDecorator.expression.arguments;
    return {
      name: outArgs.length ? outArgs[0].text : property.name.text,
      description: displayPartsToHtml(property.symbol.getDocumentationComment(this.typeChecker))
    };
  }

  visitProperty(property) {
    return {
      name: property.name.text,
      defaultValue: property.initializer ? this.stringifyDefaultValue(property.initializer) : undefined,
      type: this.visitType(property),
      description: displayPartsToHtml(property.symbol.getDocumentationComment(this.typeChecker))
    };
  }

  visitType(node) {
    if (node && node.type) {
      return node.type.getText();
    }

    return node ? this.typeChecker.typeToString(this.typeChecker.getTypeAtLocation(node)) : 'void';
  }

  isDirectiveDecorator(decorator) {
    const decoratorIdentifierText = decorator.expression.expression.text;
    return decoratorIdentifierText === 'Directive' || decoratorIdentifierText === 'Component';
  }

  isServiceDecorator(decorator) { return decorator.expression.expression.text === 'Injectable'; }

  getDecoratorOfType(node, decoratorType) {
    const decorators = node.decorators || [];

    for (let i = 0; i < decorators.length; i++) {
      if (decorators[i].expression.expression.text === decoratorType) {
        return decorators[i];
      }
    }

    return null;
  }
}

export function parseOutApiDocs(programFiles: string[]): any {
  const apiDocVisitor = new APIDocVisitor(programFiles);

  return programFiles.reduce(
      (soFar, file) => {
        const directivesInFile = apiDocVisitor.visitSourceFile(file);

        directivesInFile.forEach((directive) => { soFar[directive.className] = directive; });

        return soFar;
      },
      {});
}
