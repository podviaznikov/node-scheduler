var cron = require('./cron'),
sys = require('sys');

var job = new cron.CronJob('* */1 * * * *', function(){
    sys.puts('You will see this message when the seconds are zero');
});