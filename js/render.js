window.requestAnimFrame = (function () {
    return window.requestAnimationFrame || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            setTimeout(callback, 1000 / 60);
        };
})();

var Resources = function (sources) {
    // calc number of sprites
    var numSprites = 0;
    var numLoaded = 0;
    for (var src in sources) {
        numSprites++;
    }
    
    this.load = function (callback) {
        for (var src in sources) {
            this[src] = new Image();
            this[src].onload = function() {
                if (++numLoaded >= numSprites) {
                    callback();
                }
            };
            this[src].src = sources[src];
        }
    };
};

var makeRenderLayer = function (width, height) {
    var obj = {};

    // initalize canvas and context
    var canvas = $("<canvas></canvas>");
    var context = canvas[0].getContext("2d");
    context.width = width;
    context.height = height;
    canvas.attr({
        class: "game",
        width: width,
        height: height,
    });
    $("#game").append(canvas);

    obj.getContext = function () {
        return context;
    };

    // callbacks
    var callbacks = {};
    var callback = function (name) {
        var f = callbacks[name];

        if (typeof f === "function") {
            f(context);
        }
    }
    obj.setCallbacks = function (cbs) {
        callbacks = cbs;
    };

    // the loop
    var running = false;
    var tick = function () {
        // issue callbacks
        callback("logic");
        callback("draw");
        // loop again?
        if (running) {
            requestAnimFrame(tick);
        };
    };

    // loop control
    obj.start = function () {
        running = true;

        callback("init");

        requestAnimFrame(tick);
    };
    obj.stop = function () {
        running = false;

        callback("stop");
    };
    obj.toggle = function () {
        (running) ? 
            obj.stop() : 
            obj.start();
    }

    return obj;
};
