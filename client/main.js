var callNumber = 0;
var callToTimeMapClearedUsingCallback = new Map();
var callToTimeMapClearedUsingOnResultReceived = new Map();

setInterval(function() {
  callToTimeMapClearedUsingCallback.set(callNumber, Date.now());
  callToTimeMapClearedUsingOnResultReceived.set(callNumber, Date.now());
  Meteor.apply('logOutstandingCallbacks', [JSON.stringify([...callToTimeMapClearedUsingCallback]), JSON.stringify([...callToTimeMapClearedUsingOnResultReceived]), callNumber], {
    onResultReceived:  function(err, ackedCallNumber) {
      callToTimeMapClearedUsingOnResultReceived.delete(ackedCallNumber);
    }}, function(err, ackedCallNumber) {
      callToTimeMapClearedUsingCallback.delete(ackedCallNumber);
    });
  callNumber = callNumber + 1;
}, 250);