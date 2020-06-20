// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

require("trix")
require("@rails/actiontext")

$(document).ready( () => {
    $("table tr:nth-child(odd)").addClass("odd-row");
    $("table td:nth-child(2)").addClass("aligh-left");
    $("table td:last-child, table th:last-child").addClass("last");

    var canvas = document.createElement("canvas");
    canvas.height = 400;
    canvas.width = 600;

    document.getElementById("chart").appendChild(canvas);
    var ctx = canvas.getContext("2d");

    //config
    var dataPoints = [
        // { label: <%= @users.first.user_name %>, y: 10 },
        { label: "user 1", y: 15 },
        { label: "user 2", y: 25 },
        { label: "user 3", y: 30 },
        { label: "user 4", y: 25 }
    ],
        title = '';
        animationEnabled = true;

    //code
    var numLine = 6,
        distanceB2L = 2,

        numRect = dataPoints.length,
        w = (canvas.width - 120) / numRect,
        xRect = (w * 10 / 100) | 0,

        valColor = (360 / numRect) | 0,
        middle = (w - xRect) >> 1,

        maxValue = 0,
        h;


    function init() {
        //max value
        for (var i = 0; i < dataPoints.length; i++) {
            var y = dataPoints[i].y;
            if (y > maxValue) {
                maxValue = y;
            }
        }

        var highValue = +maxValue.toString()[0],
            lenValue = maxValue.toString().length - 1;
        if (highValue === 1) {
            distanceB2L = 0.5 * Math.pow(10, lenValue);
        } else if (highValue > 1 && highValue < 5) {
            distanceB2L = 1 * Math.pow(10, lenValue);
        } else if (highValue > 4 && highValue < 10) {
            distanceB2L = 2 * Math.pow(10, lenValue);
        }
        if (maxValue > 0) {
            if (3 * distanceB2L > maxValue) {
                numLine = 4;
            } else if (4 * distanceB2L > maxValue) {
                numLine = 5;
            } else if (5 * distanceB2L > maxValue) {
                numLine = 6;
            }
        }
        h = (canvas.height - 100) / (numLine - 1);

    }

    function drawTiltle() {
        ctx.textAlign = 'center';
        ctx.font = "900 25px 'Arial'";
        ctx.textBaseline = 'top';
        ctx.fillText(title, 300, 0);
    }

    function drawLine() {
        ctx.textAlign = 'right';
        ctx.font = '20px bold ';
        ctx.textBaseline = 'middle';
        for (var i = 0; i < numLine; i++) {
            ctx.beginPath();
            ctx.moveTo(50, 50 + (h * i));
            ctx.lineTo(canvas.width - 50, 50 + (h * i));
            ctx.stroke();
            ctx.fillText(((numLine - 1) * distanceB2L) - i * distanceB2L, 40, 50 + (h * i));
        }

    }

    function drawRects() {
        ctx.textAlign = 'center';
        for (var i = 0; i < numRect; i++) {
            ctx.save();
            ctx.transform(1, 0, 0, -1, 0, 400);
            ctx.fillStyle = 'hsl(' + (valColor * i) + ',60%,50%)';
            ctx.fillRect(70 + (w * i), 50, w - xRect, dataPoints[i].y * h / distanceB2L);
            ctx.beginPath();
            ctx.moveTo(70 + (w * i) + middle, 40);
            ctx.lineTo(70 + (w * i) + middle, 50);
            ctx.stroke();
            ctx.restore();
            ctx.fillText(dataPoints[i].label, 70 + (w * i) + middle, canvas.height - 35);
        }
    }

    function animation() {
        // drawRects();
        var index = 0;
        ctx.textAlign = 'center';
        for (var i = 0; i < numRect; i++) {
            ctx.beginPath();
            ctx.moveTo(70 + (w * i) + middle, canvas.height - 40);
            ctx.lineTo(70 + (w * i) + middle, canvas.height - 50);
            ctx.stroke();
            ctx.fillText(dataPoints[i].label, 70 + (w * i) + middle, canvas.height - 35);
        }
        ctx.transform(1, 0, 0, -1, 0, 400);
        var timer = setInterval(function () {
            for (var i = 0; i < numRect; i++) {
                if (index <= dataPoints[i].y) {
                    ctx.fillStyle = 'hsl(' + (valColor * i) + ',60%,50%)';
                    ctx.fillRect(70 + (w * i), 50, w - xRect, index * h / distanceB2L);
                }
            }
            index++;
            if (index > maxValue) {
                clearInterval(timer);
            }
        }, 20);
    }


    init();
    drawTiltle();
    drawLine();
    if (animationEnabled) {
        animation();
    } else {
        drawRects();
    }

});
