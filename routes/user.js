const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const {
  createUser,
  userLogin,
  updateUser,
  deleteUser,
  getUser,
  editPassword,
  getAllUsers,
  getUserById,
  updateUserById,
  forgotPassword,
  resetPassword,
  updateNewPassword,
  googleLogin
} = require("../controlles/userControlles");
const {
  validator,
  registerUser,
  Login,
  updatePassword,
  registerNewPassword
} = require("../middlewares/Validation");

//@ http://localhost:4000/api/user
router.post("/", registerUser(), validator, createUser);
//@ http://localhost:4000/api/user/auth
router.post("/auth", Login(), validator, userLogin);

//@ http://localhost:4000/api/user/forgotPassword
router.post("/auth/password", forgotPassword);
router.post("/restPassword", resetPassword);

//@ http://localhost:4000/api/user
router.put("/auth", auth, updateUser);

//@ http://localhost:4000/api/user
router.delete("/:id", auth, deleteUser);

//@ http://localhost:4000/api/user
router.get("/auth", auth, getUser);

//@ http://localhost:4000/api/user
router.get("/all", auth, getAllUsers);

//@ http://localhost:4000/api/user
router.get("/:id", auth, getUserById);

//@ http://localhost:4000/api/user
router.put("/password", auth, updatePassword(), validator, editPassword);

//@ http://localhost:4000/api/user
router.put("/newPassword", auth,registerNewPassword(),validator , updateNewPassword);

//@ http://localhost:4000/api/user
router.put("/by/:id", auth,updateUserById);

//@ http://localhost:4000/api/user
router.post("/google",googleLogin  );

module.exports = router;
