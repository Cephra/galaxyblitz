// Resources
var res = new Resources({
    starfield: "gfx/starfield.png",
    clouds: "gfx/clouds.png",
});

// main
$(document).ready(function () {
    var scroller = new Parallax.Scroller();

    var menu = new Menu({
        "Start Game": function () {
            scroller.scrolling = true;
            menu.hide();
        },
        "Options": {
            "Difficulty": {
                "Hard": 0,
                "Medium": 0,
                "Easy": 0,
            },
            "Another Option": {
            },
        },
    });

    var width = 320;
    var height = 620;

    var renderBgnd = makeRenderLayer(width, height, scroller);
    var renderMenu = makeRenderLayer(width, height, menu);

    // load resources and start
    res.load(function () {
        renderMenu.start();

        // add rendering layers
        scroller.addLayer(new Parallax.Layer(res.starfield, 1));
        scroller.addLayer(new Parallax.Layer(res.clouds, 2));

        renderBgnd.start();
    });
});
