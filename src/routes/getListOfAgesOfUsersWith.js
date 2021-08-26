"use strict";
const mockDBCalls = require("../database/index.js");

const getListOfAgesOfUsersWithHandler = async (request, response, next) => {
  try {
    const itemToLookup = request.query.lookup;
    const data = await mockDBCalls.getListOfAgesOfUsersWith(itemToLookup);
    response.status(200).send(JSON.stringify(data));
  } catch (error) {
    next(error);
  }
};

module.exports = (app) => {
  app.get("/users/age", getListOfAgesOfUsersWithHandler);
};
