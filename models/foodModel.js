import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String, required: true 
  },
  image: { type: String }, 
   price: { type: Number, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Food = mongoose.model('Food', foodSchema);
export default Food