function createCalendarWithEvents() {
  // Create a new calendar named "JIA YOU"
  var calendar = CalendarApp.createCalendar('JIA YOU');
  
  // Define the letters to cycle through
  var letters = ['J', 'I', 'A', 'Y', 'O', 'U'];
  
  // Define the start and end months
  var startMonth = 9; // **MODIFY**
  var endMonth = 12;  // **MODIFY**
  var year = new Date().getFullYear(); // Current year
  
  // Get the holidays for the current year (adjust as needed for your location)
  var holidays = getHolidays(year);
  
  // Event counter
  var eventIndex = 0;
  
  // Loop through each month
  for (var month = startMonth; month <= endMonth; month++) {
    // Determine the number of days in the month
    var daysInMonth = new Date(year, month, 0).getDate();
    
    // Loop through each day of the month
    for (var day = 1; day <= daysInMonth; day++) {
      var date = new Date(year, month - 1, day);
      
      // Check if the day is a weekend (Saturday or Sunday)
      if (date.getDay() == 0 || date.getDay() == 6) {
        continue;
      }
      
      // Check if the day is a holiday
      if (isHoliday(date, holidays)) {
        continue;
      }
      
      // Create an event with the current letter
      var letter = letters[eventIndex % letters.length];
      calendar.createAllDayEvent(letter, date);
      
      // Increment the event counter
      eventIndex++;
    }
  }
  
  Logger.log('Calendar created!');
}

// Function to check if a date is a holiday
function isHoliday(date, holidays) {
  for (var i = 0; i < holidays.length; i++) {
    if (holidays[i].getTime() === date.getTime()) {
      return true;
    }
  }
  return false;
}

// Function to get holidays
function getHolidays(year) {
  var holidays = [];
  var calendar = CalendarApp.getCalendarById('en.usa#holiday@group.v.calendar.google.com'); // **MODIFY**
  var start = new Date(year, 0, 1); // Start from January 1st
  var end = new Date(year, 11, 31); // End on December 31st
  
  var events = calendar.getEvents(start, end);
  
  for (var i = 0; i < events.length; i++) {
    holidays.push(events[i].getAllDayStartDate());
  }
  
  return holidays;
}