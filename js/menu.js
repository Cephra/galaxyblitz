var Menu = function (items) {
    var that = this;
    var context;
    var itemActive = 0;
    var hidden = false;
    var buttons = [];
    var stack = [];

    var buildBtns = function (items) {
        buttons = [];
        for (key in items) {
            var btn = new MenuButton(key,
                    items[key]);
            buttons.push(btn);
        }
    }

    this.init = function (_context) {
        itemActive = 0;
        context = _context;
        buildBtns(items);
    };

    this.draw = function (context) {
        if (hidden) return;
        context.save();
        context.translate(4,100);
        buttons.forEach(function (v,i) {
            v.activate((i === itemActive) ||
                    false);
            v.draw(context);
            context.translate(0,34);
        }, this);
        context.restore();
    };

    var fClear = function () {
        context.clearRect(0,0,context.width,context.height);
    };


    this.hide = function () {
        fClear();
        hidden = true;
    };
    this.show = function () {
        hidden = false;
        buttons.forEach(function (btn) {
            btn.redraw = true;
        });
    };

    this.goNext = function (items) {
        fClear();
        stack.push(buttons);
        itemActive = 0;
        buildBtns(items);
    };
    this.goBack = function () {
        if (hidden) return;
        // don't go further back but zero
        if (stack.length <= 0) return;
        fClear();
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

    this.up = that.goUp;
    this.down = that.goDown;
    this.enter = that.pressBtn;
    this.esc = that.goBack;
};

var MenuButton = function (text, value) {
    var that = this;
    var active = false; 

    this.name = text;
    this.value = value;
    this.redraw = true;

    this.draw = function (context) {
        if (!that.redraw) return;
        context.save();
        context.fillStyle = (active) ?
            "#003" : "#333";
        context.fillRect(0,0,context.width-8,32);
        context.fillStyle = "#FFF";
        context.font = "16pt Sans";
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
