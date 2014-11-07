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
        var scrolling = false;
        var layers = [];
        var renderLayer = makeRenderLayer(width, height);

        this.addLayer = function (layer) {
            layers.push(layer);
        }

        renderLayer.setCallbacks({
            init: function (context) {
                layers.forEach(function (layer) {
                    layer.draw(context);
                });
            },
            draw: function (context) {
                layers.forEach(function (layer) {
                    layer.draw(context);
                });
            },
        });

        that.start = function () {
            renderLayer.start();
        }
        that.stop = function () {
            renderLayer.stop();
        }
        that.toggle = function () {
            renderLayer.toggle();
        }
    },
};
