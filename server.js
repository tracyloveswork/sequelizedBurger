var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

// Set up variable to call express module
var app = express();

// Models
db = require("./models");

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + "/public"));

// Set-up port
var PORT = process.env.PORT || 3000;

// Set-up express to work with body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/burgers_controller.js");

app.use("/", routes);
app.use("/update", routes);
app.use("/updateMore", routes);
app.use("/create", routes);

// Listener
db.sequelize.sync().then(function(){
	app.listen(PORT, function(){
		console.log("Listening on port: " + PORT);
	});
});

console.log(module.exports);
