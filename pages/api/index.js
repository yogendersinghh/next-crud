import { userModel } from "../../model.js";
import {mongooseConnections} from "../../connect.js";
mongooseConnections();
export default async function apiData(req,res){
   const allusers = await userModel.find();
    res.json(allusers)
}


