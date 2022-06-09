const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

// Authentification
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

// Données utilisateurs
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
// router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
