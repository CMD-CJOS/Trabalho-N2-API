const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'site_institucional'
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/posts', (req, res) => {
    db.query('SELECT * FROM posts LIMIT 12', (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(results);
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});