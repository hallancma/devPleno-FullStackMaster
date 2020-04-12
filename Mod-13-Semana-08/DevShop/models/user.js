const bcrypt = require('bcryptjs');
const generatePassHash = passwd => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(passwd, salt);
  return hash;
};
const initialUser = db => async id => {
  const count = await db('users').count('id as total');
  if (count[0].total === 0) {
    const user = {
      name: 'Admin',
      email: 'hallancma@gmail.com',
      passwd: generatePassHash('teste123'),
      email_checked: true,
      created: new Date(),
      update: new Date(),
      roles: 'admin,financial,customer'
    };
    try {
      await db('users').insert(user);
      console.log(`Usuario ${user.name} inserido com sucesso!`);
    } catch (error) {
      console.log(`Erro ao inserir o usuario ${user.name} Erro SQL: ${error}`);
    }
  }
};

const login = db => async (email, passwd) => {
  const user = await db('users')
    .select('*')
    .where('email', email);
  if (user.length === 0) {
    throw new Error('Invalid User!');
  }
  if (!bcrypt.compareSync(passwd, user[0].passwd)) {
    throw new Error('Invalid Password');
  }

  return user[0];
};

module.exports = {
  initialUser,
  login
};
