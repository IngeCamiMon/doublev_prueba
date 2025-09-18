import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "30s", target: 0 },
    { duration: "60s", target: 100 }, // comienzo en 100
    { duration: "60s", target: 250 }, // +150 -> 250
    { duration: "60s", target: 400 }, // +150 -> 400
    { duration: "60s", target: 550 },
    { duration: "60s", target: 700 },
    { duration: "60s", target: 850 },
    { duration: "60s", target: 1000 },
    { duration: "30s", target: 0 },
  ],
};

const BASE = "https://fakestoreapi.com";

export default function () {
  // simular mezcla: un GET de lista y un POST de creación
  const r1 = http.get(`${BASE}/products`);
  check(r1, { "GET ok": (r) => r.status === 200 });
  const payload = JSON.stringify({
    title: "k6-scaling",
    price: 9.9,
    description: "scale test",
    image: "https://placehold.co/200x200",
    category: "electronics",
  });
  const r2 = http.post(`${BASE}/products`, payload, { headers: { "Content-Type": "application/json" } });
  check(r2, { "POST ok": (r) => r.status === 200 || r.status === 201 });
  sleep(0.5);
}
