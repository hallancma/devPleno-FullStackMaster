const slug = require('../utils/slug');
const getCategoryById = db => async id => {
  const category = await db('categories')
    .select('*')
    .modify(function(condition) {
      if (id > 0) {
        condition.where('id', id);
      } else {
        condition.where('id', '>', id);
      }
    });
  return category;
};

const getCategories = db => async () => {
  const categories = await db('categories AS c1').select('*');
  const sub = await db('categories AS c1').innerJoin(
    'categories AS c2',
    'c1.id',
    'c2.fkeCategory'
  );

  const categoriesWithSlug = categories.map(category => {
    let subCat = [];
    let subCatWithSlug = [];

    sub.forEach(sub => {
      sub = {
        ...sub,
        slugSub: slug(sub.category)
      };
      if (category.id === sub.fkeCategory) {
        subCat.push(sub);
      }
    });
    const newCategory = {
      ...category,
      slug: slug(category.category),
      subCat
    };

    return newCategory;
  });
  return categoriesWithSlug;
};

module.exports = {
  getCategoryById,
  getCategories,
  slug
};
