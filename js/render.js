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

var makeRenderLayer = function (width, height, drawable) {
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

    var callback = function (name) {
        var f = drawable[name];

        if (typeof f === "function") {
            return f;
        }
        return new Function();
    }

    // the loop
    var running = false;
    var tick = function () {
        // issue callbacks
        callback("logic")(context);
        callback("draw")(context);

        // loop again?
        if (running) {
            requestAnimFrame(tick);
        } else {
            //TODO work on this
            //that.stop(context);
        }
    };
    obj.start = function () {
        running = true;

        callback("init")(context);

        requestAnimFrame(tick);
    };
    obj.stop = function () {
        running = false;

        callback("stop")(context);
    };
    obj.toggle = function () {
        if (running) {
            obj.stop();
        } else {
            obj.start();
        }
    }

    return obj;
};
