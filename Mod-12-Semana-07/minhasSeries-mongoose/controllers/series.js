const labels = [
  { id: 'to-watch', name: 'Para Assistir' },
  { id: 'watching', name: 'Assistindo' },
  { id: 'watched', name: 'Assistido' }
];

const index = async ({ Series }, req, res) => {
  const docs = await Series.find({});
  res.render('series/index', { series: docs, labels });
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
