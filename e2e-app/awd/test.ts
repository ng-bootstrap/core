import Jasmine from 'jasmine';
import {Browser, Builder} from 'selenium-webdriver';
import {setBrowser, setBaseURL} from './index';
import os from 'os';
import path from 'path';
import {fork} from 'child_process';
import {get} from 'http';

function findPublicIP() {
  const interfaces = os.networkInterfaces();
  const interfaceNames = Object.keys(interfaces);
  const ips: os.NetworkInterfaceInfo[] = [];
  interfaceNames.forEach((interfaceName) => {
    ips.push(...interfaces[interfaceName].filter((address) => !address.internal && address.family === 'IPv4'));
  });
  return ips.length > 0 ? ips[0].address : undefined;
}

const isServerAvailable = (url: string) => new Promise<boolean>((resolve, reject) => get(url, (res) => {
                                                                                       resolve(true);
                                                                                       res.resume();
                                                                                     }).on('error', (error: any) => {
  if (error.code === 'ECONNREFUSED' || error.code === 'ECONNRESET') {
    resolve(false);
  } else {
    reject(error);
  }
}));

async function serveE2EApp(ip, port) {
  const ngBin = path.join(__dirname, '../../node_modules/.bin/ng');
  const ngProcess = fork(ngBin, ['serve', 'e2e-app', '--host', ip, '--port', port], {
    stdio: 'inherit',
  });
  let exited = false;
  let exitError;
  ngProcess.on('error', (e) => ((exitError = e), (exited = true)));
  ngProcess.on('exit', () => (exited = true));
  const killProcess = () => {
    if (!exited) {
      ngProcess.kill();
    }
  };
  try {
    let serverAvailable = false;
    while (!exited && !serverAvailable) {
      serverAvailable = await isServerAvailable(`http://${ip}:${port}`);
    }
    if (exited) {
      throw exitError || new Error(`"ng serve" exited`);
    }
  } catch (error) {
    killProcess();
    throw error;
  }
  return killProcess;
}

(async() => {
  try {
    const e2eAppIP = findPublicIP();
    const e2eAppPort = 4200;
    console.log(`Serving E2E app at ${e2eAppIP}:${e2eAppPort}`);
    const closeE2EApp = await serveE2EApp(e2eAppIP, e2eAppPort);
    try {
      const jasmine = new Jasmine({});
      const browser = await new Builder()
                          .withCapabilities({
                            'awd:vm-config': 'nvda',
                          })
                          .forBrowser(Browser.CHROME)
                          .usingServer('http://localhost:3000/')
                          .build();
      try {
        setBaseURL(`http://${e2eAppIP}:${e2eAppPort}/`);
        setBrowser(browser);
        const endPromise =
            new Promise((resolve, reject) => jasmine.onComplete((passed) => (passed ? resolve() : reject())));
        jasmine.execute(['**/*.e2e-awd-spec.ts']);
        await endPromise;
      } finally {
        await browser.quit();
      }
    } finally {
      closeE2EApp();
    }
  } catch (error) {
    if (error) {
      console.error(error);
    }
    process.exit(1);
  }
})();
