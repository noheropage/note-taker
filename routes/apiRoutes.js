const db = require('../db/db.json')
const crypto = require('crypto')
const fs = require('fs');
const path = require('path');

// create individualized id for each note
const generateUniqueID = () => {
        return crypto.randomBytes(8).toString('hex')
    }

module.exports = (app) => {
    app.get('/api/notes', (req, res) => res.json(db));

    app.post('/api/notes', (req, res) => {
        let id = generateUniqueID();
        // create an id key and value for the note
        req.body['id'] = id
        // push note with id into the json object
        db.push(req.body)
        // write a json file containing the object
        fs.writeFile('./db/db.json', JSON.stringify(db),'utf8', () => res.json(true))
    })

    app.delete(`/api/notes/:id`, (req, res) => {
        const deletedNote = req.params.id;
        for (let i=0; i < db.length; i++){
            if (deletedNote === db[i].id) {
                // find the note with an id matching the id of the note clicked and remove it
                db.splice(i, 1)
                // write a json file with the new object
                fs.writeFile('./db/db.json', JSON.stringify(db),'utf8', () => console.log('Deleted'))
                break;
            }
        }
        return res.json(false)
    })
}