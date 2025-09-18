import http from "k6/http";
import { check, sleep, group } from "k6";

export const options = {
  vus: 150,
  duration: "2m",
};

const BASE = "https://fakestoreapi.com";

export default function () {
  group("list and create", function () {
    // 1) listar todos los productos
    const resGet = http.get(`${BASE}/products`);
    check(resGet, { "GET products ok": (r) => r.status === 200 });

    // 2) crear nuevo producto (simulación)
    const payload = JSON.stringify({
      title: "k6 load test product",
      price: 10.99,
      description: "created by k6",
      image: "https://placehold.co/400x300",
      category: "electronics",
    });
    const headers = { "Content-Type": "application/json" };
    const resPost = http.post(`${BASE}/products`, payload, { headers });
    check(resPost, { "POST product created": (r) => r.status === 200 || r.status === 201 });

    sleep(1);
  });
}
