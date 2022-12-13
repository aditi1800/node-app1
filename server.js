require("./models/db");

const express = require("express");
const path = require("path");
const Handlebars = require('handlebars')
const exphbs = require("express-handlebars");
const bodyparser = require("body-parser");
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

var app = express();

const session = require('express-session')
var memoryStore = new session.MemoryStore();
app.use(session({ secret: 'some secret', resave: false, saveUninitialized: true, store: memoryStore }));
const keycloak = require('./keycloak-config.js').initKeycloak(memoryStore);

app.use(keycloak.middleware({
  logout: '/logout',
  admin: '/employee'
}));
const employeeController = require("./controllers/employeeController");
app.use((req, res, next) => {
console.log(req.headers)
});
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(bodyparser.json());
app.set("views", path.join(__dirname, "/views/"));
app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    defaultLayout: "mainLayout",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    layoutsDir: __dirname + "/views/layouts/",    
  })
);
app.set("view engine", "hbs");

app.listen(8080, "0.0.0.0", () => {
  console.log("Express server started at port : 8080");
});

app.use("/employee", employeeController);
