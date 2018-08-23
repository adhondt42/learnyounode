let connection = require('../config/db')

class Message {

    static all (cbmessages) {
        connection.query('SELECT * FROM message', (err, result) => {
            if (err)
            {
                console.log('ERROR QUERY "SELECT * FROM message / \n"' + err.stack)
                return err
            }
            cbmessages(result)
        })
    }

    static create (content, cb) {
        connection.query('INSERT INTO message SET content = ?, created_at = ?', [content, new Date()], (err, result) => {
            if (err)
            {
                console.log("ERROR DB: " + err.stack)
                return err
            }
            cb(result)
        })
    }
}

module.exports = Message