const express = require("express");
const session = require("express-session");
const Keycloak = require("keycloak-connect");

let _keycloak;

var keycloakConfig = {
  clientId: "node-app",
  bearerOnly: true,
  serverUrl:
    "https://keycloak-aditi-poc.edge-dev-410-915b3b336cabec458a7c7ec2aa7c625f-0000.us-south.containers.appdomain.cloud/auth/",
  realm: "Demo-realm",
  credentials: {
    secret: "6364AgfRZf7vjxzdQ2C5qTjb6gTxvaIM",
  },
  realmPublicKey:
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhx9oykKI0+GUDC1+1+pkHpCjL8Ruk27Rld5kXZGfLv6gkL2TYCnrmv4e0W/fxcjx4VZazjF/84qVIlUU3BCnV75OhtHvOWCfkExV6tG5cdwZ+OHYGVkELMbnqub9edz/MCUCARn/Jm0K05gQ7YXdrFrQcg/xHAdNv8il6RkRi4aHgs7SKzcnUFuhz3RDWTbxLdQ+T0M/zSirq4Mx72KA/FnCQ1pigAOS2YcO9ynT9abyguxlVh/8S8C4BYuSS8ScoeCLkjEz+aDmR85ppVZkNiyIgUpjuKuo5KOMXQiXvtTyU54M/mw41ZFHRR8s0K+EZagnqNyIbi/Up/9dNWNuDwIDAQAB",
};

function initKeycloak() {
  if (_keycloak) {
    console.warn("Trying to init Keycloak again!");
    return _keycloak;
  } else {
    console.log("Initializing Keycloak...");
    var app = express();
    var memoryStore = new session.MemoryStore();
    app.use(
      session({
        secret: 'some secret',
        resave: false,
        saveUninitialized: true,
        store: memoryStore,
      })
    );
    _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
    return _keycloak;
  }
}

function getKeycloak() {
  if (!_keycloak) {
    console.error(
      "Keycloak has not been initialized. Please called init first."
    );
  }
  return _keycloak;
}

module.exports = {
  initKeycloak,
  getKeycloak,
};
