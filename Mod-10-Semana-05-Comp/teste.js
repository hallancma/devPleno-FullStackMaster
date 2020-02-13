const Sequelize = require('sequelize');
const sequelize = new Sequelize('sequelize-teste', 'root', '', {
  dialect: 'mysql',
  host: '127.0.0.1'
});

const Pessoa = sequelize.define('Pessoa', {
  nome: Sequelize.STRING,
  nascimento: Sequelize.DATE
});

const Usuario = sequelize.define('Usuario', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
});
const Projeto = sequelize.define('Projeto', {
  nome: Sequelize.STRING
});

Pessoa.hasOne(Usuario);
Usuario.belongsTo(Pessoa);

Pessoa.hasMany(Projeto);
Projeto.belongsTo(Pessoa);

const testeDb = async () => {
  await sequelize.sync(); //{ force: true }
  //sequelize.authenticate().then(() => console.log('connect!'));
  // const pessoa = await Pessoa.create({
  //   nome: 'Hallan Christian',
  //   nascimento: '1986-05-29'
  // });
  // const user = await Usuario.create({
  //   username: 'hallanchristian',
  //   password: '123456'
  // });
  // user.setPessoa(pessoa);

  // const usuarios = await Usuario.findAll();
  // const pessoas = await Promise.all(
  //   usuarios.map(async user => {
  //     return await user.getPessoa();
  //   })
  // );
  // console.log(pessoas);

  const usuarios = await Usuario.findAll({
    include: [{ model: Pessoa }]
  });
  console.log(usuarios);
};
testeDb();
