const {
    loginUser,
    registerUser,
    profileUser,
    getAllUsers,
    deleteUser,
    getUserDetail,
    updateUser,
    addUser
} = require("../controllers/userController");

const router = require("express").Router();
const authenticate = require("../middleware/authenticate");

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/profile", authenticate, profileUser);

router.get("/",getAllUsers );
router.get("/detail/:id",getUserDetail );
router.post("/", addUser );
router.put("/:id", updateUser );
router.delete("/:id", deleteUser);





module.exports = router;
