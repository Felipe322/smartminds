const dbConnection = require('../../config/dbConnection');

module.exports = app => {

    const connection = dbConnection();


    app.get('/api/empresa/', (req,res)=>{  
        connection.query('SELECT * FROM EMPRESA', (err,result) => {
            res.json(result);
        }); 
    });

    app.get('/api/empresa/:id', (req,res)=>{  
        connection.query('SELECT * FROM EMPRESA WHERE id_empresa ='+req.params.id, (err,result) => {
            res.json(result);
        }); 
    });
    
    app.post('/api/empresa/',(req,res)=>{
        const empresa = req.body;
        connection.query
        (`INSERT INTO EMPRESA VALUES 
        (NULL,'${empresa.nombre}','${empresa.direccion}','${empresa.email}','${empresa.telefono}','${empresa.descripcion}','${empresa.horario}',NULL,NULL);
        `, (err,result) => {
            if(err!==null)
                res.json(err);
            else
                res.json(result);
        });
        
    });
}