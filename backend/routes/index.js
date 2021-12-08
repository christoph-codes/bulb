const router = require('express').Router();
const healthcheck = require('./healthcheck.routes');
const {
	authCheck,
	login,
	createAuth,
	resetPassword,
	logout,
	deleteAuth,
} = require('./auth.routes');
const {
	createUser,
	getUser,
	deleteUser,
	updateUser,
} = require('./user.routes');
const {
	createIdea,
	getAllIdeas,
	getUserIdeas,
	deleteIdea,
	getIdea,
} = require('./idea.routes');

// Healthcheck to ensure you are connected to the database
router.get('/healthcheck', healthcheck);

// ------- IDEAS -------- //
// Gets last 25 ideas from the database
router.get('/ideas/all', getAllIdeas);
// Gets a specific users last 10 ideas
router.get('/ideas', authCheck, getUserIdeas);
// Creates a new idea and writes to the database
router.post('/ideas/create', authCheck, createIdea);
// Creates a new idea and writes to the database
router.post('/ideas/:ideaId/delete', authCheck, deleteIdea);
// Get a single idea by id
router.get('/ideas/:ideaId', getIdea);

// ------- AUTH -------- //
// Create login route for a user
router.post('/auth/login', login, updateUser);
// TODO: Submit a forgot your password route for users who have lost their password
// router.post('/auth/resetPassword', resetPassword);
// Logout user
router.get('/auth/logout', logout);

// ------- USER -------- //
// Create new user in the database
router.post('/users/create', createUser);
// Get a single user by id
router.get('/users/get', authCheck, getUser);
// Update a single user
router.post('/users/:userId/update', authCheck, updateUser);

// ------- ACCOUNTS -------- //
// Create new auth user route
router.post('/createAccount', createAuth, createUser);
// Delete new auth user route
router.post('/removeAccount', authCheck, deleteAuth, deleteUser);

// ------- V2 UPDATES -------- //

// ------- ANNOUNCEMENTS -------- //
// TODO: Get all announcements route for a specific idea
// TODO: Create new announcement route for a specific idea
// TODO: Update announcement route for a specific idea
// TODO: Delete announcement route for a specific idea

// ------- NOTES -------- //
// TODO: Get all notes route for a specific idea
// TODO: Create new note route for a specific idea
// TODO: Update note route for a specific idea
// TODO: Delete note route for a specific idea

module.exports = router;
