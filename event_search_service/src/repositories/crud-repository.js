const { AppError } = require("../utils");
const { StatusCodes } = require('http-status-codes')

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

    async destroy(id){
        const response = this.model.destroy({
            where: {
                id
            }
        });
        if(!response) {
            throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND);
        }
        return response;
    }

    async get(id){
        const response = this.model.findByPk(id);
        if(!response){
            throw new AppError('Not able to find the resource',StatusCodes.NOT_FOUND);
        }
        return response;

    }

    async update(id, data){
        const response = await this.model.update(data, {
            where: {
                id: id
            }
        })
        return response;
    }
}

module.exports = CrudRepository;