const dbConnection = require('../../config/dbConnection');

module.exports = app => {


    const connection = dbConnection();


    app.get('/api/empresa/', (req, res) => {
        connection.query('SELECT * FROM EMPRESA', (err, result) => {
            res.json(result);
        });
    });

    app.post('/api/empresa/filtrar/', (req, res) => {
        console.log(req.body.filter);
        connection.query(`SELECT * FROM EMPRESA WHERE nombre LIKE '%${req.body.filter}%'`, (err, result) => {
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

        connection.query
            (`INSERT INTO EMPRESA VALUES(NULL,'${empresa.nombre}','${empresa.direccion}','${empresa.email}','${empresa.telefono}','${empresa.descripcion}','${empresa.horario}',NULL,'${empresa.imagen}');`,
                (err, result) => {
                    if (err !== null) {
                        res.json(err);
                    } else {
                        res.json(result);
                    }
                });
    });

    app.post('/api/empresa-usuario/', (req, res) => {
        let usuario = 'hola';
        connection.query
            (`SELECT usuario FROM USUARIO WHERE email='${req.body.correo}';
        `,
                (err, result) => {
                    if (err !== null) {
                        //console.log(err)
                        usuario = ''
                    } else {

                        usuario = result[0]["usuario"];
                        connection.query
                            (`INSERT INTO REGISTRO_EMPRESA VALUES ('${usuario}','${req.body.correo}',${req.body.id});`,
                                (err, result) => {
                                    if (err !== null) {
                                        //console.log(err)
                                        res.json(err);
                                    } else {
                                        //console.log(result)
                                        res.json(result);
                                    }
                                });
                    }
                });
    })

}