import sequelize from 'sequelize';
import pagination from '../../utils/pagination.js';
const { Op } = sequelize;


class BaseRepository {
  #model;
  constructor(model) {
    this.#model = model;
  }

  async create(item) {
    // console.log('base repository item', item);
    const data = await this.#model.create(item);

    return data;
  }

  async bulkCreate(products) {
    const data = await this.#model.bulkCreate(products);
    return data;
  }

  async findAll(query = {}) {
    const data = await this.#model.findAll(query);
    return data;
  }

  async findByPagination(query) {
    const data = await this.#model.findAndCountAll({ ...query });
    return data;
  }

  async findById(id) {
    const data = await this.#model.findByPk(id);
    return data;
  }

  async findOne(query) {
    const data = await this.#model.findOne({
      where: { ...query },
    });

    return data;
  }

  async findEmailOrPhone(phone = null, email = null) {
    const data = await this.#model.findOne({
      where: { 
        [Op.or]: [{ phone }, { email }] 
      },
    });

    return data;
  }
  async findLastId(field) {
    return await this.#model.max(field);
  }

  async updateById(id, item) {
    const data = await this.#model.update(
      { ...item },
      {
        where: {
          ...id,
        },
      }
    );
    return data;
  }

  async updateOne(query, item) {
    const data = await this.#model.update(
      { ...item },
      {
        where: { ...query },
      }
    );
    return data;
  }

  async deleteById(id) {
    return await this.#model.destroy({
      where: {
        ...id,
      },
    });
  }

  async deleteOne(query) {
    return await this.#model.destroy({
      where: { ...query },
    });
  }


  async findByPagination(
    query,
    condition = {},
    attributes = null,
    include = null
  ) {
    const data = await pagination(query, async (limit, offset, order) => {
      const sequelQuery = {
        where: {
          ...condition,
        },
        offset: offset,
        limit: limit,
        order: [['created_at', `${order}`]],
        attributes: attributes ? attributes : undefined,
        include: include ? include : undefined,
        distinct: true,
      };
      const { count: totalDoc, rows } =
        await this.#model.findAndCountAll(sequelQuery);
      const doc = rows.map(({ dataValues }) => dataValues);

      return { doc, totalDoc };
    });
    return data;
  }


  
}

export default BaseRepository;
