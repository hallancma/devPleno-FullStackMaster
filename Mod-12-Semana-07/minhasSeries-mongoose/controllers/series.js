const labels = [
  { id: 'to-watch', name: 'Para Assistir' },
  { id: 'watching', name: 'Assistindo' },
  { id: 'watched', name: 'Assistido' }
];

const pagination = async (model, conditions, params) => {
  const total = await model.estimatedDocumentCount(conditions);
  const pageSize = parseInt(params.pageSize) || 20;
  const currentPage = parseInt(params.page) || 0;
  const pagination = {
    currentPage,
    pageSize,
    pages: parseInt(total / pageSize)
  };
  const results = await model
    .find(conditions)
    .skip(currentPage * pageSize)
    .limit(pageSize);

  return {
    data: results,
    pagination
  };
};

const index = async ({ Series }, req, res) => {
  const results = await pagination(Series, {}, req.query);
  res.render('series/index', { results, labels });
};
const novaProcess = async ({ Series }, req, res) => {
  const novaSerie = new Series(req.body);
  try {
    await novaSerie.save();
    res.redirect('/series');
  } catch (error) {
    res.render('series/nova', {
      errors: Object.keys(error.errors)
    });
  }
};

const novaForm = (req, res) => {
  res.render('series/nova', { errors: [] });
};

const editarProcess = async ({ Series }, req, res) => {
  const serie = await Series.findOne({ _id: req.params.id });
  serie.name = req.body.name;
  serie.status = req.body.status;
  try {
    await serie.save();
    res.redirect('/series');
  } catch (error) {
    res.render('series/editar', {
      serie,
      labels,
      errors: Object.keys(error.errors)
    });
    console.log(error);
  }
};

const editarForm = async ({ Series }, req, res) => {
  const serie = await Series.findOne({ _id: req.params.id });
  res.render('series/editar', { serie, labels, errors: [] });
};

const excluir = async ({ Series }, req, res) => {
  await Series.remove({
    _id: req.params.id
  });
  res.redirect('/series');
};

const info = async ({ Series }, req, res) => {
  const serie = await Series.findOne({ _id: req.params.id });
  res.render('series/info', { serie });
};

const addComments = async ({ Series }, req, res) => {
  await Series.updateOne(
    { _id: req.params.id },
    { $push: { comments: req.body.comments } }
  );
  res.redirect('/series/info/' + req.params.id);
};

module.exports = {
  index,
  novaProcess,
  novaForm,
  excluir,
  editarForm,
  editarProcess,
  info,
  addComments
};
