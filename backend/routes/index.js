const router = require('express').Router();
const healthcheck = require('./healthcheck.routes');
const {
	authCheck,
	login,
	createAuth,
	resetPassword,
	logout,
	deleteAccount,
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
router.get('/ideas/:userId', getUserIdeas);
// Creates a new idea and writes to the database
router.post('/ideas/create', createIdea);
// Creates a new idea and writes to the database
router.post('/ideas/:ideaId/delete', deleteIdea);
// Get a single idea by id
router.get('/ideas/:ideaId', getIdea);

// ------- AUTH -------- //
router.get('/auth', authCheck);
// Create login route for a user
router.post('/auth/login', login);
// Create new auth user route
router.post('/auth/createAccount', createAuth, createUser);
// TODO: Submit a forgot your password route for users who have lost their password
router.post('/auth/resetPassword', resetPassword);
// Logout user
router.get('/auth/logout', logout);

// ------- USER -------- //
// Create new user in the database
router.post('/users/create', createUser);
// Get a single user by id
router.post('/users/:userId', getUser);
// Update a single user
router.post('/users/:userId/update', authCheck, updateUser);
// Delete Account
router.post('/users/:userId/delete', authCheck, deleteAccount);
// Delete user from database
router.post('/users/:userId/delete', authCheck, deleteUser);

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
