import { Meteor } from 'meteor/meteor';

// Track per connection for multiple clients.
const lastCounter = {};

Meteor.methods({
  recordPing: function(pingCounter) {
    console.log('->recordPing pingCounter : %d',
                pingCounter,
                lastCounter[this.connection.id] === pingCounter ? ' DUP!' : '',
               );
    lastCounter[this.connection.id] = pingCounter;
  },
  getLastPingCounter: function() {
    return lastCounter[this.connection.id];
  }
});
