const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');
const { User, Thought } = require('../../models');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
