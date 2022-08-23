import { userModel } from "../../model";
// import {mongooseConnections} from "../../connect.js";
// console.log("mongooseconnnectiosn")
// mongooseConnections();


export default async function create(req,res){

    const newuser = await userModel({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        salary:req.body.salary,
        date:req.body.date,
        isactive:req.body.isactive,
    })

    await newuser.save()
    res.json(newuser)

}