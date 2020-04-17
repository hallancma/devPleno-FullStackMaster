const init = db => {
  const slug = require('../utils/slug');
  const Joi = require('@hapi/joi');
  const validation = require('../utils/validation');
  const createSchema = Joi.object({
    category: Joi.string()
      .min(5)
      .max(245)
      .required(),
    description: Joi.string()
      .min(5)
      .required()
  });
  const getCategoryById = async id => {
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

  const getCategories = async () => {
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

  const createCategory = async category => {
    const value = validation.validate(category, createSchema);
    await db('categories').insert(value);
    return true;

    // try {
    //   const value = createSchema.validate(category, {
    //     abortEarly: false,
    //     stripUnknown: true
    //   });
    //   await db('categories').insert(value);
    // } catch (err) {
    //   console.log(err);
    //   return err;
    // }
  };

  const updateCategory = async (id, category) => {
    const value = validation.validate(category, createSchema);
    await db('categories')
      .where({ id })
      .update(value);
    return true;
  };

  const removeCategory = async id => {
    await db('categories')
      .where({ id })
      .del();
  };
  return {
    getCategoryById,
    getCategories,
    slug,
    createCategory,
    removeCategory,
    updateCategory
  };
};
module.exports = init;
