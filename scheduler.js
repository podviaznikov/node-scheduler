var sys = require('sys'),
    CronJob = require('./cron').CronJob;
function Scheduler()
{
    this.jobs = [];
};
Scheduler.prototype.addJob=function(cronMask,task)
{
    var job = new CronJob(cronMask,task);
    this.jobs.push(job);
};
exports.create=function()
{
    return new Scheduler();
};