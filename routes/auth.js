const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ message: "User Already Exists" });
    }

 
    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res.status(400).json({ message: "Username Already Exists" });
    }
    
    
    const hashPassword = bcrypt.hashSync(password);
    const newUser = new User({ email, username, password: hashPassword });
   
    await newUser.save();

    res.status(200).json({ message: "Sign Up Done" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Sign In
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Please Sign Up First" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Incorrect Password" });
    }

    const { password: _, ...others } = user._doc;
    res.status(200).json({ others });
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
