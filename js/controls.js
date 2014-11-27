var Controller = (function () {
    var obj = {};
    var currController = {};

    var execHandler = function (name, pressed) {
        var f = currController[pressed] &&
            currController[pressed][name];

        if (typeof f === "function") {
            f();
        }
    };
    var key = function (which, pressed) {
        switch (which) {

        case 38:
            execHandler("up", pressed);
            break;
        case 40:
            execHandler("down", pressed);
            break;
        case 37:
            execHandler("left", pressed);
            break;
        case 39:
            execHandler("right", pressed);
            break;

        case 13:
            execHandler("enter", pressed);
            break;
        case 27:
            execHandler("esc", pressed);
            break;

        case 32:
            execHandler("space", pressed);
            break;

        default:
            console.log(which+" "+pressed);
            break;
        }
    };

    $(document).keydown(function (e) {
        key(e.which, "pressed");
    });
    $(document).keyup(function (e) {
        key(e.which, "unpressed");
    });

    obj.set = function (to) {
        currController = to;
    };

    return obj;
}());
