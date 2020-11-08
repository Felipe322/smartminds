const dbConnection = require('../../config/dbConnection');

module.exports = app => {
    const connection = dbConnection();
    app.post('/api/favorito/', (req, res) => {
        let usuario = '';
        connection.query(`SELECT usuario FROM USUARIO WHERE email='${req.body.correo}';`,(err, result) => {
                    if (err !== null) {
                        //console.log(err)
                        usuario = ''
                    } else {

                        usuario = result[0]["usuario"];
                        connection.query
                            (`INSERT INTO FAVORITO_EMPRESA VALUES ('${usuario}','${req.body.correo}',${req.body.id_empresa});`,
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

    app.get('/api/favoritos/:email', (req, res) => {
        connection.query(`SELECT id_empresa FROM FAVORITO_EMPRESA WHERE email ='${req.params.email}'`  , (err, result) => {
            var resultado = [];
            for(var i = 0;i<result.length;i++){
                resultado.push(result[i].id_empresa);
            }
            res.json(resultado);
        });
    });


    app.post('/api/favorito/eliminar/', (req, res) => {
        connection.query(`DELETE FROM FAVORITO_EMPRESA WHERE email='${req.body.correo}' AND id_empresa = ${req.body.id_empresa};`  , (err, result) => {
            res.json(result);
        });
    });


    //eliminar varias empresas.
    app.post('/api/favorito/eliminar_lista/', (req, res) => {
        connection.query(`DELETE FROM FAVORITO_EMPRESA WHERE id_empresa in (${req.body.lista}) AND email= '${req.body.correo}';`  , (err, result) => {
            console.log(err);
            res.json(result);
        });
    });
}