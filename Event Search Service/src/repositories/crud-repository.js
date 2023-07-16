class CrudRepository {
    constructor(model){
        this.model = model;
    }

    async create(data){
        const response = this.model.create(data);
        return response;
    }

    async destroy(data) {
        const response = this.model.destroy(data);
        return response;
    }
}