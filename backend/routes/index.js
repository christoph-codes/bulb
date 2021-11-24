const router = require('express').Router();
const healthcheck = require('./healthcheck.routes');
const { authHealthcheck, login, createUser } = require('./auth.routes');
const {
	createIdea,
	getAllIdeas,
	getUserIdeas,
	deleteIdea,
} = require('./idea.routes');

// Healthcheck to ensure you are connected to the database
router.get('/healthcheck', healthcheck);

// ------- IDEAS -------- //
// Gets last 25 ideas from the database
router.get('/ideas/all', getAllIdeas);
// Gets a specific users last 10 ideas
router.get('/:userId/ideas', getUserIdeas);
// Creates a new idea and writes to the database
router.post('/:userId/ideas/create', createIdea);
// Creates a new idea and writes to the database
router.post('/:userId/ideas/:ideaId/delete', deleteIdea);

// ------- AUTH -------- //
router.get('/authcheck', authHealthcheck);
// TODO: Create login route for a user
router.post('/auth/login', login);
// TODO: Create new user route
router.post('/auth/create', createUser);
// TODO: Submit a forgot your password route for users who have lost their password

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
