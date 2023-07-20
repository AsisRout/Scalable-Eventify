const { StatusCodes } = require('http-status-codes');

const { CategoryService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/commons');

async function createCategory(req, res) {
    try {
        const category = await CategoryService.createCategory({
            name: req.body.name,
            description: req.body.description,
        });
        SuccessResponse.data = category;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch(error) {
        console.log(error);
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}


async function getCategories(req, res) {
    try {
        const categories = await CategoryService.getCategories();
        SuccessResponse.data = categories;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

async function getCategory(req, res) {
    try {
        const category = await CategoryService.getCategory(req.params.id);
        SuccessResponse.data = category;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

module.exports = {
    createCategory,
    getCategories,
    getCategory
}