/* Magic Mirror
 * Node Helper: MMM-ze-services
 *
 * By
 * MIT Licensed.
 */

 const NodeHelper = require('node_helper');
 const exec = require('child_process').exec;

module.exports = NodeHelper.create({

	// Override socketNotificationReceived method.

	/* socketNotificationReceived(notification, payload)
	 * This method is called when a socket notification arrives.
	 *
	 * argument notification string - The identifier of the noitication.
	 * argument payload mixed - The payload of the notification.
	 */
	 start: function() {
	 	this.config = null
	 	this.pooler = []
	 },


	 start: function () {
 			 console.log('zeServices helper started ...');
 		 },

	 // Subclass socketNotificationReceived received.
	 socketNotificationReceived: function(notification, payload) {
	   const self = this;
	   if (notification === 'REQUEST') {
		   const self = this
		   this.config = payload

		   // execute external HDC1080, read humidity and temp from i2c
		   exec("sudo python ./modules/MMM-ze-services/getData.py " + this.config.email + " " + this.config.password, (error, stdout) => {
		   if (error) {
			    console.error(`exec error: ${error}`);
			    return;
			  }
		   	  var arr = stdout.split(",");

			  //console.log("Log: " + temp + " - " + hum);
			  // Send Temperatur
	          self.sendSocketNotification('DATA',{
					charge: arr[0],
					remaining: arr[1],
					charging: arr[2]
			  });
		 });
	   }
	 }
});
