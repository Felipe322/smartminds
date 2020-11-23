const dbConnection = require('../../config/dbConnection');

module.exports = app => {
    const connection = dbConnection();

    //Agregar comentario
    app.post('/api/comentario/', (req, res) => {

        let usuario = '';
        connection.query(`SELECT usuario FROM USUARIO WHERE email='${req.body.correo}';`, (err, result) => {
            if (err !== null) {
                //console.log(err)
                usuario = ''
            } else {

                usuario = result[0]["usuario"];
                connection.query(`INSERT INTO COMENTARIO_EMPRESA VALUES (NULL,'${usuario}','${req.body.correo}',${req.body.id_empresa},'${req.body.comentario}')`, (err, result) => {
                    console.log(err);
                    res.json(result);
                });
            }
        });


    });

    //
    app.get('/api/comentario/:id', (req, res) => {
        connection.query(`SELECT * FROM COMENTARIO_EMPRESA WHERE id_empresa=${req.params.id}`, (err, result) => {
            res.json(result);
        });
    });

    //eliminar un comentario
    app.post('/api/comentrio/eliminar/',(req,res) => {
        connection.query(`DELETE FROM COMENTARIO_EMPRESA WHERE id_comentario=${req.body.id_comentario} AND email='${req.body.correo}'`,(err,result) => {
            res.json(result);
        })
    })
}
