// Créer ma propre classe

let connection = require('../config/db')

class Task {
// Methode all :
    static all (cb) {
        connection.query('SELECT * FROM mainlist', (err, result) => {
            if (err)
            {
                console.log('ERROR QUERY "SELECT * FROM content / \n"' + err.stack)
                return err
            }
            cb(result)
        })
    }
// Methode create
    static create (content, cb) {
        connection.query('INSERT INTO mainlist SET content = ?, created_at = ?', [content, new Date()], (err, result) => {
            if (err)
            {
                console.log("ERROR DB: " + err.stack)
                return err
            }
            cb(result)
        })
    }
// Methode Delete
    static delete (task_id) {
        connection.query('DELETE FROM mainlist WHERE id = ?', [task_id], (err) => {
            if (err)
            {
                console.log("ERROR DB: " + err.stack)
                return err
            }
        })
    }
}

module.exports = Task