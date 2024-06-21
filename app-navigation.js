import { chromium } from "k6/experimental/browser";
import { check } from "k6";

export const options = {
  stages: [
    { duration: "1m", target: 50 },
    { duration: "3m", target: 100 },
    { duration: "1m", target: 0 },
    { duration: "1s", target: 1 },
  ],
};

export default async function () {
  const browser = chromium.launch({ headless: true });
  const context = browser.newContext();
  const page = context.newPage();

  try {
    // Open the login page
    await page.goto("http://app-name/login/");

    // Fill in the login form
    await page.fill('input[name="phone"]', "user@test.com");
    await page.fill('input[name="password"]', "password1");

    // Click the login button
    await page.click('button[type="submit"]');

    // Wait for navigation after login
    await page.waitForNavigation();

    // Navigate to the users page
    await page.goto("https://yourwebsite.com/users");

    // Check if user "user2" exists on the users page
    const userExists = (await page.$("text=user2")) !== null;

    check(userExists, {
      "Signed in": (exists) => exists === true,
    });

    // Perform additional actions to simulate user behavior
    // Example: await page.click('button#someAction');
  } finally {
    page.close();
    browser.close();
  }
}
