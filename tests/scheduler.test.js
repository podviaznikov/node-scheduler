var scheduler = require('../scheduler').create(),
    sys = require('sys');
scheduler.addAndRunJob('*/2 * * * * *', function()
{
   sys.log('test');
});