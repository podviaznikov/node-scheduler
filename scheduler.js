var CronJob = require('./cron').CronJob;
function Scheduler()
{
    this.jobs = {};
    //default interval is one minute
    this.conf={minInterval:60*1000};
};
Scheduler.prototype.addJob=function(id,cronMask,task)
{
    var job = new CronJob(id,cronMask,task);
    this.jobs[id]=job;
    return job;
};
Scheduler.prototype.addAndRunJob=function(id,cronMask,task)
{
    var job = new CronJob(id,cronMask,task);
    job.start();
    this.jobs[id]=job;
    return job;
};
Scheduler.prototype.startAll=function()
{
    this.jobs.forEach(job.start, job);
};
Scheduler.prototype.stopAll=function()
{
    var ids = Object.keys(this.jobs);
    for(var i=0;i<ids.length;i++)
    {
        var jobId=ids[i];
        this.stop(jobId);
    }
};
Scheduler.prototype.stop=function(id)
{
    var job = this.jobs[id];
    if(job)
    {
        job.stop();
    }
};
Scheduler.prototype.releaseAll=function()
{
    var ids = Object.keys(this.jobs);
    for(var i=0;i<ids.length;i++)
    {
        var jobId=ids[i];
        this.release(jobId);
    }
};
Scheduler.prototype.release=function(id)
{
    var job = this.jobs[id];
    if(job)
    {
        job.stop();
        delete this.jobs[id];
    }
}
Scheduler.prototype.count=function()
{
    return Object.keys(this.jobs).length;
};
exports.create=function()
{
    return new Scheduler();
};
