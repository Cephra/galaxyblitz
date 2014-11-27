// Resources
var res = new Render.Loader({
    starfield: "gfx/starfield.png",
    clouds: "gfx/clouds.png",
    invader: "gfx/invader.png",
});

Render.setDimensions(320, 620);

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

    var logicDrawables = new Drawables();

    var startGame = function (difficulty) {
        logicScroller.start();
        logicMenu.hide();

        var entShip = new PlayerShip();

        logicDrawables.addDrawable(entShip);
        Controller.set(entShip.getController());

        logicDrawables.start();
    };
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
