const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();
app.use(fileUpload());
const bodyParser = require('body-parser');

const models = require('./models/database');
const TemplateCache = require('./models/cache/template-cache.js');
// const mainController = require('./controllers/MainController.js');
const userController = require('./controllers/UserController.js');
const OrganizationController = require('./controllers/OrganizationController.js');
const ProductController = require('./controllers/ProductController.js');
const EventController = require('./controllers/EventController.js');

// const Auth = require('./middleware/auth.js');


models.sequelize.authenticate().then(
  () => {
    console.log('Connection established with DB');
  },
  (err) => {
    console.log('Unable to connect to DB', err);
  }
);
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.all('/*', (req, res, next) => {
  // CORS headers
  res.header('Access-Control-Allow-Origin', '*'); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});


// ROUTES & CONTROLLER CALLS TO BE DECLARED IN 'routes.js'
app.all('/api/auth/*', [require('./middleware/validateRequest')]);

// =============================== AUTH ROUTES ==========================


app.get('/api/auth/test', (req, res) => {
  res.send('success');
});

// =============================== ORG ROUTES =============================== //
app.post('/api/organization', OrganizationController.createOrganization);
app.post('/api/organization/:orgID', OrganizationController.updateOrganizationInfo);
app.get('/api/organizations', OrganizationController.getOrganizations);
app.get('/api/organizationsfull', OrganizationController.getFullOrganizationData);
app.get('/api/organization', OrganizationController.getOrganizationByName);
app.get('/api/organizationsimple', OrganizationController.getOrganizationByNameLogin);

// =============================== ORG ROUTES =============================== //

app.post('/api/event', EventController.createNewEvent);

// =============================== ORG ROUTES =============================== //

app.post('/api/product', ProductController.createProduct);
app.delete('/api/product/:product_id', ProductController.deleteProduct);
app.put('/api/stock', ProductController.updateStock);
app.post('/api/userinvite', userController.createUserWithInvitation);
app.post('/api/firstLogin', userController.updateAndLoginUser);
app.delete('/api/tag/:tag_id', ProductController.deleteTag);
app.post('/api/tag/:tag_name', ProductController.postTag);

// ===============================  ROUTES =============================== //

app.get('/api/test', (req, res) => {
  res.send({ 'Hello World!': 'Hello World!' });
});

app.post('/api/user', userController.createUser);

// =============================== END ROUTES =============================== //

const templateCache = new TemplateCache();
console.log('Creating new template cache!\n');

var port = process.env.PORT || 3000;

Promise.all([templateCache.loadTemplateCache()]).then(() => {
  console.log('Email templates loaded.');
  models.sequelize.sync({ force: false }).then(() => {
    app.listen(port, () => {
      console.log('\n\n\n\n\n\nExpress server listening on port '+port+'\n\n\n\n');
    });
  });
});
