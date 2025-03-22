import mongoose from "mongoose";
// connect  db //
export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://srikrishna:9019755311@cluster0.vzqib.mongodb.net/Flu').then(()=>console.log("DB Connected"));
}
// @cluster0.oyzyh.mongodb.net