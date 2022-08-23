import {userModel}  from "../../../model.js"

export default async function deleteapi(req,res){
    const {deleteapi} = req.query;
    await userModel.findByIdAndDelete(deleteapi);
    res.send();
}