'use strict';

const server = require('../lib/server');
const superagent = require('superagent');
require('jest');

let testid;

describe('Server module', () => {
  beforeAll(() => server.start(4444));
  afterAll(() => server.stop());

  describe('Valid Request to the API', () => {
    describe('POST /api/v1/notes', () => {
      it('Should respond with a status of 200', () => {
        return superagent.post(':4444/api/v1/note')
          .send({title: 'test 1', content: 'test 1'})
          .then(res => {
            expect(res.status).toBe(201);
          });
      });
      it('Should post a single note and return it', () => {
        return superagent.post(':4444/api/v1/note')
          .send({title: 'test 2', content: 'test 2'})
          .then(res => {
            testid = res.body._id;
            expect(res.body.title).toMatch(/test 2/);
          });
      });
    });
    describe('GET /api/v1/note', () => {
      it('Should respond with a status 201', () => {
        return superagent.get(':4444/api/v1/note')
          .then(res => {
            expect(res.status).toBe(201);
          });
      });
      it('Should respond with all notes', () => {
        return superagent.get(':4444/api/v1/note')
          .then(res => {
            expect(JSON.parse(res.text));
          });
      });
    });
    describe('PUT /api/v1/note', () => {
      it('Should respond with a status 201', () => {
        return superagent.put(':4444/api/v1/note')
          .send({_id: testid, title: 'test 2', content: 'test 2 electric boogaloo'})
          .then(res => {
            expect(res.status).toBe(201);
          });
      });
    });
    describe('DELETE /api/v1/note', () => {
      it('Should respond with a status 201', () => {
        return superagent.del(`:4444/api/v1/note?_id=${testid}`)
          .then(res => {
            expect(res.status).toBe(201);
            expect(res.text).toMatch(/Note Deleted/);
          });
      });
    });
  });

  describe('Invalid Request to the API', () => {
    describe('GET /api/v1/note', () => {
      it('Should send 404 if no data is sent', () => {
        return superagent.get(':4444/api/v1/note=')
          .send()
          .then(res => {
          })
          .catch(err => {
            expect(err.status).toBe(404);
          });
      });
      it('Should return an object on error', () => {
        return superagent.get(':4444/api/v1/note=')
          .then(res => {
          })
          .catch(err => {
            expect(err).toBeInstanceOf(Object);
          });
      });
    }); 
    describe('PUT /api/v1/note', () => {
      it('Should send 400 if no data is sent', () => {
        return superagent.put(':4444/api/v1/note=')
          .send()
          .then(res => {
          })
          .catch(err => {
            expect(err.status).toBe(400);
          });
      });
      it('Should return an object on error', () => {
        return superagent.put(':4444/api/v1/note=')
          .send()
          .then(res => {
          })
          .catch(err => {
            expect(err.status).toBe(400);
          });
      });
    });
    describe('POST /api/v1/note', () => {
      it('Should send 400 if no data is sent', () => {
        return superagent.post(':4444/api/v1/note=')
          .send()
          .then(res => {
          })
          .catch(err => {
            expect(err.status).toBe(400);
          });
      });
      it('Should return an object on error', () => {
        return superagent.post(':4444/api/v1/note=')
          .send()
          .then(res => {
          })
          .catch(err => {
            expect(err.status).toBe(400);
          });
      });
    });
    describe('DELETE /api/v1/note', () => {
      it('Should send 404 if no data is sent', () => {
        return superagent.delete(':4444/api/v1/note=')
          .send()
          .then(res => {
          })
          .catch(err => {
            expect(err.status).toBe(404);
          });
      });
    });
  });
});