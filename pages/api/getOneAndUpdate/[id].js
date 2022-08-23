import { userModel } from "../../../model";

export default async function id(req,res){

    const {id}  = req.query;
    const user =  await userModel.findById(id);
    res.json(user)
}