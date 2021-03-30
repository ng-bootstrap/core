import {test} from '../../../../playwright.conf';
import {openUrl, sendKey} from '../../tools.po';
import {waitForModalCount} from '../modal.po';

import {
  openModal,
  clickOnModal,
  SELECTOR_CLOSE_BUTTON,
  SELECTOR_DISMISS_BUTTON,
  SELECTOR_CONFIRM_BUTTON,
} from './modal-stack-confirmation.po';

describe('Modal stack with confirmation', () => {

  beforeEach(async() => await openUrl('modal/stack-confirmation', 'h3:text("Modal stack confirmation test")'));

  afterEach(async() => { await waitForModalCount(0); });

  it('should close modals correctly using close button', async() => {
    await openModal();

    // close with button
    await test.page.click(SELECTOR_CLOSE_BUTTON);
    await waitForModalCount(2, 'Confirmation modal should be opened');

    // cancel closure with button
    await test.page.click(SELECTOR_DISMISS_BUTTON);
    await waitForModalCount(1, 'Confirmation modal should be dismissed');

    // close again
    await test.page.click(SELECTOR_CLOSE_BUTTON);
    await waitForModalCount(2, 'Confirmation modal should be re-opened');

    // close all modals
    await test.page.click(SELECTOR_CONFIRM_BUTTON);

  });

  it('should close modals correctly using ESC', async() => {
    await openModal();

    // close with Escape
    await sendKey('Escape');
    await waitForModalCount(2, 'Confirmation modal should be opened');

    // cancel closure with Escape
    await sendKey('Escape');
    await waitForModalCount(1, 'Confirmation modal should be dismissed');

    // close again
    await sendKey('Escape');
    await waitForModalCount(2, 'Confirmation modal should be re-opened');

    // close all modals
    await test.page.click(SELECTOR_CONFIRM_BUTTON);
  });

  it('should close modals correctly using backdrop click', async() => {
    await openModal();

    // close with click
    await clickOnModal(0);
    await waitForModalCount(2, 'Confirmation modal should be opened');

    // cancel closure with click
    await clickOnModal(1);
    await waitForModalCount(1, 'Confirmation modal should be dismissed');

    // close again
    await clickOnModal(0);
    await waitForModalCount(2, 'Confirmation modal should be re-opened');

    // close all modals
    await test.page.click(SELECTOR_CONFIRM_BUTTON);

  });

});
