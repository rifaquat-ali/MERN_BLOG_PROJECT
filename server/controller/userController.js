import user from "../model/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import Token from "../model/token.js";


//initializatioon of dotenv
dotenv.config()
export async function signupUser(request, response) {

  try {
    //
    // const salt = await bcrypt.genSalt()    (older syntax)
    const hashedPwd = await bcrypt.hash(request.body.password, 10) //bydefault second arg is salt
    


    const inUser = {...request.body,password:hashedPwd}
    const validatedUser = new user(inUser); //validating user from defined schema
      await validatedUser.save();
      
    return response //returning success
      .status(200)
          .json({ msg: "User account created successfully." });
      
  } catch (error) {
      //returning error
    return response.status(401).json({ msg: "Please check details again !" });
  }
}



export async function loginUser(request, response) {
  console.log(request.body,"<><>body<><>")
  let findUser = await user.findOne({ username: request.body.username })
  console.log("<><><>finduser",findUser)
  if (!findUser) return response.status(400).json({ msg: "User not present !" })
  try {
    let match = await bcrypt.compare(request.body.password, findUser.password)
    console.log("match",match)
    if (match) {
      //on success match of user Credentials >> generating JWT token
      const accessToken =jwt.sign(findUser.toJSON(),process.env.ACCESS_TOKEN_SECRET_KEY,{expiresIn:"15m"})
      const refreshToken = jwt.sign(findUser.toJSON(), process.env.REFRESH_TOKEN_SECRET_KEY)
      //  saving refresh token into DB after validating with schema
      const newToken = new Token({ token: refreshToken })
      await newToken.save()

      return response.status(200).json({accessToken:accessToken,refreshToken:refreshToken,username:findUser.username,name:findUser.name})
    } else {
      return response.status(400).json({msg:"Password is not correct"})
    }
  }catch (e){
          return response.status(500).json({ msg: "Login error" });

}
}