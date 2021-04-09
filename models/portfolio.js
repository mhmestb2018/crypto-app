const mongoose = require("mongoose");
//shortcut to mongoose Schema
const Schema = mongoose.Schema; 

const portfolioSchema = new Schema(
    {
        name: {
            type: String, 
            required: true, 
            default: 'Portfolio Name Here',
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        coins: {
            type: Array,
        },
    }, 
    {
    timestamps: true
    },
);

module.exports = mongoose.model("Portoflio", portfolioSchema)












