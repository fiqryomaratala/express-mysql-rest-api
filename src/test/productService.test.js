import { createProduct, getProductById, deleteProduct } from '../services/productService.js';
import db from '../db.js';

describe('Product Service', () => {
    let productId;

    afterAll(async () => {
        await db.end(); // Close pool connection to finist jest
    });

    test("createProduct() harus bisa menambah produck", async () => {
        const product = await createProduct({
            name: 'Test Product',
            price: 1000,
            description: 'Testing Jest Product'
        });
        expect(product).toHaveProperty('id');
        expect(product.name).toBe('Test Product');
        productId = product.id
    });

    test("getProducrById() harus bisa mengambil product berdasarkan id", async () => {
        const product = await getProductById(productId);
        expect(product).not.toBeNull();
        expect(product.name).toBe("Test Product");
    });

    test("deleteProduct() harus bisa menghapus produk", async () => {
        const ok = await deleteProduct(productId);
        expect(ok).toBe(true);
    });
});