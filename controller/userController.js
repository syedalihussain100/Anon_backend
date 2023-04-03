const { userModel } = require("../model/userModel");
const { sendToken } = require("../utils/SendToken");
// register

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter all fields" });
    }

    let user = await userModel.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    user = await userModel.create({
      email,
      password,
    });

    sendToken(res, user, 201, "Register Successfully!");
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// login

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter all fields" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Email or Password" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Email or Password" });
    }

    sendToken(res, user, 200, "Login Successfully");
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
      })
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// users

const allUser = async (req, res) => {
  try {
    let data = await userModel.find({});

    if (!data) {
      res.status(400).send("User Not Found!");
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// user id 
const singleUser = async (req, res) => {
    try {
        const {id} = req.params
      let data = await userModel.findById(id);
  
      if (!data) {
        res.status(400).send("User Not Found!");
      }
  
      res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };


module.exports = {
  register,
  login,
  logout,
  allUser,
  singleUser
};
