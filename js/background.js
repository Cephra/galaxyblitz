var Parallax = {
    Layer: function (image, speed) {
        var that = this;

        var speed = Math.ceil(speed);
        var scroll = 0;

        this.draw = function (context) {
            context.save();
            var height = image.height;
            context.translate(0,-height+scroll);
            for (var x = 0; x < 3; x++) {
                context.drawImage(image,0,0);
                context.translate(0,height);
            }
            context.restore();
            scroll = (scroll >= height) ?
                0 : scroll+speed;
        };
    },
    Scroller: function () {
        var that = this;
        this.scrolling = false;
        this.layers = [];

        this.addLayer = function (layer) {
            that.layers.push(layer);
        }

        this.init = function (context) {
            that.layers.forEach(function (layer) {
                layer.draw(context);
            });
        };

        this.draw = function (context) {
            if (!that.scrolling) return;
            that.layers.forEach(function (layer) {
                layer.draw(context);
            });
        };
    },
};
