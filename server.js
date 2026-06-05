const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const app = express();

const pool = new Pool({
    connectionString: 'postgresql://postgres:[YOUR-PASSWORD]@db.pntfvzkivjriiyvmuxqv.supabase.co:5432/postgres',
    ssl: {
        rejectUnauthorized: false
    }
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/posts', (req, res) => {
    pool.query('SELECT * FROM posts LIMIT 12', (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(results.rows);
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});