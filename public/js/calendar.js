import {
  startTimeString,
  endTimeString,
  getStartTime,
  getEndTime,
  getRoomId,
} from "/js/dashboard.js";

var clientId = "12349008749-jq9temojd48il0273upbccsljhjhe04k.apps.googleusercontent.com";
var apiKey = "AIzaSyA3DoHVGMvSjBsHuI1vRJvdv6mUaUg452c";
var scopes = "https://www.googleapis.com/auth/calendar";
var calendars;

//var startTime = calendars[0].time.start.toJSON().toString()
//var endTime = calendars[0].time.end.toJSON().toString()
document.querySelector("#book").addEventListener("click", handleAuthClick);
var resource;
console.log(startTimeString);
function handleClientLoad() {
  gapi.client.setApiKey(apiKey);
  window.setTimeout(checkAuth, 1);
  checkAuth();
}

function checkAuth() {
  gapi.auth.authorize({ client_id: clientId, scope: scopes, immediate: true }, handleAuthResult);
}

function handleAuthResult(authResult) {
  //var authorizeButton = document.getElementById('book');
  if (authResult) {
    makeApiCall();
  } else {
    authorizeButton.onclick = handleAuthClick;
  }
}

function handleAuthClick(event) {
  let title = document.querySelector("#appointment-name").value;
  console.log(title);
  let startTime = getStartTime().toJSON().toString();
  let endTime = getEndTime().toJSON().toString();
  let roomId = getRoomId();
  resource = {
    summary: title,
    location: roomId,
    start: {
      dateTime: startTime,
    },
    end: {
      dateTime: endTime,
    },
  };
  gapi.auth.authorize({ client_id: clientId, scope: scopes, immediate: false }, handleAuthResult);
  return false;
}

function makeApiCall() {
  gapi.client.load("calendar", "v3", function () {
    var request = gapi.client.calendar.events.insert({
      calendarId: "vf8ccufmv0tkpcfthuvj7k3jco@group.calendar.google.com",
      resource: resource,
    });

    request.execute(function (resp) {
      console.log(resp);
    });
  });
}
