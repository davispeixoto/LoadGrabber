/*
var dns  = parseInt(img.domainLookupEnd - img.domainLookupStart),
    tcp  = parseInt(img.connectEnd - img.connectStart),
    ttfb = parseInt(img.responseStart - img.startTime), //time to first byte
    transfer = parseInt(img.responseEnd - img.responseStart),
    total = parseInt(img.responseEnd - img.startTime);
    */

var perf = window.performance;


var device = perf.redirectEnd - perf.navigationStart;
var cache = perf.domainLookupStart - perf.fetchStart;
var dns = perf.domainLookupEnd - perf.domainLookupStart;
var tcp = perf.connectEnd - perf.connectStart;
var network = dns + tcp;
var backend = perf.responseStart - perf.requestStart;
var transfer = perf.responseEnd - perf.responseStart;
var parsing = perf.domComplete - perf.domLoading;
var rendering = perf.loadEventEnd - perf.loadEventStart;
var frontEnd = parsing + rendering;
var total = perf.loadEventEnd - perf.navigationStart;

logPageTimings('my_page', total);
