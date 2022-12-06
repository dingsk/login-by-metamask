/**
 * JWT config.
 */
const config = {
	algorithms: process.env.JWT_ALGORITHMS.split(','),
	secret: process.env.JWT_SECRET,
};
module.exports = config;