// Auto login using Casper
var vars = require('./vars')

var casper = require('casper').create({
    verbose: true,
    logLevel: "debug",
    viewportSize: {
        width: 1920,
        height: 1080
    }
});


casper.on('remote.message', function(msg) {
    this.echo('remote message caught: ' + msg);
});

casper.start();
casper.userAgent('Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36');
casper.thenOpen('https://hvcs.taipower.com.tw');
casper.then(function() {
    this.echo('Init Title: ' + this.getTitle());
});

casper.then(function() {
    casper.sendKeys('input#UserName', vars.get_id());
    casper.sendKeys('input#Password', vars.get_passwd());
});

casper.then(function() {
    this.evaluate(function() {
        document.querySelector('input[type="password"]').click();
        console.log(document.getElementById('UserName').value);
        console.log(document.getElementById('Password').value);
    });
});

casper.then(function() {
    this.evaluate(function() {
        console.log(document.querySelector('button[title="登入"]').textContent);
        document.querySelector('button[title="登入"]').click();
    });
});

casper.wait(3000, function() {
    this.echo('After click Title: ' + this.getTitle());
    casper.then(function() {
            this.capture('1.png', {
                top: 0, left: 0, width:1920, height:1080
            });
    });
});

casper.thenOpen('https://hvcs.taipower.com.tw/Customer/Module/PowerAnalyze')
    .then(function() {
        this.page.injectJs('https://hvcs.taipower.com.tw/Scripts/Ge/jquery-1.11.1.min.js');
        this.echo('After click Title: ' + this.getTitle());
});

casper.then(function() {
        this.echo('then Title: ' + this.getTitle());
        
        
        this.evaluate(function() {
            console.log('text0');
            //console.log(document.getElementById('myTab').children[2].textContent);
            console.log('text3');
        });
            casper.waitFor(function check() {
                return this.evaluate(function() {
                    return document.getElementById('myTab').children[2].textContent.length > 0;
                });
            }, function then() {
                    this.echo('print screen...');
                this.capture('2.png', {
                    top: 0, left: 0, width:1920, height:1080
                });
            }, function timeout() {
                this.echo("Timeout! :(");
            }, 20000);
});

casper.run();
