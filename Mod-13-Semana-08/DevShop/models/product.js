const init = db => {
  const getPaginationParams = query => {
    const { currentPage, pages, pageSize } = query;
    return {
      currentPage: currentPage ? parseInt(currentPage) : 0,
      pages: pages ? parseInt(pages) : 1,
      pageSize: pageSize ? parseInt(pageSize) : 2
    };
  };
  const slug = require('../utils/slug');
  const getPtoductsByCategoryId = async (id, query) => {
    const pagination = getPaginationParams(query);
    const products = await db('products')
      .select('*')
      .whereIn('id', function() {
        this.select('categories_products.product_id')
          .from('categories_products')
          //.whereRaw('categories_products.product_id = products.id')
          .modify(function(condition) {
            if (id > 0) {
              condition.where('category_id', id);
            } else {
              condition.where('category_id', '>', id);
            }
          });
      })
      .limit(pagination.pageSize)
      .offset(pagination.currentPage * pagination.pageSize);

    const productsCount = await db('products')
      .count('id as total')
      .whereIn('id', function() {
        this.select('categories_products.product_id')
          .from('categories_products')
          //.whereRaw('categories_products.product_id = products.id')
          .modify(function(condition) {
            if (id > 0) {
              condition.where('category_id', id);
            } else {
              condition.where('category_id', '>', id);
            }
          });
      });

    const totalProducts = Array.from(await db('products').select('id'));
    const total = totalProducts.map(prod => {
      return prod['id'];
    });
    pagination.total = total.length;
    console.log(pagination.total);
    // use reduce to build the new map into an accumulator
    // we'll refer to this as "reduce mutate"

    pagination.total = productsCount[0]['total'];
    pagination.totalPages = Math.ceil(pagination.total / pagination.pageSize);
    const productsWithSlug = products.map(product => {
      const newProducts = {
        ...products,
        slug: slug(product.name),
        pagination
      };
      return newProducts;
    });
    return productsWithSlug;
  };

  const getProductByid = async id => {
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
  return {
    getPtoductsByCategoryId,
    getProductByid
  };
};

module.exports = init;
