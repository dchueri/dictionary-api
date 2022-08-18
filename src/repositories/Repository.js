class Repository {
  constructor(model) {
    this.model = model;
  }

  async create(entity) {
    return this.model.create(entity);
  }

  async findOneById(id, attributes) {
    return this.model.findOne({
      where: { id: id },
      attributes: attributes
    });
  }
}

module.exports = Repository;
