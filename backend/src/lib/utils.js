import jwt from "jsonwebtoken";

//生成一個token
export const generateToken = (userId,res)=>{
  const token = jwt.sign({userId}, process.env.JWT_SECRET, {
    expiresIn:"7d"
  });

//將token傳送給cookie，期限是7天，超過就要重新登入
  res.cookie("jwt",token,{
    maxAge: 7 * 24 * 60 * 60 * 1000, //MS毫秒
    httpOnly:true, //prevent XSS attacks cross-site scripting attacks
    sameSite:"strict",//CSRF attack cross-site request forgery attacks
    secure:process.env.NODE_ENV !== "development"
  })

  return token;
} 

