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

    // select
    await page.waitForSelector('//*[@id="__layout"]/div/div/ul/a[2]');
    const schoolsLink = page.locator('//*[@id="__layout"]/div/div/ul/a[2]');
    await schoolsLink.click();

    await page.screenshot({ path: "screenshots/5_report_cards.png" });

    await page.waitForSelector('//*[@id="__layout"]/div/div/ul/a[2]/ul/a[2]');
    const clickReportCard = page.locator(
      '//*[@id="__layout"]/div/div/ul/a[2]/ul/a[2]'
    );
    await clickReportCard.click();

    const schoolDropDown = page.locator(
      '//*[@id="app"]/div[1]/div[1]/div[3]/span/div/div[1]/span/div/div/div[1]'
    );
    await schoolDropDown.click();

    // wait here for 4 seconds before continuing
    await page.waitForTimeout(8000);

    console.log("end waiting");
    await page.screenshot({ path: "screenshots/555_select_school.png" });

    await page.waitForSelector('//*[@id="list-item-97-1"]');
    // console.log("wait selector done");

    const selectSchoolOption = page.locator('//*[@id="list-item-97-1"]');
    if (selectSchoolOption) console.log("found item");

    await selectSchoolOption.click();
    console.log("item selected");

    await page.waitForTimeout(8000);
    console.log("waited for more timeoput ----------------");

    await page.screenshot({ path: "screenshots/5_school.png" });

    // await page.screenshot({ path: "screenshots/7_select_school.png" });

    sleep(1);
  } catch (error) {
    console.log(error);
    console.log("error: ", JSON.stringify(error));
  } finally {
    // Close the browser page
    await page.close();
    await browserContext.close();
  }

  // Pause to observe the browser
  sleep(1);
}
