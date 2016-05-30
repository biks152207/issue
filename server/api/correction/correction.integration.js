'use strict';

var app = require('../..');
import request from 'supertest';

var newCorrection;

describe('Correction API:', function() {

  describe('GET /api/corrections', function() {
    var corrections;

    beforeEach(function(done) {
      request(app)
        .get('/api/corrections')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          corrections = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      corrections.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/corrections', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/corrections')
        .send({
          name: 'New Correction',
          info: 'This is the brand new correction!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newCorrection = res.body;
          done();
        });
    });

    it('should respond with the newly created correction', function() {
      newCorrection.name.should.equal('New Correction');
      newCorrection.info.should.equal('This is the brand new correction!!!');
    });

  });

  describe('GET /api/corrections/:id', function() {
    var correction;

    beforeEach(function(done) {
      request(app)
        .get('/api/corrections/' + newCorrection._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          correction = res.body;
          done();
        });
    });

    afterEach(function() {
      correction = {};
    });

    it('should respond with the requested correction', function() {
      correction.name.should.equal('New Correction');
      correction.info.should.equal('This is the brand new correction!!!');
    });

  });

  describe('PUT /api/corrections/:id', function() {
    var updatedCorrection;

    beforeEach(function(done) {
      request(app)
        .put('/api/corrections/' + newCorrection._id)
        .send({
          name: 'Updated Correction',
          info: 'This is the updated correction!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCorrection = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCorrection = {};
    });

    it('should respond with the updated correction', function() {
      updatedCorrection.name.should.equal('Updated Correction');
      updatedCorrection.info.should.equal('This is the updated correction!!!');
    });

  });

  describe('DELETE /api/corrections/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/corrections/' + newCorrection._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when correction does not exist', function(done) {
      request(app)
        .delete('/api/corrections/' + newCorrection._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
