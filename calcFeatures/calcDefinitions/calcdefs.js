const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const assert = require('assert')

const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const service = new chrome.ServiceBuilder('webdrivers/chromedriver');
const options = new chrome.Options();

let driver;
Before(async function () {
  driver = await new Builder()
    .forBrowser('chrome')
    .setChromeService(service)
    .setChromeOptions(options)
    .build();
});

After(async () => await driver.quit());

Given('the user is on {string}', { timeout: 50000 }, async (address) => {
  await driver.get(address);
});

When(
  'the user inserts first value {int}',
  { timeout: 30000 },
  async (value1) => {
    await driver.findElement(By.id('num1')).sendKeys(value1);
  }
);

When(
  'the user inserts second value {int}',
  { timeout: 30000 },
  async (value2) => {
    await driver.findElement(By.id('num2')).sendKeys(value2);
  }
);

When('input operator {string}', { timeout: 30000 }, async (operator) => {
  await driver.findElement(By.id('sign')).sendKeys(operator);
});

When('click Calculate', { timeout: 30000 }, async () => {
  await driver.findElement(By.id('compute')).click();
});

Then('result should be {int}', { timeout: 30000 }, async (expectedAnswer) => {
  const result = await driver.findElement(By.id('result')).getAttribute('value');
  assert.equal(result, expectedAnswer)
});