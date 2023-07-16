class CrudRepository {
    constructor(model){
        this.model = model;
    }

    async create(data){
        const response = this.model.create(data);
        return response;
    }

    async getAll(){
        const response = this.model.findAll();
        return response;
    }

    async get(id){
        const response = this.model
    }

    async destroy(data) {
        const response = this.model.destroy(data);
        return response;
    }
}