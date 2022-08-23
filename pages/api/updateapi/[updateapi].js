import { userModel } from "../../../model";

export default async function updateApi (req,res){

    const {updateapi} = req.query;
    const {firstname,lastname,isactive,salary,email,date} = req.body
    const user = await userModel.findByIdAndUpdate(updateapi,{firstname,lastname,isactive,salary,email,date},{new:true});
    res.send();


}