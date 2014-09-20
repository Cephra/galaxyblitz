// globals
var log = function (text) {
    var dbg = $("#debug");
    dbg.prepend($("<br>"));
    dbg.prepend($("<span>").text("[DEBUG] "+text));
};
var res = new Resources({
    starfield: "gfx/starfield.png",
    clouds: "gfx/clouds.png",
});

// main
$(document).ready(function () {
    var scroller = new Parallax.Scroller();
    var renderBgnd = new RenderLoop($("#bgnd")[0], scroller);

    menu = new Menu({
        "Play1": function () {
            scroller.scrolling = 
                !scroller.scrolling;
            log("toggled background");
        },
        "Play2": function () {
            log("play2 pressed");
        },
    });
    var renderMenu = new RenderLoop($("#menu")[0], menu);

    // load resources and start
    res.load(function () {
        renderMenu.start();

        scroller.addLayer(new Parallax.Layer(res.starfield, 1));
        scroller.addLayer(new Parallax.Layer(res.clouds, 2));
        renderBgnd.start();
    });
});
