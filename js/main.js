// Resources
var res = new Resources({
    starfield: "gfx/starfield.png",
    clouds: "gfx/clouds.png",
    invader: "gfx/invader.png",
});

var width = 320;
var height = 620;

// main
$(document).ready(function () {
    var logicScroller = new Parallax.Scroller();

    var logicMenu = new Menu({
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
    var startGame = function (difficulty) {
        logicScroller.start();
        logicMenu.hide();
        // TODO init drawables
    };

    var logicDrawables = new Drawables();

    // load resources and start
    res.load(function () {
        // add rendering layers
        logicScroller.addLayer(new Parallax.Layer(res.starfield, 1));
        logicScroller.addLayer(new Parallax.Layer(res.clouds, 2));

        // draw background just once
        logicScroller.start();
        logicScroller.stop();

        // set initial controller to the menu
        Controller.set(logicMenu.getController());
    });
});
