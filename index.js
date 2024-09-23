const Handlebars = require('handlebars');
const express = require('express');
const fs = require('fs/promises');

// Change the templateFileName and dataFileName to the path of your Handlebars template and data files
const templateFileName = 'hbs-templates/0.3.10/responsive-0.3.10.hbs';
const dataFileName = 'hbs-templates/0.3.10/data.json';

const app = express();

app.get('/', async (req, res) => {
	// Read the Handlebars template and data files
	const template = await fs.readFile(templateFileName, 'utf8');
	const data = await fs.readFile(dataFileName, 'utf8');

	// Compile the Handlebars template and render it with the data
	const compiledTemplate = Handlebars.compile(template);
	const renderedTemplate = compiledTemplate(JSON.parse(data));

	// Send the rendered template as the response
	res.send(renderedTemplate);
});

// Start the server
app.listen(9999, () => console.log(`App listening to port 9999`));
