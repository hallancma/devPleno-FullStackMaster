const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const sqlite = require('sqlite');
const dbConnection = sqlite.open(path.resolve(__dirname, 'banco.sqlite'), {
  Promise
});

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', async (request, response) => {
  const db = await dbConnection;
  const categoriasDb = await db.all('select * from categorias;');
  const vagas = await db.all('select * from vagas');
  const categorias = categoriasDb.map(cat => {
    return {
      ...cat,
      vagas: vagas.filter(vaga => vaga.idCategoria === cat.id)
    };
  });
  //console.log(categorias);

  response.render('home', {
    categorias,
    vagas
  });
});

app.get('/vaga/:id', async (request, response) => {
  //console.log(request.params);
  const idVaga = request.params.id;
  const db = await dbConnection;
  const vaga = await db.get(`select * from vagas where id = ${idVaga};`);
  //console.log(vaga);
  response.render('vaga', {
    vaga
  });
});

app.get('/admin', (req, res) => {
  res.render('admin/home');
});

app.get('/admin/vagas', async (req, res) => {
  const db = await dbConnection;
  const vagas = await db.all('select * from vagas');
  res.render('admin/vagas', { vagas });
});
app.get('/admin/vagas/delete/:id', async (req, res) => {
  const db = await dbConnection;
  await db.run('delete from vagas where id = ' + req.params.id);
  res.redirect('/admin/vagas');
});

app.get('/admin/nova', async (req, res) => {
  const db = await dbConnection;
  const categorias = await db.all('select * from categorias;');
  res.render('admin/nova-vaga', { categorias });
});
app.post('/admin/nova', async (req, res) => {
  const { titulo, descricao, categoria } = req.body;
  const db = await dbConnection;
  await db.run(`insert into vagas(idCategoria,titulo,descricao)
                values(${categoria},'${titulo}','${descricao}') `);
  res.redirect('/admin/vagas');
});

app.get('/admin/vagas/editar/:id', async (req, res) => {
  const db = await dbConnection;
  const categorias = await db.all('select * from categorias;');
  const vaga = await db.get('select * from vagas where id = ' + req.params.id);
  res.render('admin/editar-vaga', { categorias, vaga });
});
app.post('/admin/vagas/editar/:id', async (req, res) => {
  const { titulo, descricao, categoria } = req.body;
  const { id } = req.params;
  const db = await dbConnection;
  await db.run(`update vagas set titulo = '${titulo}',
                                 descricao = '${descricao}',
                                 idCategoria = ${categoria}
                                 where id = ${id}`);
  res.redirect('/admin/vagas');
});

app.get('/admin/categorias', async (req, res) => {
  const db = await dbConnection;
  const categorias = await db.all('select * from categorias');
  res.render('admin/categorias', { categorias });
});

app.get('/admin/categoria/delete/:id', async (req, res) => {
  const db = await dbConnection;
  const id = req.params.id;
  db.run(`delete from categorias where id = ${id}`);
  res.redirect('/admin/categorias');
});

app.get('/admin/novaCategoria', async (req, res) => {
  res.render('admin/nova-categoria');
});

app.post('/admin/novaCategoria', async (req, res) => {
  const db = await dbConnection;
  const { titulo } = req.body;
  db.run(`insert into categorias(categoria) values ('${titulo}')`);
  res.redirect('/admin/categorias');
});

app.get('/admin/categoria/editar/:id', async (req, res) => {
  const db = await dbConnection;
  const categoria = await db.get(
    `select * from categorias where id = ${req.params.id} `
  );
  res.render('admin/editar-categoria', { categoria });
});

app.post('/admin/categoria/editar/:id', async (req, res) => {
  const db = await dbConnection;
  const id = req.params.id;
  const { titulo } = req.body;
  db.run(`update categorias set categoria = '${titulo}' where id = ${id}`);
  res.redirect('/admin/categorias');
});

const init = async () => {
  const db = await dbConnection;
  await db.run(
    `create table if not exists categorias (
      id INTEGER PRIMARY KEY, categoria TEXT
      )`
  );
  await db.run(
    `create table if not exists vagas (
      id INTEGER PRIMARY KEY, idCategoria INTEGER, titulo TEXT, descricao TEXT
      )`
  );
  // const novaCategoria = 'Desenvolvimento';
  // await db.run(`insert into categorias(categoria)
  // values('${novaCategoria}') `);
  // const novaVaga = 'DBA Oracle';
  // const descricao = 'Vaga para profissional DBA ORACLE';
  // await db.run(`insert into vagas(idCategoria,titulo,descricao)
  //  values(1,'${novaVaga}','${descricao}') `);
};
init();

app.listen(port, err => {
  if (err) {
    console.log('Não foi possível iniciar o servidor do Jobify');
  } else {
    console.log('Servidor do Jobify rodando...');
  }
});
