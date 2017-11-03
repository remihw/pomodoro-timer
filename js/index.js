var workLength = [25, 0];
var breakLength = [5, 0];
var time;
var timer; //timer value switches between "work" and "break"
var paused = false;
var startInterval;

$("#btn-start").on("click", function() {
  if (!startInterval) {
    $("#btn-start").css("display", "none");
    $("#btn-pause").css("display", "inline-block");
    $(".work, .break").removeClass("btn-on").addClass("btn-off");
    $("#tomato-time").css("color", "#f4f4f4");
    runTimer();
  }
});

var runTimer = function() {
  var alarm = new Audio("../pomodoro-timer/audio/alarm_sound.mp3");
  if (!paused) {
    time = workLength.slice();
    timer = "work";
    $("#timer-status").html("Currently: <span>Working</span>");
    $("#timer-status span").css("color", "#d33434");
  }
  startInterval = setInterval(function() {
    if (time[0] !== 0 || time[1] !== 0) {
      time = countdown(time);
    } else if (timer === "work") {
      alarm.play();
      time = breakLength.slice();
      timer = "break";
      $("#timer-status").html("Currently: <span>Taking a break</span>");
      $("#timer-status span").css("color", "#2d7836");
    } else if (timer === "break") {
      alarm.play();
      time = workLength.slice();
      timer = "work";
      $("#timer-status").html("Currently: <span>Working</span>");
      $("#timer-status span").css("color", "#d33434");
    }
    $("#tomato-time").text(makeString(time));
  }, 1000);
};

var countdown = function(time) {
  if (time[1] > 0) {
    time[1] -= 1;
  } else if (time[0] !== 0 && time[1] === 0) {
    time[0] -= 1;
    time[1] = 59;
  }
  return time;
};

var makeString = function(time) {
  var hour = time[0];
  var minute = time[1];
  if (time[0] < 10) { hour = "0" + time[0]; }
  if (time[1] < 10) { minute = "0" + time[1]; }
  return hour + ":" + minute;
};

$("#btn-pause").on("click", function() {
  clearInterval(startInterval);
  startInterval = null;
  paused = true;
  $("#btn-pause").css("display", "none");
  $("#btn-start").css("display", "inline-block");
  $("#tomato-time").css("color", "#e68787");
});

$("#btn-stop").on("click", function() {
  if (startInterval || paused) {
    clearInterval(startInterval);
    startInterval = null;
    paused = false;
    time = workLength.slice();
    timer = "work";
    $("#btn-pause").css("display", "none");
    $("#btn-start").css("display", "inline-block");
    $(".work, .break").removeClass("btn-off").addClass("btn-on");
    $("#timer-status").html("Press START to begin");
    $("#tomato-time").text(makeString(workLength));
    $("#tomato-time").css("color", "#f4f4f4");
  }
});

$(".btn-minus").on("click", function() {
  if (!startInterval && !paused) {
    if ($(this).hasClass("work") && workLength[0] > 1) {
      workLength[0] -= 1;
      $("#work-length").text(makeString(workLength));
      $("#tomato-time").text(makeString(workLength));
    } else if ($(this).hasClass("break") && breakLength[0] > 1) {
      breakLength[0] -= 1;
      $("#break-length").text(makeString(breakLength));
    }
  }
});

$(".btn-plus").on("click", function() {
  if (!startInterval && !paused) {
    if ($(this).hasClass("work") ) {
      workLength[0] += 1;
      $("#work-length").text(makeString(workLength));
      $("#tomato-time").text(makeString(workLength));
    } else {
      breakLength[0] += 1;
      $("#break-length").text(makeString(breakLength));
    }
  }
});

$("#btn-test-alarm").on("click", function() {
  var alarm = new Audio("../pomodoro-timer/audio/alarm_sound.mp3");
  alarm.play();
});