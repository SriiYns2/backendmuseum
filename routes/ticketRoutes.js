const {
    getAllTicket,
    createTicket,
    deleteTicket,
} = require("../controllers/TicketController");

const router = require("express").Router();
const authenticate = require("../middleware/authenticate");

router.get("/", getAllTicket);
router.post("/", createTicket);
router.delete("/:id", authenticate, deleteTicket);

module.exports = router;
