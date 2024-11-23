const express = require('express')

const router = express.Router();


// Mockup data Bibit
let bibit = [
  { id: 1, nama: 'Bibit singkong', jenis: 'amplaz' },
  { id: 2, nama: 'Bibit kangkung', jenis: 'pakuwon' },
];

// Menampilkan daftar Bibit
router.get('/bibit', (req, res) => {
  res.render('tampilan-bibit/list', { bibit });
});

// Form tambah Bibit
router.get('/add', (req, res) => {
  res.render('tampilan-bibit/add');
});

// Menambahkan Bibit
router.post('/add', (req, res) => {
  const { nama, jenis } = req.body;
  const newBibit = { id: bibit.length + 1, nama, jenis };
  bibit.push(newBibit);
  res.redirect('/tampilan-bibit');
});

// Form edit Bibit
router.get('/edit/:id', (req, res) => {
  const data = bibit.find(b => b.id === parseInt(req.params.id));
  res.render('tampilan-bibit/edit', { data });
});

// Mengedit Bibit
router.post('/edit/:id', (req, res) => {
  const { nama, jenis } = req.body;
  const index = bibit.findIndex(b => b.id === parseInt(req.params.id));
  if (index !== -1) {
    bibit[index] = { id: parseInt(req.params.id), nama, jenis };
  }
  res.redirect('/tampilan-bibit');
});

// Menghapus Bibit
router.get('/delete/:id', (req, res) => {
  bibit = bibit.filter(b => b.id !== parseInt(req.params.id));
  res.redirect('/tampilan-bibit');
});

module.exports = router;