const mysql = require('mysql2');
require('dotenv').config(); // Load konfigurasi dari .env

// koneksi ke db
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Mengecek Koneksi
db.connect((err) => {
  if (err) {
    console.error('Database connection error: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = db;