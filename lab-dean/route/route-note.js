'use strict';

const Note = require('../model/note');
const storage = require('../lib/storage');
const debug = require('debug')('http:route-note');


module.exports = function(router) {
  router.post('/api/v1/note', (req, res) => {
    debug('POST /api/v1/note');

    try {
      
      let newNote = new Note(req.body.title, req.body.content);

      storage.create('Note', newNote)
        .then(storedNote => {
          res.writeHead(201, {'Content-Type': 'application/json'});
          res.write(JSON.stringify(storedNote));
          res.end();
          return;
        });
    } catch(err) {
      debug(`There was a bad request: ${err}`);

      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('Bad Request');
      res.end();
      return;
    }
  });

  router.get('/api/v1/note', (req, res) => {
    debug('GET api/v1/note');

    try {

      storage.fetchAll('Note')
        .then(storedSchema => {
          res.writeHead(201, {'Content-Type': 'application/json'});
          res.write(JSON.stringify(storedSchema));
          res.end();
          return;
        });
    } catch(err) {
      debug(`There was a bad request: ${err}`);

      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('Bad Request');
      res.end();
      return;
    }
  });

  router.put('/api/v1/note', (req, res) => {
    debug('PUT /api/v1/note');

    try {

      let newNote = new Note(req.body.title, req.body.content);
      newNote._id = req.body._id;
      storage.update('Note', newNote)
        .then(storedNote => {
          res.writeHead(201, {'Content-Type': 'application/json'});
          res.write(JSON.stringify(storedNote));
          res.end();
          return;
        })
    } catch(err) {
      debug('There was a bad request: ${err}');
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('Bad Request');
      res.end();
      return;
    }
  });

  router.delete('/api/v1/note', (req, res) => {
    debug('DELETE api/v1/note');

    try {

      storage.delete('Note', req.url.query_id)
        .then(() => {
          res.writeHead(201, {'Content-Type': 'text/plain'});
          res.write('Note Deleted');
          res.end();
          return;
        });
    } catch(err) {
      debug('There was a bad request: ${err}');

      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('Bad Request');
      res.end();
      return;
    }
  });
};