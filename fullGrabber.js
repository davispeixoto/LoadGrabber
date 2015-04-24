var system = require('system'), fs = require('fs'), startTime, address, loja, tipo, now, novo, filename;

address = system.args[1];
loja = system.args[2];
tipo = system.args[3];
novo = system.args[4];

now = new Date;
startTime = Date.now();
loadTime;

function pad(s) {
    return (s < 10) ? '0' + s : s;
}

filename = [loja, tipo, now.getFullYear(), pad(now.getMonth() + 1), pad(now.getDate()), pad(now.getHours()), pad(now.getMinutes())].join('_') + '.log';
var path = '/tmp/reports_carga/geral/' + filename;

function onResourceReceived(response) {
    var out = [response.url, (Date.now() - startTime), response.stage];
    fs.write(path, out.join("\t"), 'a');
    fs.write(path, "\n", 'a');
}

function onResourceRequested(requestData, networkRequest) {
    var out = [requestData.url, (Date.now() - startTime)];
    fs.write(path, out.join("\t"), 'a');
    fs.write(path, "\n", 'a');
}

function onCompletion(status) {
    var date = now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate()) + ' ' + pad(now.getHours()) + ':' + pad(now.getMinutes()) + ':' + pad(now.getSeconds());
    var out = [this.url, (Date.now() - startTime), loadTime, date, novo, status];
    console.log(out.join("\t"));
    fs.write(path, out.join("\t"), 'a');
    fs.write(path, "\n", 'a');
    phantom.exit();
}

function onResourceError(resourceError) {
    var out1 = [resourceError.url, ' error code ', resourceError.errorCode];
    var out2 = [resourceError.url, ' error desc ', resourceError.errorString];

    fs.write(path, out1.join("\t"), 'a');
    fs.write(path, "\n", 'a');
    fs.write(path, out2.join("\t"), 'a');
    fs.write(path, "\n", 'a');
}


var page = require('webpage').create();

page.onInitialized = function () {
    page.evaluate(function (domContentLoadedMsg) {
        document.addEventListener('DOMContentLoaded', function () {
            window.callPhantom('DOMContentLoaded');
        }, false);
    });
};

page.onCallback = function (data) {
    loadTime = (Date.now() - startTime);
};

page.settings.userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36';
page.onResourceReceived = onResourceReceived;
page.onResourceRequested = onResourceRequested;
page.onResourceError = onResourceError;
page.open(address, onCompletion);
