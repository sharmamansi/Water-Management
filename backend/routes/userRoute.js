const router = require("express").Router();
const User = require('../models/userModel');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

router.post("/register", async (req,res) => {
    try{
        let { email, username , password ,password2} = req.body;
       
        if(!email || !password || !password2 || !username){
            return res.status(400).send({ msg : "Please fill all the fields"});
        
        }
        if (password.length < 6)
        return res
          .status(401)
          .send({ msg: "The password needs to be at least 5 characters long." });
      if (password !== password2)
        return res
          .status(402)
          .send({ msg: "Enter the same password twice for verification." });


        const exsistingUser = await User.findOne({email});
        if(exsistingUser){
            return res
            .status(403)
            .send({ msg: "An account with this email already exists." });
        }

        
      const salt = await bcrypt.genSalt();
      const hashPass = await bcrypt.hash(password,salt);

      const newUser = new User({
        email,
        username,
        password: hashPass
      });
        
      const savedUser = await newUser.save();
      res.json(savedUser);
    }catch (err){
        res.status(500).json({ error: err.message });
    }
});

router.post("/login",async (req,res) => {
  try{
    const  { email, password } = req.body;
    if(!email || !password){
        return res.status(400).send({msg : "All fields are required"});
    }
    const getUser = await User.findOne({email});
  
    if(!getUser){
      return res.status(400).send({ msg : "Invalid Credentials"});
    }
   
    const passMatch = await bcrypt.compare(password,getUser.password);
    if(!passMatch){
      return res.status(400).send({ msg : "Invalid Credentials"});
    }
  
    const token = jwt.sign({ id: getUser._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: getUser._id,
        username: getUser.username,
      }
    });
  }catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.post("/tokenIsValid", async (req, res) => {
    try {
      const token = req.header("x-auth-token");
      if (!token) return res.json(false);
    

      const verified = jwt.verify(token, process.env.JWT_SECRET);
      if (!verified) return res.json(false);
      

      const user = await User.findById(verified.id);
      if (!user) return res.json(false);
      

      return res.json(true);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  router.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
      username: user.username,
      id: user._id,
    });
  });

module.exports = router;