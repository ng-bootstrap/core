import {test} from '../../../../playwright.conf';
import {openUrl, sendKey, waitForFocus} from '../../tools.po';
import {waitForModalCount, SELECTOR_MODAL_WINDOW} from '../modal.po';

import {
  openModal,
  SELECTOR_MODAL_CONTENT,
  SELECTOR_DISMISS_BUTTON,
  SELECTOR_CLOSE_BUTTON,
  SELECTOR_MODAL_INPUT,
  SELECTOR_MODAL_HEADER,
} from './modal-focus.po';

describe('Modal', () => {

  beforeEach(async() => await openUrl('modal/focus', 'h3:text("Modal focus tests")'));

  afterEach(async() => {
    await sendKey('Escape');
    await waitForModalCount(0);
  });

  it('should close modal on ESC and re-focus trigger button', async() => {
    await openModal('simple');

    // close
    await sendKey('Escape');
    await waitForModalCount(0, 'The modal should be closed on ESC');

    await waitForFocus('#open-modal-simple', 'Should focus trigger button after closing');
  });

  it('should close modal on window click and re-focus trigger button', async() => {
    await openModal('simple');

    // close
    await test.page.click(SELECTOR_MODAL_WINDOW);
    await waitForModalCount(0, 'The modal should be closed on click');

    // button should be focused
    await waitForFocus('#open-modal-simple', 'Should focus trigger button after closing');
  });

  it('should focus body if opener is not focusable', async() => {
    await openModal('disable');

    // close
    await sendKey('Escape');
    await waitForModalCount(0, 'The modal should be closed on ESC');

    // body should be focused
    await waitForFocus('body', 'Should focus body after closing');

  });

  it('should focus modal window if there is no focusable content after opening', async() => {
    await openModal('simple');

    // window should be focused
    expect(await test.page.textContent(SELECTOR_MODAL_CONTENT)).toBe('Modal content');
    await waitForFocus(SELECTOR_MODAL_WINDOW, 'ngb-modal-window should be focused');

  });

  it('should focus first focusable element after opening', async() => {
    await openModal('template');
    await waitForFocus(SELECTOR_DISMISS_BUTTON, 'Modal dismiss button should be focused');
  });

  it('should focus element with [ngbAutofocus] after opening', async() => {
    await openModal('autofocus');
    await waitForFocus(SELECTOR_CLOSE_BUTTON, 'Modal close button should be focused, because of ngbAutoFocus');
  });

  it('should trap focus inside opened modal (Tab)', async() => {
    await openModal('template');

    // dismiss -> input -> close -> dismiss
    await waitForFocus(SELECTOR_DISMISS_BUTTON, 'Modal dismiss button should be focused');

    await sendKey('Tab');
    await waitForFocus(SELECTOR_MODAL_INPUT, 'Modal input should be focused');

    await sendKey('Tab');
    await waitForFocus(SELECTOR_CLOSE_BUTTON, 'Modal close button should be focused');

    await sendKey('Tab');
    await waitForFocus(SELECTOR_DISMISS_BUTTON, 'Modal dismiss button should be focused');

  });

  it('should trap focus inside opened modal (Shift + Tab)', async() => {
    await openModal('template');

    // dismiss -> close -> input -> dismiss
    await waitForFocus(SELECTOR_DISMISS_BUTTON, 'Modal dismiss button should be focused');

    await sendKey('Shift+Tab');
    await waitForFocus(SELECTOR_CLOSE_BUTTON, 'Modal close button should be focused');

    await sendKey('Shift+Tab');
    await waitForFocus(SELECTOR_MODAL_INPUT, 'Modal input should be focused');

    await sendKey('Shift+Tab');
    await waitForFocus(SELECTOR_DISMISS_BUTTON, 'Modal dismiss button should be focused');

  });

  it('should keep focus trap inside the modal when clicking on content and navigating away (Tab)', async() => {
    await openModal('template');

    // click on the header
    await test.page.click(SELECTOR_MODAL_HEADER);
    await waitForFocus(SELECTOR_MODAL_WINDOW, 'Modal window should be focused');

    // re-focus
    await sendKey('Tab');
    await waitForFocus(SELECTOR_DISMISS_BUTTON, 'Modal dismiss button should be focused');

  });

  it('should keep focus trap inside the modal when clicking on content and navigating away (Shift + Tab)', async() => {
    await openModal('template');

    // click on the header
    await test.page.click(SELECTOR_MODAL_HEADER);
    await waitForFocus(SELECTOR_MODAL_WINDOW, 'Modal window should be focused');

    // re-focus
    await sendKey('Shift+Tab');
    await waitForFocus(SELECTOR_CLOSE_BUTTON, 'Modal close button should be focused');

  });
});
