const db = require('../db.json')
const crypto = require('crypto')

const generateUniqueID = () => {
        return crypto.randomBytes(8).toString('hex')
    }

module.exports = (app) => {
    app.get('/api/notes', (req, res) => res.json(db));

    app.post('/api/notes', (req, res) => {
        req.id = generateUniqueID();
        req.body['id'] = req.id
        db.push(req.body)
        res.json(true)
    })

    app.delete('/api/notes', (req, res) => {
        
    })
    // TODO: delete function?
}