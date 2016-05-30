/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/corrections              ->  index
 * POST    /api/corrections              ->  create
 * GET     /api/corrections/:id          ->  show
 * PUT     /api/corrections/:id          ->  update
 * DELETE  /api/corrections/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Correction from './correction.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Corrections
export function index(req, res) {
  return Correction.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Correction from the DB
export function show(req, res) {
  return Correction.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Correction in the DB
export function create(req, res) {
  return Correction.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Correction in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Correction.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Correction from the DB
export function destroy(req, res) {
  return Correction.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
