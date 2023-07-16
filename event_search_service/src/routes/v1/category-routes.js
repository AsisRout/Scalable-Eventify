const express = require('express');
const { CategoryMiddlewares} = require('../../middlewares');
const { CategoryController } = require('../../controllers');

const router = express.Router();

router.post('/', CategoryMiddlewares.validateCreateRequest, CategoryController.createCategory);

router.get('/', CategoryController.getCategories);

router.get('/:id', CategoryController.getCategory);

module.exports = router;