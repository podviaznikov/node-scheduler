var scheduler = require('../scheduler').create(),
    assert = require('assert'),
    sys = require('sys');
    
exports.testAddJobAndDelete=function()
{
    var jobId='id1';
    scheduler.addJob(jobId,'*/2 * * * * *', function()
    {
        sys.log('test');
    });
    assert.equal(scheduler.count(),1);
    scheduler.release(jobId);
    assert.equal(scheduler.count(),0);
};
exports.testAddTwoJobsAndDeleteAll=function()
{
    var jobId1='id1';
    scheduler.addJob(jobId1,'*/2 * * * * *');
    assert.equal(scheduler.count(),1);
    var jobId2='id2';
    scheduler.addJob(jobId2,'*/2 * * * * *');
    assert.equal(scheduler.count(),2);
    scheduler.releaseAll();
    assert.equal(scheduler.count(),0);
};
exports.testStopTwoJobs=function()
{
    var jobId1='id1';
    scheduler.addAndRunJob(jobId1,'*/2 * * * * *', function()
    {
        sys.log('test1');
    });
    assert.equal(scheduler.count(),1);
    var jobId2='id2';
    scheduler.addAndRunJob(jobId2,'*/2 * * * * *', function()
    {
        sys.log('test');
    });
    setTimeout(function()
    {
        sys.log('called');
        assert.equal(scheduler.count(),2);
        scheduler.stop(jobId1);
        scheduler.stop(jobId2);
        assert.equal(scheduler.count(),2);
        scheduler.releaseAll();
        assert.equal(scheduler.count(),0);
    },5000);

};
