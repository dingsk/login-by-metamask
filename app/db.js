const os = require('os');
const path = require('path');
const { INTEGER, Sequelize, STRING } = require('sequelize');

const {User} = require('./models');

const sequelize = new Sequelize('web3-login-database', '', undefined, {
	dialect: 'sqlite',
	storage: path.join(os.tmpdir(), 'db.sqlite'),
	logging: false,
});

// Init all models
User.init(
	{
		nonce: {
			allowNull: false,
			type: INTEGER, // SQLITE will use INTEGER
			defaultValue: () => Math.floor(Math.random() * 100000), // Initialize with a random nonce
		},
		publicAddress: {
			allowNull: false,
			type: STRING,
			unique: true,
			validate: { isLowercase: true },
		},
		username: {
			type: STRING,
			unique: true,
		},
	},
	{
		modelName: 'user',
		sequelize,
		timestamps: false,
	}
);

sequelize.sync();


exports.sequelize = sequelize;