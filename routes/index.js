const router = require("express").Router();
const collectionRoutes = require("./collectionRoutes");
const ticketRoutes = require("./ticketRoutes");
const userRoutes = require("./userRoutes");

router.get("/", (req, res) => {
    res.status(200).json({ message: "Service running successfull" });
});

router.use("/user", userRoutes);
router.use("/ticket", ticketRoutes);
router.use("/collection", collectionRoutes);

module.exports = router;
