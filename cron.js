var CronTime = require('./cron.time').CronTime;
function CronJob(cronTime, event) 
{
	if (!(this instanceof CronJob))
	{
	   return new CronJob(cronTime, event);
	}
	
	this.events = [event];
	this.cronTime = new CronTime(cronTime);
	this.now = {};
	this.initiated = false;
	this.timer;
	this.clock();
};


CronJob.prototype.addEvent = function(event)
{
    this.events.push(event);
};

CronJob.prototype.stop = function()
{
    if (!this.initiated)
	{
	   clearInterval(this.timer);
	}  
};

CronJob.prototype.runEvents = function()
{
	for (var i = -1, l = this.events.length; ++i < l; )
	{
	   if (typeof this.events[i] === 'function')
	   {
	       this.events[i]();
	   }
	}
};

CronJob.prototype.clock = function()
{
    var date = new Date,
	now = this.now,
	self = this,
	cronTime = this.cronTime,
	i;
	
	if (!this.initiated)
	{
		// Make sure we start the clock precisely ON the 0th millisecond
		setTimeout(function(){
		           self.initiated = true;
		           self.clock();
		         }, Math.ceil(+date / 1000) * 1000 - +date);
		return;
	}
	
	this.timer = this.timer || setInterval(function(){self.clock();}, 1000);
	//TODO (podviaznikov) is this locale dependent
	now.second = date.getSeconds();
	now.minute = date.getMinutes();
	now.hour = date.getHours();
	now.dayOfMonth = date.getDate();
	now.month = date.getMonth();
	now.dayOfWeek = date.getDay()+1;
	for (i in now)
	{
	   if (!(now[i] in cronTime[i]))
	   {
	       return;
	   }
	}
	
	this.runEvents();
};

exports.CronJob = CronJob;