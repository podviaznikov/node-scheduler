var scheduler = require('../scheduler').create(),
    sys = require('sys');
scheduler.addJob('* */1 * * * *', function()
{
    sys.log('test');
});