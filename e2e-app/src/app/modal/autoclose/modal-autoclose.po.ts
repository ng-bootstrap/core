import {test} from '../../../../playwright.conf';
import {timeoutMessage} from '../../tools.po';
import {waitForModalCount} from '../modal.po';

export const clickOnReset = async() => {
  await test.page.click('#reset-button');
};

export const clickOnClose = async() => {
  await test.page.click('#modal-close-button');
  await waitForModalCount(0);
};

export const openModal = async(option = '') => {
  if (option !== '') {
    await test.page.click(`#option-${option}`);
  }

  await test.page.click('#open-modal');
  await waitForModalCount(1);
};

export const waitDismissReason = async(expected, error) => {
  await timeoutMessage(
      test.page.waitForFunction(`document.querySelector('#dismiss-reason').textContent === '${expected}'`), error);
};
