const app = require('./config/server');
require('./app/routes/empresa')(app);
require('./app/routes/usuarios')(app);
require('./app/routes/favoritos')(app);


app.listen(app.get('port'),()=>{
    console.log('server on port', app.get('port')) 
})