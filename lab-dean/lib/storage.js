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

    return resolve(memory[schema]);
  });
};

storage.update = function(schema, item) {
  debug('Updated the thing');
  return new Promise((resolve, reject) => {
    if(!schema || item || !memory[schema][item._id]) return reject(new Error('Cannot update item; please provide schema and item'));
    memory[schema][item._id] = item;
    return resolve(item);
  });
};

storage.delete = function(schema, _id) {
  debug('Deleted the thing');

  return new Promise((resolve, reject) => {
    if(!schema || _id) return reject(new Error('Cannot delete item without an item ID  or schema provided'));
    delete memory[schema][_id];
    return resolve(_id);
  });
};