const dbConnection = require('../../config/dbConnection');

module.exports = app => {
    const connection = dbConnection();
    
    app.post('/api/usuario/', (req, res) => {
        connection.query(`INSERT INTO USUARIO (usuario,email) VALUES ('${req.body.usuario}','${req.body.correo}');`, (err, result) => {
            res.json(result);
        });
    });

}