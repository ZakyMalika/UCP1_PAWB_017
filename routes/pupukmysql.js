
const express = require('express');
const db = require('../database/database'); // Koneksi database
const router = express.Router();

// Menampilkan daftar pupuk
router.get('/', (req, res) => {
  const query = 'SELECT * FROM pupuk';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.render('tampilan-pupuk-buat-mysqll/list', { pupuk: results });
  });
});

// Form Tambah pupuk
router.get('/add', (req, res) => {
  res.render('tampilan-pupuk-buat-mysql/add');
});

// Tambah pupuk
router.post('/add', (req, res) => {
  const { nama, jenis } = req.body;
  const query = 'INSERT INTO pupuk (namapupuk, tipepupuk) VALUES (?, ?)';
  db.query(query, [nama, jenis], (err) => {
    if (err) throw err;
    res.redirect('/tampilan-pupuk-buat-mysql');
  });
});

// Form Edit pupuk (Tambahan)
router.get('/edit/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM pupuk WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) throw err;
    res.render('tampilan-pupuk-buat-mysql/edit', { data: results[0] });
  });
});

// Edit pupuk
router.post('/edit/:id', (req, res) => {
  const { nama, jenis } = req.body;
  const { id } = req.params;
  const query = 'UPDATE pupuk SET namapupuk = ?, tipepupuk = ? WHERE id = ?';
  db.query(query, [nama, jenis, id], (err) => {
    if (err) throw err;
    res.redirect('/tampilan-pupuk-buat-mysql');
  });
});

// Hapus pupuk
router.get('/delete/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM pupuk WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) throw err;
    res.redirect('/tampilan-pupuk-buat-mysql');
  });
});

module.exports = router;
