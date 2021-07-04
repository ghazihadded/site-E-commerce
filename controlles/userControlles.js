const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");
const sendEmail = require("../utils/sendEmail");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.SECRET_CLIENTID);

//@ http://localhost:4000/api/user
exports.createUser = async (req, res, next) => {
  const { name, email, password, role, images } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .send([{ succes: false, msg: "email has already exist" }]);
    }

    const newUser = new User({
      name,
      email,
      password,
      images,
      role,
    });
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
    await newUser.save();
    const payload = {
      user: {
        id: newUser._id,
      },
    };

    jwt.sign(payload, process.env.SECRET_TOKEN, (err, token) => {
      if (err) return res.status(400).send(err);
      res.status(200).cookie("token", token).json({ token, newUser });
    });
  } catch (err) {
    res.status(500).json({
      succes: false,
      message: "informations incorrect",
    });
  }
};

//@ http://localhost:4000/api/user/auth
exports.userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let newUser = await User.findOne({ email });
    if (!newUser) {
      return res
        .status(400)
        .send([{ succes: false, msg: "Invalid Credentials" }]);
    }

    const mdp = await bcrypt.compare(password, newUser.password);
    if (!mdp) {
      return res
        .status(400)
        .send([{ succes: false, msg: "Invalid Credentials" }]);
    }

    newUser = await User.findOne({ email }).select("-password");

    const token = newUser.getJwtToken();

    /* const options = {
      expires: new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    cookie('token',token,options),
  }*/
    res.status(200).json({ token, newUser });
  } catch (err) {
    res.status(500).json({
      succes: false,
      message: "informations incorrect",
    });
  }
};

//@ http://localhost:4000/api/user * get user *private
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ succes: false, message: "this user not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      succes: false,
      msg: "require failed",
    });
  }
};

//@ http://localhost:4000/api/user * update user *private
exports.updateUser = async (req, res, next) => {
  try {
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).send([{ succes: false, msg: "user not found" }]);
    }

    user = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $set: req.body },
      { new: true }
    ).select("-password");
    await user.save();
    res.status(200).json({ succes: true, user });
  } catch (err) {
    res.status(500).json({
      succes: false,
      message: "informations incorrect",
    });
  }
};

//@ http://localhost:4000/api/user * delete user *private
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });
    if (!user) {
      return res
        .status(400)
        .json({ succes: false, message: "this account has already deleted" });
    }
    res
      .status(200)
      .json({ succes: true, message: "this account has been deleted" });
  } catch (err) {
    res.status(500).json({
      succes: false,
      message: "delete not completed",
    });
  }
};

//@ http://localhost:4000/api/user * update password *private
exports.editPassword = async (req, res, next) => {
  const { oldPassword, password } = req.body;
  try {
    const user = await User.findById(req.user.id);

    const mdp = await bcrypt.compare(oldPassword, user.password);
    if (!mdp) {
      return res.status(400).json([{ msg: "password incorrect" }]);
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      succes: false,
      message: "update Password not completed",
    });
  }
};

//@ http://localhost:4000/api/user * get all users *private
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");

    if (!users) {
      return res.status(400).send([{ message: "not users" }]);
    }
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      succes: false,
      message: "not users",
    });
  }
};

exports.getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).send([{ msg: "user not found" }]);
    }

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send([{ msg: "user not found" }]);
  }
};

exports.updateUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    let user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(400).send([{ msg: "user not found" }]);
    }

    user = await User.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    ).select("-password");

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send([{ msg: "information incorrect" }]);
  }
};

//@ http://localhost:4000/api/user
exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send([{ msg: "not found user with this email" }]);
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    await sendEmail({
      email: user.email,
      subject: "ShopIT Password Recovery",
      resetToken,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (err) {
    res.status(500).send([{ msg: "server error" }]);
  }
};

//@ http://localhost:4000/api/user
exports.resetPassword = async (req, res, next) => {
  try {
    const newUser = await User.findOne({
      email: req.body.email,
      resetPasswordToken: req.body.code,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!newUser) {
      return res
        .status(400)
        .send([{ msg: "code is invalid or has been expired" }]);
    }
    const payload = {
      user: {
        id: newUser._id,
      },
    };
    jwt.sign(payload, process.env.SECRET_TOKEN, (err, token) => {
      if (err) {
        return res.status(400).send(err);
      }

      res.status(200).json({
        success: true,
        newUser,
        token,
      });
    });
  } catch (err) {
    res.status(500).send([{ msg: "server error" }]);
  }
};

//@ http://localhost:4000/api/user/newPassword
exports.updateNewPassword = async (req, res, next) => {
  const { password, confirmPassword } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(400).send([{ msg: "user not found" }]);
    }

    if (password !== confirmPassword) {
      return res.status(400).send([{ msg: "confirm password not correct" }]);
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    res.status(200).send({
      succes: true,
    });
  } catch (err) {
    res.status(500).send({
      msg: "update Password not completed",
    });
  }
};

exports.googleLogin = async (req, res, next) => {
  const { tokenId } = req.body;
  try {
    const user = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.SECRET_CLIENTID,
    });
    const { email_verified, email, name, picture } = user.payload;

    if (email_verified) {
      let newUser = await User.findOne({ email }).select("-password");

      if (newUser) {
        const token = newUser.getJwtToken();
        res.status(200).json({ token, newUser });
      } else {
        let password = Date.now().toString();
        newUser = new User({
          email,
          name,
          password,
          images: picture,
        });
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);
        const token = newUser.getJwtToken();
        await newUser.save();
        res.status(200).send({
          token,
          newUser: {
            name,
            email,
            images: picture,
            role: "user",
          },
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};
