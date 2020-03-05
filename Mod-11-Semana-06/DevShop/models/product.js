const slug = require('../utils/slug');
const getPtoductsByCategoryId = db => async id => {
  const products = await db('products')
    .select('*')
    .where('id', function() {
      this.select('categories_products.product_id')
        .from('categories_products')
        .whereRaw('categories_products.product_id = products.id')
        .modify(function(condition) {
          if (id > 0) {
            condition.where('category_id', id);
          } else {
            condition.where('category_id', '>', id);
          }
        });
    });
  const productsWithSlug = products.map(product => {
    const newProducts = {
      ...products,
      slug: slug(product.name)
    };
    return newProducts;
  });
  return productsWithSlug;
};

const getProductByid = db => async id => {
  const product = await db('products')
    .select('*')
    .where('id', id);
  const productWithSlug = product.map(prod => {
    const productWithSlugId = {
      ...product,
      slug: slug(prod.name)
    };
    return productWithSlugId;
  });

  return productWithSlug;
};

module.exports = {
  getPtoductsByCategoryId,
  getProductByid
};
