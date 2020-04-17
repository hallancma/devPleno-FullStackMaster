const init = db => {
  const category = require('../models/category')(db);
  const product = require('../models/product')(db);

  const getCategories = async (req, res) => {
    const products = await product.getPtoductsByCategoryId(
      req.params.id,
      req.query
    );
    const cat = await category.getCategoryById(req.params.id);

    res.render('category', {
      products,
      category: cat
    });
  };

  const adminGetCategories = async (req, res) => {
    const categories = await category.getCategories();
    res.render('admin/categories/index', {
      categories
    });
  };

  const adminCreateCategory = async (req, res) => {
    //console.log(req);
    if (req.method === 'GET') {
      res.render('admin/categories/create', {
        form: {},
        errors: []
      });
    } else {
      try {
        await category.createCategory(req.body);
        res.redirect('/admin/categorias');
      } catch (error) {
        res.render('admin/categories/create', {
          form: req.body,
          errors: error.errors.fields
        });
      }
    }
  };

  const adminUpdateCategory = async (req, res) => {
    //console.log(req);
    if (req.method === 'GET') {
      const cat = await category.getCategoryById(req.params.id);
      res.render('admin/categories/update', {
        form: cat[0],
        errors: []
      });
    } else {
      try {
        await category.updateCategory(req.params.id, req.body);
        res.redirect('/admin/categorias');
      } catch (error) {
        res.render('admin/categories/update', {
          form: req.body,
          errors: error.errors.fields
        });
      }
    }
  };

  const adminRemoveCategory = async (req, res) => {
    await category.removeCategory(req.params.id);
    res.redirect('/admin/categorias');
  };

  return {
    getCategories,
    adminGetCategories,
    adminCreateCategory,
    adminRemoveCategory,
    adminUpdateCategory
  };
};
module.exports = init;
