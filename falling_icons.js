window.iconStorm = function () {

    //Get canvas context
    var canvas = document.getElementById('icons-canvas');
    var context = canvas.getContext("2d");

    //Set canvas size to full page
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //Setup listeners for when the window resizes
    window.addEventListener('resize',function(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });


    //Wait for the fonts to load
    document.fonts.ready.then(_ => {
        context.font = '600 48px "Font Awesome 5 Free"';
        context.fillStyle = "black";
        setTimeout(setupIcons, 200);
    });

    var numberOfIcons = numberOfSvg;
    var icons = [];

    function setupIcons() {
        for (var i = 0; i < numberOfIcons; i++) {
            var svg = new Image();
            svg.src = '/svg/'+svgFiles[i];
            icons.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                d: Math.random() + 0.01,
                svg: svg
            });
        }
        setInterval(drawIcons, 25);
    }

    function drawIcons() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "black";
        context.beginPath();

        for (var i = 0; i < numberOfIcons; i++) {
            var icon = icons[i];

            context.drawImage(icon.svg,icon.x,icon.y,canvas.width/15,canvas.width/15);
   
        }

        moveIcons();
    }

    var angle = 0;

    function moveIcons() {
        //angle += 0.01;

        for (var i = 0; i < numberOfIcons; i++) {
            var icon = icons[i];

            //Update position of icon
            //icon.x += Math.sin(angle) * 2;
            icon.y += Math.pow(icon.d, 2) + 1;

            //Check if icon is at the end of the viewport
            if (icon.y > canvas.height) {
                icons[i] = {
                    x: Math.random() * canvas.width,
                    y: -100,
                    d: icon.d,
                    svg: icon.svg
                };
            }
        }
    }
}