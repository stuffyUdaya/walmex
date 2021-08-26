"use strict";
const _ = require("lodash");
const db = require("./db.js");

// UTILS
//----------------
// This is a mock db call that waits for # milliseconds and returns
const mockDBCall = (dataAccessMethod) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(dataAccessMethod());
    }, 500);
  });
};

// MOCK DB CALLS
//----------------
const getUsers = () => {
  const dataAccessMethod = () => _.map(db.usersById, (userInfo) => userInfo);
  return mockDBCall(dataAccessMethod);
};

const getListOfAgesOfUsersWith = (item) => {
  const dataAccessMethod = () => {
    const usersWithItem = [];
    Object.keys(db.itemsOfUserByUsername).forEach((username) => {
      if (db.itemsOfUserByUsername[username].includes(item)) {
        usersWithItem.push(username);
      }
    });
    const finalResponseMap = new Map();
    usersWithItem.forEach((user) => {
      Object.keys(db.usersById).forEach((id) => {
        if (user === db.usersById[id].username) {
          const temp = finalResponseMap.get(db.usersById[id].age);
          if (temp) {
            finalResponseMap.set(db.usersById[id].age, temp + 1);
          } else {
            finalResponseMap.set(db.usersById[id].age, 1);
          }
        }
      });
    });
    const finalResponse = [];
    finalResponseMap.forEach((value, key) => {
      const obj = {};
      obj.age = key;
      obj.count = value;
      finalResponse.push(obj);
    });
    return finalResponse.sort((a, b) => a.age - b.age);
  };
  return mockDBCall(dataAccessMethod);
};

module.exports = {
  getUsers,
  getListOfAgesOfUsersWith,
};
