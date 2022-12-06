const { Model } = require('sequelize');

class User extends Model {
    // id; // Note that the `null assertion` `!` is required in strict mode.
    // nonce;
    // publicAddress;
    // username; // for nullable fields
}

exports.User = User