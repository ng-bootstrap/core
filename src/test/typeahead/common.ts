import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

function normalizeText(txt: string | null): string {
  return txt != null ? txt.trim().replace(/\s+/g, ' ') : '';
}

export function getWindowLinks(element: DebugElement): DebugElement[] {
  return Array.from(element.queryAll(By.css('button.dropdown-item')));
}

export function expectResults(nativeEl: HTMLElement, resultsDef: string[]): void {
  const pages = nativeEl.querySelectorAll('button.dropdown-item');

  expect(pages.length).toEqual(resultsDef.length);

  for (let i = 0; i < resultsDef.length; i++) {
    let resultDef = resultsDef[i];
    let classIndicator = resultDef.charAt(0);

    if (classIndicator === '+') {
      expect(pages[i]).toHaveCssClass('active');
      expect(normalizeText(pages[i].textContent)).toEqual(resultDef.substr(1));
    } else {
      expect(pages[i]).not.toHaveCssClass('active');
      expect(normalizeText(pages[i].textContent)).toEqual(resultDef);
    }
  }
}
