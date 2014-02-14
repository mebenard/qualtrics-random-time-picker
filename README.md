Qualtrics: 
- Place the script in a javascript field of a Question 
- Configure the the correct QuestionID's in the wakeup, sleep variables in the script
- make sure you define a embedded data field 'qTime' in the survey flow
- you may also want to define a hidden input in the header, if you want to use it later in a 
  javascript, something like: '''html<input id="qTime" name="ED~qTime" type="hidden" value="${e://Field/qTime}"'''


define your US version time (multiple choice) questions like: (and use the US-version!)

12:00 midnight
12:15 am
12:30 am
12:45 am
1:00 am
1:15 am
1:30 am
1:45 am
...
11:00 am
11:15 am
11:30 am
11:45 am
12:00 noon
12:15 pm
12:30 pm
12:45 pm
1:00 pm
1:15 pm
1:30 pm
...
11:00 pm
11:15 pm
11:30 pm
11:45 pm


define your EU/world version time (multiple choice) questions like: (and use the EU-version!)

00:00
00:15    
00:30
00:45
01:00
01:15
01:30
01:45
02:00
.. etc..
21:15
21:30
21:45
22:00
22:15
22:30
22:45
23:00
23:15
23:30
23:45
