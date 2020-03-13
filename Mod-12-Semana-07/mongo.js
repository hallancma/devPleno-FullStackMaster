const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

// Connection URL
const url =
  'mongodb+srv://intro:w0bstb@cluster0-0wtrb.mongodb.net/intro?retryWrites=true&w=majority';

// Database Name
const dbName = 'mongointro';
const options = {
  keepAlive: 1,
  useUnifiedTopology: true,
  useNewUrlParser: true
};

MongoClient.connect(url, options, (err, db) => {
  con = db.db(dbName);

  // con.collection('pessoas').insertOne(
  //   {
  //     nome: 'Jair Gomes',
  //     nascimento: '1954-04-12'
  //   },
  //   (err, res) => {
  //     console.log(err, res);
  //   }
  // );
  //const pessoas = con.collection('pessoas');
  // const cursorPessoas = pessoas.find({});
  // cursorPessoas.forEach(pessoa => {
  //   console.log(pessoa);
  // });
  // let filterPessoa = { _id: mongodb.ObjectID('5e68a51cd8f51703212a8e45') };
  // let update = {
  //   $set: {
  //     nome: 'Hallan Christian Meirelles Alencar',
  //     nascimento: '1986-05-29'
  //   }
  // };
  // con.collection('pessoas').updateOne(filterPessoa, update, function(err, res) {
  //   if (err) throw err;
  //   console.log('Successfully updated ');
  //   db.close();
  // });
  let deletePessoa = { _id: mongodb.ObjectID('5e69ee0ab44b95229bbcb456') };
  con.collection('pessoas').deleteOne(deletePessoa, (err, res) => {
    if (err) throw err;
    console.log('Successfully delete ');
    db.close();
  });
});
