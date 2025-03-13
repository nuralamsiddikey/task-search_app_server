import { ConflictError, NotFoundError } from '../../utils/errors.js';
import BaseService from '../base/baseService.js';
import productRepository from './product.repository.js';

class ProductService extends BaseService {
  #productRepository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#productRepository = repository;
  }

  async searchProducts(reqQuery) {
    const products = await this.#productRepository.searchProducts(reqQuery);
    return products;
  }
}

export default new ProductService(productRepository, 'product');
