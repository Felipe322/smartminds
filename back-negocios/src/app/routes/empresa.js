const dbConnection = require('../../config/dbConnection');
const app = require('../../config/server');
const firebase = require('firebase');

module.exports = app => {


    const connection = dbConnection();


    app.get('/api/empresa/', (req, res) => {
        connection.query('SELECT * FROM EMPRESA', (err, result) => {
            res.json(result);
        });
    });

    app.get('/api/empresa/:id', (req, res) => {
        connection.query('SELECT * FROM EMPRESA WHERE id_empresa =' + req.params.id, (err, result) => {
            res.json(result);
        });
    });

    app.post('/api/empresa/', (req, res) => {
        const empresa = req.body;
        console.log(req.body);
        
        connection.query
        (`INSERT INTO EMPRESA VALUES(NULL,'${empresa.nombre}','${empresa.direccion}','${empresa.email}','${empresa.telefono}','${empresa.descripcion}','${empresa.horario}',NULL,'${empresa.imagen}');`,
         (err,result) => {
            if(err!==null){
                console.log(err)
                res.json(err);
            }else{
                console.log(err)
                res.json(result);
            }
                
        });

    });
}