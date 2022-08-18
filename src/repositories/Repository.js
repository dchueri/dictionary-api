class Repository {
    constructor(model) {
        this.model = model
    }

    async create(entity) {
        return this.model.create(entity);
    }

    async findOneById(id) {
        return this.model.findOne({ where: { id: id } })
    }


}

module.exports = Repository