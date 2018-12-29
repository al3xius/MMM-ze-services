/* global Module */

/* Magic Mirror
 * Module: MMM-ze-services
 *
 * By
 * MIT Licensed.
 */

Module.register("MMM-ze-services", {
	defaults: {
		email: "example@example.com",
    password: "Password1!",
    updateInterval: 5, // Minutes
	},

	requiresVersion: "2.1.0", // Required version of MagicMirror

	start: function() {
		Log.info("Starting module: " + this.name);

    this.charge = '';
    this.remaining= '';
    this.charging = '';

		var self = this;
		var dataRequest = null;
		var dataNotification = null;

		//Flag for check if module is loaded
		this.loaded = false;

		// Schedule update timer.
		this.update();
    setInterval(
    		this.update.bind(this),
    		this.config.updateInterval * 60 * 1000);
	},


	update: function() {
		this.sendSocketNotification('REQUEST', this.config);
	},

	getStyles: function() {
		return ["font-awesome.css"];
	},


	getDom: function() {
    	var wrapper = document.createElement("div");
    	wrapper.className = "light small";

			if (!this.loaded) {
				wrapper.innerHTML = "Loading ...";
				wrapper.className = "dimmed light small";
				return wrapper;
			}

			var table = document.createElement("table");
			table.className = "light small";

			//Battery
			var row = document.createElement("tr");
			table.appendChild(row);

			var iconCell = document.createElement("td");
			iconCell.className = "bright weather-icon";
			row.appendChild(iconCell);

			var valueCell = document.createElement("td");
			valueCell.innerHTML = " Batterie: " + this.charge + " %";
			row.appendChild(valueCell);

			var icon = document.createElement("span");

			if (this.charging == "True") {
        	icon.className = "fa fa-fw fa-" + "bolt";
      }
			else if (this.charge > 90){
				icon.className = "fa fa-fw fa-" + "battery-full";
			}
			else if (this.charge > 65) {
				icon.className = "fa fa-fw fa-" + "battery-three-quarters";
			}
			else if (this.charge > 45) {
				icon.className = "fa fa-fw fa-" + "battery-half";
			}
			else if (this.charge > 15) {
				icon.className = "fa fa-fw fa-" + "battery-quarter";
			}
			else{
				icon.className = "fa fa-fw fa-" + "battery-empty";
			}

			iconCell.appendChild(icon);


			//Range
			var row = document.createElement("tr");
			table.appendChild(row);

			var iconCell = document.createElement("td");
			iconCell.className = "bright weather-icon";
			row.appendChild(iconCell);

			var valueCell = document.createElement("td");
			valueCell.innerHTML = " Reichweite: " + this.remaining + " km";
			row.appendChild(valueCell);

			var icon = document.createElement("span");
			icon.className = "fa fa-fw fa-" + "car";
			iconCell.appendChild(icon);

      return table;
	    },

	socketNotificationReceived: function(notification, payload) {
	    if (notification === 'DATA') {
	        this.charge = payload.charge;
	        this.remaining = payload.remaining;
	        this.charging = payload.charging;
	        this.loaded = 1;
	        this.updateDom();
	    }
	    },
});
