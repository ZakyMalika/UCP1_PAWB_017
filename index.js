const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database/database.js');
require('dotenv').config();
// const fertilizerRoutes = require('./routes/');
const bibitRoutes = require('./routes/bibit.js');
const pupuk = require('./routes/pupuk.js');
const mysqlBibitRoutes = require('./routes/bibitmysql.js');
const mysqlpupukRoutes = require('./routes/pupukmysql.js');

const app = express();



app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use('/bibit', bibitRoutes);
app.use("/pupuk", pupuk);
app.use('/bibit-mysql', mysqlBibitRoutes);
app.use('/pupuk-mysql',mysqlpupukRoutes);

app.get('/', (req, res) => {
    res.redirect('/bibit'); // Redirect ke halaman daftar bibit secara default
  });

// Start server
const PORT = process.env.DB_PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));