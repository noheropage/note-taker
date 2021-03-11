const db = require('../db.json')
const crypto = require('crypto')
const { json } = require('express')

const generateUniqueID = () => {
        return crypto.randomBytes(8).toString('hex')
    }

module.exports = (app) => {
    app.get('/api/notes', (req, res) => res.json(db));

    app.post('/api/notes', (req, res) => {
        let id = generateUniqueID();
        req.body['id'] = id
        db.push(req.body)
        res.json(true)
    })

    app.delete(`/api/notes/:id`, (req, res) => {
        const deletedNote = req.params.id;
        for (let i=0; i < db.length; i++){
            if (deletedNote === db[i].id) {
                db.splice(i, 1)
                break;
            }
        }
        return res.json(false)
    })
}