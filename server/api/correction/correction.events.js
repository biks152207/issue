/**
 * Correction model events
 */

'use strict';

import {EventEmitter} from 'events';
import Correction from './correction.model';
var CorrectionEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CorrectionEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Correction.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    CorrectionEvents.emit(event + ':' + doc._id, doc);
    CorrectionEvents.emit(event, doc);
  }
}

export default CorrectionEvents;
