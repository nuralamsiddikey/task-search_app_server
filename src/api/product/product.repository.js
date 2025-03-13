import BaseRepository from '../base/baseRepository.js';
import { Product } from './product.model.js';
import sequelize from 'sequelize';
const { Op } = sequelize;

class ProductRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async searchProducts(reqQuery) {
    const { page, limit, order, query } = reqQuery;
    const paginationQuery = { page, limit, order };

    const whereQuery = {
      [Op.or]: [
        { title: { [Op.substring]: query } },
        { description: { [Op.substring]: query } },
      ],
    };

    const products = await super.findByPagination(paginationQuery, whereQuery);

    return products;
  }
}

export default new ProductRepository(Product);
