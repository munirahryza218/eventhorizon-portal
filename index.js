const express = require('express');
const bodyParser = require('body-parser');
const { sql, config } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// GET all events
app.get('/', async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query('SELECT * FROM Events');
        res.render('index', { events: result.recordset });
    } catch (err) {
        res.status(500).send('Database error: ' + err);
    }
});

// CREATE
app.get('/create', (req, res) => {
    res.render('create');
});

app.post('/create', async (req, res) => {
    const { name, date, description, location, capacity } = req.body;
    try {
        await sql.connect(config);
        await sql.query(`
            INSERT INTO Events (name, date, description, location, capacity)
            VALUES ('${name}', '${date}', '${description}', '${location}', ${capacity})
        `);
        res.redirect('/');
    } catch (err) {
        res.send('Create error: ' + err);
    }
});

// UPDATE
app.get('/update/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await sql.connect(config);
        const result = await sql.query(`SELECT * FROM Events WHERE id = ${id}`);
        res.render('update', { event: result.recordset[0] });
    } catch (err) {
        res.send('Update form error: ' + err);
    }
});

app.post('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { name, date, description, location, capacity } = req.body;
    try {
        await sql.connect(config);
        await sql.query(`
            UPDATE Events SET
            name='${name}', date='${date}', description='${description}',
            location='${location}', capacity=${capacity}
            WHERE id=${id}
        `);
        res.redirect('/');
    } catch (err) {
        res.send('Update error: ' + err);
    }
});

// DELETE
app.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await sql.connect(config);
        await sql.query(`DELETE FROM Events WHERE id=${id}`);
        res.redirect('/');
    } catch (err) {
        res.send('Delete error: ' + err);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
