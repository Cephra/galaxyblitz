// TODO put this in model pattern-esque format
// set the receiver for the controls
var Controller = (function () {
    var obj = {};
    var currController = {};

    var execHandler = function (name) {
        var f = currController[name];

        if (typeof f === "function") {
            f();
        }
    };

    $(document).keydown(function (e) {
        switch (e.which) {

        case 38:
            execHandler("up");
            break;
        case 40:
            execHandler("down");
            break;
        case 37:
            execHandler("left");
            break;
        case 39:
            execHandler("right");
            break;

        case 13:
            execHandler("enter");
            break;
        case 27:
            execHandler("esc");
            break;

        case 32:
            execHandler("space");
            break;

        default:
            console.log(e.which);
            break;
        }
    });

    obj.set = function (to) {
        currController = to;
    };

    return obj;
})();
