const mysql = require('mysql');
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'cadastro'
});

connection.connect(err => {
  if (err) {
    console.log('Erro ao conectar');
  } else {
    console.log('Conectado no mysql');
    connection.query('select * from pessoas', (err, results) => {
      console.log(err, results);
      connection.end();
    });
  }
});
