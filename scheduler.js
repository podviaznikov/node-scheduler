var sys = require('sys'),
    CronJob = require('./cron').CronJob;
function Scheduler()
{
    this.jobs = [];
    //default interval is one minute
    this.conf={minInterval:60*1000};
};
Scheduler.prototype.addJob=function(cronMask,task)
{
    var job = new CronJob(cronMask,task);
    this.jobs.push(job);
};
Scheduler.prototype.addAndRunJob=function(cronMask,task)
{
    var job = new CronJob(cronMask,task).start();
    this.jobs.push(job);
};
Scheduler.prototype.startAll=function()
{
    this.jobs.forEach(job.start, job);
};
Scheduler.prototype.stopAll=function()
{
    this.jobs.forEach(job.stop, job);
};
Scheduler.prototype.releaseAll=function()
{
    this.jobs.forEach(job.stop, job);
    this.jobs = [];
};
exports.create=function()
{
    return new Scheduler();
};