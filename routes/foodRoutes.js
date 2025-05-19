import express from 'express';
import {  } from '../controllers/categoryController.js'; // Use import and .js extension
import { createFood, getAllFoods, searchFoodsByNameAndCategory } from '../controllers/foodController.js';
const router = express.Router();

router.post('/addFood', createFood);
router.get('/allFoods', getAllFoods);
router.get('/search', searchFoodsByNameAndCategory);


export default router;