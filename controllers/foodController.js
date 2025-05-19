import Food from "../models/foodModel.js"



export const createFood = async (req, res) => {
  try {
    const { name, category, image,price,rating } = req.body;
    console.log(name,category,image);

   
    const newFood = new Food({ name, category, image,price,rating });
    console.log(newFood);
    
    const savedFood = await newFood.save();

    res.status(201).json({ message: 'Food created successfully', food: savedFood });
  } catch (error) {
    console.error('Error creating food:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


export const getAllFoods = async (req, res) => {
  try {
    const { categoryName } = req.query;
    const query = {};
    if (categoryName) {
      query['category.name'] = categoryName;
    }

    const foods = await Food.find(query).sort({ _id: -1 });;
    res.status(200).json({ foods });
  } catch (error) {
    console.error('Error fetching foods:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


export const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.status(200).json({ food });
  } catch (error) {
    console.error('Error fetching food by ID:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


export const searchFoodsByNameAndCategory = async (req, res) => {
  try {
    const { name, category } = req.query;
    const query = {};

    if (name) {
      query.name = { $regex: name, $options: "i" };
    }

    if (category) {
      query["category.name"] = { $regex: category, $options: "i" };
    }

    const foods = await Food.find(query);
    res.status(200).json({ foods });
  } catch (error) {
    console.error("Error searching foods by name and category:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};


export const updateFood = async (req, res) => {
  try {
    const { name, category, image } = req.body;

    if (!category || !category.name) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    const updatedFood = await Food.findByIdAndUpdate(
      req.params.id,
      { name, category, image, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!updatedFood) {
      return res.status(404).json({ message: 'Food not found' });
    }

    res.status(200).json({ message: 'Food updated successfully', food: updatedFood });
  } catch (error) {
    console.error('Error updating food:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


export const deleteFood = async (req, res) => {
  try {
    const deletedFood = await Food.findByIdAndDelete(req.params.id);
    if (!deletedFood) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.status(200).json({ message: 'Food deleted successfully' });
  } catch (error) {
    console.error('Error deleting food:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};