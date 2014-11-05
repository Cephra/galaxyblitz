// Resources
var res = new Resources({
    starfield: "gfx/starfield.png",
    clouds: "gfx/clouds.png",
});

// main
$(document).ready(function () {
    var scroller = new Parallax.Scroller();
    
    var startGame = function (difficulty) {
        scroller.start();
        menu.hide();
    };
    var menu = new Menu({
        "Start Game": { 
            "Easy": function () {
                startGame(0);
            },
            "Normal": function () {
                startGame(1);
            },
            "Hard": function () {
                startGame(2);
            },
        },
    });

    var width = 320;
    var height = 620;

    var renderBgnd = makeRenderLayer(width, height, scroller);
    var renderMenu = makeRenderLayer(width, height, menu);

    // load resources and start
    res.load(function () {

        // add rendering layers
        scroller.addLayer(new Parallax.Layer(res.starfield, 1));
        scroller.addLayer(new Parallax.Layer(res.clouds, 2));

        renderMenu.start();
        renderBgnd.start();

        Controller.set(menu);
    });
});
