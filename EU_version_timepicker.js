Qualtrics.SurveyEngine.addOnload(function()
{
    /*Place Your Javascript Below This Line*/

    /*
     * Qualtrics: 
     *  - Configure the the correct QuestionID's in the wakeup, sleep varables
     *  - make sure you define a embedded data field 'qTime' in the survey flow
     *  - you may also want to define a hidden input in the header, if you want to use it later in a 
     *    javascript, something like: <input id="qTime" name="ED~qTime" type="hidden" value="${e://Field/qTime}" />
     *   
     */
    // Qualtrics: get time choice from wakeup qID
    var wakeup = "${q://QID1/ChoiceGroup/SelectedChoices}";
    // Qualtrics: get time choice from sleep qID
    var sleep = "${q://QID2/ChoiceGroup/SelectedChoices}";

    var timesArray = new Array(); 	// define array for timeslots            

    // fill TimesArray from input
    timesArray = makeTimesArray(wakeup, sleep);
    // count elements in timesArray and select one key at random 
    var randomIndex = Math.floor(Math.random() * (timesArray.length) + 0);
    // get the value (time) for the randomly picked key from the timesArray
    var randomTime = timesArray[randomIndex];
    // Qualtrics: insert the random-time into embedded data for later use
    $('qTime').value = (randomTime);

    // Qualtrics: I used this for testing only, this creates a list of all possible timeslots and shows which one was picked in a <div id="mbone"></div> on current survey-page 
    /*
    var timesString = '<small><br>';
    for (index = 0; index < timesArray.length; ++index) {
        timesString += timesArray[index];
        if (timesArray[index] === randomTime) {
            timesString += '<b style="color: red;"> <= ' + randomTime + ' picked! </b></u>-';
        } else {
            timesString += '-';
        }
    }
    timesString += '</small><br>';
    document.getElementById("mbone").innerHTML = ' ' + timesString + '';
    */
   
    // Qualtrics: optional place the random time in a <div id="mbrnd"></div> on current survey-page 
    // document.getElementById("mbrnd").innerHTML = ' ' + randomTime + ''; 

    function makeTimesArray(startTime, endTime) {
        var startT = startTime.split(':'); 			// get hours:minutes for start 
        var endT = endTime.split(':');				// get hours:minutes for end

        var sH = parseInt(startT[0],10);    // parse to integer, add a radix of ten (decimal) to avoid EI8 bug!  (thnx Bart at flycatcher.nl for fixing this problem!)
        var sMin = parseInt(startT[1],10);
        var eH = parseInt(endT[0],10);
        var eM = parseInt(endT[1],10);
        var countHours = 0;

        if (eH <= 11) {             // if sleeptime before 12:00, then it is probable the next day!
            countHours = eH + 24;
            countHours = countHours - sH;
        } else {
            countHours = eH - sH;
        }
        var sMinCount = 0;
        var eMinCount = 0;

        switch (sMin)
        {
            case 0:
                sMinCount = 0;
                break;
            case 15:
                sMinCount = 1;
                break;
            case 30:
                sMinCount = 2;
                break;
            case 45:
                sMinCount = 3;
                break;
        }
        switch (eM)
        {
            case 0:
                eMinCount = 0;
                break;
            case 15:
                eMinCount = 1;
                break;
            case 30:
                eMinCount = 2;
                break;
            case 45:
                eMinCount = 3;
                break;
        }
        var myTimes = new Array();
        var countQuarters = 0;
        countQuarters = (((countHours * 4) - sMinCount) + eMinCount);

        var ddd = new Date(0, 0, 1, sH, sMin, 0, 0);
        for (i = 0; i <= countQuarters; i++) {
            hh = ddd.getHours();
            if (hh <= 9) {
                hh = "0" + hh.toString();
            }
            mm = ddd.getMinutes();
            if (mm === 0) {
                mm = "00";
            }
            myTimes[i] = hh + ':' + mm;
            ddd.setMinutes(ddd.getMinutes() + 15);
        }
        return myTimes;
    }
});