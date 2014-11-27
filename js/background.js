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
        var that = this, 
            layers = [],
            renderLayer = Render.makeLayer(width, height),
            width = Render.getWidth(), height = Render.getHeight();

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

        that.start = renderLayer.start;
        that.stop = renderLayer.stop;
        that.toggle = renderLayer.toggle;
    },
};
