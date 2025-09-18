const { test, expect } = require("@playwright/test");

const BASE = "https://fakestoreapi.com"; // FakeStore API base (soporta CRUD). :contentReference[oaicite:5]{index=5}

test("Flujo API: listar, obtener, crear y actualizar imagen", async ({ request }) => {
  // 1) Listar todos los productos de la categoría electronics
  const r1 = await request.get(`${BASE}/products/category/electronics`);
  expect(r1.ok()).toBeTruthy();
  const electronics = await r1.json();
  expect(Array.isArray(electronics)).toBe(true);
  console.log("electronics count:", electronics.length);

  // 2) Consultar datos de un producto específico (ej: id 1)
  const r2 = await request.get(`${BASE}/products/1`);
  expect(r2.ok()).toBeTruthy();
  const product1 = await r2.json();
  console.log("product1 title:", product1.title);

  // 3) Crear un producto (puedes cambiar los datos)
  const createPayload = {
    title: "Prueba Playwright",
    price: 199.99,
    description: "Producto creado por prueba automatizada",
    image: "https://placehold.co/600x400",
    category: "electronics",
  };
  const r3 = await request.post(`${BASE}/products`, { data: createPayload });
  expect(r3.ok()).toBeTruthy();
  const created = await r3.json();
  console.log("created:", created);
  const createdId = created.id;

  // 4) Actualiza la imagen del producto que creaste (PATCH/PUT dependiendo del API)
  const updatePayload = { image: "https://placehold.co/800x600?updated" };
  const r4 = await request.put(`${BASE}/products/${createdId}`, { data: updatePayload });
  expect(r4.ok()).toBeTruthy();
  const updated = await r4.json();
  expect(updated.image).toContain("updated");
});
