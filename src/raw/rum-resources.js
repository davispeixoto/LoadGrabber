if ( !('performance' in window) ||
    !('getEntriesByType' in window.performance) ||
    !(window.performance.getEntriesByType('resource') instanceof Array)
) {
    document.getElementById('rt-unsupported').classList.remove('hidden');
} else {
    window.addEventListener('load', function() {
        var resources = window.performance.getEntriesByType('resource');
        for(var obj in resources) {
            var list = '';
            for(var properties in resources[obj]) {
                list += '<li>' + properties + ': <span class="value">' + resources[obj][properties] + '</span></li>';
            }
            document.getElementById(resources[obj].initiatorType + '-list').innerHTML = list;
        }
    });
}

// another

img = window.performance.getEntriesByName("http://mysite.com/mylogo.webp");

var dns  = parseInt(img.domainLookupEnd - img.domainLookupStart),
    tcp  = parseInt(img.connectEnd - img.connectStart),
    ttfb = parseInt(img.responseStart - img.startTime), //time to first byte
    transfer = parseInt(img.responseEnd - img.responseStart),
    total = parseInt(img.responseEnd - img.startTime);

logPerformanceData("mylogo", dns, tcp, ttfb, transfer, total);
