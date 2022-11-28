import "./styles.css";

var inputDate = document.querySelector("#input-date");
var btn = document.querySelector("#btn");
var output = document.querySelector("#output");

function reverseStr(str) {
  var newDate = str.split("").reverse().join("");
  return newDate;
}

function isPalindrome(str) {
  var reverse = reverseStr(str);
  return str === reverse;
}

function convertToDateFormat(date) {
  var day = date.day;
  var month = date.month;
  var year = date.year;

  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  return {
    day: day.toString(),
    month: month.toString(),
    year: year.toString()
  };
}

function dateAllFormats(date) {
  var dateFormat = convertToDateFormat(date);
  var day = dateFormat.day;
  var month = dateFormat.month;
  var year = dateFormat.year;

  var ddmmyyyy = day + month + year;
  var mmddyyyy = month + day + year;
  var yyyymmdd = year + month + day;
  var ddmmyy = day + month + year.slice(-2);
  var mmddyy = month + day + year.slice(-2);
  var yymmdd = year.slice(-2) + month + day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllFormats(date) {
  var allFormats = dateAllFormats(date);
  var flag = false;
  for (var index = 0; index < allFormats.length; index++) {
    if (isPalindrome(allFormats[index])) {
      flag = true;
      break;
    }
  }
  return flag;
}

function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var maxDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (isLeapYear(year)) {
    maxDays[1] = 29;
  }
  if (day > maxDays[month - 1]) {
    day = 1;
    month++;
  }
  if (month > 12) {
    month = 1;
    year++;
  }
  return {
    day: day,
    month: month,
    year: year
  };
}

function getPreviousDate(date) {
  var day = date.day - 1;
  var month = date.month;
  var year = date.year;

  var maxDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (isLeapYear(year)) {
    maxDays[1] = 29;
  }
  if (day === 0) {
    if (month >= 2) {
      day = maxDays[month - 2];
    } else {
      day = maxDays[maxDays.length - 1];
    }
    month--;
  }
  if (month < 1) {
    month = 12;
    year--;
  }
  return {
    day: day,
    month: month,
    year: year
  };
}

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}

function getNextPalindromeDate(date) {
  var count = 0;
  var newDate = getNextDate(date);
  while (1) {
    count++;
    if (checkPalindromeForAllFormats(newDate)) {
      break;
    }
    newDate = getNextDate(newDate);
  }
  return [count, newDate];
}

function getPreviousPalindromeDate(date) {
  var count = 0;
  var newDate = getPreviousDate(date);
  while (1) {
    count++;
    if (checkPalindromeForAllFormats(newDate)) {
      break;
    }
    newDate = getPreviousDate(newDate);
  }
  return [count, newDate];
}

function btnHandler() {
  var dateInput = inputDate.value.replaceAll("-", "");
  var dateInputToDateFormat = {
    day: Number(dateInput.slice(-2)),
    month: Number(dateInput.slice(-4, -2)),
    year: Number(dateInput.slice(0, 4))
  };
  if (checkPalindromeForAllFormats(dateInputToDateFormat)) {
    output.innerText = "Yay your birthday is a palindrome!!";
  } else {
    var [nextDays, nextDate] = getNextPalindromeDate(dateInputToDateFormat);
    var [prevDays, prevDate] = getPreviousPalindromeDate(dateInputToDateFormat);
    var days = Math.min(nextDays, prevDays);
    var newDate;
    if (days === nextDays) {
      newDate = nextDate;
    } else {
      newDate = prevDate;
    }
    output.innerText =
      "Nearest palindrome birthday is on " +
      newDate.day +
      "." +
      newDate.month +
      "." +
      newDate.year +
      " which you missed by " +
      days +
      " days!";
  }
}

btn.addEventListener("click", btnHandler);
