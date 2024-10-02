const Handlebars = require('handlebars');
const express = require('express');
const fs = require('fs/promises');

// Change the templateFileName and dataFileName to the path of your Handlebars template and data files
const templateFileName = process.env.TEMPLATE || 'hbs-templates/0.3.10/dpp.hbs';
const dataFileName = process.env.FILE || 'hbs-templates/0.3.10/dpp.json';

const app = express();

app.get('/', async (req, res) => {
	// Read the Handlebars template and data files
	let template = ''
	let data = '{}';

	try {
		template = await fs.readFile(templateFileName, 'utf8');
	} catch (error) {
		console.log('Error reading the template file');
	}

	try {
		data = await fs.readFile(dataFileName, 'utf8');
	} catch (error) {
		console.log('Error reading the data file');
	}

	// Compile the Handlebars template and render it with the data
	const compiledTemplate = Handlebars.compile(template);
	const renderedTemplate = compiledTemplate(JSON.parse(data));

	// Send the rendered template as the response
	res.send(renderedTemplate);
});

// Start the server
app.listen(9999, () => console.log(`App listening to port 9999`));
