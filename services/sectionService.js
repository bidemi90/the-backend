const jsonwebtoken=require("jsonwebtoken")
const secretkey=process.env.JWT_SECRET

const generatetoken=(email)=>{
    try {
        return jsonwebtoken.sign({email},secretkey,{expiresIn:"1m"})
    } catch (error) {
        console.log(error);
        throw new Error({name:"Authentication error"})
    }
}

const verifytoken =(token)=>{
    try {
        if (!token) {
            throw new Error({name:"Authentication error",messag:"invalid token"})
        }
        const decodedtoken=jsonwebtoken.verify(token, secretkey)
        console.log(decodedtoken);
        const email=decodedtoken.email
        return email
    } catch (error) {
        console.log(error);
        if(error.name==="TokenExpiredError"){
            throw new Error("section expired")
 
        }
        throw new Error("error verifying token")

    }
}
module.exports={generatetoken,verifytoken}