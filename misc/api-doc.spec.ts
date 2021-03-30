import {parseOutApiDocs as apiDoc} from './api-doc';

describe('APIDocVisitor', () => {

  it('should return [] if there are no docs to extract',
     () => { expect(apiDoc(['./misc/api-doc-test-cases/no-docs.ts'])).toEqual({}); });

  it('should extract basic info from directives and components', () => {
    const docs = apiDoc(['misc/api-doc-test-cases/directives-no-in-out.ts']);

    expect(Object.keys(docs).length).toBe(2);

    expect(docs.Foo.fileName).toBe('misc/api-doc-test-cases/directives-no-in-out.ts');
    expect(docs.Foo.className).toBe('Foo');
    expect(docs.Foo.selector).toBe('[foo]');
    expect(docs.Foo.description).toBe('<p>Foo doc</p>');
    expect(docs.Foo.exportAs).toBe('foo');

    expect(docs.Bar.fileName).toBe('misc/api-doc-test-cases/directives-no-in-out.ts');
    expect(docs.Bar.className).toBe('Bar');
    expect(docs.Bar.selector).toBe('bar');
    expect(docs.Bar.exportAs).toBeUndefined();
    expect(docs.Bar.description).toBe('<p>Bar doc</p>');
  });

  it('should extract basic type info from classes', () => {
    const docs = apiDoc(['misc/api-doc-test-cases/types.ts']);

    expect(Object.keys(docs).length).toBe(5);

    expect(docs.NgbDirective.type).toBe('Directive');
    expect(docs.NgbComponent.type).toBe('Component');
    expect(docs.NgbService.type).toBe('Service');
    expect(docs.NgbClass.type).toBe('Class');
    expect(docs.NgbInterface.type).toBe('Interface');
  });

  it('should extract inputs info', () => {
    const inputDocs = apiDoc(['./misc/api-doc-test-cases/directives-with-inputs.ts']).Foo.inputs;

    expect(inputDocs.length).toBe(3);

    expect(inputDocs[0].name).toBe('bar');
    expect(inputDocs[0].defaultValue).toBeUndefined();
    expect(inputDocs[0].type).toBe('string');
    expect(inputDocs[0].description).toBe('<p>Bar doc</p>');

    expect(inputDocs[1].name).toBe('baz');
    expect(inputDocs[1].defaultValue).toBeUndefined();
    expect(inputDocs[1].type).toBe('string | boolean');
    expect(inputDocs[1].description).toBe('');

    expect(inputDocs[2].name).toBe('foo');
    expect(inputDocs[2].defaultValue).toBe('5');
    expect(inputDocs[2].type).toBe('number');
    expect(inputDocs[2].description).toBe('<p>Has default value</p>');
  });

  it('should extract input default value', () => {
    const inputDocs = apiDoc(['./misc/api-doc-test-cases/directives-with-inputs-default-vals.ts']).Foo.inputs;

    expect(inputDocs.length).toBe(3);

    expect(inputDocs[0].defaultValue).toBe('false');
    expect(inputDocs[1].defaultValue).toBe('5');
    expect(inputDocs[2].defaultValue).toBe('bar');
  });

  it('should extract inferred types', () => {
    const inputDocs = apiDoc(['./misc/api-doc-test-cases/directives-with-inputs-types-to-infer.ts']).Foo.inputs;

    expect(inputDocs.length).toBe(3);

    expect(inputDocs[0].defaultValue).toBe('false');
    expect(inputDocs[0].type).toBe('boolean');
    expect(inputDocs[1].defaultValue).toBe('5');
    expect(inputDocs[1].type).toBe('number');
    expect(inputDocs[2].defaultValue).toBe('bar');
    expect(inputDocs[2].type).toBe('string');
  });

  it('should extract inputs info from setters', () => {
    const inputDocs = apiDoc(['./misc/api-doc-test-cases/directives-with-tricky-inputs.ts']).Foo.inputs;

    expect(inputDocs.length).toBe(3);

    expect(inputDocs[0].name).toBe('bar');
    expect(inputDocs[1].name).toBe('baz');
    expect(inputDocs[2].name).toBe('foo');
  });

  it('should extract outputs info', () => {
    const outDocs = apiDoc(['./misc/api-doc-test-cases/directives-with-outputs.ts']).Foo.outputs;

    expect(outDocs.length).toBe(2);

    expect(outDocs[0].name).toBe('myEvent');
    expect(outDocs[0].description).toBe('<p>Desc</p>');

    expect(outDocs[1].name).toBe('myMappedEvent');
  });

  it('should extract public methods info', () => {
    const methodDocs = apiDoc(['./misc/api-doc-test-cases/directives-with-methods.ts']).Foo.methods;

    expect(methodDocs.length).toBe(1);
    expect(methodDocs[0].name).toBe('fooMethod');
    expect(methodDocs[0].description).toBe('<p>Use this one to produce foo!</p>');
    expect(methodDocs[0].args.length).toBe(3);
    expect(methodDocs[0].args[0].name).toBe('arg1');
    expect(methodDocs[0].args[0].type).toBe('string');
    expect(methodDocs[0].args[1].name).toBe('arg2');
    expect(methodDocs[0].args[1].type).toBe('any');
    expect(methodDocs[0].args[2].name).toBe('arg3');
    expect(methodDocs[0].args[2].type).toBe('number');
  });

  it('should not extract public methods info when annotated with @internal', () => {
    const methodDocs = apiDoc(['./misc/api-doc-test-cases/component-with-internal-methods.ts']).Foo.methods;

    expect(methodDocs.length).toBe(0);
  });

  it('should extract documentation from services', () => {
    const serviceDocs = apiDoc(['./misc/api-doc-test-cases/services-with-methods.ts']).ModalService;

    expect(serviceDocs.fileName).toBe('./misc/api-doc-test-cases/services-with-methods.ts');
    expect(serviceDocs.className).toBe('ModalService');
    expect(serviceDocs.description).toBe('<p>A service to open modals</p>');
    expect(serviceDocs.methods.length).toBe(2);

    expect(serviceDocs.methods[0].name).toBe('open');
    expect(serviceDocs.methods[0].description).toBe('<p>A method to open a modal</p>');
    expect(serviceDocs.methods[0].args.length).toBe(2);
    expect(serviceDocs.methods[0].returnType).toBe('Promise<any>');

    expect(serviceDocs.methods[1].name).toBe('isOpen');
    expect(serviceDocs.methods[1].description).toBe('<p>Checks if a modal is open</p>');
    expect(serviceDocs.methods[1].args.length).toBe(0);
    expect(serviceDocs.methods[1].returnType).toBe('boolean');
  });

  it('should extract documentation of properties from services', () => {
    const serviceDocs = apiDoc(['./misc/api-doc-test-cases/services-with-properties.ts']).ProgressbarConfig;

    expect(serviceDocs.properties.length).toBe(3);

    expect(serviceDocs.properties[0].name).toBe('foo');
    expect(serviceDocs.properties[0].description).toBe('<p>Voluntarily left without a default value.</p>');
    expect(serviceDocs.properties[0].type).toBe('string');
    expect(serviceDocs.properties[0].defaultValue).toBeUndefined();

    expect(serviceDocs.properties[1].name).toBe('max');
    expect(serviceDocs.properties[1].description).toBe('<p>Maximal value to be displayed in the progressbar.</p>');
    expect(serviceDocs.properties[1].type).toBe('number');
    expect(serviceDocs.properties[1].defaultValue).toBe('100');

    expect(serviceDocs.properties[2].name).toBe('noDescriptionButStillExtract');
    expect(serviceDocs.properties[2].description).toBe('');
    expect(serviceDocs.properties[2].type).toBe('string');
    expect(serviceDocs.properties[2].defaultValue).toBe('sth');
  });

  it('should extract documentation from interfaces', () => {
    const interfaceDocs = apiDoc(['./misc/api-doc-test-cases/interface-with-properties.ts']).NgbModalOptions;

    expect(interfaceDocs.className).toBe('NgbModalOptions');
    expect(interfaceDocs.description).toBe('<p>Represent options available when opening new modal windows.</p>');
    expect(interfaceDocs.properties.length).toBe(3);

    expect(interfaceDocs.properties[0].name).toBe('backdrop');
    expect(interfaceDocs.properties[0].description)
        .toContain('Weather a backdrop element should be created for a given modal (true by default).');
    expect(interfaceDocs.properties[0].type).toBe(`boolean | 'static'`);
    expect(interfaceDocs.properties[0].defaultValue).toBeUndefined();

    expect(interfaceDocs.properties[1].name).toBe('keyboard');
    expect(interfaceDocs.properties[1].description)
        .toBe('<p>Weather to close the modal when escape key is pressed (true by default).</p>');
    expect(interfaceDocs.properties[1].type).toBe('boolean');
    expect(interfaceDocs.properties[1].defaultValue).toBeUndefined();

    expect(interfaceDocs.properties[2].name).toBe('size');
    expect(interfaceDocs.properties[2].description).toBe('<p>Size of a new modal window.</p>');
    expect(interfaceDocs.properties[2].type).toBe(`'sm' | 'lg' | 'xl' | string`);
    expect(interfaceDocs.properties[2].defaultValue).toBeUndefined();
  });

  it('should extract method documentation from interfaces', () => {
    const interfaceDocs = apiDoc(['./misc/api-doc-test-cases/interface-with-methods.ts']).SomeInterface;

    expect(interfaceDocs.className).toBe('SomeInterface');
    expect(interfaceDocs.description).toBe('<p>Some interface</p>');
    expect(interfaceDocs.methods.length).toBe(1);

    expect(interfaceDocs.methods[0].name).toBe('foo');
    expect(interfaceDocs.methods[0].description).toContain('does something');
    expect(interfaceDocs.methods[0].returnType).toBe('void');
  });

  it('should extract documentation from documented classes', () => {
    const classDocs = apiDoc(['./misc/api-doc-test-cases/class-with-doc.ts']).DocumentedFoo;

    expect(classDocs.className).toBe('DocumentedFoo');
    expect(classDocs.description).toBe('<p>This is a documented foo</p>');

    expect(classDocs.properties.length).toBe(2);

    expect(classDocs.properties[0].name).toBe('bar');
    expect(classDocs.properties[0].description).toBe('<p>the bar</p>');
    expect(classDocs.properties[0].type).toBe('string');

    expect(classDocs.properties[1].name).toBe('componentInstance');
    expect(classDocs.properties[1].description).toBe('<p>A getter</p>');
    expect(classDocs.properties[1].type).toBe('any');

    expect(classDocs.methods.length).toBe(1);

    expect(classDocs.methods[0].name).toBe('someMethod');
    expect(classDocs.methods[0].description).toBe('<p>some method</p>');
    expect(classDocs.methods[0].returnType).toBe('void');
  });

  it('should extract deprecation information', () => {
    const docs = apiDoc(['misc/api-doc-test-cases/release-deprecation.ts']);

    expect(docs.NgbDirective.deprecated).toEqual({version: '2.0.0', description: 'description'});
    expect(docs.NgbComponent.deprecated).toEqual({version: '2.0.0', description: 'description'});
    expect(docs.NgbService.deprecated).toEqual({version: '2.0.0', description: 'description'});
    expect(docs.NgbClass.deprecated).toEqual({version: '2.0.0', description: 'description'});
    expect(docs.NgbInterface.deprecated).toEqual({version: '2.0.0', description: 'description'});

    expect(docs.NgbDirective.inputs[0].deprecated).toEqual({version: '2.0.0', description: 'description'});
    expect(docs.NgbDirective.outputs[0].deprecated).toEqual({version: '2.0.0', description: 'description'});
    expect(docs.NgbDirective.properties[0].deprecated).toEqual({version: '2.0.0', description: 'description'});
    expect(docs.NgbDirective.methods[0].deprecated).toEqual({version: '2.0.0', description: 'description'});
  });

  it('should extract feature introduction information', () => {
    const docs = apiDoc(['misc/api-doc-test-cases/release-features.ts']);

    expect(docs.NgbDirective.since).toEqual({version: '2.0.0', description: ''});
    expect(docs.NgbComponent.since).toEqual({version: '2.0.0', description: ''});
    expect(docs.NgbService.since).toEqual({version: '2.0.0', description: ''});
    expect(docs.NgbClass.since).toEqual({version: '2.0.0', description: ''});
    expect(docs.NgbInterface.since).toEqual({version: '2.0.0', description: ''});

    expect(docs.NgbDirective.inputs[0].since).toEqual({version: '2.0.0', description: ''});
    expect(docs.NgbDirective.outputs[0].since).toEqual({version: '2.0.0', description: ''});
    expect(docs.NgbDirective.properties[0].since).toEqual({version: '2.0.0', description: ''});
    expect(docs.NgbDirective.methods[0].since).toEqual({version: '2.0.0', description: ''});
  });

  it('should extract class and interface type parameters', () => {
    const docs = apiDoc(['misc/api-doc-test-cases/type-parameters.ts']);

    expect(docs.NoParameterComponent.typeParameter).toBeUndefined();
    expect(docs.ParameterComponent.typeParameter).toEqual('C');
    expect(docs.NoParameterInterface.typeParameter).toBeUndefined();
    expect(docs.ParameterInterface.typeParameter).toEqual('I = NoParameterInterface');
    expect(docs.NoParameterService.typeParameter).toBeUndefined();
    expect(docs.ParameterService.typeParameter).toEqual('S = number');
  });
});
