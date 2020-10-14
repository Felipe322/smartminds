const mysql = require('mysql');

module.exports = () => {
    return mysql.createConnection({
      host: 'localhost',
      user: 'Admin',
      password: 'pitufito_L34',
      database: 'empresas_locales',
      socketPath: '/var/run/mysqld/mysqld.sock',
      insecureAuth : true
    });
}