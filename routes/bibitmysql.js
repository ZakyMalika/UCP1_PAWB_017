const express = require('express');
const db = require('../database/database'); // Koneksi database
const router = express.Router();

// Menampilkan daftar Bibit
router.get('/', (req, res) => {
  const query = 'SELECT * FROM bibit';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.render('bibit-mysql/list', { bibit: results });
  });
});

// Form Tambah Bibit
router.get('/add', (req, res) => {
  res.render('bibit-mysql/add');
});

// Tambah Bibit
router.post('/add', (req, res) => {
  const { nama, jenis } = req.body;
  const query = 'INSERT INTO bibit (nama_bibit, tipe_bibit) VALUES (?, ?)';
  db.query(query, [nama, jenis], (err) => {
    if (err) throw err;
    res.redirect('/bibit-mysql');
  });
});

// Form Edit Bibit (Tambahan)
router.get('/edit/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM bibit WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) throw err;
    res.render('bibit-mysql/edit', { data: results[0] });
  });
});

// Edit Bibit
router.post('/edit/:id', (req, res) => {
  const { nama, jenis } = req.body;
  const { id } = req.params;
  const query = 'UPDATE bibit SET nama_bibit = ?, tipe_bibit = ? WHERE id = ?';
  db.query(query, [nama, jenis, id], (err) => {
    if (err) throw err;
    res.redirect('/bibit-mysql');
  });
});

// Hapus Bibit
router.get('/delete/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM bibit WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) throw err;
    res.redirect('/bibit-mysql');
  });
});

module.exports = router;