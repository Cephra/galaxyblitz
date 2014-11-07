// TODO organize this in module pattern
var Menu = function (items) {
    var that = this;

    var renderLayer = makeRenderLayer(width, height);
    var context = renderLayer.getContext();

    var itemActive = 0;
    var hidden = false;
    var buttons = [];
    var stack = [];

    var MenuButton = function (text, value) {
        var that = this;
        var active = false;
    
        this.name = text;
        this.value = value;
        this.redraw = true;
    
        this.draw = function () {
            if (!that.redraw) return;
            context.save();
            context.fillStyle = (active) ?
                "#003" : "#333";
            context.fillRect(0,0,context.width-8,32);
            context.fillStyle = "#FFF";
            context.font = "16pt Arial";
            context.textAlign = "center";
            context.fillText(text, context.width/2, 24);
            context.restore();
            that.redraw = false;
        };

        this.activate = function (active_) {
            if (active != active_) {
                that.redraw = true;
                active = active_;
            }
        };
    };

    var buildBtns = function (items) {
        buttons = [];
        for (key in items) {
            var btn = new MenuButton(key,
                    items[key]);
            buttons.push(btn);
        }
    };
    var clear = function () {
        context.clearRect(0,0,context.width,context.height);
    };

    renderLayer.setCallbacks({
        init: function () {
            itemActive = 0;
            buildBtns(items);
        },
        draw: function () {
            if (hidden) return;
            context.save();
            context.translate(4,100);
            buttons.forEach(function (v,i) {
                v.activate((i === itemActive) ||
                        false);
                v.draw();
                context.translate(0,34);
            }, this);
            context.restore();
        },
    });

    // hide & show the menu
    this.hide = function () {
        hidden = true;

        clear();
    };
    this.show = function () {
        hidden = false;

        buttons.forEach(function (btn) {
            btn.redraw = true;
        });
    };

    this.goNext = function (items) {
        clear();
        stack.push(buttons);
        itemActive = 0;
        buildBtns(items);
    };
    this.goBack = function () {
        if (hidden) return;
        // don't go further back but zero
        if (stack.length <= 0) return;
        clear();
        itemActive = 0;
        buttons = stack.pop();
        that.show();
    };
    this.goDown = function () {
        if (hidden) return;
        var cntBtns = buttons.length;
        (itemActive < cntBtns-1) ?
            itemActive++ :
            itemActive = 0;
    };
    this.goUp = function () {
        if (hidden) return;
        var cntBtns = buttons.length;
        (itemActive > 0) ?
            itemActive-- :
            itemActive = cntBtns-1;
    };
    this.pressBtn = function () {
        if (hidden) return;
        var cb = buttons[itemActive].value;
        if ($.isFunction(cb))
            cb(that);
        else if (typeof cb === "object") {
            cb["Back"] = function () {
                that.goBack();
            };
            that.goNext(cb);
        }
    };

    // controller object
    var controlHandlers = {
        up: that.goUp,
        down: that.goDown,
        enter: that.pressBtn,
        esc: that.goBack,
    };
    this.getController = function () {
        return controlHandlers;
    };

    renderLayer.start();
};

