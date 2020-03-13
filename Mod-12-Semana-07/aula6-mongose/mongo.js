const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// Connection URL
const url =
  'mongodb+srv://intro:w0bstb@cluster0-0wtrb.mongodb.net/intro?retryWrites=true&w=majority';
const options = {
  keepAlive: 1,
  useUnifiedTopology: true,
  useNewUrlParser: true
};
mongoose.connect(url, options).then(() => {
  const CargoSchema = mongoose.Schema({
    descricao: String
  });
  const Cargo = mongoose.model('Cargo', CargoSchema);
  // const novoCargo = new Cargo({ descricao: 'DevOps' });
  // novoCargo.save(() => console.log('salvo'));

  Cargo.deleteOne(
    {
      _id: '5e69fce20c8652455c92e78e'
    },
    (err, res) => console.log('Ok')
  );

  Cargo.find({}, (err, res) => {
    console.log(res);
  });
});
