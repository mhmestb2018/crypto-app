const mongoose = require("mongoose");
//shortcut to mongoose Schema
const Schema = mongoose.Schema; 

const userSchema = new Schema(
    {
        name: {
            type: String, 
            enum: ["AUS", "DFW", "DEN", "LAX", "SAN"],
        },
        password: {
            type: String,
            enum: ["First Class", "Business", "Economy"],
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }  
    }, 
    {
    timestamps: true
    }
);

module.exports = mongoose.model("Flight", flightSchema)












