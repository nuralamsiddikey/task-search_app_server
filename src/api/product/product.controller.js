import catchError from '../../middleware/errors/catchError.js';
import { BadRequestError } from '../../utils/errors.js';
import responseHandler from '../../utils/responseHandler.js';
import productService from './product.service.js';
import { productQueryValidate } from './product.validate.js';


class ProductController {
  #productService;
  constructor(productService) {
    this.#productService = productService;
  }

  searchProducts = catchError(async (req, res, next) => {
    const { error, value: reqQuery } = productQueryValidate(req.query);
    if (error) {
      throw new BadRequestError(error);
    }
    const data = await this.#productService.searchProducts(reqQuery);
    const resDoc = responseHandler(200, 'Successfully fetched products', data);
    res.status(resDoc.statusCode).json(resDoc);
  });
}

export default new ProductController(productService);
