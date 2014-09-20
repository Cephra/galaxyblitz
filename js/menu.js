var MenuButton = function (text, value) {
    var that = this;
    this.name = text;
    this.value = value;
    this.active = false; 
    this.redraw = true;

    this.draw = function (context) {
        if (!that.redraw) return;
        context.save();
        context.fillStyle = (that.active) ?
            "#003" : "#333";
        context.fillRect(0,0,this.width-8,32);
        context.fillStyle = "#FFF";
        context.font = "16pt Sans";
        context.textAlign = "center";
        context.fillText(text, this.width/2, 24);
        context.restore();
        that.redraw = false;
    };

    this.activate = function (active) {
        if (that.active != active) {
            that.redraw = true;
            that.active = active;
        }
    };
};

var Menu = function (items) {
    var that = this;
    this.itemActive = 0;
    this.buttons = [];
    this.hidden = false;

    this.init = function (context) {
        that.itemActive = 0;
        for (key in items) {
            that.buttons.push(
                    new MenuButton(
                        key,
                        items[key])
                    );
        }
    };

    this.draw = function (context) {
        context.save();
        context.translate(4,100);
        that.buttons.forEach(function (v,i) {
            v.activate((i === that.itemActive) ||
                    false);
            v.draw.call(this, context);
            context.translate(0,34);
        }, this);
        context.restore();
    };

    this.goDown = function () {
        var cntBtns = that.buttons.length;
        (that.itemActive < cntBtns-1) ?
            that.itemActive++ :
            that.itemActive = 0;
    };

    this.goUp = function () {
        var cntBtns = that.buttons.length;
        (that.itemActive > 0) ?
            that.itemActive-- :
            that.itemActive = cntBtns-1;
    };

    this.pressBtn = function () {
        var cb = that.buttons[that.itemActive].value;
        if ($.isFunction(cb))
            cb();
    };


    // TODO move this somewhere else 
    // e.g. put a global event handler
    $(document).keydown(function (e) {
        switch (e.which) {
        case 38:
            that.goUp();
            break;
        case 40:
            that.goDown();
            break;
        case 13:
            that.pressBtn();
            break;
        }
    });
};
