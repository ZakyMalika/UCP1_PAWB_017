
const express = require('express');
const router = express.Router();

// Mockup data Pupuk
let pupuk = [
  { id: 1, nama: 'Urea', jenis: 'Kimia' },
  { id: 2, nama: 'Kompos', jenis: 'Organik' },
];

// Menampilkan daftar Pupuk
router.get('/', (req, res) => {
  res.render('pupuk/list', { pupuk });
});

// Form tambah Pupuk
router.get('/add', (req, res) => {
  res.render('pupuk/add');
});

// Menambahkan Pupuk
router.post('/add', (req, res) => {
  const { nama, jenis } = req.body;
  const newPupuk = { id: pupuk.length + 1, nama, jenis };
  pupuk.push(newPupuk);
  res.redirect('/pupuk');
});

// Form edit Pupuk
router.get('/edit/:id', (req, res) => {
  const data = pupuk.find(p => p.id === parseInt(req.params.id));
  res.render('pupuk/edit', { data });
});

// Mengedit Pupuk
router.post('/edit/:id', (req, res) => {
  const { nama, jenis } = req.body;
  const index = pupuk.findIndex(p => p.id === parseInt(req.params.id));
  if (index !== -1) {
    pupuk[index] = { id: parseInt(req.params.id), nama, jenis };
  }
  res.redirect('/pupuk');
});

// Menghapus Pupuk
router.get('/delete/:id', (req, res) => {
  pupuk = pupuk.filter(p => p.id !== parseInt(req.params.id));
  res.redirect('/pupuk');
});

module.exports = router;
