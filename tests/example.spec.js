const { test, expect } = require("@playwright/test");
const { faker } = require("@faker-js/faker"); //dynamic test data generation

//Generating dynamic credentials

const newUser = () => ({
  username: faker.helpers.slugify(
    faker.person.firstName() + faker.person.lastName(),
  ),
  password: faker.internet.password({ length: 12 }) + "M1!",
});

//Test cases:
test.describe("All test cases are hlodning downside ", () => {
  const user = newUser();
  test("E2E test for login page", async ({ page }) => {
    //Navigating to web page
    await page.goto("https://practice.expandtesting.com/register");
    //Filling credentaial details
    await page.getByLabel("Username").fill(user.username);
    await page.getByLabel("Password", { exact: true }).fill(user.password);
    await page
      .getByLabel("Confirm Password", { exact: true })
      .fill(user.password);
    //registering new user
    await page.getByRole("button", { name: "Register" }).click();

    await expect(page).toHaveURL(/login/);
    await expect(page.getByText("Successfully registered")).toBeVisible();

    //Refiiling login details
    await page.getByLabel("Username").fill(user.username);
    await page.getByLabel("Password").fill(user.password);
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page).toHaveURL(/secure/);
    await expect(
      page.getByText("You logged into a secure area!"),
    ).toBeVisible();

    await page.getByRole("link", { name: "Logout" }).click();
    await expect(page).toHaveURL(/login/);
  });

  //Second test
  test("Login fails for a new user", async ({ page }) => {
    const user = newUser();

    await page.goto("https://practice.expandtesting.com/login");
    await page.getByLabel("Username").fill(user.username);
    await page.getByLabel("Password").fill(user.password);
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page).toHaveURL(/login/);
    await expect(page.getByText("Your username is invalid!")).toBeVisible();
  });
});
