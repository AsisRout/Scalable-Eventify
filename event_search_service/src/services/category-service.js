const { CategoryRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');


const categoryRepository = new CategoryRepository();



async function createCategory(data){
    try{
        const response = await categoryRepository.create(data);
        return response;
    }
    catch(error){
        if(error.name == 'SequelizeValidationError') {
            let explanations = [];
            error.errors.forEach((err) => {
                explanations.push(err.message);
            });
            throw new AppError(explanations, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Event Category', StatusCodes.INTERNAL_SERVER_ERROR);

    }
};

async function getCategories(){
    try {
        const categories = await categoryRepository.getAll();
        return categories;
    } catch (error){
        console.log(error);
        throw new AppError('Cannot fetch data of all categories', StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

async function getCategory(id){
    try {
        const category = await categoryRepository.get(id);
        return category;
    } catch (error){
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The event do not exists', error.statusCode);
        }
        throw new AppError('Cannot fetch data of the event', StatusCodes.INTERNAL_SERVER_ERROR);
    }
};



module.exports = {
    createCategory,
    getCategory,
    getCategories
};