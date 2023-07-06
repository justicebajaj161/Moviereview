import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../Models/user-schema.js'



const Register=async(req,res)=>{
  
  const {firstName,lastName,email,password}=req.body;
  console.log(firstName,lastName,email,password);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const userfind = await User.findOne({ $or: [{ email: email }, { password: password }] });
  try {
    if (userfind) {
        return res.json({ message: 'User Already Exists' })
    } else {
        const userWithHashedPassword = { firstName, lastName, email, password: hashedPassword }
      const newUser = await new User({ ...userWithHashedPassword }).save();
      console.log(newUser);
      res.json({ message: 'User Added Successfully', newUser: userWithHashedPassword })
    }
  } catch (error) {
    res.json({ message: 'Check the email format' })
  }
}


const Login=async(req,res)=>{
    console.log('login')
    const {email,password} = req.body;
    const userfind = await User.findOne({ email: email });
    if (userfind) {
        const isPasswordCorrect = await bcrypt.compare(password, userfind.password)
        console.log(isPasswordCorrect)
        if (isPasswordCorrect) {
          const token = jwt.sign(
            { userid:userfind._id,
              firstName: userfind.firstName,
              lastName: userfind.lastName,
              email: userfind.email
            }, process.env.JWTCODE, { expiresIn: "7d" }
          )
          return res.json({ message: 'Login Successful', user: token, logined: true, userDetails: { email: userfind.email, firstName: userfind.firstName,lastName: userfind.lastName },userid:userfind._id})
    
    
        } else {
          res.json({ message: 'Password Incorrect', logined: false })
        }
      } else {
        res.json({ message: 'User Not Found ' })
      }
}


export {Register,Login};