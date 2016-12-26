Meteor.methods({
  showOutstandingCallbacks: function(jsonMapStr, cookie) {
    // http://www.2ality.com/2015/08/es6-map-json.html
    var callToTimeMap = new Map(JSON.parse(jsonMapStr));
    console.log(callToTimeMap.size + ' call(s) not acked');
    callToTimeMap.forEach(function(callTime, callNumber) {
      var secsUnacked = Math.floor((Date.now() - callTime)/1000);
      if(secsUnacked > 3) console.log('WARNING: call ' + callNumber + " not acked for " + secsUnacked + ' secs');
    });
    return cookie;
  }
});