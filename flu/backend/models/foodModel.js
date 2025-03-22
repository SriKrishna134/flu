import mongoose from "mongoose";
// foodSchema //
const foodSchema = new mongoose.Schema({
     name: {type: String, required:true},
     description: {type: String, required:true},
     price: {type: Number, required:true},
     image: {type: String, required:true},
     category: {type: String, required:true} 
})
// foodModel //
const foodModel = mongoose.models.food || mongoose.model('Food', foodSchema);
export default foodModel;