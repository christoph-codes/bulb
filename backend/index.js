const express = require('express');
const path = require('path');
const routes = require('./routes');
const { addHeaders } = require('./middleware');

const app = express();

// Set the port based on if one exists or not
const port = process.env.PORT || 5000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Middleware (Body parser no longer needed)
app.use(express.json());

// Set Headers
app.all('*', addHeaders);

// All routes
app.use('/', routes);

app.get('*', (req, res) => {
	// res.sendFile(path.join(`${__dirname}/build/index.html`));
	// Catch all route that just throws a 404 error.
	res.status(404).send('This is not a valid url you are trying to reach');
});

app.listen(port, () => {
	console.log(`Backend listening on ${port}`);
});
