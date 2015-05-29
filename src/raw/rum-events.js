window.performance = window.performance || {};
if (performance.mark === undefined) {
    document.getElementById('ut-unsupported').classList.remove('hidden');
    document.getElementById('button-play-ut').setAttribute('disabled', 'disabled');
} else {
    document.getElementById('button-play-ut').addEventListener('click', function() {
        var i;
        var perfMarks;
        var perfMeasures;

        document.getElementById('ut-results').classList.remove('hidden');
        // A time consuming function
        performance.mark("startTime1");
        for(i = 0; i < parseInt(document.getElementById('count-ut-1').value); i++);
        performance.mark("endTime1")

        // Another time consuming function
        performance.mark("startTime2");
        for(i = 0; i < parseInt(document.getElementById('count-ut-2').value); i++);
        performance.mark("endTime2");
        performance.measure("durationTime1", "startTime1", "endTime1");
        performance.measure("durationTime2", "startTime2", "endTime2");
        performance.measure("durationTimeTotal", "startTime1", "endTime2");

        // Print marks
        perfMarks = performance.getEntriesByType("mark");
        document.getElementById('ut-marks').innerHTML = '';
        for (i = 0; i < perfMarks.length; i++) {
            document.getElementById('ut-marks').innerHTML +=
                "Name: " + perfMarks[i].name + " - " +
                "Start Time: " + perfMarks[i].startTime + "<br />";
        }

        // Print measures
        perfMeasures = performance.getEntriesByType("measure");
        document.getElementById('ut-measures').innerHTML = '';
        for (i = 0; i < perfMeasures.length; i++) {
            document.getElementById('ut-measures').innerHTML +=
                "Name: " + perfMeasures[i].name + " - " +
                "Duration: " + perfMeasures[i].duration + "<br />";
        }
        performance.clearMarks();
        performance.clearMeasures();
    });
}

// another

// https://github.com/nicjansma/usertiming.js

//
var reqCount = 0;

var myReq = new XMLHttpRequest();
myReq.open('GET', url, true);
myReq.onload = function(e) {
    window.performance.mark('mark_end_xhr');
    reqCnt++;
    window.performance.measure('measure_xhr_' + reqCnt, 'mark_start_xhr', 'mark_end_xhr');
    do_something(e.responseText);
}
window.performance.mark('mark_start_xhr');
myReq.send();

var items = window.performance.getEntriesByType('measure');
for (var i = 0; i < items.length(); ++i) {
    var req = items[i];
    console.log('XHR ' + req.name + ' took ' + req.duration + 'ms');
}
