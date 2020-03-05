const category = require('../models/category');
const product = require('../models/product');

const getCategories = db => async (req, res) => {
  const products = await product.getPtoductsByCategoryId(db)(req.params.id);
  const cat = await category.getCategoryById(db)(req.params.id);

  res.render('category', {
    products,
    category: cat
  });
};

// const getSubCategories = db => async (req, res) => {
//   const subCategories = await category.getSubCategories(db)(req.params.id);
// };

module.exports = {
  getCategories
};
