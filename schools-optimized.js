/**
 * The this file sign in into the camis app and navigate to the schools page
 */

import { check, sleep } from "k6";
import { browser } from "k6/experimental/browser";
import { Counter } from "k6/metrics";

const PHONE_NUMBER = ""; // add phone number
const PASSWORD = "Xcoder1@@"; // add the password

const loginFailures = new Counter("login_failures");

export const options = {
  scenarios: {
    ui: {
      executor: "constant-vus",
      vus: 10, // add the number of the users
      duration: "1m",
      options: {
        browser: {
          type: "chromium", // Setting the browser type
        },
      },
    },
  },
};

export default async function () {
  const browserContext = browser.newContext();

  const page = browserContext.newPage();

  try {
    // Navigate to the login page
    await page.goto("http://app-name");
    console.log("Navigated to the home page");

    await page.waitForSelector('//*[@id="navbarSupportedContent"]/a');
    console.log("Login link found");

    // Click on login link
    await page.locator('//*[@id="navbarSupportedContent"]/a').click();
    await page.waitForNavigation();
    console.log("Navigated to the login page");

    // Wait for the login page to load
    await page.waitForSelector('input[name="phone"]');
    console.log("Login page loaded");

    // Add credentials
    await page.locator('input[name="phone"]').type(PHONE_NUMBER);
    await page.locator('input[name="password"]').type(PASSWORD);
    console.log("Credentials entered");

    // Locate and click the login button
    const loginSubmitButton = page.locator(
      '//*[@id="app"]/div/div[2]/div[2]/div/div/div/div[2]/span/div/div/div[4]/button[2]'
    );
    await loginSubmitButton.click();
    console.log("Login button clicked");

    // Wait for the navigation to the dashboard
    await page.waitForNavigation();
    console.log("Navigated to the dashboard");

    // Check if the login was successful
    const loginSuccessful =
      (await page.locator("text=Welcome to the dashboard").count()) > 0;
    check(loginSuccessful, {
      "login successful": (loginSuccessful) => loginSuccessful === true,
    }) || loginFailures.add(1);

    // Go to school page
    await page.waitForSelector('//*[@id="__layout"]/div/div/ul/a[3]');
    const schoolsLink = page.locator('//*[@id="__layout"]/div/div/ul/a[3]');
    await schoolsLink.click();
    console.log("Navigated to the schools list page");

    await page.waitForNavigation();
    console.log("Schools list page loaded");
    sleep(1);
  } catch (error) {
    console.log(error);
  } finally {
    // Close the browser page
    await page.close();
    await browserContext.close();
  }

  // Pause to observe the browser
  sleep(1);
}
