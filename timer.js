define(function(){
	function Timer(){
		this.startOfResponse = 0;
		this.endOfResponse = 0;
		this.startOfRequest = 0;
		this.endOfRequest = 0;
		this.startOfEmit = 0;
		this.endOfEmit = 0;
		this.requestNumber = 0;
		this.responseNumber = 0;
		this.time = null;
	}
	Timer.prototype.getCurrentTime = function() {
		this.time = new Date();
		return this.time.getTime();
	};

	Timer.prototype.getTimeDiff = function(a, b) {
		return b-a;
	};

	Timer.prototype.calculateResponseTime = function(){
		console.log(this.responseNumber +":response time: "+parseInt(this.endOfResponse - this.startOfResponse));
		this.requestNumber++;
	};

	Timer.prototype.calculateRequestTime = function(){
		console.log(this.requestNumber +":request time: "+parseInt(this.endOfRequest - this.startOfRequest));
		this.responseNumber++;
	};

	Timer.prototype.calculateTotalTime = function(){
		console.log(this.responseNumber+":total time: "+parseInt(this.endOfResponse - this.startOfRequest));
	}

	Timer.prototype.calculateEmitTime = function(){
		console.log(this.responseNumber+":emit time: "+parseInt(this.endOfEmit - this.startOfEmit));
	}

	return {
		Timer:Timer
	}
});