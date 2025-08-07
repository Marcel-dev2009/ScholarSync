import mongoose from "mongoose";
export const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('Connected Succefully to the Database');    
    } catch (error) {
       console.log('Error Connecting to the database' , error)    
    }      
}