const db = require('../db.json')

module.exports = (app) => {
    app.get('/api/notes', (req, res) => res.json(db));

    app.post('/api/notes', (req, res) => {
        db.push(req.body)
        res.json(true)
    })

}