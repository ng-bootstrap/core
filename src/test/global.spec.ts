afterAll(() => {
  // Check that only the last test element is here, all previous ones must have been removed
  const divs = Array.from(document.body.children).filter((element: HTMLElement) => {
    return element.tagName.toLocaleLowerCase() === 'div' && element.id !== 'ngb-live';
  });

  if (divs.length > 1) {
    console.warn('DOM nodes left:', divs);
    fail(`Found ${divs.length - 1} orphan node(s) left in DOM.`);
  }
});
