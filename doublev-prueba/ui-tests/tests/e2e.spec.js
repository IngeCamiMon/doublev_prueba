// ui-tests/tests/e2e.spec.js
const { test, expect } = require("@playwright/test");

test("Flujo E2E tienda - Registro, Login y Compra", async ({ page }) => {
  // --- Registro ---
  await page.goto("https://opencart.abstracta.us/index.php?route=account/register");

  const user = {
    firstName: "Test",
    lastName: "User",
    email: `test+${Date.now()}@example.com`,
    phone: "3001234567",
    password: "Passw0rd!",
  };

  await page.fill("#input-firstname", user.firstName);
  await page.fill("#input-lastname", user.lastName);
  await page.fill("#input-email", user.email);
  await page.fill("#input-telephone", user.phone);
  await page.fill("#input-password", user.password);
  await page.fill("#input-confirm", user.password);
  await page.check('input[name="agree"]'); // aceptar Privacy Policy
  await page.click('input[value="Continue"]');

  await expect(page).toHaveURL(/success/);

  // --- Login ---
  await page.goto("https://opencart.abstracta.us/index.php?route=account/login");
  await page.fill("#input-email", user.email);
  await page.fill("#input-password", user.password);
  await page.click('input[value="Login"]');
  await expect(page.locator('h2:has-text("My Account")')).toBeVisible();

  // --- Navegar a Laptops & Notebooks ---
  await page.click('a:has-text("Laptops & Notebooks")');
  await page.click('a:has-text("Show All Laptops & Notebooks")');

  // --- Agregar MacBook Pro ---
  await page.click('a:has-text("MacBook Pro")');
  await page.click("#button-cart");

  // --- Buscar Samsung Galaxy Tab ---
  await page.fill('input[name="search"]', "Samsung Galaxy Tab");
  await page.click("button.btn.btn-default.btn-lg");
  await page.click('a:has-text("Samsung Galaxy Tab 10.1")');
  await page.click("#button-cart");

  // --- Carrito ---
  await page.click("#cart-total");
  await page.click('strong:has-text("View Cart")');

  // Eliminar MacBook Pro
  await page.click('//a[text()="MacBook Pro"]/../..//button[@data-original-title="Remove"]');

  // Cambiar cantidad de la Tablet
  await page.fill('input[name*="quantity"]', "2");
  await page.click('button[data-original-title="Update"]');

  // --- Checkout ---
  await page.click('a:has-text("Checkout")');
  await expect(page.locator("h1")).toContainText("Checkout");
});
