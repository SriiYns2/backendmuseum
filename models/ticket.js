const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    type: {
        type: String,
        enum: ["pelajar", "umum", "asing"],
        default: "umum",
    },
    count: { type: Number },
    amount: { type: Number },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Tickets", TicketSchema);
