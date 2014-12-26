var Controller = (function () {
  var obj = {};
  var currController = {};
  var keyStates = {
    up: false,
    down: false,
    left: false,
    right: false,

    enter: false,
    esc: false,

    space: false,
  };

  var execHandler = function (name, state) {
    var f = currController[state] &&
      currController[state][name];

    if (typeof f === "function") {
      if (state === "pressed" && !keyStates[name]) {
        keyStates[name] = true;
        f();
      } else if (state === "unpressed" && keyStates[name]) {
        keyStates[name] = false;
        f();
      }
    }

    if (state === "pressed") {
      keyStates[name] = true;
    } else {
      keyStates[name] = false;
    }
  };
  var chkKey = function (which, state) {
    switch (which) {

    case 38:
      execHandler("up", state);
      break;
    case 40:
      execHandler("down", state);
      break;
    case 37:
      execHandler("left", state);
      break;
    case 39:
      execHandler("right", state);
      break;

    case 13:
      execHandler("enter", state);
      break;
    case 27:
      execHandler("esc", state);
      break;

    case 32:
      execHandler("space", state);
      break;

    default:
      console.log(which+" "+state);
      break;
    }
  };

  $(document).keydown(function (e) {
    chkKey(e.which, "pressed");
  });
  $(document).keyup(function (e) {
    chkKey(e.which, "unpressed");
  });

  obj.set = function (to) {
    currController = to;
  };

  return obj;
}());
