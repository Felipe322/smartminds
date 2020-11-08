const dbConnection = require('../../config/dbConnection');

module.exports = app => {


    const connection = dbConnection();


    app.get('/api/empresa/', (req, res) => {
        connection.query('SELECT * FROM EMPRESA ORDER BY id_empresa DESC', (err, result) => {
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


    //insertar una empresa.
    app.post('/api/empresa-usuario/', (req, res) => {
        let usuario = '';
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

    app.get('/api/empresa-usuario/:email', (req, res) => {
        connection.query(`SELECT * FROM EMPRESA WHERE id_empresa in (SELECT id_empresa from REGISTRO_EMPRESA WHERE email ='${req.params.email}')`, (err, result) => {
            res.json(result);
        });
    })

    //eliminar una lista de empresas.
    app.post('/api/mis_empresas/eliminar_lista/',(req,res) => {
        connection.query(`DELETE FROM REGISTRO_EMPRESA WHERE id_empresa in (${req.body.lista}) AND email= '${req.body.correo}'`, (err, result) => {
        });
        connection.query(`DELETE FROM FAVORITO_EMPRESA WHERE id_empresa in (${req.body.lista})`, (err, result) => {
        });
        connection.query(`DELETE FROM EMPRESA WHERE id_empresa in (${req.body.lista})`, (err, result) => {
            res.json(err);
        });
    })

    //modificar una empresa
    app.post('/api/empresa/modificar/', (req, res) => {
        const empresa = req.body;
        
        connection.query(`UPDATE EMPRESA SET nombre='${empresa.nombre}', direccion='${empresa.direccion}', email='${empresa.email}', telefono=${empresa.telefono}, descripcion='${empresa.descripcion}', horario='${empresa.nombre}' WHERE id_empresa=${empresa.id}`, (err, result) => {
            res.json(result);
        });
    });


}