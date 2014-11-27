var Drawables = function () {
    var that = this, arrDrawables = [],
        renderLayer = Render.makeLayer(),
        width = Render.getWidth(),
        height = Render.getHeight(),
        context = renderLayer.getContext();

    this.addDrawable = function (drawable) {
        // TODO is this a good idea? 
        // (populate that to contained objects)
        // drawable.container = that;
        arrDrawables.push(drawable);
    };

    var execCallback = function (name) {
        arrDrawables.forEach(function (drawable) {
            if (typeof drawable[name] === "function") {
                drawable[name](context);
            }
        });
    };

    renderLayer.setCallbacks({
        init: function() {
            execCallback("init");
        },
        logic: function() {
            execCallback("logic");
        },
        draw: function() {
            context.clearRect(0,0,
                    width,height);
            execCallback("draw");
        },
        stop: function() {
            context.clearRect(0,0,
                    width,height);
        },
    });

    this.start = renderLayer.start;
    this.stop = renderLayer.stop;
    this.toggle = renderLayer.toggle;
};

var PlayerShip = function () {
    var that = this;

    var x = 0, y = 0;
    var vx = 2, vy = 2;

    this.init = function (context) {
        context.drawImage(res.invader, x, x);
    };

    this.draw = function (context) {
        context.drawImage(res.invader, x, y);
    };

    var controlHandlers = {
        up: function () {
            y += -vy;
        },
        down: function () {
            y += vy;
        },
        left: function () {
            x += -vx;
        },
        right: function () {
            x += vx;
        },
    };
    this.getController = function () {
        return controlHandlers;
    };
};
