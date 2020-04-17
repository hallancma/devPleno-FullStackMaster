const init = db => {
  const product = require('../models/product')(db);
  const getProduct = async (req, res) => {
    const prod = await product.getProductByid(req.params.id);
    console.log(prod);

    res.render('product-detail', {
      product: prod
    });
  };
  return {
    getProduct
  };
};

module.exports = init;
