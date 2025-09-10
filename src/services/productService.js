import db from '../db.js';

// Ambil semua product
export async function getAllProducts() {
    const [rows] = await db.query('SELECT * FROM products');
    return rows;
}

// Tambah product baru
export async function createProduct({name, price}) {
    const [result] = await db.query('INSERT INTO products (name, price) VALUES (?, ?)', [name, price]);
    return {id: result.insertId, name, price};
}

