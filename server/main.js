function logNotAcked(map, method) {
  console.log(map.size + ' call(s) not acked via ' + method);
  map.forEach(function(callTime, callNumber) {
    var secsUnacked = Math.floor((Date.now() - callTime)/1000);
    if(secsUnacked > 3) console.log('WARNING: call ' + callNumber + ' not acked via ' + method + ' for ' + secsUnacked + ' secs');
  });
}

Meteor.methods({
  logOutstandingCallbacks: function(callToTimeMapClearedUsingCallbackJSON, callToTimeMapClearedUsingOnResultReceivedJSON, callNumber) {
    // http://www.2ality.com/2015/08/es6-map-json.html
    var callToTimeMapClearedUsingCallback = new Map(JSON.parse(callToTimeMapClearedUsingCallbackJSON));
    var callToTimeMapClearedUsingOnResultReceived = new Map(JSON.parse(callToTimeMapClearedUsingOnResultReceivedJSON));
    console.log('\n call #' + callNumber);
    logNotAcked(callToTimeMapClearedUsingCallback, 'callback');
    logNotAcked(callToTimeMapClearedUsingOnResultReceived, 'onResultReceived');
    return callNumber;
  }
});

Meteor.onConnection(function(conn) {
  conn.onClose(function() {
    console.log(conn.clientAddress + ' ->onClose');
  });
  console.log(conn.clientAddress + ' ->onConnection');
});