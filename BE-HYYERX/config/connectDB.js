import mongoose from "mongoose";
const connectDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongoose connected ${db.connection.host}`)
    } catch (error) {
        console.log(`error to connect db ${error.message}`)
    }
}
export default connectDB


