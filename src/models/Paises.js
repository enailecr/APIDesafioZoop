const mongoose = require('mongoose')

const paisesSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    alpha3Code: { 
        type: String,
        required: true
    },
    languages: [
        { name: { type: String } },
    ],
    currencies: [
        { name: { type: String } },
    ],
    population: {
        type: Number,
        required: true
    },
})
;

module.exports = mongoose.model('Paises', paisesSchema);