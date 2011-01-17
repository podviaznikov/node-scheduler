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
