window.requestAnimFrame = (function(callback) {
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

var RenderLoop = function (canvas, callbacks) {
    // members
    var that = this;
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.width = canvas.width;
    this.height= canvas.height;

    // callbacks
    var cbs = {
        init: new Function(),   // loop started
        logic: new Function(),  // logic worker
        draw: new Function(),   // draw worker
        stop: new Function(),   // loop stopped
    }
    for (key in cbs) {
        this[key] = cbs[key];
        if (callbacks[key] != undefined) {
            this[key] = callbacks[key];
        }
    }

    // tick runs every gametick
    this.tick = function () {
        var context = that.context;
        that.logic();
        that.draw(context);

        // are we still running?
        if (that.running)
            requestAnimFrame(that.tick);
        else
            that.stop(context);
    };

    // start gameloop
    this.start = function () {
        var context = that.context;
        that.init(context);

        that.running = true;
        requestAnimFrame(that.tick);
    };

    // stop gameloop
    this.stop = function () {
        that.running = false;
    };

    // toggle and return state
    this.toggle = function () {
        if (that.running)
            that.stop();
        else
            that.start();

        return (that.running = !that.running);
    };
};
