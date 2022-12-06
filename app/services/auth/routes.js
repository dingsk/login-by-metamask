const express = require('express');

const controller = require('./controller');

const authRouter = express.Router();
exports.authRouter = authRouter;

/** POST /api/auth */
authRouter.route('/').post(controller.create);
