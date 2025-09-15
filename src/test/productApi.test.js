import request from "supertest";
import app from "../app.js";
import db from "../db.js";

describe("Product API", () => {
    let productId;

    afterAll(async () => {
        await db.end(); 
    });

    test("POST /products harus bisa tambah product", async () => {
        const res = await request(app)
            .post("/api/products")
            .send({ name: "Api Test", price: 2000, description: "Product Via Api" });
            
        console.log("POST /products response:", res.body);
        expect(res.statusCode).toBe(201);
        productId = res.body.id;
        expect(res.body.name).toBe("Api Test");
    });

    test("GET /products/:id harus ambil detail product", async () => {
        const res = await request(app).get(`/api/products/${productId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe("Api Test");
    });

    test("DELETE /products/:id harus hapus product", async () => {
        const res = await request(app).delete(`/api/products/${productId}`);
        expect(res.statusCode).toBe(204);
    });
});