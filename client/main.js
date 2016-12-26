var callNumber = 0;
var callToTimeMap = new Map();

setInterval(function() {
  callToTimeMap.set(callNumber, Date.now());
  Meteor.call('showOutstandingCallbacks', JSON.stringify([...callToTimeMap]), callNumber, function(err, ackedCallNumber) {
    callToTimeMap.delete(ackedCallNumber);
  });
  callNumber = callNumber + 1;
}, 1000);
