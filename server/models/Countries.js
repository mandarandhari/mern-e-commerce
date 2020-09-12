const mongoose = require('mongoose');

const CountriesSchema = mongoose.Schema({
    name: {
        type: String
    },
    abbr: {
        type: String
    }
});

module.exports = mongoose.model('countries', CountriesSchema);