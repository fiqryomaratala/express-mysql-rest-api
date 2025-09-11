import db from '../db.js';

// Ambil semua product dengan pagination & sorting
export async function getProducts({ page = 1, limit = 10, sort = "id", order = "asc" }) {
    const offset = (page - 1) * limit;
   
// Validasi input agar tidak terjadi SQL injection
    const validSort = ["id", "name", "price", "created_at"];
    const validOrder = ["asc", "desc"];

    if (!validSort.includes(sort)) sort  = "id";
    if (!validOrder.includes(order.toLocaleLowerCase())) order = "asc";

    const [rows] = await db.query(`SELECT * FROM products ORDER BY ${sort} ${order.toLocaleUpperCase()} LIMIT ? OFFSET ?`, 
    [Number(limit), Number(offset)]);

    const [[{ total }]] = await db.query("SELECT COUNT(*) as total FROM products");

    return {
        data: rows,
        pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            pages: Math.ceil(total / limit)
        },
    };
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






