const mysql = require('mysql');
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'cadastro'
});

const fs = require('fs');
const writable = fs.createWriteStream('pessoas.csv');
writable.write('id,nome,nascimento,cargo\n', () => {
  connection.connect(err => {
    if (err) {
      console.log('Erro ao conectar');
    } else {
      const query = connection.query('select * from pessoas');
      query.on('result', row => {
        connection.pause();
        const data =
          row.id +
          ',' +
          row.nome +
          ',' +
          row.nascimento +
          ',' +
          row.cargo +
          '\n';
        setTimeout(() => {
          writable.write(data, () => {
            connection.resume();
            console.log('written');
          });
        }, 5);
        //JSON.stringify(row)
      });

      query.on('end', () => {
        writable.end();
        connection.end();
        console.log('finished');
      });
    }
  });
});
