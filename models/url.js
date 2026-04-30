const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortId: {   // ✅ consistent naming
        type: String,
        required: true,
        unique: true,
    },
    redirectURL: {   // ✅ fixed typo
        type: String,
        required: true,
    },
    visitHistory: [
        {
            timestamp: { type: Date, default: Date.now } // ✅ better type
        }
    ]
}, {
    timestamps: true // ✅ correct usage
});

const URL = mongoose.model("URL", urlSchema);

module.exports = URL;