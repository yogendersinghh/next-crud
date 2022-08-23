import { userModel } from "../../../model";
export default async function index(req,res){
    const {deleteIds} = req.body;
    
    await userModel.deleteMany({_id:{$in:deleteIds}})
    console.log("data",deleteIds)

    res.send();
}