import db from '../db.js';

// Ambil semua product
export async function getProducts() {
    const [rows] = await db.query('SELECT * FROM products');
    return rows;
}

export async function getProductById(id) {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0] || null;
}

// Tambah product baru
export async function createProduct({ name, price, description }) {
    const [result] = await db.query('INSERT INTO products (name, price, description) VALUES (?, ?, ?)', [name, price, description]);
    return await getProductById (result.insertId);
}

export async function updateProduct(id, data) {
    const fields = [];
    const values = [];

    if (data.name) {
        fields.push('name = ?');
        values.push(data.name);
    }

    if (data.price) {
        fields.push('price = ?');
        values.push(data.price);
    }

    if (data.description) {
        fields.push('description = ?');
        values.push(data.description);
    }

    if (!fields.length) return await getProductById(id);

    values.push(id);
    await db.query(`UPDATE products SET ${fields.join(', ')}, updated_at = NOW() WHERE id = ?`, values);
    return await getProductById(id);
}

export async function deleteProduct(id) {
  const [res] = await db.query("DELETE FROM products WHERE id = ?", [id]);
  return res.affectedRows > 0;
}






