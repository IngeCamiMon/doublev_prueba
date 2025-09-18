class RegisterPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.firstName = page.locator("#input-firstname");
    this.lastName = page.locator("#input-lastname");
    this.email = page.locator("#input-email");
    this.phone = page.locator("#input-telephone");
    this.password = page.locator("#input-password");
    this.privacyCheckbox = page.locator('input[name="agree"]');
    this.continueBtn = page.locator('button:has-text("Continue")');
  }
  async goto() {
    await this.page.goto("https://opencart.abstracta.us/index.php?route=account/register");
  }
  async register(user) {
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.email.fill(user.email);
    await this.phone.fill(user.phone);
    await this.password.fill(user.password);
    await this.privacyCheckbox.check();
    await this.continueBtn.click();
  }
}
module.exports = RegisterPage;
