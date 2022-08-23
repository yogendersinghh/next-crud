import mongoose from "mongoose"

const data = 10;

export const mongooseConnections = async()=>{
    mongoose.connect('mongodb+srv://YogenderSingh:yogi123@cluster0.v02sl.mongodb.net/?retryWrites=true&w=majority').then(()=>{
    console.log("connection established")
}).catch(()=>{
    console.log("connnection is not established please check your mongodb connection")
})

}
