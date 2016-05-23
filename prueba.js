var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'vasquez',
  database : 'mydb'
});

connection.connect();

connection.query('call sp_consultar_banner_dia(\'2016-05-05\');', function(err, rows, fields) {
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.');
});

connection.end();
