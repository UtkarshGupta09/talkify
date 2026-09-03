import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All feild required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at leat 6 characters" });
    }

    //check if email is valid: regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ message: "This email is already registered." });
    }

    //password Hasing
    const salt = await bcrypt.genSalt(10);
    const hashesPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashesPassword,
    });

    if (newUser) {
      const savedUser = await newUser.save();
      generateToken(savedUser._id, res);
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }

    res.status(201).json(
      {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        prfilePic: newUser.profilePic,
      },
      { message: "User created successfully" },
    );
  } catch (error) {
    console.log("Error in signup controller:", error);
    res.status(500).json({ message: "Internal sever error" });
  }
};
