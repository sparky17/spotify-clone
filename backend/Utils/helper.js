const jwt = require('jsonwebtoken');

exports={}

exports.getToken = async (userId)=>{
    const token = jwt.sign({identifier:userId},'RandomSecret');
    return token
}
module.exports=exports