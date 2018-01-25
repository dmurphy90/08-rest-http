'use strict';

const debug = require('debug')('http:storage');

const storage = module.exports = {};
const memory = {};

storage.create = function(schema, item) {
  debug('Created a new thing');

  return new Promise((resolve, reject) => {
    if(!schema || !item) return reject(new Error('Cannot create a new item; Schema and Item required'));

    if(!memory[schema]) memory[schema] = {};

    memory[schema][item._id] = item;
    return resolve(memory[schema][item._id]);
  });
};

storage.fetchAll = function(schema) {
  debug('Fetch all the things');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('Cannot fetch all items; Schema required'));

    return(memory[schema]);
  });
};

storage.update = function() {

};

storage.delete = function(schema, item) {
  debug('Deleted the thing');

  return new Promise((resolve, reject) => {
    if(!item) return reject(new Error('Cannot delete item without an item ID provided'));
    delete memory[schema][item._id];
    return resolve();
  });
};