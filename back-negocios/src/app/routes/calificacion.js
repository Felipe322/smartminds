const dbConnection = require('../../config/dbConnection');

module.exports = app => {
    const connection = dbConnection();

    //insertar calificacion
    app.post('/api/calificacion/', (req, res) => {
        connection.query(`SELECT usuario FROM USUARIO WHERE email='${req.body.correo}';`, (err, result) => {
            if (err !== null) {
                //console.log(err)
                usuario = ''
            } else {
                usuario = result[0]["usuario"];
                connection.query(` INSERT INTO CALIFICACION_EMPRESA VALUES ('${usuario}','${req.body.correo}',${req.body.id_empresa},${req.body.puntuacion}) ON DUPLICATE KEY UPDATE puntuacion=${req.body.puntuacion};`, (err, result) => {
                    res.json(result);
                });
            }
        });
    });

    //obtener las calificaciones de una empresa.
    app.get('/api/calificaciones/:id_empresa', (req, res) => {
        connection.query(`SELECT CAST(AVG(puntuacion) AS DECIMAL(10,2)) as puntuacion FROM CALIFICACION_EMPRESA WHERE id_empresa=${req.params.id_empresa}`, (err, result) => {
            console.log(err);
            res.json(result);
        });
    });

    //obtener las calificaiones de una empresa y de un usuario en especifico.
    app.get('/api/calificacion/:id_empresa/:correo', (req, res) => {
        connection.query(`SELECT puntuacion FROM CALIFICACION_EMPRESA WHERE id_empresa=${req.params.id_empresa} AND email='${req.params.correo}'`, (err, result) => {
            if(err==!null){
                res.json(-1);
            }else {
                if(result.length>=1){
                    res.json(result[0]["puntuacion"]);
                }else{
                    res.json(-1);
                }
            }
        });
    });
}