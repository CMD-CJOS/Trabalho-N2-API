const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const app = express();

const pool = new Pool({
    connectionString: 'postgresql://postgres.pntfvzkivjriiyvmuxqv:qvP1cVOC4J46QIFJ@aws-1-us-east-1.pooler.supabase.com:5432/postgres',
    ssl: {
        rejectUnauthorized: false
    }
});

app.use(express.static(path.join(__dirname, 'public')));

// Cache em memória
const cache = {
    posts: { data: null, timestamp: 0 },
    curriculo: { data: null, timestamp: 0 }
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos em milissegundos

// Função auxiliar para verificar cache
function isCacheValid(key) {
    return cache[key].data && (Date.now() - cache[key].timestamp < CACHE_DURATION);
}

// Rota de Posts com Cache
app.get('/api/posts', async (req, res) => {
    if (isCacheValid('posts')) {
        return res.json(cache.posts.data);
    }
    try {
        const results = await pool.query('SELECT * FROM posts LIMIT 12');
        cache.posts = { data: results.rows, timestamp: Date.now() };
        res.json(cache.posts.data);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Rota de Currículo com Cache
app.get('/api/curriculo', async (req, res) => {
    if (isCacheValid('curriculo')) {
        return res.json(cache.curriculo.data);
    }
    try {
        const results = await pool.query('SELECT * FROM curriculo ORDER BY id ASC');
        cache.curriculo = { data: results.rows, timestamp: Date.now() };
        res.json(cache.curriculo.data);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});