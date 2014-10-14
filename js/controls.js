var Controls = (function () {
    var dbgHandler = function (e) {
        console.dir(e);
    };
    $(document).on("touchmove", dbgHandler);
    $(document).on("touchstart", dbgHandler);
    $(document).on("touchend", dbgHandler);
    $(document).on("keydown", dbgHandler);
})();
