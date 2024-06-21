/**
 * The this file sign in into the camis app and navigate to the schools page
 * the file will be taking screenshots along to show the steps
 * @important: DO NOT RUN THIS UNDER MULTIPLE USERS, this is only for testing instead use "school-optimized.js"
 */

import { check, sleep } from "k6";
import { browser } from "k6/experimental/browser";

const PHONE_NUMBER = ""; // add phone number
const PASSWORD = ""; // add password

export const options = {
  scenarios: {
    ui: {
      executor: "shared-iterations",
      options: {
        browser: {
          type: "chromium",
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
    await page.screenshot({ path: "screenshots/1_home_page.png" });

    await page.waitForSelector('//*[@id="navbarSupportedContent"]/a');

    // click on login link
    page.locator('//*[@id="navbarSupportedContent"]/a').click();

    await page.waitForNavigation();

    // Wait for the login page to load
    await page.waitForSelector('input[name="phone"]');
    await page.screenshot({ path: "screenshots/2_login_page.png" });

    // add credentials
    page.locator('input[name="phone"]').type(PHONE_NUMBER);
    page.locator('input[name="password"]').type(PASSWORD);

    // Locate and click the login button
    const loginSubmitButton = page.locator(
      '//*[@id="app"]/div/div[2]/div[2]/div/div/div/div[2]/span/div/div/div[4]/button[2]'
    );
    await page.screenshot({ path: "screenshots/3_add_credentials.png" });
    await loginSubmitButton.click();

    // Wait for the navigation to the account page
    await page.waitForNavigation();

    await page.screenshot({
      path: "screenshots/4_dashboard.png",
    });

    // go to school page
    await page.waitForSelector('//*[@id="__layout"]/div/div/ul/a[3]');
    const schoolsLink = page.locator('//*[@id="__layout"]/div/div/ul/a[3]');
    await schoolsLink.click();
    await page.screenshot({ path: "screenshots/5_schools_list.png" });

    await page.waitForNavigation();
    await page.screenshot({ path: "screenshots/6_schools_list.png" });
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
