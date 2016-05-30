'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var correctionCtrlStub = {
  index: 'correctionCtrl.index',
  show: 'correctionCtrl.show',
  create: 'correctionCtrl.create',
  update: 'correctionCtrl.update',
  destroy: 'correctionCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var correctionIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './correction.controller': correctionCtrlStub
});

describe('Correction API Router:', function() {

  it('should return an express router instance', function() {
    correctionIndex.should.equal(routerStub);
  });

  describe('GET /api/corrections', function() {

    it('should route to correction.controller.index', function() {
      routerStub.get
        .withArgs('/', 'correctionCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/corrections/:id', function() {

    it('should route to correction.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'correctionCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/corrections', function() {

    it('should route to correction.controller.create', function() {
      routerStub.post
        .withArgs('/', 'correctionCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/corrections/:id', function() {

    it('should route to correction.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'correctionCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/corrections/:id', function() {

    it('should route to correction.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'correctionCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/corrections/:id', function() {

    it('should route to correction.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'correctionCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
