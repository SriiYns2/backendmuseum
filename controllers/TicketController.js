const Ticket = require("../models/ticket");

const getAllTicket = async (req, res) => {
    try {
        const ticket = await Ticket.find();

        res.status(200).json({
            status: true,
            message: "OK",
            data: ticket,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "An error occurred while fetching tickets.",
            error: error.message,
        });
    }
};

const createTicket = async (req, res) => {
    try {
        const { name, email, phone, address, type, count, date } = req.body;

        const mapper = {
            pelajar: 2000,
            umum: 4000,
            asing: 7000,
        };

        const newTicket = new Ticket({
            name,
            email,
            phone,
            address,
            type,
            count,
            amount: mapper[type] * count,
            date,
        });

        await newTicket.save();

        res.status(201).json({
            status: true,
            message: "Created",
            data: newTicket,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "An error occurred while creating collection.",
            error: error.message,
        });
    }
};

const deleteTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTicket = await Ticket.findByIdAndDelete(id);

        if (!deletedTicket) {
            return res.status(404).json({
                status: false,
                message: "Ticket not found.",
            });
        }

        res.status(200).json({
            status: true,
            message: "Ticket deleted successfully.",
            data: deletedTicket,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "An error occurred while deleting ticket.",
            error: error.message,
        });
    }
};

module.exports = {
    getAllTicket,
    createTicket,
    deleteTicket,
};
